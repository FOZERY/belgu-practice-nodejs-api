const getUsers = (req, res) => {
    res.statusCode = 404
    res.end('Not Found')
}

module.exports = {
    getUsers,
}
