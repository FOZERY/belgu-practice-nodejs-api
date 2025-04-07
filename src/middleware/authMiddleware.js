const jwt = require('jsonwebtoken')

const ApiError = require('../error/ApiError')

module.exports = function (req, res, next) {
    if (req.method === 'OPTIONS') {
        next()
    }

    try {
        const token = req.headers.authorization?.split(' ')[1]

        if (!token) {
            throw ApiError.unauthorized('Пользователь не авторизован')
        }

        const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY)
        req.userData = decodedData
        next()
    } catch (e) {
        next(ApiError.unauthorized('Пользователь не авторизован'))
    }
}
