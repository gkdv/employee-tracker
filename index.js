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
    createEmployee();
    viewAll();
})

function viewAll() {
    connection.query("SELECT * FROM employee", function(err, res) {
      if (err) throw err;
      console.log(res);
      connection.end();
    });
  }

  function createEmployee() {
    console.log('Inserting a new employee...\n');
    var query = connection.query(
        'INSERT INTO employee SET ?',
        [{
            first_name: 'garrett',
            last_name: 'krage',
            title: 'mySQL developer',
            department: 'developement',
            salary: '60000',
            manager: 'Chris Farley'
        }],
        function (err, res){
            if (err) throw err;
            console.log(res.affectedRows + ' employee inserted!\n');
            // updateProduct();
        }
    )
}
  