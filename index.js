const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
const makeNewEmployee = require ('./lib/Employee.js');
const Roles = require('./lib/Roles.js');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'NOCTis2022!*',
        database: 'staff'
    },
    console.log('Connected to the staff database')
)

const displayOptions = function(){
    inquirer
    .prompt ({
        type: 'list',
        name: 'initialPrompt',
        message: 'What would you like to do?',
        choices: ['View all employees', 'Add employee', 'Update employee role', 'View all roles', 'Add role', 'View all departments', 'Add department']
    })
    .then(({ initialPrompt }) => {
        if(initialPrompt === 'View all employees'){
            showAllEmployees();
            console.log('View all');    
        }
        if(initialPrompt === 'Add employee'){
        
            makeNewEmployee()

        }
        if(initialPrompt === 'Update employee role'){

        }
        if (initialPrompt === 'View all roles'){
            console.log('view all roles')
           showAllRoles()
        }
        if (initialPrompt === 'Add role'){
            new Roles().addNewRole();
        }
        if (initialPrompt === 'View all departments'){
            showAllDepartments();
        }
        if (initialPrompt === 'Add department'){
            console.log('Add department')
            addDepartment();
        }
        // else {
        //     console.log('whatevs')
        // }
    }
    )
}

//EMPLOYEE FUNCTIONS
//View all employees
const showAllEmployees = function(){
    db.query(`
        SELECT first_name, last_name, roles.title AS employee_role
        FROM employee
        LEFT JOIN roles on employee.role_id = roles.id`,
        (err, rows ) => {
            console.table(rows);
        })
    };

// //ROLE FUNCTIONS
const showAllRoles = function(){
    db.query(`
    SELECT roles.*, department.dept_name AS department
    FROM roles
    LEFT JOIN department on roles.role_department = department.id`,
    (err, rows) => {console.table(rows)
    return displayOptions();
    })
}

// //DEPARTMENT FUNCTIONS
const showAllDepartments = function (){
    db.query(`
    SELECT * 
    FROM department`,
    (err, rows) => {
        console.table(rows)
        return displayOptions();
    })
};

const addDepartment = function(){
    inquirer
    .prompt({
        type: 'input',
        name: 'newDept',
        message: "What is the new department name?"
    })
    .then (({ newDept }) => {
        let newDepts = newDept

        let stmt = `INSERT INTO department (dept_name) VALUES (?);`

        db.query(stmt, [newDepts], (err, row) => {
            if (err) throw err;
            console.log('New Department added');
            return showAllDepartments();
        })

        
    })
}
    

displayOptions()

