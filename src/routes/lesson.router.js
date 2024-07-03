const Router = require('../../myFramework/Router')
const router = new Router()

const { body, param, query } = require('express-validator')

const authMiddleware = require('../middleware/authMiddleware')
const lessonController = require('../controllers/lesson.controller')

router.get(
    '/g/:group_id',
    query('from').isDate().withMessage('Параметр даты указан неверно').toDate(),
    query('to').isDate().withMessage('Параметр даты указан неверно').toDate(),
    lessonController.getLessonsByGroup
)

module.exports = router
