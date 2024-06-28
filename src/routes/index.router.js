const Router = require('../../myFramework/Router')
const router = new Router()

const userRouter = require('./user.router')
const teacherRouter = require('./teacher.router')
const courseRouter = require('./course.router')
const studentRouter = require('./student.router')

router.use('/user', userRouter)
router.use('/teacher', teacherRouter)
router.use('/course', courseRouter)
router.use('/student', studentRouter)

module.exports = router
