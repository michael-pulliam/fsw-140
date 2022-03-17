const express = require('express');
const app = express();
const { Pool } = require('pg/lib');
const postgre = require('pg').Pool;
app.use(express.json())

//Express port
const PORT = 9000;

//Establish a connection to the MySQL Database
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
app.post('/addComment', (req, res) => {
    let post = {title: req.body.title, comment: req.body.comment}
    let sql = `INSERT INTO comments(title, comment) VALUES('${post.title}', '${post.comment}')`;
    //Execute the SQL Query
    pool.query(sql, (err, result) => {
        if (err){
            throw err;
        }
        let sql = 'SELECT * FROM comments order by id desc ';
        //Execute the SQL Query
        pool.query(sql, (err, result) => {
            if (err){
                throw err;
            }
            res.send(result);
            // console.log('SELECT Query without WHERE Clause Executed Successfully!')
        })
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
        res.send(result);
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
        res.send(result);
        console.log('SELECT Query with WHERE Clause Executed Successfully!')
    });
});

//Execute the UPDATE Query
app.put('/editComment/:id', (req, res) => {
    let sql = `UPDATE comments SET title = '${req.body.title}' WHERE id = ${req.params.id}; UPDATE comments SET comment = '${req.body.comment}' WHERE id = ${req.params.id}; select * from comments;`;
        //Execute the SQL Query
        pool.query(sql, (err, result) => {
            if (err){
                throw err;
            }
            // let sql = `UPDATE comments SET comment = '${req.body.comment}' WHERE id = ${req.params.id}`;
            // //Execute the SQL Query
            // pool.query(sql, (err, result) => {
            //     if (err){
            //         throw err;
            //     }
            //     let sql = 'SELECT * FROM comments order by id desc ';
            //     //Execute the SQL Query
            //     pool.query(sql, (err, result) => {
            //         if (err){
            //             throw err;
            //         }
                    res.send(result);
                    // console.log('SELECT Query without WHERE Clause Executed Successfully!')
                })
            // });
        // });
});

//Execute DELETE Query
app.delete('/DeleteComments/:id', (req, res) => {
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