const ApiError = require('../error/ApiError')
const bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')

const generateAccessToken = (params) => {
    const payload = {
        ...params,
    }
    return jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '24h' })
}

const userService = require('../services/user.service')

class userController {
    async getAllUsers(req, res, next) {
        try {
            const users = await userService.getAll()
            return res.json(users)
        } catch (e) {
            next(e)
        }
    }

    async registration(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    message: 'Ошибка при регистрации',
                    errors: errors.errors,
                })
            }

            const {
                email,
                password,
                user_role_id = 3,
                first_name,
                second_name,
                third_name,
                group_id,
                position_id,
                department_id,
            } = req.body

            const candidate = await userService.getOne({ email })
            if (candidate) {
                return res.status(400).json({
                    message: 'Пользователь с таким Email уже существует',
                })
            }

            const hashPassword = bcrypt.hashSync(password, 7)

            if (user_role_id === 3) {
                if (!group_id) {
                    return res.status(404).json({
                        message: 'Не был указан идентификатор группы студента',
                    })
                }

                await userService.createUserStudent({
                    email,
                    password: hashPassword,
                    user_role_id,
                    first_name,
                    second_name,
                    third_name,
                    group_id,
                })
            } else if (user_role_id === 2) {
                if (!position_id) {
                    return res.status(400).json({
                        message: 'Не была указана должность преподавателя',
                    })
                }

                if (!department_id) {
                    return res.status(400).json({
                        message: 'Не был указан факультет преподавателя',
                    })
                }

                await userService.createUserTeacher({
                    email,
                    password: hashPassword,
                    user_role_id,
                    first_name,
                    second_name,
                    third_name,
                    position_id,
                    department_id,
                })
            } else {
                await userService.createUser({
                    email,
                    password: hashPassword,
                    user_role_id,
                })
            }

            return res.json({ message: 'Пользователь успешно зарегистрирован' })
        } catch (e) {
            next(e)
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body
            const user = await userService.getOne({ email })

            if (!user) {
                return res.status(404).json({
                    message: `Пользователь с Email ${email} не найден.`,
                })
            }

            const validPassword = bcrypt.compareSync(password, user.password)

            if (!validPassword) {
                return res.status(400).json({
                    message: `Неправильный пароль.`,
                })
            }

            const token = generateAccessToken({
                user_id: user.id,
                email: user.email,
                role_id: user.user_role_id,
                role_name: user.role_name,
            })

            return res.json({ token })
        } catch (e) {
            next(e)
        }
    }

    async check(req, res, next) {
        try {
            const { userData } = req
            const token = generateAccessToken({
                user_id: userData.user_id,
                email: userData.email,
                role_id: userData.role_id,
                role_name: userData.role_name,
            })

            return res.json({ token })
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new userController()
