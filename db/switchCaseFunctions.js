require('console.table');
const db = require('./connection');

module.exports = {
    viewAllDepartments: function() {
        db.query(`SELECT * FROM departments;`, 
        function(err, res) {
            if (err) throw err
            console.table(res);
        });
    },
    viewAllRoles: function() {
        db.query(`SELECT roles.id, 
        roles.title, 
        roles.salary, 
        departments.dept_name AS Department FROM roles
        INNER JOIN departments ON roles.dept_id = departments.id;`, 
        function(err, res) {
            if (err) throw err
            console.table(res);
        });
    },
    viewAllEmployees: function() {
        db.query(`SELECT employees.id, 
        employees.first_name, 
        employees.last_name, 
        roles.title, 
        departments.dept_name AS department,
        roles.salary, 
        CONCAT (manager.first_name, " ", manager.last_name) AS manager
        FROM employees
        LEFT JOIN roles ON employees.role_id = roles.id
        LEFT JOIN departments ON roles.dept_id = departments.id
        LEFT JOIN employees manager ON employees.manager_id = manager.id;`, 
        function(err, res) {
            if (err) throw err
            console.table(res);
        });
    },
    viewEmployeesByDepartment: function() {
        db.query(`SELECT CONCAT(employees.first_name, ' ' ,employees.last_name) AS Employee, 
        departments.dept_name AS Department FROM employees 
        LEFT JOIN roles ON employees.role_id = roles.id 
        LEFT JOIN departments ON roles.dept_id = departments.id;`, 
        function(err, res) {
            if (err) throw err
            console.table(res);
        });
    },
    viewEmployeesByManager: function() {
        db.query(`SELECT employees.id, 
        employees.first_name, 
        employees.last_name, 
        CONCAT(employees.first_name, ' ' ,employees.last_name) AS Manager FROM employees 
        INNER JOIN roles on roles.id = employees.role_id 
        INNER JOIN departments on departments.id = roles.dept_id 
        LEFT JOIN employees e on employees.manager_id = e.id;`, 
        function(err, res) {
            if (err) throw err
            console.table(res);
        }); 
    },
    viewDepartmentBudgetInfo: function() {
        db.query(`SELECT departments.id AS ID, 
        departments.dept_name AS Department, 
        SUM(salary) AS Budget FROM  roles 
        JOIN departments ON roles.dept_id = departments.id 
        GROUP BY departments.id;`, 
        function(err, res) {
            if (err) throw err
            console.table(res);
        });
    }
};