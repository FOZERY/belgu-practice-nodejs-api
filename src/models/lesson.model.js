const db = require('../../db')

class LessonModel {
    async getLessonsByTeacherId(id) {
        const query = 'SELECT * FROM lesson WHERE teacher_id = $1'
        const { rows } = await db.query(query, [id])
        return rows
    }
}

module.exports = new LessonModel()
