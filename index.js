const inquirer = require('inquirer');
const db = require('./db/connection');
const caseFunction = require('./db/switchCaseFunctions');

const promptUser = async () => {
    return inquirer.prompt([
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
                promptUser();
                break;

            case "View all roles":
                caseFunction.viewAllRoles();
                promptUser();
                break;

            case "View all employees":
                caseFunction.viewAllEmployees();
                promptUser();
                break;

            case "View employees by department":
                caseFunction.viewEmployeesByDepartment();
                promptUser();
                break;

            case "View employees by manager":
                caseFunction.viewEmployeesByManager();
                promptUser();
                break;

            case "View department budget info":
                caseFunction.viewDepartmentBudgetInfo();
                promptUser();
                break;

            case "Add a new department":
                caseFunction.addNewDepartment();
                promptUser();
                break;

            case "Add a new role":
                caseFunction.addNewRole();
                promptUser();
                break;

            case "Add a new employee":
                caseFunction.addNewEmployee();
                promptUser();
                break;

            case "Update an employee's info":
                caseFunction.updateEmployeeInfo();
                promptUser();
                break;

            case "Delete a department, role, or employee":
                caseFunction.deleteDepartmentRoleEmployee();
                promptUser();
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

init();