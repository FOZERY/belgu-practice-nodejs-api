const db = require('../../db')
const ApiError = require('../error/ApiError')

class teacherController {
    async getAll(req, res) {
        const teachers = await db.query('SELECT * FROM teacher')
        return res.json({ message: teachers.rows })
    }
}

module.exports = new teacherController()
