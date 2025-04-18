BEGIN;

-- Drop indexes
DROP INDEX IF EXISTS idx_lesson_teacher;
DROP INDEX IF EXISTS idx_lesson_course;
DROP INDEX IF EXISTS idx_lesson_lessonType;
DROP INDEX IF EXISTS idx_lesson_classroom;

DROP INDEX IF EXISTS idx_student_course_course;
DROP INDEX IF EXISTS idx_student_course_student;

DROP INDEX IF EXISTS idx_teacher_department;
DROP INDEX IF EXISTS idx_teacher_secondName;
DROP INDEX IF EXISTS idx_teacher_userId;
DROP INDEX IF EXISTS idx_teacher_position;

DROP INDEX IF EXISTS idx_group_group_number;
DROP INDEX IF EXISTS idx_group_departmentId;

DROP INDEX IF EXISTS idx_user_userRoleId;

DROP INDEX IF EXISTS idx_student_secondName;
DROP INDEX IF EXISTS idx_student_groupId;
DROP INDEX IF EXISTS idx_student_userId;

DROP INDEX IF EXISTS idx_course_courseName;

DROP INDEX IF EXISTS idx_grade_studentCourseId;
DROP INDEX IF EXISTS idx_grade_lesson;

DROP INDEX IF EXISTS idx_attendance_studentId;
DROP INDEX IF EXISTS idx_attendance_lessonId;
DROP INDEX IF EXISTS idx_attendance_attendanceStatusId;

-- Drop foreign key constraints
ALTER TABLE group_course DROP CONSTRAINT IF EXISTS fk_group_course_group;
ALTER TABLE group_course DROP CONSTRAINT IF EXISTS fk_group_course_course;

ALTER TABLE "user" DROP CONSTRAINT IF EXISTS fk_user_userRole;

ALTER TABLE teacher_course DROP CONSTRAINT IF EXISTS fk_teacher_course_teacher;
ALTER TABLE teacher_course DROP CONSTRAINT IF EXISTS fk_teacher_course_course;

ALTER TABLE student DROP CONSTRAINT IF EXISTS fk_student_group;
ALTER TABLE student DROP CONSTRAINT IF EXISTS fk_student_user;

ALTER TABLE "group" DROP CONSTRAINT IF EXISTS fk_group_department;

ALTER TABLE group_lesson DROP CONSTRAINT IF EXISTS fk_group_lesson_group;
ALTER TABLE group_lesson DROP CONSTRAINT IF EXISTS fk_group_lesson_lesson;

ALTER TABLE teacher DROP CONSTRAINT IF EXISTS fk_teacher_department;
ALTER TABLE teacher DROP CONSTRAINT IF EXISTS fk_teacher_position;
ALTER TABLE teacher DROP CONSTRAINT IF EXISTS fk_teacher_user;

ALTER TABLE student_course DROP CONSTRAINT IF EXISTS fk_student_course_course;
ALTER TABLE student_course DROP CONSTRAINT IF EXISTS fk_student_course_student;

ALTER TABLE grade DROP CONSTRAINT IF EXISTS fk_grade_student_course;
ALTER TABLE grade DROP CONSTRAINT IF EXISTS fk_grade_lesson;

ALTER TABLE lesson DROP CONSTRAINT IF EXISTS fk_lesson_course;
ALTER TABLE lesson DROP CONSTRAINT IF EXISTS fk_lesson_teacher;
ALTER TABLE lesson DROP CONSTRAINT IF EXISTS fk_lesson_classroom;
ALTER TABLE lesson DROP CONSTRAINT IF EXISTS fk_lesson_lesson_type;

ALTER TABLE attendance DROP CONSTRAINT IF EXISTS fk_attendance_student;
ALTER TABLE attendance DROP CONSTRAINT IF EXISTS fk_attendance_lesson;
ALTER TABLE attendance DROP CONSTRAINT IF EXISTS fk_attendance_attendance_status;

-- Drop tables
DROP TABLE IF EXISTS student;
DROP TABLE IF EXISTS "group";
DROP TABLE IF EXISTS group_lesson;
DROP TABLE IF EXISTS teacher;
DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS position;
DROP TABLE IF EXISTS course;
DROP TABLE IF EXISTS student_course;
DROP TABLE IF EXISTS grade;
DROP TABLE IF EXISTS lesson;
DROP TABLE IF EXISTS lesson_type;
DROP TABLE IF EXISTS classroom;
DROP TABLE IF EXISTS attendance;
DROP TABLE IF EXISTS attendance_status;
DROP TABLE IF EXISTS teacher_course;
DROP TABLE IF EXISTS "user";
DROP TABLE IF EXISTS user_role;
DROP TABLE IF EXISTS group_course;

COMMIT;
