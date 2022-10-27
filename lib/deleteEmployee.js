const inquirer = require('inquirer');
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

const deleteEmployee = function(){
    inquirer
    .prompt({
        type: 'input',
        name: 'employeeDelete',
        message: 'What is the employee ID of the employee you would like to remove?'
    })
    .then(({ employeeDelete })=> {

        let employeeId = employeeDelete
        let stmt = `DELETE FROM employee WHERE id = (?);`;

        db.query(stmt, [employeeId], (err) => {
            if(err) throw err;
            console.log('Employee Removed')
        })
    })
}

module.exports = deleteEmployee;