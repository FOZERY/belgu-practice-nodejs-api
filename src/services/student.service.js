const StudentModel = require('../models/student.model')

class StudentService {
    async getStudentByUserId(user_id) {
        return await StudentModel.getStudentByUserId(user_id)
    }
}

module.exports = new StudentService()
