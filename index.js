const inquirer = require('inquirer');
const consoleTable = require('console.table');
const db = require('./db/connection');

const promptUser = async () => {
    console.log(`
        ===========================
        Welcome to Employee Tracker
        ===========================
    `);
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
            case "Quit":
                db.end();
                console.log("You have been disconnected from the businessInfo database");
                break;
        }
    });
};

const init = () => {
    db.connect(err => {
        if (err) throw err;
        console.log('Connected to businessInfo database.');
        promptUser();
    });
};

init();