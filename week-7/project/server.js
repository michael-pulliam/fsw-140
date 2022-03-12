const express = require('express');
const app = express();
const { Pool } = require('pg/lib');
const postgre = require('pg').Pool;

//Express port
const PORT = 9000;

//Establish a connection to the postgre Database
const pool = new Pool ({
    host: 'localhost',
    user: 'postgres',
    password: 'Murdamike314',
    port: 5432,
    database: 'social_app'
});

//Connect to the Database
pool.connect((err) => {
    if (err){
        throw err;
    }
    console.log('Postgres Database Connection Established Successfully!')
});



//Ceate A New Database
app.get('/CreateDB', (req, res) => {
    let sql = "CREATE DATABASE social_app"
    pool.query(sql, (err, result) => {
        if (err){
            throw err;
        }
        res.send('New Database Created Successfully!');
        console.log('New Database Created Successfully!')
    })
});

//Ceate a New Table
app.get('/CreateTable', (req, res) => {
    let sql = 'CREATE TABLE comments (id SERIAL, title VARCHAR(50), comment VARCHAR(350), date_time DATE, PRIMARY KEY(id) )';
    pool.query(sql, (err, result) => {
        if (err){
            throw err;
        }
        res.send('New Table Created Successfully!');
        console.log('New Database Created Successfully!')
    })
})

//Insert First Row
app.get('/InsertRow1', (req, res) => {
    let post = {title: 'First Comment', comment: 'This is my first message'}
    let sql = `INSERT INTO comments(title, comment) VALUES('${post.title}', '${post.comment}')`;
    //Execute the SQL Query
    pool.query(sql, (err, result) => {
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
    pool.query(sql, (err, result) => {
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
    pool.query(sql, (err, result) => {
        if (err){
            throw err;
        }
        res.send('Data SELECT by id Executed Successfully!');
        console.log('SELECT Query with WHERE Clause Executed Successfully!')
    });
});

//Execute the UPDATE Query
app.get('/UpdateRecord/:id', (req, res) => {
    let newTitle = 'This is an updated column using JavaScript';
    let sql = `UPDATE comments SET title = '${newTitle}' WHERE id = ${req.params.id}`;
        //Execute the SQL Query
        pool.query(sql, (err, result) => {
            if (err){
                throw err;
            }
            res.send('Row Data UPDATE Executed Successfully!');
            console.log('UPDATE Executed Successfully!')
        });
});

//Execute DELETE Query
app.get('/DeleteComments/:id', (req, res) => {
    let sql = `DELETE FROM comments WHERE id = ${req.params.id}`;
    //Execute the SQL Query
    pool.query(sql, (err, result) => {
        if (err){
            throw err;
        }
        res.send('Row Data DELETED Executed Successfully!');
        console.log('DELETED Query Executed Successfully!')
    });
});

//Open Up the Port and Start the Server
app.listen(PORT, () => {
    console.log('Local Web Server is Fully Up and Running!')
});