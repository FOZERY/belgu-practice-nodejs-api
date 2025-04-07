const ApiError = require('../error/ApiError')

const teacherService = require('../services/teacher.service')

class teacherController {
    async getAll(req, res) {
        return res.status(404)
    }

    async getTeacherCourses(req, res, next) {
        try {
            const { id } = req.params
            if (!id || isNaN(id)) {
                throw ApiError.badRequest('Не задан ID')
            }

            const courses = await teacherService.getTeacherCourses(id)
            res.json(courses)
        } catch (e) {
            return next(e)
        }
    }

    async getTeacherLessons(req, res, next) {
        try {
            const { id } = req.params
            if (!id || isNaN(id)) {
                throw ApiError.badRequest('Не задан ID')
            }

            const lessons = await teacherService.getTeacherLessons(id)
            res.json(lessons)
        } catch (e) {
            return next(e)
        }
    }
}

module.exports = new teacherController()
