module.exports = (req, res, next) => {
    res.send = (data) => {
        res.setHeader('Content-type', 'application/json; charset=utf-8')
        res.end(JSON.stringify(data))
    }
    next()
}
