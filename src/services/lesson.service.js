const LessonModel = require('../models/lesson.model')

class LessonService {
    async getLessonsByTeacherId(id) {
        return await LessonModel.getLessonsByTeacherId(id)
    }

    async getLessonsWithGradesByCourseAndGroup(
        course_id,
        group_id,
        page,
        limit
    ) {
        return await LessonModel.getLessonsWithGradesByCourseAndGroup(
            course_id,
            group_id,
            page,
            limit
        )
    }
}

module.exports = new LessonService()
