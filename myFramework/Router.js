module.exports = class Router {
    constructor() {
        this.endpoints = {}
    }

    request(method = 'GET', path, handler) {
        if (!this.endpoints[path]) {
            this.endpoints[path] = {}
        }
        const endpoint = this.endpoints[path]

        if (endpoint[method]) {
            throw new Error(`[${method}] по адресу ${path} уже существует`)
        }

        endpoint[method] = handler
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

    get(path, handler) {
        this.request('GET', path, handler)
    }

    post(path, handler) {
        this.request('POST', path, handler)
    }

    put(path, handler) {
        this.request('PUT', path, handler)
    }

    delete(path, handler) {
        this.request('DELETE', path, handler)
    }
}
