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
)

let title;
let salary;
let id;

function Roles(){};

Roles.prototype.addNewRole = function(){
    inquirer
    .prompt([{
        type: 'input',
        name: 'newTitle',
        message: "What is the new role called?"
    },
{
    type: 'number',
    name: 'newSalary',
    message: "What is the new role's salary?",
},
{    
    type: 'number',
    name: 'deptId',
    message: "What is the department id number for the new role?"
}
])
.then(({ newTitle, newSalary, deptId }) => {
    title = newTitle;
    salary = newSalary;
    id = deptId;

    let stmt = `INSERT INTO roles (title, salary, role_department) VALUES (?, ?, ?);`;

    db.query(stmt, [title, salary, id], (err, row)=> {
        if(err) throw err;
        console.log('Role added')
        showAllRoles();
    })

})
};

// Roles.prototype.showAllRoles = function(){
//   let allRoles =  db.query(`
//     SELECT * FROM roles`)
//     console.table(allRoles)
// };

module.exports = Roles;