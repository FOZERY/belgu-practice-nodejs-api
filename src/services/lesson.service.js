const LessonModel = require('../models/lesson.model')

class LessonService {
    async getLessonsByTeacherId(id) {
        return await LessonModel.getLessonsByTeacherId(id)
    }
}

module.exports = new LessonService()
