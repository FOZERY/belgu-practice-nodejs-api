module.exports = (req, res, next) => {
    let body = ''
    req.on('data', (chunk) => {
        body += chunk
    })
    req.on('end', () => {
        if (body) {
            try {
                req.body = JSON.parse(body)
            } catch (e) {
                console.error('Invalid JSON:', e)
                res.status(400).json({ error: 'Invalid JSON' })
                return
            }
        }
        next()
    })
}
