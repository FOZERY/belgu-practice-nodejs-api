BEGIN;

-- Insert user roles
INSERT INTO user_role (id, role_name) VALUES
(1, 'admin'),
(2, 'teacher'),
(3, 'student');

-- Insert users
INSERT INTO "user" (id, user_role_id, email, password) VALUES
-- 5 Admins
(1, 1, 'admin1@example.com', 'password1'),
(2, 1, 'admin2@example.com', 'password2'),
(3, 1, 'admin3@example.com', 'password3'),
(4, 1, 'admin4@example.com', 'password4'),
(5, 1, 'admin5@example.com', 'password5'),
-- 10 Teachers
(6, 2, 'teacher1@example.com', 'password6'),
(7, 2, 'teacher2@example.com', 'password7'),
(8, 2, 'teacher3@example.com', 'password8'),
(9, 2, 'teacher4@example.com', 'password9'),
(10, 2, 'teacher5@example.com', 'password10'),
(11, 2, 'teacher6@example.com', 'password11'),
(12, 2, 'teacher7@example.com', 'password12'),
(13, 2, 'teacher8@example.com', 'password13'),
(14, 2, 'teacher9@example.com', 'password14'),
(15, 2, 'teacher10@example.com', 'password15'),
-- 10 Students
(16, 3, 'student1@example.com', 'password16'),
(17, 3, 'student2@example.com', 'password17'),
(18, 3, 'student3@example.com', 'password18'),
(19, 3, 'student4@example.com', 'password19'),
(20, 3, 'student5@example.com', 'password20'),
(21, 3, 'student6@example.com', 'password21'),
(22, 3, 'student7@example.com', 'password22'),
(23, 3, 'student8@example.com', 'password23'),
(24, 3, 'student9@example.com', 'password24'),
(25, 3, 'student10@example.com', 'password25');

-- Insert departments
INSERT INTO department (id, department_name) VALUES
(1, 'Computer Science'),
(2, 'Mathematics'),
(3, 'Physics'),
(4, 'Chemistry'),
(5, 'Biology'),
(6, 'History'),
(7, 'Geography'),
(8, 'English'),
(9, 'Philosophy'),
(10, 'Economics');

-- Insert positions
INSERT INTO position (id, position_name) VALUES
(1, 'Professor'),
(2, 'Associate Professor'),
(3, 'Assistant Professor'),
(4, 'Lecturer'),
(5, 'Senior Lecturer'),
(6, 'Researcher'),
(7, 'Postdoctoral Fellow'),
(8, 'Instructor'),
(9, 'Adjunct Professor'),
(10, 'Visiting Professor');

-- Insert teachers
INSERT INTO teacher (id, department_id, position_id, user_id, first_name, second_name, third_name) VALUES
(1, 1, 1, 6, 'John', 'Doe', 'M'),
(2, 1, 2, 7, 'Jane', 'Smith', 'A'),
(3, 2, 3, 8, 'Alice', 'Johnson', 'B'),
(4, 2, 4, 9, 'Bob', 'Brown', 'C'),
(5, 3, 5, 10, 'Charlie', 'Davis', 'D'),
(6, 3, 6, 11, 'Dave', 'Wilson', 'E'),
(7, 4, 7, 12, 'Eve', 'Miller', 'F'),
(8, 4, 8, 13, 'Frank', 'Moore', 'G'),
(9, 5, 9, 14, 'Grace', 'Taylor', 'H'),
(10, 5, 10, 15, 'Hank', 'Anderson', 'I');

-- Insert groups
INSERT INTO "group" (id, department_id, group_number, group_name) VALUES
(1, 1, 'CS101', 'Computer Science Group 101'),
(2, 2, 'MATH201', 'Mathematics Group 201'),
(3, 3, 'PHY301', 'Physics Group 301'),
(4, 4, 'CHEM401', 'Chemistry Group 401'),
(5, 5, 'BIO501', 'Biology Group 501'),
(6, 6, 'HIST601', 'History Group 601'),
(7, 7, 'GEO701', 'Geography Group 701'),
(8, 8, 'ENG801', 'English Group 801'),
(9, 9, 'PHIL901', 'Philosophy Group 901'),
(10, 10, 'ECO1001', 'Economics Group 1001');

-- Insert students
INSERT INTO student (id, group_id, user_id, first_name, second_name, third_name) VALUES
(1, 1, 16, 'Tom', 'Thompson', 'J'),
(2, 2, 17, 'Jerry', 'Gomez', 'K'),
(3, 3, 18, 'Anna', 'Williams', 'L'),
(4, 4, 19, 'Mike', 'Taylor', 'M'),
(5, 5, 20, 'Sarah', 'Martinez', 'N'),
(6, 6, 21, 'David', 'Rodriguez', 'O'),
(7, 7, 22, 'Emma', 'Garcia', 'P'),
(8, 8, 23, 'Lucas', 'Hernandez', 'Q'),
(9, 9, 24, 'Olivia', 'Lopez', 'R'),
(10, 10, 25, 'Sophia', 'Gonzalez', 'S');

-- Insert courses
INSERT INTO course (id, course_name, course_description) VALUES
(1, 'Introduction to Computer Science', 'Basic concepts of computer science'),
(2, 'Advanced Mathematics', 'In-depth study of mathematical concepts'),
(3, 'Physics for Engineers', 'Physics principles for engineering students'),
(4, 'Organic Chemistry', 'Study of organic compounds and reactions'),
(5, 'Molecular Biology', 'Biology at a molecular level'),
(6, 'World History', 'Historical events and their impact on the world'),
(7, 'Geography and Environment', 'Study of geographical features and environmental issues'),
(8, 'English Literature', 'Analysis of classic and modern English literature'),
(9, 'Philosophical Thoughts', 'Major philosophical ideas and thinkers'),
(10, 'Economic Theory', 'Principles of economics and their applications');

-- Insert group courses
INSERT INTO group_course (group_id, course_id) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5),
(6, 6),
(7, 7),
(8, 8),
(9, 9),
(10, 10);

-- Insert student courses
INSERT INTO student_course (id, course_id, student_id) VALUES
(1, 1, 1),
(2, 2, 2),
(3, 3, 3),
(4, 4, 4),
(5, 5, 5),
(6, 6, 6),
(7, 7, 7),
(8, 8, 8),
(9, 9, 9),
(10, 10, 10);

-- Insert classrooms
INSERT INTO classroom (id, classroom_building, classroom_number) VALUES
(1, 'Building A', '101'),
(2, 'Building B', '102'),
(3, 'Building C', '103'),
(4, 'Building D', '104'),
(5, 'Building E', '105'),
(6, 'Building F', '106'),
(7, 'Building G', '107'),
(8, 'Building H', '108'),
(9, 'Building I', '109'),
(10, 'Building J', '110');

-- Insert lesson types
INSERT INTO lesson_type (id, type_name) VALUES
(1, 'Lecture'),
(2, 'Seminar'),
(3, 'Laboratory'),
(4, 'Workshop'),
(5, 'Tutorial'),
(6, 'Discussion'),
(7, 'Field Trip'),
(8, 'Practical'),
(9, 'Studio'),
(10, 'Exam');

-- Insert lessons
INSERT INTO lesson (id, course_id, teacher_id, classroom_id, lesson_type_id, lesson_date, start_time, end_time) VALUES
(1, 1, 1, 1, 1, '2024-06-01', '09:00', '10:30'),
(2, 2, 2, 2, 2, '2024-06-02', '10:00', '11:30'),
(3, 3, 3, 3, 3, '2024-06-03', '11:00', '12:30'),
(4, 4, 4, 4, 4, '2024-06-04', '12:00', '13:30'),
(5, 5, 5, 5, 5, '2024-06-05', '13:00', '14:30'),
(6, 6, 6, 6, 6, '2024-06-06', '14:00', '15:30'),
(7, 7, 7, 7, 7, '2024-06-07', '15:00', '16:30'),
(8, 8, 8, 8, 8, '2024-06-08', '16:00', '17:30'),
(9, 9, 9, 9, 9, '2024-06-09', '17:00', '18:30'),
(10, 10, 10, 10, 10, '2024-06-10', '18:00', '19:30');

-- Insert attendance statuses
INSERT INTO attendance_status (id, attendance_status) VALUES
(1, 'Present'),
(2, 'Absent'),
(3, 'Late'),
(4, 'Excused'),
(5, 'Unexcused');

-- Insert attendance
INSERT INTO attendance (id, student_id, lesson_id, attendance_status_id) VALUES
(1, 1, 1, 1),
(2, 2, 2, 1),
(3, 3, 3, 1),
(4, 4, 4, 1),
(5, 5, 5, 1),
(6, 6, 6, 1),
(7, 7, 7, 1),
(8, 8, 8, 1),
(9, 9, 9, 1),
(10, 10, 10, 1);

-- Insert teacher courses
INSERT INTO teacher_course (teacher_id, course_id) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5),
(6, 6),
(7, 7),
(8, 8),
(9, 9),
(10, 10);

-- Insert grades
INSERT INTO grade (id, student_course_id, lesson_id, grade, grade_comment) VALUES
(1, 1, 1, 90, 'Good job'),
(2, 2, 2, 85, 'Well done'),
(3, 3, 3, 88, 'Nice work'),
(4, 4, 4, 92, 'Excellent'),
(5, 5, 5, 87, 'Keep it up'),
(6, 6, 6, 91, 'Very good'),
(7, 7, 7, 89, 'Great effort'),
(8, 8, 8, 93, 'Outstanding'),
(9, 9, 9, 86, 'Good understanding'),
(10, 10, 10, 94, 'Exceptional');

COMMIT;
