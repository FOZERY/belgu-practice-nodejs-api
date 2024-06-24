const LessonModel = require('../models/lesson.model')
const CourseModel = require('../models/course.model')

class TeacherService {
    async getAll() {}

    async getTeacherCourses(teacher_id) {
        return await CourseModel.getCoursesByTeacherId(teacher_id)
    }

    async getTeacherLessons(teacher_id) {
        const lessons = await LessonModel.getLessonsByTeacherId(teacher_id)
        return lessons
    }
}

module.exports = new TeacherService()
