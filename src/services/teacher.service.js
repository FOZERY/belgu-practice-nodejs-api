const LessonModel = require('../models/lesson.model')
const CourseModel = require('../models/course.model')

class TeacherService {
    async getAll() {}

    async getTeacherCourses(teacher_id) {
        return await CourseModel.getCoursesByTeacherId(teacher_id)
    }

    async getTeacherLessons(teacher_id) {
        const lessons = await LessonModel.getLessonsByTeacherId(teacher_id)

        for (let i = 0, length = lessons.length; i < length; i++) {
            const lesson = lessons[i]
            if (lesson.groups.length === 1 && !lesson.groups.group_id) {
                lesson.groups = []
            }
        }

        return lessons
    }
}

module.exports = new TeacherService()
