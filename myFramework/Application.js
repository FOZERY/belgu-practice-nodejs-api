const http = require('http')
const EventEmitter = require('events')
const parseUrl = require('./utils/parseUrl')
const addResStatus = require('./utils/addResStatus')

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
            if (!req.pathname.startsWith(basePath)) {
                throw new NotFoundError('Not found')
            }

            let subPath = req.pathname.slice(basePath.length)
            if (!subPath.endsWith('/')) {
                subPath += '/'
            }
            req.pathname = subPath
            this._handleRouter(router, req, res, next) // вернется либо next() либо handler()
        }
    }

    _handleRouter(router, req, res, next) {
        const endpoint = router.endpoints[req.pathname]
        if (endpoint) {
            const handlers = endpoint[req.method]

            if (handlers && handlers.length > 0) {
                this._runHandlers(handlers, req, res, next)
                return
            }
        }
        next(new NotFoundError('Not found'))
    }

    _runHandlers(handlers, req, res, next) {
        let index = 0

        const runNext = (err) => {
            if (err) {
                return next(err)
            }

            if (index >= handlers.length) {
                return next() // ??
            }

            const handler = handlers[index++]
            try {
                handler(req, res, runNext)
            } catch (err) {
                next(err)
            }
        }

        runNext()
    }

    _createServer() {
        return http.createServer(async (req, res) => {
            try {
                addResStatus(res)
                parseUrl(req)

                await this._createMiddlewareChain(req, res)

                if (!res.writableEnded) {
                    throw new NotFoundError(`Cannot GET ${req.url}`)
                }
            } catch (err) {
                if (err instanceof NotFoundError) {
                    console.error(err)
                    res.writeHead(err.statusCode, {
                        'Content-Type': 'application/json',
                    })
                    res.end(JSON.stringify({ message: err.message }))
                } else {
                    console.error(err)
                    res.writeHead(500, {
                        'Content-Type': 'application/json',
                    })
                    res.end(JSON.stringify({ message: err.message }))
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
