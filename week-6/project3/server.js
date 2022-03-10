const express = require('express');
const mysql = require('postgres');

//Establish a connection to the MySQL Database
const db = mysql({
    host: 'localhost',
    user: 'root',
    password: '',
    //Connect to database
    // database: 'social_app'
});

//Connect to the Database
db.connect((err) => {
    if (err){
        throw err;
    }
    console.log('MySQL Database Connection Established Successfully!')
});

//Setup the Express Sever
const app = express();

//Ceate A New Database
app.get('/CreateDB', (req, res) => {
    let sql = "CREATE DATABASE social_app"
    db.query(sql, (err, result) => {
        if (err){
            throw err;
        }
        res.send('New Database Created Successfully!');
        console.log('New Database Created Successfully!')
    })
});

//Ceate a New Table
app.get('/CreateTable', (req, res) => {
    let sql = 'CREATE TABLE comments (id INT AUTO_INCREMENT, title VARCHAR(50), comment VARCHAR(350), date_time DATE, PRIMARY KEY(id) )';
    db.query(sql, (err, result) => {
        if (err){
            throw err;
        }
        res.send('New Table Created Successfully!');
        console.log('New Database Created Successfully!')
    })
})

//Insert First Row
app.get('/InsertRow1', (req, res) => {
    let comment = {title: 'First Comment', comment: 'This is my first message'}
    let sql = 'INSERT INTO comments SET ?';
    //Execute the SQL Query
    db.query(sql, comment, (err, result) => {
        if (err){
            throw err;
        }
        res.send('Data Inserted Successfully!');
        console.log('First Record Inserted into table Successfully!')
    })
});

//Execute SELECT Query with no WHERE Clause
app.get('/GetComments', (req, res) => {
    let sql = 'SELECT * FROM comments';
    //Execute the SQL Query
    db.query(sql, comment, (err, result) => {
        if (err){
            throw err;
        }
        res.send('Data SELECT Executed Successfully!');
        console.log('SELECT Query without WHERE Clause Executed Successfully!')
    })
})
//Execute SELECT Query with the WHERE Clause
app.get('/GetComments/:id', (req, res) => {
    let sql = `SELECT * FROM comments WHERE id = ${req.params.id}`;
    //Execute the SQL Query
    db.query(sql, comment, (err, result) => {
        if (err){
            throw err;
        }
        res.send('Data SELECT Executed Successfully!');
        console.log('SELECT Query with WHERE Clause Executed Successfully!')
    });
});

//Execute the UPDATE Query
app.get('/UpdateRecord/:id', (req, res) => {
    let newTitle = 'This is an updated column ising JavaScript';
    let sql = `UPDATE comments SET title = '${newTitle}' WHERE id = ${req.params.id}`;
        //Execute the SQL Query
        db.query(sql, comment, (err, result) => {
            if (err){
                throw err;
            }
            res.send('Row Data UPDATE Executed Successfully!');
            console.log('UPDATE Executed Successfully!')
        });
});

//Execute DELETE Query
app.get('/DeleteComments/:id', (req, res) => {
    let sql = `DELETE * FROM comments WHERE id = ${req.params.id}`;
    //Execute the SQL Query
    db.query(sql, comment, (err, result) => {
        if (err){
            throw err;
        }
        res.send('Row Data DELETED Executed Successfully!');
        console.log('DELETED Query Executed Successfully!')
    });
});

//Open Up the Port and Start the Server
app.listen('8000', () => {
    console.log('Local Web Server is Fully Up and Running!')
});