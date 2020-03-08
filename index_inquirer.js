const inquirer = require('inquirer');
const fs = require('fs');
// const path = require('path');
const mysql = require('mysql');
const Employee = require('./constructors/employee_constructor');
// const index_db = require('./index_db');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '5kgk4107.cu.du',
    port: 3306,
    database: 'employee_db'
});

connection.connect(err => {
    if (err) throw err;
    console.log(`Connected as id ${connection.threadId}`);
    createEmployee();
    // deleteEmployee();
    // viewAll();
})

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
        // createEmployee(answers)
        newPerson = new Employee(answers.first_name, answers.last_name, answers.job_title, answers.employee_department, answers.employee_salary, answers.employee_manager);
        console.log(newPerson)

        createEmployee(newPerson);

        // fs.appendFile('employees.txt', JSON.stringify(answers) + '\n\n', (err) => {
        //     if (err) throw err;
        //     console.log('the file has been created and the new employee is inside...')
        // })

    })
}

starterPrompt();



function createEmployee() {
    console.log('Inserting a new employee...\n');

    // fs.readFile('employees.txt', function (err, data) {
    //     if (err) throw err;
    //     let person = JSON.parse(data);
    //     console.log('this is the object parsed into createEmployee...' + person)

    // })

    connection.query(
        'INSERT INTO employee SET ?',
        [],
        function (err, res) {
            if (err) throw err;
            console.log(res.affectedRows + ' employee inserted!\n');
            // updateProduct();
        }
    )
}


// {
//     first_name: 'garrett',
//     last_name: 'matters',
//     title: 'mySQL developer',
//     department: 'developement',
//     salary: '60000',
//     manager: 'Chris Farley'
// }