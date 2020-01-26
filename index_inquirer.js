const inquirer = require('inquirer');
// const fs = require('fs');
// const path = require('path');
// const Employee = require('./constructors/employee_constructor');


// const employee1 = new Employee('sam', 'krage', 'software-guru', 'developement', 60000, 'mike drewer')
// console.log(employee1)

function starterPrompt() {
    inquirer.prompt([
        {
            name: 'firstQuestion',
            type: 'list',
            message: 'What would you like to do today?',
            choices: ['Create an employee', 'Edit an employee', 'Delete an employee']
        }
    ]).then(answers => {
        console.info('answer: ', answers.firstQuestion)
        console.log(answers)
        if (answers.firstQuestion === 'Create an employee') {
            console.log('call prompt to make a new employee...')
            createEmployee();

        } else if (answers.firstQuestion === 'Edit an employee') {
            console.log('inquirer prompt to edit an existing employee...')

        } else {
            console.log('call prompt to delete an employee...')
        }
    });
}

function createEmployee() {
    inquirer.prompt([
        {
            name: 'first_name',
            type: 'input',
            message: "What is the employee's first name?"

        },
        {
            name: 'last_name',
            type: 'input',
            message: "What is the employee's last name?"
        },
        {
            name: 'job_title',
            type: 'input',
            message: "What is the employee's job title?"
        },
        {
            name: 'employee_department',
            type: 'input',
            message: "What is the employee's department?"
        },
        {
            name: 'employee_salary',
            type: 'input',
            message: "What is the employee's salary?"
        },
        {
            name: 'employee_manager',
            type: 'input',
            message: "Who is the employee's manager?"
        }
    ]).then(answers => {
        answers.employee_salary = parseInt(answers.employee_salary)
        console.log(answers)
    })
}

starterPrompt();





