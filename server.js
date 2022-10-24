// const express = require('express');
// const mysql = require('mysql2');
// const PORT = process.env.PORT || 3001;
// const app = express();

// //Middleware
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

// //Connect to database
// const db = mysql.createConnection (
//     {
//         host: 'localhost',
//         user: 'root',
//         password: 'NOCTis2022!*',
//         database: 'staff'
//     },
//     console.log('Connected to the staff database.')
// )

// //Queries
// db.query(`SELECT * FROM department`, (err, rows) => {
//     console.log(rows);
// });


// // //GET a single department
// // db.query(`SELECT * FROM department WHERE dept_id=1`, (err, row) => {
// //     if(err){
// //         console.log(err);
// //     }
// //     console.log(row);
// // })

// // //Delete a department
// // db.query(`DELETE FROM department WHERE id = ?`, 1, (err, result) => {
// //     if(err){
// //         console.log(err);
// //     }
// //     console.log(result);
// // })

// // create a department
// // const sql = `INSERT INTO department (dept_id, dept_name)
// //                 VALUES (?, ?)`;
// // const params = [6, 'Executive'];

// // db.query(sql, params, (err, result) => {
// //     if(err){
// //         console.log(err);
// //     }
// //     console.log(result);
// // })


// //catchall response for any other requests(not found)---THIS MUST BE THE LAST ROUTE CHRONOLOGICALLY
// app.use((req, res) => {
//     res.status(404).end();
// });


// //Function to start express
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`)
// });