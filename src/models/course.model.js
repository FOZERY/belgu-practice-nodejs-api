const db = require('../../database/db')

class CourseModel {
    async getCoursesByTeacherId(id) {
        const query =
            'SELECT id, course_name, course_description FROM course AS c LEFT JOIN teacher_course AS tc ON tc.course_id = c.id WHERE tc.teacher_id = $1'
        const { rows } = await db.query(query, [id])
        return rows
    }
}

module.exports = new CourseModel()
