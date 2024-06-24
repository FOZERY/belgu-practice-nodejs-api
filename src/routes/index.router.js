const Router = require('../../myFramework/Router')
const router = new Router()

const userRouter = require('./user.router')
const teacherRouter = require('./teacher.router')
const courseRouter = require('./course.router')

router.use('/user', userRouter)
router.use('/teacher', teacherRouter)
router.use('/course', courseRouter)

module.exports = router
