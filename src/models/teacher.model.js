const db = require('../../database/db')

class TeacherModel {
    async getTeacherByUserId(user_id) {
        const query = `SELECT teacher.id AS teacher_id, first_name, second_name, third_name, position_id, position_name, department_id, department_name
        FROM teacher
        LEFT JOIN position ON position.id = teacher.position_id
        LEFT JOIN department ON department.id = teacher.department_id
        WHERE teacher.user_id = $1`
        const { rows } = await db.query(query, [user_id])
        return rows[0]
    }

    async createTeacher(params, client = db) {
        const query = `INSERT INTO teacher (first_name, second_name, third_name, department_id, position_id, user_id)
        VALUES($1,$2,$3,$4,$5,$6)
        RETURNING *`

        const {
            first_name,
            second_name,
            third_name,
            department_id,
            position_id,
            user_id,
        } = params

        const values = [
            first_name,
            second_name,
            third_name,
            department_id,
            position_id,
            user_id,
        ]

        const { rows } = await client.query(query, values)
        return rows[0]
    }
}

module.exports = new TeacherModel()
