BEGIN;

-- Disable all foreign key constraints
ALTER TABLE student_course DISABLE TRIGGER ALL;
ALTER TABLE group_lesson DISABLE TRIGGER ALL;
ALTER TABLE teacher_course DISABLE TRIGGER ALL;
ALTER TABLE grade DISABLE TRIGGER ALL;
ALTER TABLE attendance DISABLE TRIGGER ALL;

-- Truncate the tables
TRUNCATE TABLE student CASCADE;
TRUNCATE TABLE "group" CASCADE;
TRUNCATE TABLE group_lesson CASCADE;
TRUNCATE TABLE teacher CASCADE;
TRUNCATE TABLE department CASCADE;
TRUNCATE TABLE position CASCADE;
TRUNCATE TABLE course CASCADE;
TRUNCATE TABLE student_course CASCADE;
TRUNCATE TABLE grade CASCADE;
TRUNCATE TABLE lesson CASCADE;
TRUNCATE TABLE lesson_type CASCADE;
TRUNCATE TABLE classroom CASCADE;
TRUNCATE TABLE attendance CASCADE;
TRUNCATE TABLE attendance_status CASCADE;
TRUNCATE TABLE teacher_course CASCADE;
TRUNCATE TABLE "user" CASCADE;
TRUNCATE TABLE user_role CASCADE;

-- Re-enable all foreign key constraints
ALTER TABLE student_course ENABLE TRIGGER ALL;
ALTER TABLE group_lesson ENABLE TRIGGER ALL;
ALTER TABLE teacher_course ENABLE TRIGGER ALL;
ALTER TABLE grade ENABLE TRIGGER ALL;
ALTER TABLE attendance ENABLE TRIGGER ALL;

COMMIT;