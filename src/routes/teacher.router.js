const Router = require('../../myFramework/Router')
const router = new Router()

const teacherController = require('../controllers/teacher.controller')

router.get('/', teacherController.getAll)
router.get('/:id/courses', teacherController.getTeacherCourses)
router.get('/:id/lessons', teacherController.getTeacherLessons)

module.exports = router
