const Router = require('../../myFramework/Router')
const router = new Router()

const teacherController = require('../controllers/teacher.controller')

router.get('/', teacherController.getAll)

module.exports = router
