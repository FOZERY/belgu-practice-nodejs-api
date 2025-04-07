const ApiError = require('../error/ApiError')

const studentService = require('../services/student.service')

class studentController {
    async getStudentCourses(req, res, next) {
        try {
            const { id } = req.params
            if (!id || isNaN(id)) {
                throw ApiError.badRequest('Не задан ID')
            }

            if (
                id !== req.userData.student_id &&
                req.userData.user_role_id !== 1
            ) {
                return res.status(403).json('Доступ запрещен')
            }

            const courses = await studentService.getStudentCourses(id)
            res.json(courses)
        } catch (e) {
            return next(e)
        }
    }
}

module.exports = new studentController()
