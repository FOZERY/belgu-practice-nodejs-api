const StudentModel = require('../models/student.model')
const CourseService = require('../services/course.service')

class StudentService {
    async createStudent(params) {
        const { client, ...studentData } = params
        return await StudentModel.createStudent(studentData, client)
    }

    async getStudentByUserId(user_id) {
        return await StudentModel.getStudentByUserId(user_id)
    }

    async getStudentCourses(student_id) {
        return await CourseService.getCoursesByStudentId(student_id)
    }
}

module.exports = new StudentService()
