const db = require('../../database/db')

class LessonModel {
    async getLessonsByTeacherId(id) {
        const query = `SELECT
lesson.id AS lesson_id,
course.id AS course_id,
course.course_name AS course_name,
teacher.id AS teacher_id,
position.position_name AS teacher_position,
department.department_name AS teacher_department,
teacher.first_name AS teacher_first_name,
teacher.second_name AS teacher_second_name,
teacher.third_name AS teacher_third_name,
classroom.classroom_building,
classroom.classroom_number,
lesson_type.type_name AS lesson_type,
lesson.lesson_date,
lesson.start_time AS lesson_start_time,
lesson.end_time AS lesson_end_time,
ARRAY_AGG(json_build_object(
                'group_id', "group".id,
                'group_number', "group".group_number
)) AS groups

FROM lesson 
LEFT JOIN course ON lesson.course_id = course.id
LEFT JOIN teacher ON lesson.teacher_id = teacher.id
LEFT JOIN position ON teacher.position_id = position.id
LEFT JOIN department ON teacher.department_id = department.id
LEFT JOIN classroom ON lesson.classroom_id = classroom.id
LEFT JOIN lesson_type ON lesson.lesson_type_id = lesson_type.id
LEFT JOIN group_lesson ON lesson.id = group_lesson.lesson_id
LEFT JOIN "group" ON "group".id = group_lesson.group_id
 

WHERE teacher_id = $1

GROUP BY lesson.id, course.id, course.course_name, teacher.id, position.position_name, department.department_name, teacher.first_name, teacher.second_name, teacher.third_name, classroom.classroom_building, classroom.classroom_number, lesson_type.type_name, lesson.lesson_date, lesson.start_time, lesson.end_time
`

        const { rows } = await db.query(query, [id])
        return rows
    }

    async getLessonsWithGradesByCourseAndGroup(
        course_id,
        group_id,
        page = 1,
        limit = 30
    ) {
        const offset = (page - 1) * limit

        const query = `SELECT lesson.id AS lesson_id, lesson_date, 
ARRAY_AGG(json_build_object(
                'student_id', student.id,
                'first_name', student.first_name,
                'second_name', student.second_name,
                'third_name', student.third_name, 
                'grade', grade_type.grade,
                'grade_comment', grade.grade_comment 
)) AS students


FROM lesson
LEFT JOIN grade ON grade.lesson_id = lesson.id
LEFT JOIN grade_type ON grade_type.id = grade.grade_type_id
LEFT JOIN group_lesson ON group_lesson.lesson_id = lesson.id
LEFT JOIN student ON grade.student_id = student.id

WHERE lesson.course_id = $1 AND group_lesson.group_id = $2

GROUP BY lesson.id, lesson_date
ORDER BY lesson_date

LIMIT $3 OFFSET $4 
`

        const countQuery = `
        SELECT COUNT(DISTINCT lesson.id) AS total
        FROM lesson
        LEFT JOIN group_lesson ON group_lesson.lesson_id = lesson.id
        WHERE lesson.course_id = $1 AND group_lesson.group_id = $2`

        const [rowsResult, countResult] = await Promise.all([
            db.query(query, [course_id, group_id, limit, offset]),
            db.query(countQuery, [course_id, group_id]),
        ])

        const lessons = rowsResult.rows
        const { total } = countResult.rows[0]
        return { lessons, total }
    }
}

module.exports = new LessonModel()
