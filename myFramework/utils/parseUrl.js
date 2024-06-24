module.exports = (req) => {
    const parseUrl = new URL(req.url, 'http://localhost/')
    const params = {}
    parseUrl.searchParams.forEach((value, key) => (params[key] = value))

    req.pathname = parseUrl.pathname
    req.query = params
}
