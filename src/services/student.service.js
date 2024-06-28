const StudentModel = require('../models/student.model')
const CourseModel = require('../models/course.model')

class StudentService {
    async getStudentByUserId(user_id) {
        return await StudentModel.getStudentByUserId(user_id)
    }

    async getStudentCourses(student_id) {
        return await CourseModel.getCoursesByStudentId(student_id)
    }
}

module.exports = new StudentService()
