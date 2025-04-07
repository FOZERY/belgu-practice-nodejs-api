const db = require('../../database/db')

class GroupModel {
    async getGroupsByLessonId(id) {
        const query = `SELECT id AS group_id, group_number FROM "group"
RIGHT JOIN group_lesson ON "group".id = group_lesson.group_id
WHERE group_lesson.lesson_id = $1
`
        const { rows } = await db.query(query, [id])
        return rows
    }

    async getStudentsByGroup(id) {
        const query = `SELECT id, user_id, first_name, second_name, third_name, group_id FROM student 
WHERE group_id = $1
ORDER BY second_name `
        const { rows } = await db.query(query, [id])
        return rows
    }

    async getGroups(group_number) {
        const query = `SELECT "group".id, department_id, department_name, group_number, group_name FROM "group" LEFT JOIN department ON department.id = "group".department_id WHERE group_number ILIKE $1`
        const { rows } = await db.query(query, [`${group_number}%`])
        return rows
    }
}

module.exports = new GroupModel()
