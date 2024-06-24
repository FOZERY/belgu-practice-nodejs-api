const db = require('../../db')
const ApiError = require('../error/ApiError')

class userController {
    async getAll(req, res) {
        const users = await db.query('SELECT * FROM "user"')
        return res.json({ message: users.rows })
    }

    async getOne(req, res, next) {
        const { id, sex } = req.params
        res.json({ ...req.params, ...req.query })
    }

    async createUser(req, res) {
        res.json(req.body)
    }
}

module.exports = new userController()
