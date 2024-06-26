const ApiError = require('../error/ApiError')
const userService = require('../services/user.service')
const bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')

const generateAccessToken = (id, user_role_id) => {
    const payload = {
        id,
        user_role_id,
    }
    return jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '24h' })
}

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
                return res.status(404).json({
                    message: 'Ошибка при регистрации',
                    errors: errors.errors,
                })
            }

            const { email, password, user_role_id = 3 } = req.body

            const candidate = await userService.getOne({ email })
            if (candidate) {
                return res.status(400).json({
                    message: 'Пользователь с таким Email уже существует',
                })
            }

            const hashPassword = bcrypt.hashSync(password, 7)

            await userService.createUser({
                email,
                password: hashPassword,
                user_role_id,
            })

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

            const token = generateAccessToken(
                user.id,
                user.email,
                user.user_role_id
            )
            return res.json({ token })
        } catch (e) {
            next(e)
        }
    }

    async check(req, res, next) {
        try {
            const token = generateAccessToken(
                req.user.id,
                req.user.email,
                req.user.user_role_id
            )

            return res.json({ token })
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new userController()
