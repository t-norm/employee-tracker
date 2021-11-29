const inquirer = require('inquirer');
const db = require('./db/connection');
const caseFunction = require('./db/switchCaseFunctions');
const {deptArrFill, roleArrFill, employeeArrFill, managerArrFill} = require('./utils/populateArray');

let deptArr = deptArrFill();
let roleArr = roleArrFill();
let managerArr = managerArrFill();
let employeeArr = employeeArrFill();

const promptUser = async () => {
    inquirer.prompt([
        {
            type: "list",
            name: "viewOrUpdate",
            message: "What information would you like to view or update?",
            choices: [
                "View all departments",
                "View all roles",
                "View all employees",
                "View employees by department",
                "View employees by manager",
                "View department budget info",
                "Add a new department",
                "Add a new role",
                "Add a new employee",
                "Update an employee's role",
                "Delete a department",
                "Delete a role",
                "Delete an employee",
                "Quit"
            ]
        }
    ]).then(userInput => {
        switch (userInput.viewOrUpdate) {
            case "View all departments":
                caseFunction.viewAllDepartments();
                setTimeout(()=>{promptUser(),666});
                break;

            case "View all roles":
                caseFunction.viewAllRoles();
                setTimeout(()=>{promptUser(),666});
                break;

            case "View all employees":
                caseFunction.viewAllEmployees();
                setTimeout(()=>{promptUser(),666});
                break;

            case "View employees by department":
                caseFunction.viewEmployeesByDepartment();
                setTimeout(()=>{promptUser(),666});
                break;

            case "View employees by manager":
                caseFunction.viewEmployeesByManager();
                setTimeout(()=>{promptUser(),666});
                break;

            case "View department budget info":
                caseFunction.viewDepartmentBudgetInfo();
                setTimeout(()=>{promptUser(),666});
                break;

            case "Add a new department":
                addNewDepartment();
                break;

            case "Add a new role":
                addNewRole();
                break;

            case "Add a new employee":
                addNewEmployee();
                break;

            case "Update an employee's role":
                updateEmployeeRole();
                break;

            case "Delete a department":
                deleteDepartment();
                break;

            case "Delete a role":
                deleteRole();
                break;

            case "Delete an employee":
                deleteEmployee();
                break;
            
            case "Quit":
                db.end();
                console.log(`
                =======================================
                Disconnected from businessInfo database
                              Goodbye :)
                =======================================
                `);
                break;
        }
    });
};

const init = () => {
    db.connect(err => {
        if (err) throw err;
        console.log(`
        ==================================
        Connected to businessInfo database
           Welcome to Employee Tracker
        ==================================
        `);
        promptUser();
    });
};

const addNewDepartment = () => {
    inquirer.prompt([
        {
          type: 'input', 
          name: 'addNewDept',
          message: "Enter new department name: ",
          validate: addNewDept => {
            if (addNewDept) {
                return true;
            } else {
                console.log('Please enter a department name');
                return false;
            };
          }
        }
    ]).then(answer => {
        const sql = `INSERT INTO departments (dept_name) VALUES (?)`;
        db.query(sql, answer.addNewDept, (err, result) => {
            if (err) throw err;
            console.log(`New department added: ${answer.addNewDept}`); 
        });
    }).then(() => promptUser());
};

const addNewRole = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Name new role: ',
            validate: title => {
                if (title) {
                    return true;
                } else {
                    console.log('Please enter a role title');
                    return false;
                };
            }
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Enter new role salary: ',
            validate: salary => {
                if (isNaN(salary) || !salary) {
                    console.log('Please enter a salary');
                    return false;
                } else {
                    return true;
                };
            }
        },
        {
            type: 'list',
            name: 'department',
            message: 'Enter department ID number for new role: ',
            choices: deptArr
        }
    ]).then(answer => {
        const sql = `INSERT INTO roles (title, salary, dept_id) VALUES (?, ?, ?)`; 
        const params = [answer.title, answer.salary, answer.department];
        db.query(sql, params, (err, result) => {
            if (err) throw err;
            console.log(`New role added: ${answer.title}`); 
        });
    }).then(() => promptUser());
};

const addNewEmployee = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: "Enter employees first name: ",
            validate: firstName => {
                if (firstName) {
                    return true;
                } else {
                    console.log('Please enter a first name');
                    return false;
                };
            }
        },
        {
            type: 'input',
            name: 'lastName',
            message: "Enter employees last name: ",
            validate: lastName => {
                if (lastName) {
                    return true;
                } else {
                    console.log('Please enter a last name');
                    return false;
                };
            }
        },
        {
            type: 'list',
            name: 'role',
            message: "Select employees role: ",
            choices: roleArr
        },
        {
            type: 'list',
            name: 'manager',
            message: "Select employees manager: ",
            choices: managerArr
        }
    ]).then(answer => {
        const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`; 
        const params = [answer.firstName, answer.lastName, answer.role, answer.manager];
        db.query(sql, params, (err, result) => {
            if (err) throw err;
            console.log(`New employee added: ${answer.firstName} ${answer.lastName}`); 
        });
    }).then(() => promptUser());
};

const updateEmployeeRole = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'employee',
            message: 'Which employee would you like to update?',
            choices: employeeArr
        },
        {
            type: 'list',
            name: 'newRole',
            message: 'What is the employees new role?',
            choices: roleArr
        }
    ]).then(answer => {
        const sql = `UPDATE employees SET role_id = ? WHERE id = ?`
        const params = [answer.newRole, answer.employee]
        db.query(sql, params, (err, res) => {
            if (err) throw err;
            console.log(`Role change complete`); 
        });
    }).then(() => promptUser());
};

const deleteDepartment = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'department',
            message: 'Select department to delete: ',
            choices: deptArr
        }
    ]).then(answer => {
        const sql = `DELETE FROM departments WHERE id = ${answer.department}`;
        db.query(sql, (err, row) => {
            if (err) throw err;
            console.table(deptArr);
        });
    }).then(() => promptUser());
};

const deleteRole = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'role',
            message: 'Select role to delete: ',
            choices: roleArr
        }
    ]).then(answer => {
        const sql = `DELETE FROM roles WHERE id = ${answer.role}`;
        db.query(sql, (err, row) => {
            if (err) throw err;
            console.log(`Role ${answer.role} deleted`);
        });
    }).then(() => promptUser());
};

const deleteEmployee = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'employee',
            message: 'Select employee to delete: ',
            choices: employeeArr
        }
    ]).then(answer => {
        const sql = `DELETE FROM employees WHERE id = ${answer.employee}`;
        db.query(sql, (err, row) => {
            if (err) throw err;
            console.log('Employee deleted');
        });
    }).then(() => promptUser());
};

init();