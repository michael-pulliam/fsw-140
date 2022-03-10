const { append } = require("express/lib/response");






//Create a New Table
append.get('/CreateTable', (req, res) => {
    let sql = "CREATE TABLE postings (id INT AUTO_INCREMENT, title VARCHAR(50), message VARCHAR(250), PRIMARY KEY(id)";
//Excue the SQL Query
    db.query(sql, post, (err, result) => {
        if (err){
            throw err;
        }
        res.send("Data Inserted Successfully")
        console.log("Second Record Iserted in the TAble Successfully!")
    })
})

//Insert Second Row
append.get('/InsertRow', (req, res) =>{

})

//Execute SELECT Query with no WHERE clause
append.get('/GetPosts', (req, res) =>{
    let sql = "SELECT * FROM postings";
    //Execute the SQL Query
    db.query(sql, post, (err, result) => {
        if (err){
            throw err;
        }
        res.send("Data Selection Executed Successfully")
        console.log("SELECT Query without WHERE clause Executed Successfully!")
    })
})

//Execute SELECT Query with the WHERE clause
app.get('/GetPosts/:id', (req, res) =>{
    let sql = `SELECT * FROM postings WHERE id ${req.param.id}`;
    //Execute the SQL Query
    db.query(sql, post, (err, result) => {
        if (err){
            throw err;
        }
        res.send("Data Selection Executed Successfully")
        console.log(result)
    })
})

//Excute the UPDATE Query
app.get('/UpdateRecord/:id', (req, res) => {
    let newTitle = "This is an updated column using JavaScript";
    let sql = `UPDATE postings SET title = ${newTitle} WHERE id = ${req.params.id}`;
        //Execute the SQL Query
        db.query(sql, post, (err, result) => {
            if (err){
                throw err;
            }
            res.send("Data Selection Executed Successfully")
            console.log(result)
        })
})

//Execute the DELETE 
app.get('/DeletePosts/:id', (req, res) =>{
    let sql = `DELETE FROM postings WHERE id ${req.param.id}`;
    //Execute the SQL Query
    db.query(sql, post, (err, result) => {
        if (err){
            throw err;
        }
        res.send("Query DELETED Executed Successfully")
        console.log("Query DELETED Executed Successfully")
    })
})

//Open Up the Port and Start the Server
append.listen('3000', () => {
    console.log("Local Web Server is Fully Up and Running!")
})