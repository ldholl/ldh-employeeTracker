const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'NOCTis2022!*',
        database: 'staff'
    },
    console.log('Connected to the staff database')
)


function viewAllOptions(){
    inquirer
    .prompt({
        type: 'list',
        name: 'options',
        message: 'What would you like to do?',
        choices: ['Show all employees', 'Show all roles', 'Show all departments', 'Add new employee', 'Add new role', 'Add new department', 'Update employee title']
    })
    .then(({ options})=> {
        switch(true){
            case (options === 'Show all employees'):
                showAllEmployees()
                break;
            case (options === 'Show all roles'):
                showAllRoles();
                break;
            case (options === 'Show all departments'):
                showAllDepartments();
                break;
            case (options === 'Add new employee'):
                addNewEmployee();
                break;
            case (options === 'Add new role'):
                addNewRole();
                break;
            case (options === 'Add new department'):
                addDepartment();
                break;
            case (options === 'Update employee title'):
                updateRole()
                break;
            default:
                break;
        }
    })
}

//EMPLOYEE FUNCTIONS
//View all employees
const showAllEmployees = function(){
    db.query(`
        SELECT employee.*, roles.title AS employee_role
        FROM employee
        LEFT JOIN roles on employee.role_id = roles.id`,
        (err, rows ) => {
            if(err) throw err;
            console.table(rows);
            viewAllOptions();
        })
    };

//Add a new employee
    function addNewEmployee(){
        let newFirst
        let newLast
        let newTitle
        let newManager
    
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
            },
            {
            type: 'input',
            name: 'title',
            message: "What is the employee's role id?"
            },
            {
            type: 'input',
            name: 'manager',
            message: "What is this employee's manager id?"
            }
        ])
        .then (({ firstName, lastName, title, manager })=> {
            newFirst = firstName
            newLast = lastName
            newTitle = title
            newManager = manager
       
    
            let stmt = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);`;
    
            db.query(stmt, [newFirst, newLast, newTitle, newManager], (err, row) => {
                if(err) throw err;
                console.log(row);
                console.log('Employee Added')
                viewAllOptions()
        
             })
        })}
    
//update an employee title
function updateRole(){
    inquirer
    .prompt([
        {
        type: 'input',
        name: 'empId',
        message: "What is the employee's ID number?"
        },
        {
        type: 'input',
        name: 'empRole',
        message: "What is the employee's new title id?"
        }
    ]).then(({ empId, empRole }) => {
        let newRole = empRole
        let employeeId = empId


        let stmt = 'UPDATE employee SET role_id = (?) WHERE id = (?);'

        db.query(stmt, [newRole, employeeId], (err)=> {
            if(err) throw err;
            console.log('Employee title updated')
            viewAllOptions();
        })
    })
}

    

// //ROLE FUNCTIONS
const showAllRoles = function(){
    db.query(`
    SELECT roles.*, department.dept_name AS department
    FROM roles
    LEFT JOIN department on roles.role_department = department.id`,
    (err, rows) => {
    if(err) throw err;
    console.table(rows)    
    viewAllOptions();
    })
}

//add a new role
const addNewRole = function(){
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
    type: 'input',
    name: 'deptId',
    message: "What is the department id of this role?",
}
])
.then(({ newTitle, newSalary, deptId }) => {
    let title = newTitle;
    let salary = newSalary;
    let id = deptId;

    let stmt = `INSERT INTO roles (title, salary, role_department) VALUES (?, ?, ?);`;

    db.query(stmt, [title, salary, id], (err)=> {
        if(err) throw err;
        console.log('Role added')
        viewAllOptions();
    })

})
};

// //DEPARTMENT FUNCTIONS
const showAllDepartments = function (){
    db.query(`
    SELECT * 
    FROM department`,
    (err, rows) => {
        if(err) throw err;
        console.table(rows)
        viewAllOptions();
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
            viewAllOptions();
        })

        
    })
}



viewAllOptions()


