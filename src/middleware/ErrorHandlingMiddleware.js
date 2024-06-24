const ApiError = require('../error/ApiError')

module.exports = (err, req, res, next) => {
    if (err instanceof ApiError) {
        return res.status(err.status).json({ message: err.message })
    }

    const statusCode = err.status || err.statusCode || 500
    const errorMessage =
        statusCode === 404 ? 'Не найдено' : 'Непредвиденная ошибка'
    console.error(err)
    return res.status(statusCode).json({ message: errorMessage })
}
