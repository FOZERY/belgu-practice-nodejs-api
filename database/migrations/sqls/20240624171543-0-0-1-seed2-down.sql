/* Replace with your SQL commands */
BEGIN;

DELETE FROM group_lesson WHERE group_id = 2 AND lesson_id = 1;
DELETE FROM group_lesson WHERE group_id = 3 AND lesson_id = 1;

COMMIT;