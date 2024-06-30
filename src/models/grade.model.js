const db = require('../../database/db')

class GradeModel {
    async getGradesByCourseAndGroup(course_id, group_id, page = 1, limit = 30) {
        const offset = (page - 1) * limit
        const query = `SELECT lesson.id AS lesson_id, lesson_date, 
ARRAY_AGG(json_build_object(
                'student_id', student.id,
                'first_name', student.first_name,
                'second_name', student.second_name,
                'third_name', student.third_name,
                'grade', grade.grade,
                'grade_comment', grade.grade_comment 
)) AS students


FROM lesson
LEFT JOIN grade ON grade.lesson_id = lesson.id
LEFT JOIN group_lesson ON group_lesson.lesson_id = lesson.id
LEFT JOIN student_course ON grade.student_course_id = student_course.id
LEFT JOIN student ON student_course.student_id = student.id

WHERE lesson.course_id = $1 AND group_lesson.group_id = $2

GROUP BY lesson.id, lesson_date
ORDER BY lesson_date

LIMIT $3 OFFSET $4 
`
        const { rows } = await db.query(query, [
            course_id,
            group_id,
            limit,
            offset,
        ])
        return rows
    }
}

module.exports = new GradeModel()
