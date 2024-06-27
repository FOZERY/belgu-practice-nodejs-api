const jwt = require('jsonwebtoken')

module.exports = function (roles) {
    return function (req, res, next) {
        if (req.method === 'OPTIONS') {
            next()
        }

        try {
            const token = req.headers.authorization?.split(' ')[1]

            if (!token) {
                return res
                    .status(401)
                    .json({ message: 'Пользователь не авторизован' })
            }

            const { role_id } = jwt.verify(token, process.env.JWT_SECRET_KEY)

            const hasRole = roles.includes(role_id)

            if (!hasRole) {
                return res.status(403).json({ message: 'У вас нет доступа' })
            }

            next()
        } catch (e) {
            next(e)
        }
    }
}
