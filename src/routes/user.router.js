const Router = require('../../myFramework/Router')
const router = new Router()

router.get(
    '/',
    (req, res, next) => {
        res.status(400)
        next()
    },
    (req, res, next) => {
        res.json({ message: 'Hello, world' })
    }
)

module.exports = router
