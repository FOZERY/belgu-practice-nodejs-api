const ApiError = require('../error/ApiError')

const gradeService = require('../services/grade.service')

class gradeController {
    async addGrade(req, res, next) {
        try {
            const { student_id, lesson_id, grade_type_id } = req.body

            await gradeService.addGrade(student_id, lesson_id, grade_type_id)

            return res.json({ message: 'Оценка успешно добавлена.' })
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new gradeController()
