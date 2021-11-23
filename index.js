const inquirer = require('inquirer');
const consoleTable = require('console.table');
const db = require('./db/connection');

const promptUser = async () => {
    const userInput = await inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "Type a thing: ",
        }
    ]);
    return userInput;
};

const init = () => {
    db.connect(err => {
        if (err) throw err;
        console.log('Connected to businessInfo database.');
        promptUser();
    });
};

init();