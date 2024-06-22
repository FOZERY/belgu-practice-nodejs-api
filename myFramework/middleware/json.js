module.exports = (req, res, next) => {
    res.json = (body) => {
        res.setHeader('Content-type', 'application/json')
        res.end(JSON.stringify(body))
    }
    next()
}
