const userModel = require('../models/user.model')
const { transaction } = require('../../database/db')
const studentModel = require('../models/student.model')
const teacherModel = require('../models/teacher.model')

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

    async createUserStudent(params) {
        return await transaction(async (client) => {
            const user = await userModel.createUser(params, client)
            const student = await studentModel.createStudent(
                {
                    user_id: user.id,
                    first_name: params.first_name,
                    second_name: params.second_name,
                    third_name: params.third_name,
                    group_id: params.group_id,
                },
                client
            )

            return { user, student }
        })
    }

    async createUserTeacher(params) {
        return await transaction(async (client) => {
            const user = await userModel.createUser(params, client)
            const teacher = await teacherModel.createTeacher(
                {
                    user_id: user.id,
                    first_name: params.first_name,
                    second_name: params.second_name,
                    third_name: params.third_name,
                    department_id: params.department_id,
                    position_id: params.position_id,
                },
                client
            )

            return { user, teacher }
        })
    }
}

module.exports = new UserService()
