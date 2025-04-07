const ApiError = require('../error/ApiError')

const { validationResult } = require('express-validator')

const lessonService = require('../services/lesson.service')
class lessonController {
    async getLessonsByGroup(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    message: 'Ошибка при получении расписания пар',
                    errors: errors.errors,
                })
            }
            const { group_id } = req.params
            const { from, to } = req.query

            const lessons =
                (await lessonService.getLessonsByGroup(group_id, from, to)) ||
                []

            return res.json(lessons)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new lessonController()
