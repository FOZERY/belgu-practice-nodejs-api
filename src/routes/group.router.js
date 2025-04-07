const Router = require('../../myFramework/Router')
const router = new Router()

const { body, param, query } = require('express-validator')

const authMiddleware = require('../middleware/authMiddleware')
const groupController = require('../controllers/group.controller')

router.get(
    '/',
    [
        query('group_number')
            .optional()
            .isLength({ min: 3 })
            .withMessage(
                'Номер группы должен содержать как минимум 3 символа для поиска'
            ),
    ],
    groupController.getGroups
)

router.get(
    '/:id/students',
    [param('id').toInt()],
    authMiddleware,
    groupController.getStudentsByGroup
)

module.exports = router
