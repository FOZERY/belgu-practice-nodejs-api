const groupModel = require('../models/group.model')

class GroupService {
    async getGroups(group_number) {
        return await groupModel.getGroups(group_number)
    }

    async getStudentsByGroup(id) {
        return await groupModel.getStudentsByGroup(id)
    }
}

module.exports = new GroupService()
