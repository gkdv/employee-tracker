
const mysql = require('mysql');
const fs = require('fs')

// fs.readFile('employees.txt', (err, data) => {
//   if (err) throw err;
//   console.log(JSON.parse(data))
//   // console.log(.last_name)
//   console.log('----------------------------------')
// })

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
  viewAll();
})

function viewAll() {
  connection.query("SELECT * FROM employee", function (err, res) {
    if (err) throw err;
    console.log(res);
    connection.end();
  });
}

function createEmployee() {
  console.log('Inserting a new employee...\n');

  fs.readFile('employees.txt', function(err, data){
    if (err) throw err;
    let person = JSON.parse(data);
    console.log('this is the object parsed into createEmployee...' + person)
    
  })
  connection.query(
    'INSERT INTO employee SET ?', person,
    function (err, res) {
      if (err) throw err;
      console.log(res.affectedRows + ' employee inserted!\n');
      // updateProduct();
    }
  )
}

function deleteEmployee() {
  console.log("Deleting Employee...\n");
  connection.query(
    "DELETE FROM employee WHERE ?",
    {
      first_name: "garrett"
    },
    function (err, res) {
      if (err) throw err;
      console.log(res.affectedRows + " employee deleted!\n");
    }
  );
}


// [{
//   first_name: 'garrett',
//   last_name: 'krage',
//   title: 'mySQL developer',
//   department: 'developement',
//   salary: '60000',
//   manager: 'Chris Farley'
// }]

