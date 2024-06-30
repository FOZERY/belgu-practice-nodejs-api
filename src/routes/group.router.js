const Router = require('../../myFramework/Router')
const router = new Router()

const { body, param } = require('express-validator')

const authMiddleware = require('../middleware/authMiddleware')
const groupController = require('../controllers/group.controller')

router.get(
    '/:id/students',
    [param('id').toInt()],
    authMiddleware,
    groupController.getStudentsByGroup
)

module.exports = router
