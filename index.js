// const inquirer = requirer('inquirer');
const mysql = require('mysql');



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
    
    connection.end();
})