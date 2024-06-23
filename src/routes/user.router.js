const Router = require('../../myFramework/Router')
const router = new Router()

const userController = require('../controllers/user.controller')

router.get('/', userController.getAll)

module.exports = router
