const db = require('../../database/db')
const parametrizeQuery = require('../utils/parametrizeQuery')

class UserModel {
    async getAll() {
        const query = `SELECT * FROM "user"`
        const { rows } = await db.query(query)
        return rows
    }

    async getOne(params) {
        const query = `SELECT "user".id, email, password, user_role_id, user_role.role_name FROM "user" 
        LEFT JOIN user_role ON "user".user_role_id = user_role.id 
        WHERE`
        const { parametrizedQuery, values } = parametrizeQuery(query, params)

        const { rows } = await db.query(parametrizedQuery, values)
        return rows[0]
    }

    async createUser(params, client = db) {
        console.log(client)
        const query = `INSERT INTO "user" (email, password, user_role_id)
        VALUES($1, $2, $3)
        RETURNING *
        `

        const { email, password, user_role_id } = params

        const values = [email, password, user_role_id]

        const { rows } = await client.query(query, values)
        return rows[0]
    }
}

module.exports = new UserModel()
