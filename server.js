require('dotenv').config();
const mysql = require("mysql");
const inquirer = require("inquirer")
const cTable = require("console.table");

var connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: 3306,
    database: process.env.DB_DATABASE
});

connection.connect(function (err) {
    if (err) throw err;
    console.log(`"connected as id ${connection.threadId}"\n"`);

    commence();
});

const commence = () => {
    inquirer
        .prompt([
            {
                type: "list"
                , name: "init"
                , message: "What would you like to do?"
                , choices: [
                    "View All Employees"
                    , "View Employees by Department"
                    , "View Employees by Role"
                    , "Add an Employee"
                    , "Update an Employee's Role"
                    , "Remove an Employee"
                    , "Exit"
                ]
            }
        ]).then((answer) => {
            switch (answer.init) {
                case "View All Employees":
                    viewEmployees();
                    break;
                case "View Employees by Department":
                    viewDeparments();
                    break;
                case "View Employees by Role":
                    employeeRoles();
                    break;
                case "Add an Employee":
                    newEmployee();
                    break;
                case "Update an Employee's Role":
                    changeEmployee();
                    break;
                case "Remove an Employee":
                    removeEmployee();
                    break;
                default:
                    connection.end();

            }
        });
}

const viewDeparments = () => {
    const query = "SELECT * FROM department;"
    connection.query(
        query
        , (err, res) => {
            if (err) throw err;
            inquirer
                .prompt([
                    {
                        name: "choice"
                        , type: "list"
                        , message: "Which Department would you like to view?"
                        , choices: () => {
                            var selections = [];
                            for (const item of res) {
                                selections.push(item.name)
                            }
                            return selections;
                        }
                    }
                ]).then(data => {
                    const query = "SELECT employee.id, employee.first_name, employee.last_name, role.title , department.name, role.salary FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id WHERE ?;"
                    connection.query(
                        query
                        , [{
                            "department.name": data.choice
                        }]
                        , (err, res) => {
                            if (err) throw err;
                            console.table(res)
                            commence();
                        });
                })
        });
}

// show a list of joined employeed after it is selected
const viewEmployees = () => {
    const query = "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id;"
    connection.query(
        query
        , (err, res) => {
            if (err) throw err;
            console.table(res);
            commence();
        });
};

// select employee roles from the role table 
const employeeRoles = () => {
    const query = "SELECT * FROM role;"
    connection.query(
        query
        , (err, res) => {
            if (err) throw err;
            inquirer
                .prompt([
                    {
                        name: "choice"
                        , type: "list"
                        , message: "Which employee role would you like to review?"
                        , choices: () => {
                            var selections = [];
                            for (const item of res) {
                                selections.push(item.title)
                            }
                            return selections;
                        }
                    }
                ]).then(data => {
                    const query = "SELECT employee.id, employee.first_name, employee.last_name, role.title , department.name, role.salary FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id WHERE ?;"
                    connection.query(
                        query
                        , [{
                            "role.title": data.choice
                        }]
                        , (err, res) => {
                            if (err) throw err;
                            console.table(res)
                            commence();
                        });
                });
        });
}

// adding a new employee and subsequently choosing their position 
const newEmployee = () => {
    inquirer
        .prompt([
            {
                name: "first"
                , type: "input"
                , message: "What is the employee's first name?"
            },
            {
                name: "last"
                , type: "input"
                , message: "What is the employee's last name?"
            },
            {
                name: "choice"
                , type: "list"
                , message: "What is this employee's title?"
                , choices: [
                    "President"
                    , "VP"
                    , "COO"
                    , "Sales Manager"
                    , "Salesman"
                    , "Consultant"
                    , "Accountant"
                    , "Legal Manager"
                    , "Attorney"
                    , "Engineer"
                    , "Software Engineer"
                ]
            }
        ]).then(data => {
            console.log(data.choice)
            switch (data.choice) {
                case "President":
                    var roleID = 1;
                    break;
                case "VP":
                    var roleID = 2;
                    break;
                case "COO":
                    var roleID = 3;
                    break;
                case "Sales Manager":
                    var roleID = 4;
                    break;
                case "Salesman":
                    var roleID = 5;
                    break;
                case "Consultant":
                    var roleID = 6;
                    break;
                case "Accountant":
                    var roleID = 7;
                    break;
                case "Legal Manager":
                    var roleID = 8;
                    break;
                case "Attorney":
                    var roleID = 9;
                    break;
                case "Engineer":
                    var roleID = 10;
                    break;
                case "Software Engineer":
                    var roleID = 11;
                    break;
            }

            const query = "INSERT INTO employee SET ?;"
            connection.query(
                query
                , {
                    first_name: data.first
                    , last_name: data.last
                    , role_id: roleID
                }
                , (err) => {
                    if (err) throw err;
                    console.log("Success! Employee was added.")
                    commence();
                });
        });
};

// update an employee - choose employee and title to update
const changeEmployee = () => {
    const query = "SELECT CONCAT(first_name, ' ', last_name) as name FROM employee;"
    connection.query(
        query
        , (err, res) => {
            if (err) throw err;
            inquirer
                .prompt([
                    {
                        type: "list"
                        , message: "Which Employee would you like to update?"
                        , name: "choiceEmployee"
                        , choices: () => {
                            var selections = [];
                            for (const item of res) {
                                selections.push(item.name);
                            }
                            return selections;
                        }
                    },
                    {
                        name: "choice"
                        , type: "list"
                        , message: "What is this employee's title?"
                        , choices: [
                            "President"
                            , "VP"
                            , "COO"
                            , "Sales Manager"
                            , "Salesman"
                            , "Consultant"
                            , "Accountant"
                            , "Legal Manager"
                            , "Attorney"
                            , "Engineer"
                            , "Software Engineer"
                        ]
                    }
                ]).then(data => {
                    switch (data.choice) {
                        case "President":
                            var roleID = 1;
                            break;
                        case "VP":
                            var roleID = 2;
                            break;
                        case "COO":
                            var roleID = 3;
                            break;
                        case "Sales Manager":
                            var roleID = 4;
                            break;
                        case "Salesman":
                            var roleID = 5;
                            break;
                        case "Consultant":
                            var roleID = 6;
                            break;
                        case "Accountant":
                            var roleID = 7;
                            break;
                        case "Legal Manager":
                            var roleID = 8;
                            break;
                        case "Attorney":
                            var roleID = 9;
                            break;
                        case "Engineer":
                            var roleID = 10;
                            break;
                        case "Software Engineer":
                            var roleID = 11;
                            break;
                    }
                    const emp = data.choiceEmployee.split(" ");
                    empfirst = emp[0];
                    emplast = emp[1];
                    const query = "UPDATE employee SET ? WHERE ? AND ?";
                    connection.query(
                        query
                        , [
                            {
                                role_id: roleID
                            },
                            {
                                first_name: empfirst
                            },
                            {
                                last_name: emplast
                            }
                        ]
                        , (err) => {
                            if (err) throw err;
                            console.log("Updated employee records.");
                            commence();
                        });
                });
        });
};

// delete an employee, select and delete employee by name
const removeEmployee = () => {
    const query = "SELECT CONCAT(first_name, ' ', last_name) as name FROM employee;"
    connection.query(
        query
        , (err, res) => {
            if (err) throw err;
            inquirer
                .prompt(
                    {
                        type: "list"
                        , message: "Which employee would you like to remove?"
                        , name: "choiceEmployee"
                        , choices: () => {
                            var selections = [];
                            for (const item of res) {
                                selections.push(item.name);
                            }
                            return selections;
                        }
                    }
                ).then(data => {
                    const emp = data.choiceEmployee.split(" ");
                    empfirst = emp[0];
                    emplast = emp[1];
                    const query = "DELETE FROM employee WHERE ? AND ?";
                    connection.query(
                        query
                        , [
                            {
                                first_name: empfirst
                            },
                            {
                                last_name: emplast
                            }
                        ]
                        , (err) => {
                            if (err) throw err;
                            console.log("Employee deleted from the database!");
                            commence();
                        });
                });
        });
};