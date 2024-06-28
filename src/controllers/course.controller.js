const courseService = require('../services/course.service')

class courseController {
    async getCourseFullInfo(req, res, next) {
        try {
            const courseInfo = await courseService.getCourseFullInfo(
                req.params.id,
                req.userData
            )

            return res.json(courseInfo)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new courseController()
