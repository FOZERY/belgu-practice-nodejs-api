const Router = require('../../myFramework/Router')
const router = new Router()

const { body, param } = require('express-validator')

const gradeController = require('../controllers/grade.controller')

const authMiddleware = require('../middleware/authMiddleware')

router.post('/', gradeController.addGrade)

module.exports = router
