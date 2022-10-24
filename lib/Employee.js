const inquirer = require('inquirer');
const cTable = require('console.table');
const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'NOCTis2022!*',
        database: 'staff'
    },
    console.log('Connected to the staff database')
);

let newFirst
let newLast

 
const makeNewEmployee = function (){
    inquirer
    .prompt([
        {
        type: 'input',
        name: 'firstName',
        message: "What is the new employee's first name?"
        },
        {
        type: 'input',
        name: 'lastName',
        message: "What is the new employee's last name?"
        }   
    ])
    .then(({ firstName, lastName })=> {
        newFirst = firstName
        newLast = lastName

        let stmt = `INSERT INTO employee (first_name, last_name) VALUES (?, ?);`;
    
        console.log(newFirst, newLast)

        db.query(stmt, [newFirst, newLast], (err, row) => {
        if(err) throw err;
        console.log('Employee Added')
        
     })  

    })
}

module.exports = makeNewEmployee;