const gradeModel = require('../models/grade.model')

class GradeService {
    async getGradesByCourseAndGroup(course_id, group_id, page, limit) {
        const offset = (page - 1) * limit

        const grades = await gradeModel.getGradesByCourseAndGroup(
            course_id,
            group_id,
            page,
            offset
        )
        return grades
    }
}

module.exports = new GradeService()
