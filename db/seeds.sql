INSERT INTO departments
    (dept_name)
VALUES
    ('Legal'),
    ('Bus Ops'),
    ('Marketing');
INSERT INTO roles
    (title, salary, dept_id)
VALUES
    ('Attorney', 99999, 1),
    ('Paralegal', 90000, 1),
    ('Manager', 80000, 2),
    ('Sales Rep', 70000, 2),
    ('Marketing Lead', 60000, 3),
    ('Marketing Rep', 50000, 3);
INSERT INTO employees
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Jane', 'Doe', 1, NULL),
    ('Bob', 'Ross', 2, 1),
    ('Dolly', 'Parton', 3, NULL),
    ('Kevin', 'Hart', 4, 3),
    ('Rosa', 'Parks', 5, NULL),
    ('John', 'Kennedy', 6, 5);