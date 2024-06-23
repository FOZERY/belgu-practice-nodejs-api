const db = require('../../db')

class userController {
    async getAll(req, res) {
        const users = await db.query('SELECT * FROM user')
        res.json(users.rows)
    }
}

module.exports = new userController()
