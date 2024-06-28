const LessonModel = require('../models/lesson.model')
const CourseModel = require('../models/course.model')
const TeacherModel = require('../models/teacher.model')

class TeacherService {
    async getAll() {}

    async getTeacherCourses(teacher_id) {
        return await CourseModel.getCoursesByTeacherId(teacher_id)
    }

    async getTeacherLessons(teacher_id) {
        return await LessonModel.getLessonsByTeacherId(teacher_id)
    }

    async getTeacherByUserId(user_id) {
        return await TeacherModel.getTeacherByUserId(user_id)
    }
}

module.exports = new TeacherService()
