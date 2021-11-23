INSERT INTO departments
    (dept_name)
VALUES
    ('legal'),
    ('bus ops'),
    ('marketing');
INSERT INTO roles
    (title, salary, dept_id)
VALUES
    ('attorney', 99999, 1),
    ('paralegal', 90000, 1),
    ('manager', 80000, 2),
    ('sales rep', 70000, 2),
    ('marketing lead', 60000, 3),
    ('marketing rep', 50000, 3);
INSERT INTO employees
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Jane', 'Doe', 1, NULL),
    ('Bob', 'Ross', 2, 1),
    ('Dolly', 'Parton', 3, NULL),
    ('Kevin', 'Hart', 4, 3),
    ('Rosa', 'Parks', 5, NULL),
    ('John', 'Kennedy', 6, 5);