module.exports = class Router {
    constructor() {
        this.endpoints = {}
    }

    request(method = 'GET', path, handlers) {
        if (!this.endpoints[path]) {
            this.endpoints[path] = {}
        }
        const endpoint = this.endpoints[path]

        if (endpoint[method]) {
            throw new Error(`[${method}] по адресу ${path} уже существует`)
        }

        endpoint[method] = handlers
    }

    use(basePath, router) {
        Object.keys(router.endpoints).forEach((path) => {
            const fullPath = basePath + path
            const endpoint = router.endpoints[path]
            Object.keys(endpoint).forEach((method) => {
                const handler = endpoint[method]
                this.request(method, fullPath, handler)
            })
        })
    }

    get(path, ...handlers) {
        this.request('GET', path, handlers)
    }

    post(path, ...handlers) {
        this.request('POST', path, handlers)
    }

    put(path, ...handlers) {
        this.request('PUT', path, handlers)
    }

    delete(path, ...handlers) {
        this.request('DELETE', path, handlers)
    }
}
