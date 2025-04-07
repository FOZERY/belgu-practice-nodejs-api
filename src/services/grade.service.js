const groupModel = require('../models/group.model')

const gradeModel = require('../models/grade.model')

class GradeService {
    async addGrade(student_id, lesson_id, grade_type_id) {
        return await gradeModel.addGrade(student_id, lesson_id, grade_type_id)
    }
}

module.exports = new GradeService()
