const { validationResult } = require('express-validator')

const userService = require('../services/user.service')

class userController {
    async getOneUser(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    message: 'Ошибка при получении пользователя',
                    errors: errors.errors,
                })
            }
            const id = req.params
            res.json(id)
        } catch (e) {
            next(e)
        }
    }

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

            await userService.registerUser(req.body)

            return res.json({ message: 'Пользователь успешно зарегистрирован' })
        } catch (e) {
            next(e)
        }
    }

    async login(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    message: 'Ошибка при авторизации',
                    errors: errors.errors,
                })
            }

            const token = await userService.loginUser(req.body)

            return res.json({ token })
        } catch (e) {
            next(e)
        }
    }

    async check(req, res, next) {
        try {
            const { userData } = req

            const token = await userService.authUser(userData)

            return res.json({ token })
        } catch (e) {
            next(e)
        }
    }

    async getUserFullInfo(req, res, next) {
        try {
            const { userData } = req

            const userInfo = await userService.getUserFullInfo(userData)

            return res.json(userInfo)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new userController()
