module.exports = (res) => {
    res.status = (statusCode) => {
        res.statusCode = statusCode
        return res
    }
}
