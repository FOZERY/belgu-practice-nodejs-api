const studentService = require('./student.service')
const teacherService = require('./teacher.service')

const courseModel = require('../models/course.model')

const ApiError = require('../error/ApiError')

class CourseService {
    async getCourseFullInfo(course_id, userData) {
        const { user_role_id } = userData

        if (user_role_id === 3) {
            const student_id = userData.student_id
            const courses = await studentService.getStudentCourses(student_id)
            const hasCourse = courses.some((course) => course.id === course_id)

            if (hasCourse) {
                const course = await courseModel.getCourseFullInfo(course_id)
                return course
            } else {
                throw ApiError.forbidden('Доступ запрещён.')
            }
        } else if (user_role_id === 2) {
            const teacher_id = userData.teacher_id
            const courses = await teacherService.getTeacherCourses(teacher_id)
            const hasCourse = courses.some((course) => course.id === course_id)

            if (hasCourse) {
                if (hasCourse) {
                    const course =
                        await courseModel.getCourseFullInfo(course_id)
                    return course
                } else {
                    throw ApiError.forbidden('Доступ запрещён.')
                }
            }
        } else if (user_role_id === 1) {
            const course = await courseModel.getCourseFullInfo(course_id)
            return course
        }
    }
}

module.exports = new CourseService()
