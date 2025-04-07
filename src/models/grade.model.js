const db = require('../../database/db')

class GradeModel {
    async addGrade(student_id, lesson_id, grade_type_id) {
        console.log(student_id, lesson_id, grade_type_id)

        const query = `UPDATE grade SET grade_type_id = $1 WHERE student_id = $2 AND lesson_id = $3 RETURNING *`

        const { rows } = await db.query(query, [
            grade_type_id,
            student_id,
            lesson_id,
        ])
        return rows
    }
}

module.exports = new GradeModel()
