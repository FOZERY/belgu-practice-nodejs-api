const ApiError = require('../error/ApiError')

const groupService = require('../services/group.service')

class groupController {
    async getStudentsByGroup(req, res, next) {
        try {
            const id = req.params.id
            const group = await groupService.getStudentsByGroup(id)
            return res.json(group)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new groupController()
