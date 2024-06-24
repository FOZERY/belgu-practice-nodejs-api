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
}

module.exports = new LessonModel()
