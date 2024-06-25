BEGIN;

-- Delete data from all tables in reverse order of dependencies

-- Delete from attendance
DELETE FROM attendance;

-- Delete from grade
DELETE FROM grade;

-- Delete from attendance_status
DELETE FROM attendance_status;

-- Delete from teacher_course
DELETE FROM teacher_course;

-- Delete from lesson
DELETE FROM lesson;

-- Delete from lesson_type
DELETE FROM lesson_type;

-- Delete from classroom
DELETE FROM classroom;

-- Delete from student_course
DELETE FROM student_course;

DELETE FROM group_course;

-- Delete from course
DELETE FROM course;

-- Delete from student
DELETE FROM student;

-- Delete from "group"
DELETE FROM "group";

-- Delete from teacher
DELETE FROM teacher;

-- Delete from department
DELETE FROM department;

-- Delete from position
DELETE FROM position;

-- Delete from "user"
DELETE FROM "user";

-- Delete from user_role
DELETE FROM user_role;

-- Reset sequences to ensure IDs start from 1 again
DO $$ DECLARE
    seq RECORD;
BEGIN 
    FOR seq IN 
        SELECT sequence_name 
        FROM information_schema.sequences
        WHERE sequence_schema = 'public'
    LOOP
        EXECUTE format('ALTER SEQUENCE %I RESTART WITH 1', seq.sequence_name);
    END LOOP;
END $$;

COMMIT;
