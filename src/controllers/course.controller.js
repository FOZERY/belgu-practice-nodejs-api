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

    async getCourseGroupGrades(req, res, next) {
        try {
            const { id: course_id, groupId: group_id } = req.params
            const { page = 1, limit = 30 } = req.query

            const { lessons, total } =
                await courseService.getCourseGroupLessonsWithGrades(
                    Number(course_id),
                    Number(group_id),
                    page,
                    limit
                )
            return res.json({ lessons, total, page, limit })
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new courseController()
