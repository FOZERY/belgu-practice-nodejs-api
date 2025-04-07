const jwt = require('jsonwebtoken')
const ApiError = require('../error/ApiError')

module.exports = function (roles) {
    return function (req, res, next) {
        if (req.method === 'OPTIONS') {
            next()
        }

        try {
            const token = req.headers.authorization?.split(' ')[1]

            if (!token) {
                throw ApiError.unauthorized('Пользователь не авторизован')
            }

            const { user_role_id } = jwt.verify(
                token,
                process.env.JWT_SECRET_KEY
            )

            const hasRole = roles.includes(user_role_id)

            if (!hasRole) {
                throw ApiError.forbidden('У вас нет доступа.')
            }

            next()
        } catch (e) {
            if (e instanceof ApiError) {
                next(e)
            } else {
                next(ApiError.unauthorized('Пользователь не авторизован'))
            }
        }
    }
}
