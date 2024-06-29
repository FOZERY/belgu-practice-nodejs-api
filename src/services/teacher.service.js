const TeacherModel = require('../models/teacher.model')

const CourseService = require('../services/course.service')
const LessonService = require('../services/lesson.service')

class TeacherService {
    async getAll() {}

    async createTeacher(params) {
        const { client, ...teacherData } = params
        return await TeacherModel.createTeacher(teacherData, client)
    }

    async getTeacherCourses(teacher_id) {
        return await CourseService.getCoursesByTeacherId(teacher_id)
    }

    async getTeacherLessons(teacher_id) {
        return await LessonService.getLessonsByTeacherId(teacher_id)
    }

    async getTeacherByUserId(user_id) {
        return await TeacherModel.getTeacherByUserId(user_id)
    }
}

module.exports = new TeacherService()
