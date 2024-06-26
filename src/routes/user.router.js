const Router = require('../../myFramework/Router')
const router = new Router()

const { body } = require('express-validator')

const userController = require('../controllers/user.controller')

const authMiddleware = require('../middleware/authMiddleware')
const roleMiddleware = require('../middleware/roleMiddleware')

router.get('/', roleMiddleware([1]), userController.getAllUsers)
router.get('/auth', authMiddleware, userController.check)

const registrationValidators = [
    body('email', 'Email пользователя не может быть пустым')
        .notEmpty()
        .trim()
        .isEmail()
        .withMessage('Email указан в неправильном формате'),
    body('password', 'Пароль должен быть больше 4 символов').isLength({
        min: 4,
    }),
    body('first_name')
        .notEmpty()
        .trim()
        .withMessage('Имя не должно быть пустым')
        .isLength({ max: 50 })
        .withMessage('Имя не может быть больше 50 символов')
        .isAlpha('ru-RU')
        .withMessage('Имя должно содержать только буквы русского алфавита'),
    body('second_name')
        .notEmpty()
        .trim()
        .withMessage('Фамилия не должна быть пустым')
        .isLength({ max: 50 })
        .withMessage('Фамилия не может быть больше 50 символов')
        .isAlpha('ru-RU')
        .withMessage('Фамилия должна содержать только буквы русского алфавита'),

    body(
        'third_name',
        'Отчество должно содержать только буквы русского алфавита'
    )
        .optional()
        .trim()
        .isLength({ max: 50 })
        .withMessage('Отчество не может быть больше 50 символов')
        .isAlpha('ru-RU'),
    body(
        'group_id',
        'Идентификатор группы должен быть в числовом неотрицательном виде'
    )
        .optional()
        .trim()
        .isInt({ min: 0, max: 2147483647 }),
    body(
        'department_id',
        'Идентификатор факультета должен быть в числовом неотрицательном виде'
    )
        .optional()
        .trim()
        .isInt({ min: 0, max: 2147483647 }),
    body(
        'position_id',
        'Идентификатор должности должен быть в числовом неотрицательном виде'
    )
        .optional()
        .trim()
        .isInt({ min: 0, max: 2147483647 }),
]
router.post(
    '/registration',
    registrationValidators,
    userController.registration
)
router.post(
    '/login',
    [
        body('email', 'Email пользователя не может быть пустым').notEmpty(),
        body('email', 'Email указан в неправильном формате').isEmail(),
        body('password', 'Не указан пароль').notEmpty(),
    ],
    userController.login
)

module.exports = router
