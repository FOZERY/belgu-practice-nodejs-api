const userModel = require('../models/user.model')

class UserService {
    async getAll() {
        const users = await userModel.getAll()
        return users
    }

    async getOne(params) {
        const user = await userModel.getOne(params)
        return user
    }

    async createUser(params) {
        const user = await userModel.createUser(params)
        return user
    }
}

module.exports = new UserService()
