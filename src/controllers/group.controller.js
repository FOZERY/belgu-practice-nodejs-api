const ApiError = require('../error/ApiError')

const groupService = require('../services/group.service')
const { validationResult } = require('express-validator')

class groupController {
    async getGroups(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    message: 'Ошибка при получении групп',
                    errors: errors.errors,
                })
            }

            const { group_number } = req.query
            const groups = await groupService.getGroups(group_number)
            return res.json(groups)
        } catch (e) {
            next(e)
        }
    }
    async getStudentsByGroup(req, res, next) {
        try {
            const id = req.params.id
            const group = await groupService.getStudentsByGroup(id)
            return res.json(group)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new groupController()
