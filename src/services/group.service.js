const groupModel = require('../models/group.model')

class GroupService {
    async getStudentsByGroup(id) {
        return await groupModel.getStudentsByGroup(id)
    }
}

module.exports = new GroupService()
