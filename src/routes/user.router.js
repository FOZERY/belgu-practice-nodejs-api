const Router = require('../../myFramework/Router')
const router = new Router()

const { body, param } = require('express-validator')

const userController = require('../controllers/user.controller')

const authMiddleware = require('../middleware/authMiddleware')
const roleMiddleware = require('../middleware/roleMiddleware')

const registrationValidators = [
    body('email', 'Email пользователя не может быть пустым')
        .notEmpty()
        .trim()
        .isEmail()
        .withMessage('Email указан в неправильном формате'),
    body('password', 'Пароль должен быть больше 4 символов').isLength({
        min: 4,
    }),
    body('user_role_id')
        .optional()
        .trim()
        .isInt({ min: 1, max: 3 })
        .withMessage('Id роли должен быть в числовом диапазоне от 1 до 3')
        .toInt(),
    body('first_name')
        .optional()
        .trim()
        .isLength({ max: 50 })
        .withMessage('Имя не может быть больше 50 символов')
        .isAlpha('ru-RU')
        .withMessage('Имя должно содержать только буквы русского алфавита'),
    body('second_name')
        .optional()
        .trim()
        .isLength({ max: 50 })
        .withMessage('Фамилия не может быть больше 50 символов')
        .isAlpha('ru-RU')
        .withMessage('Фамилия должна содержать только буквы русского алфавита'),
    body('third_name')
        .optional()
        .trim()
        .isLength({ max: 50 })
        .withMessage('Отчество не может быть больше 50 символов')
        .isAlpha('ru-RU')
        .withMessage(
            'Отчество должно содержать только буквы русского алфавита'
        ),
    body(
        'group_id',
        'Идентификатор группы должен быть в числовом неотрицательном виде'
    )
        .optional()
        .trim()
        .isInt({ min: 0, max: 2147483647 })
        .toInt(),
    body(
        'department_id',
        'Идентификатор факультета должен быть в числовом неотрицательном виде'
    )
        .optional()
        .trim()
        .isInt({ min: 0, max: 2147483647 })
        .toInt(),
    body(
        'position_id',
        'Идентификатор должности должен быть в числовом неотрицательном виде'
    )
        .optional()
        .trim()
        .isInt({ min: 0, max: 2147483647 })
        .toInt(),
]
const loginValidators = [
    body('email')
        .notEmpty()
        .withMessage('Email пользователя не может быть пустым')
        .isEmail()
        .withMessage('Email указан в неправильно формате'),

    body('password', 'Не указан пароль').notEmpty(),
]
const getUserValidators = [
    param('id')
        .trim()
        .isInt()
        .withMessage('Параметр id должен быть числового типа.')
        .toInt(),
]

router.get('/', roleMiddleware([1]), userController.getAllUsers)
router.get('/auth', authMiddleware, userController.check)
router.get('/info', authMiddleware, userController.getUserFullInfo)

router.get(
    '/:id',
    getUserValidators,
    roleMiddleware([1]),
    userController.getOneUser
)

router.post(
    '/registration',
    roleMiddleware([1]),
    registrationValidators,
    userController.registration
)

router.post('/login', loginValidators, userController.login)

module.exports = router
