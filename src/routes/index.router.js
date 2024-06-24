const Router = require('../../myFramework/Router')
const router = new Router()

const userRouter = require('./user.router')
const teacherRouter = require('./teacher.router')

router.use('/user', userRouter)
router.use('/teacher', teacherRouter)

module.exports = router
