const Router = require('../../myFramework/Router')
const router = new Router()

const { body } = require('express-validator')

const userController = require('../controllers/user.controller')

const authMiddleware = require('../middleware/authMiddleware')
const roleMiddleware = require('../middleware/roleMiddleware')

router.get('/', roleMiddleware([1]), userController.getAllUsers)
router.post(
    '/registration',
    [
        body('email', 'Email пользователя не может быть пустым').notEmpty(),
        body('email', 'Email указан в неправильном формате').isEmail(),
        body('password', 'Пароль должен быть больше 4 символов').isLength({
            min: 4,
        }),
    ],
    userController.registration
)
router.post('/login', userController.login)
router.get('/auth', authMiddleware, userController.check)

module.exports = router
