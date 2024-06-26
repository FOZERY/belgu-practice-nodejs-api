const db = require('../../database/db')

class StudentModel {
    async getStudentByUserId(user_id) {
        const query = `SELECT student.id AS student_id, first_name, second_name, third_name, group_id, group_number
        FROM student
        LEFT JOIN group ON group.id = student.group_id
        WHERE user_id = $1`

        const { rows } = db.query(query, [user_id])
        return rows[0]
    }

    async createStudent(params, client) {
        const query = `INSERT INTO student (first_name, second_name, third_name, group_id, user_id)
        VALUES($1,$2,$3,$4,$5)
        RETURNING *`

        const { first_name, second_name, third_name, group_id, user_id } =
            params

        const values = [first_name, second_name, third_name, group_id, user_id]

        const { rows } = await client.query(query, values)
        return rows[0]
    }
}

module.exports = new StudentModel()
