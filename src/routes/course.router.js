const Router = require('../../myFramework/Router')
const router = new Router()

const authMiddleware = require('../middleware/authMiddleware')

const courseController = require('../controllers/course.controller')

const { param } = require('express-validator')

router.get(
    '/:id',
    [
        param('id')
            .isInt()
            .withMessage('Id должен быть в числовом виде.')
            .toInt(),
    ],
    authMiddleware,
    courseController.getCourseFullInfo
)

module.exports = router
