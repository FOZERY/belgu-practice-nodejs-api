const Router = require('../../myFramework/Router')
const router = new Router()

const courseController = require('../controllers/course.controller')

router.get('/', courseController.getAll)

module.exports = router
