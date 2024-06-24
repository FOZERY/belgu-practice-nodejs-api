BEGIN;

CREATE TABLE student(
    id SERIAL PRIMARY KEY,
    group_id INT NOT NULL,
    user_id INT NOT NULL UNIQUE,
    first_name VARCHAR(50) NOT NULL,
    second_name VARCHAR(50) NOT NULL,
    third_name VARCHAR(50)
);

CREATE TABLE "group"(
    id SERIAL PRIMARY KEY,
    department_id INT NOT NULL,
    group_number VARCHAR(20) NOT NULL,
    group_name VARCHAR(100) NOT NULL
);

CREATE TABLE group_lesson(
    group_id INT,
    lesson_id INT,
    PRIMARY KEY(group_id, lesson_id)
);

CREATE TABLE teacher(
   id SERIAL PRIMARY KEY,
   department_id INT NOT NULL,
   position_id INT NOT NULL,
   user_id INT NOT NULL UNIQUE,
   first_name VARCHAR(50) NOT NULL,
   second_name VARCHAR(50) NOT NULL,
   third_name VARCHAR(50)
);

CREATE TABLE department(
    id SERIAL PRIMARY KEY,
    department_name VARCHAR(100) NOT NULL
);

CREATE TABLE position(
   id SERIAL PRIMARY KEY,
   position_name VARCHAR(100) NOT NULL
);

CREATE TABLE course(
   id SERIAL PRIMARY KEY,
   course_name VARCHAR(80) NOT NULL,
   course_description VARCHAR(255)
);

CREATE TABLE student_course(
    id SERIAL PRIMARY KEY,
    course_id INT NOT NULL,
    student_id INT NOT NULL,
    UNIQUE(course_id, student_id)
);

CREATE TABLE grade(
    id SERIAL PRIMARY KEY,
    student_course_id INT NOT NULL,
    lesson_id INT NOT NULL,
    grade INT,
    grade_comment VARCHAR(255)
);

CREATE TABLE lesson(
    id SERIAL PRIMARY KEY,
    course_id INT NOT NULL,
    teacher_id INT NOT NULL,
    classroom_id INT,
    lesson_type_id INT NOT NULL,
    lesson_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL
);

CREATE TABLE lesson_type(
    id SERIAL PRIMARY KEY,
    type_name VARCHAR(70) NOT NULL
);

CREATE TABLE classroom(
    id SERIAL PRIMARY KEY,
    classroom_building VARCHAR(255) NOT NULL,
    classroom_number VARCHAR(5) NOT NULL
);

CREATE TABLE attendance(
    id SERIAL PRIMARY KEY,
    student_id INT NOT NULL,
    lesson_id INT NOT NULL,
    attendance_status_id INT NOT NULL
);

CREATE TABLE attendance_status(
    id SERIAL PRIMARY KEY,
    attendance_status VARCHAR(255) NOT NULL
);

CREATE TABLE teacher_course(
    teacher_id INT,
    course_id INT,
    PRIMARY KEY(teacher_id, course_id)
);

CREATE TABLE "user"(
    id SERIAL PRIMARY KEY,
    user_role_id INT NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE user_role(
    id SERIAL PRIMARY KEY,
    role_name VARCHAR(30) NOT NULL
);

CREATE TABLE group_course(
    group_id  INT,
    course_id INT,
    PRIMARY KEY(group_id, course_id)
);

ALTER TABLE group_course ADD CONSTRAINT fk_group_course_group FOREIGN KEY (group_id) REFERENCES "group"(id);
ALTER TABLE group_course ADD CONSTRAINT fk_group_course_course FOREIGN KEY (course_id) REFERENCES course(id);



ALTER TABLE "user" ADD CONSTRAINT fk_user_userRole FOREIGN KEY (user_role_id) REFERENCES user_role(id);

ALTER TABLE teacher_course ADD CONSTRAINT fk_teacher_course_teacher FOREIGN KEY (teacher_id) REFERENCES teacher(id);
ALTER TABLE teacher_course ADD CONSTRAINT fk_teacher_course_course FOREIGN KEY (course_id) REFERENCES course(id);

ALTER TABLE student ADD CONSTRAINT fk_student_group FOREIGN KEY (group_id) REFERENCES "group"(id);
ALTER TABLE student ADD CONSTRAINT fk_student_user FOREIGN KEY (user_id) REFERENCES "user"(id);

ALTER TABLE "group" ADD CONSTRAINT fk_group_department FOREIGN KEY (department_id) REFERENCES department(id);

ALTER TABLE group_lesson ADD CONSTRAINT fk_group_lesson_group FOREIGN KEY (group_id) REFERENCES "group"(id);
ALTER TABLE group_lesson ADD CONSTRAINT fk_group_lesson_lesson FOREIGN KEY (lesson_id) REFERENCES lesson(id);

ALTER TABLE teacher ADD CONSTRAINT fk_teacher_department FOREIGN KEY (department_id) REFERENCES department(id);
ALTER TABLE teacher ADD CONSTRAINT fk_teacher_position FOREIGN KEY (position_id) REFERENCES position(id);
ALTER TABLE teacher ADD CONSTRAINT fk_teacher_user FOREIGN KEY (user_id) REFERENCES "user"(id);

ALTER TABLE student_course ADD CONSTRAINT fk_student_course_course FOREIGN KEY (course_id) REFERENCES course(id);
ALTER TABLE student_course ADD CONSTRAINT fk_student_course_student FOREIGN KEY (student_id) REFERENCES student(id);

ALTER TABLE grade ADD CONSTRAINT fk_grade_student_course FOREIGN KEY (student_course_id) REFERENCES student_course(id);
ALTER TABLE grade ADD CONSTRAINT fk_grade_lesson FOREIGN KEY (lesson_id) REFERENCES lesson(id);

ALTER TABLE lesson ADD CONSTRAINT fk_lesson_course FOREIGN KEY (course_id) REFERENCES course(id);
ALTER TABLE lesson ADD CONSTRAINT fk_lesson_teacher FOREIGN KEY (teacher_id) REFERENCES teacher(id);
ALTER TABLE lesson ADD CONSTRAINT fk_lesson_classroom FOREIGN KEY (classroom_id) REFERENCES classroom(id);
ALTER TABLE lesson ADD CONSTRAINT fk_lesson_lesson_type FOREIGN KEY (lesson_type_id) REFERENCES lesson_type(id);

ALTER TABLE attendance ADD CONSTRAINT fk_attendance_student FOREIGN KEY (student_id) REFERENCES student(id);
ALTER TABLE attendance ADD CONSTRAINT fk_attendance_lesson FOREIGN KEY (lesson_id) REFERENCES lesson(id);
ALTER TABLE attendance ADD CONSTRAINT fk_attendance_attendance_status FOREIGN KEY (attendance_status_id) REFERENCES attendance_status(id);

CREATE INDEX idx_lesson_teacher ON lesson(teacher_id);
CREATE INDEX idx_lesson_course ON lesson(course_id);
CREATE INDEX idx_lesson_lessonType ON lesson(lesson_type_id);
CREATE INDEX idx_lesson_classroom ON lesson(classroom_id);

CREATE INDEX idx_student_course_course ON student_course(course_id);
CREATE INDEX idx_student_course_student ON student_course(student_id);

CREATE INDEX idx_teacher_department ON teacher(department_id);
CREATE INDEX idx_teacher_secondName ON teacher(second_name);
CREATE INDEX idx_teacher_userId ON teacher(user_id);
CREATE INDEX idx_teacher_position ON teacher(position_id);


CREATE INDEX idx_group_group_number ON "group"(group_number);
CREATE INDEX idx_group_departmentId ON "group"(department_id);

CREATE INDEX idx_user_userRoleId ON "user"(user_role_id);

CREATE INDEX idx_student_secondName ON student(second_name);
CREATE INDEX idx_student_groupId ON student(group_id);
CREATE INDEX idx_student_userId ON student(user_id);

CREATE INDEX idx_course_courseName ON course(course_name);

CREATE INDEX idx_grade_studentCourseId ON grade(student_course_id);
CREATE INDEX idx_grade_lesson ON grade(lesson_id);

CREATE INDEX idx_attendance_studentId ON attendance(student_id);
CREATE INDEX idx_attendance_lessonId ON attendance(lesson_id);
CREATE INDEX idx_attendance_attendanceStatusId ON attendance(attendance_status_id);

COMMIT;
