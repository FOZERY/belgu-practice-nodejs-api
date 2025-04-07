const db = require('../../database/db')

class CourseModel {
    async getCoursesByTeacherId(id) {
        const query =
            'SELECT id, course_name, course_description FROM course AS c LEFT JOIN teacher_course AS tc ON tc.course_id = c.id WHERE tc.teacher_id = $1'
        const { rows } = await db.query(query, [id])
        return rows
    }

    async getCoursesByStudentId(id) {
        const query =
            'SELECT c.id, course_name, course_description FROM course AS c LEFT JOIN student_course AS sc ON sc.course_id = c.id WHERE sc.student_id = $1'
        const { rows } = await db.query(query, [id])
        return rows
    }

    async getCourseFullInfo(id) {
        const query = `SELECT course.id, course_name, course_description,
ARRAY_AGG(DISTINCT jsonb_build_object(
                'group_id', "group".id,
                'group_number', "group".group_number,
                'group_name', "group".group_name
)) AS groups,
ARRAY_AGG(DISTINCT jsonb_build_object(
                'teacher_id', teacher.id,
                'first_name', teacher.first_name,
                'second_name', teacher.second_name,
                'third_name', teacher.third_name,
                'position_id', teacher.position_id,
                'position_name', position.position_name,
                'department_id', teacher.department_id,
                'department_name', department.department_name
)) AS teachers 
         
        FROM course
        INNER JOIN group_course ON group_course.course_id = course.id
        INNER JOIN "group" ON "group".id = group_course.group_id
        INNER JOIN teacher_course ON teacher_course.course_id = course.id 
        INNER JOIN teacher ON teacher.id = teacher_course.teacher_id
        INNER JOIN department ON department.id = teacher.department_id
        INNER JOIN position ON position.id = teacher.position_id
        
        WHERE course.id = $1
        
        GROUP BY course.id, course_name, course_description
        `
        const { rows } = await db.query(query, [id])
        return rows[0]
    }
}

module.exports = new CourseModel()
