module.exports = class Router {
    constructor() {
        this.endpoints = new Map()
    }

    request(method = 'GET', path, handlers) {
        if (!this.endpoints.has(path)) {
            this.endpoints.set(path, new Map())
        }
        const endpoint = this.endpoints.get(path)

        if (endpoint.has(method)) {
            throw new Error(`[${method}] по адресу ${path} уже существует`)
        }

        endpoint.set(method, handlers)
    }

    use(basePath, router) {
        router.endpoints.forEach((endpoint, path) => {
            const fullPath = basePath + path
            endpoint.forEach((handler, method) => {
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
