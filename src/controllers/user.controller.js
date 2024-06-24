const ApiError = require('../error/ApiError')

class userController {
    async getAll(req, res) {}

    async getOne(req, res, next) {
        const { id, sex } = req.params
        res.json({ ...req.params, ...req.query })
    }

    async createUser(req, res) {
        res.json(req.body)
    }
}

module.exports = new userController()
