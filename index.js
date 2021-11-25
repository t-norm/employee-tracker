const inquirer = require('inquirer');
const db = require('./db/connection');
const caseFunction = require('./db/switchCaseFunctions');

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
                "Update an employee's info",
                "Delete a department, role, or employee",
                "Quit"
            ]
        }
    ]).then(userInput => {
        switch (userInput.viewOrUpdate) {
            case "View all departments":
                caseFunction.viewAllDepartments();
                setTimeout(()=>{promptUser(),1000});
                break;

            case "View all roles":
                caseFunction.viewAllRoles();
                setTimeout(()=>{promptUser(),1000});
                break;

            case "View all employees":
                caseFunction.viewAllEmployees();
                setTimeout(()=>{promptUser(),1000});
                break;

            case "View employees by department":
                caseFunction.viewEmployeesByDepartment();
                setTimeout(()=>{promptUser(),1000});
                break;

            case "View employees by manager":
                caseFunction.viewEmployeesByManager();
                setTimeout(()=>{promptUser(),1000});
                break;

            case "View department budget info":
                caseFunction.viewDepartmentBudgetInfo();
                setTimeout(()=>{promptUser(),1000});
                break;

            case "Add a new department":
                addNewDepartment();
                break;

            case "Add a new role":
                addNewRole();
                break;

            case "Add a new employee":
                caseFunction.addNewEmployee();
                break;

            case "Update an employee's info":
                caseFunction.updateEmployeeInfo();
                break;

            case "Delete a department, role, or employee":
                caseFunction.deleteDepartmentRoleEmployee();
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

const viewAllDepartments = () => {
    db.query(`SELECT * FROM departments;`, 
    function(err, res) {
        if (err) throw err
        console.table(res);
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
                console.log('New department added: ' + answer.addNewDept); 
            });
        }).then(() => promptUser());
};

const addNewRole = () => {
    viewAllDepartments();
    inquirer.prompt([
        {
            
        }
    ]).then(answer => {
        
    }).then(() => promptUser());
};

const addNewEmployee = () => {
    inquirer.prompt([
        {

        }
    ]).then(answer => {

    }).then(() => promptUser());
};

const updateEmployeeInfo = () => {
    inquirer.prompt([
        {

        }
    ]).then(answer => {

    }).then(() => promptUser());
};

const deleteDepartmentRoleEmployee = () => {
    inquirer.prompt([
        {

        }
    ]).then(answer => {

    }).then(() => promptUser());
};

init();