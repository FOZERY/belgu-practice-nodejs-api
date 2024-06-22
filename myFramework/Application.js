const http = require('http')
const EventEmitter = require('events')

const NotFoundError = require('./error/NotFoundError')

class Application {
    constructor() {
        this.emitter = new EventEmitter()
        this.server = this._createServer()
        this.middlewares = []
    }

    listen(port, callback) {
        this.server.listen(port, callback)
    }

    use(middleware) {
        this.middlewares.push(middleware)
    }

    createRouterMiddleware(basePath, router) {
        return (req, res, next) => {
            if (!req.url.startsWith(basePath)) {
                throw new NotFoundError('Not found')
            }

            const subPath = req.url.slice(basePath.length) || '/'
            req.url = subPath
            this._handleRouter(router, req, res, next) // вернется либо next() либо handler()
        }
    }

    _handleRouter(router, req, res, next) {
        const endpoint = router.endpoints[req.url]
        if (endpoint) {
            const handler = endpoint[req.method]
            if (handler) {
                return handler(req, res, (next = null))
            }
        }
        next(new NotFoundError('Not found'))
    }

    _createServer() {
        return http.createServer(async (req, res) => {
            try {
                res.status = (statusCode) => {
                    res.statusCode = statusCode
                    return res
                }

                await this._createMiddlewareChain(req, res)
            } catch (err) {
                if (err instanceof NotFoundError) {
                    console.error(err)
                    res.writeHead(err.statusCode, {
                        'Content-Type': 'text/plain',
                    })
                    res.end(err.message)
                } else {
                    console.error(err)
                    res.writeHead(500, {
                        'Content-Type': 'text/plain',
                    })
                    res.end(err.message)
                }
            }
        })
    }

    _createMiddlewareChain(req, res) {
        const middlewares = this.middlewares
        let index = 0

        return new Promise((resolve, reject) => {
            const next = (err) => {
                if (err) {
                    return invokeNextMiddleware(err)
                }
                invokeNextMiddleware()
            }

            const invokeNextMiddleware = (err) => {
                if (index >= middlewares.length) {
                    if (err) {
                        return reject(err)
                    }
                    return resolve()
                }

                const middleware = middlewares[index++]
                try {
                    if (err) {
                        if (middleware.length === 4) {
                            middleware(err, req, res, next)
                        } else {
                            next(err)
                        }
                    } else {
                        if (middleware.length < 4) {
                            middleware(req, res, next)
                        } else {
                            next()
                        }
                    }
                } catch (error) {
                    next(error)
                }
            }

            next()
        })
    }

    _getRouteMask(path, method) {
        return `[${path}]:[${method}]`
    }
}

module.exports = Application
