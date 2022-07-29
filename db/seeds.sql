INSERT INTO department (id, name)
VALUES (1, 'Human Resources'),
       (2, 'Engineering'),
       (3, 'Accounting and Finance'),
       (4, 'Marketing'),
       (5, 'Research and Development'),
       (6, 'Sales'),
       (7, 'Legal');

INSERT INTO role (id, title, salary, department_id)
VALUES (8, 'HR Specialist', 58350.00, 1),
       (9, 'HR Manager', 98520.00, 1),
       (10, 'Lead Software Engineer', 133761.00, 2),
       (11, 'Software Engineer', 108205.00, 2),
       (12, 'Junior Software Engineer', 59974.00, 2),
       (13, 'Account Manager', 90000.00, 3),
       (14, 'Accountant', 73560.00, 3),
       (15, 'Marketing Manager', 142170.00, 4),
       (16, 'Marketing Specialist', 62600.00, 4),
       (17, 'Research Scientist', 78000.00, 5),
       (18, 'Sales Manager', 64430.00, 6),
       (19, 'Sales Specialist', 50000.00, 6),
       (20, 'Business Lawyer', 116228.00, 7);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (21, 'John', 'Doe', 10, NULL),
       (22, 'John', 'Smite', 11, 21);