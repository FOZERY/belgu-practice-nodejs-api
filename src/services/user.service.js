const userModel = require('../models/user.model')
const { transaction } = require('../../database/db')
const bcrypt = require('bcryptjs')

const ApiError = require('../error/ApiError')
const studentService = require('./student.service')
const teacherService = require('./teacher.service')
const jwt = require('jsonwebtoken')

const generateAccessToken = (params) => {
    const payload = {
        ...params,
    }
    return jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '24h' })
}

class UserService {
    async getAll() {
        const users = await userModel.getAll()
        return users
    }

    async getOne(params) {
        return await userModel.getOne(params)
    }

    async registerUser(userData) {
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
        } = userData

        const candidate = await this.getOne({ email })
        if (candidate) {
            throw ApiError.badRequest(
                'Пользователь с таким email уже существует.'
            )
        }

        const hashPassword = bcrypt.hashSync(password, 7)

        if (user_role_id === 3) {
            if (!group_id) {
                throw ApiError.badRequest(
                    'Не был указан идентификатор группы студента'
                )
            }

            if (!first_name || !second_name) {
                throw ApiError.badRequest('Не были указаны имя или фамилия')
            }
            await this.createUserStudent({
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
                throw ApiError.badRequest(
                    'Не была указана должность преподавателя'
                )
            }

            if (!first_name && !second_name) {
                throw ApiError.badRequest('Не были указаны имя или фамилия')
            }

            if (!department_id) {
                throw ApiError.badRequest(
                    'Не был указан факультет преподавателя'
                )
            }

            await this.createUserTeacher({
                email,
                password: hashPassword,
                user_role_id,
                first_name,
                second_name,
                third_name,
                position_id,
                department_id,
            })
        } else if (user_role_id === 1) {
            await this.createUser({
                email,
                password: hashPassword,
                user_role_id,
            })
        }
    }

    async loginUser(userData) {
        const { email, password } = userData

        const user = await this.getOne({ email })

        if (!user) {
            throw ApiError.badRequest('Неверно указан пароль или email')
        }

        const validPassword = bcrypt.compareSync(password, user.password)

        if (!validPassword) {
            throw ApiError.badRequest('Неверно указан пароль или email')
        }

        let userInfo
        if (user.user_role_id === 3) {
            userInfo = await studentService.getStudentByUserId(user.id)
        } else if (user.user_role_id === 2) {
            userInfo = await teacherService.getTeacherByUserId(user.id)
        }

        const token = generateAccessToken({
            user_id: user.id,
            email: user.email,
            user_role_id: user.user_role_id,
            role_name: user.role_name,
            ...userInfo,
        })

        return token
    }

    async authUser(userData) {
        const { iat, exp, ...filtredUserData } = userData

        const token = generateAccessToken({
            ...filtredUserData,
        })

        return token
    }

    async createUser(params, client) {
        const { ...userData } = params

        return await userModel.createUser(userData, client)
    }

    async createUserStudent(params) {
        return await transaction(async (client) => {
            const user = await this.createUser(params, client)
            const student = await studentService.createStudent(
                {
                    user_id: user.id,
                    first_name: params.first_name,
                    second_name: params.second_name,
                    third_name: params.third_name,
                    group_id: params.group_id,
                },
                client
            )

            return { user, student }
        })
    }

    async createUserTeacher(params) {
        return await transaction(async (client) => {
            const user = await this.createUser(params, client)
            const teacher = await teacherService.createTeacher(
                {
                    user_id: user.id,
                    first_name: params.first_name,
                    second_name: params.second_name,
                    third_name: params.third_name,
                    department_id: params.department_id,
                    position_id: params.position_id,
                },
                client
            )

            return { user, teacher }
        })
    }

    async getUserFullInfo(userData) {
        let userInfo
        if (userData.user_role_id === 3) {
            userInfo = await studentService.getStudentByUserId(userData.user_id)
        } else if (userData.user_role_id === 2) {
            userInfo = await teacherService.getTeacherByUserId(userData.user_id)
        }

        return {
            user_id: userData.user_id,
            email: userData.email,
            user_role_id: userData.user_role_id,
            role_name: userData.role_name,
            ...userInfo,
        }
    }
}

module.exports = new UserService()
