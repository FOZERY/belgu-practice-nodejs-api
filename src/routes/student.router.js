const Router = require('../../myFramework/Router')
const router = new Router()

const { body, param } = require('express-validator')

const studentController = require('../controllers/student.controller')
const authMiddleware = require('../middleware/authMiddleware')

router.get(
    '/:id/courses',
    [param('id').toInt()],
    authMiddleware,
    studentController.getStudentCourses
)

module.exports = router
