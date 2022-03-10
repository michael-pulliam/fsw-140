const express = require("express")
const app = express()
const mongoose = require("mongoose")
const port = 9000;
const morgan = require('morgan')
require('dotenv').config()
const expressJwt = require('express-jwt')

//Middleware (for every request)
app.use(express.json())
app.use(morgan('dev'))

//Connect to DB

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/inventory');
}

app.get('/', (req, res) => {
    res.send("Hello World")
})

//Routes
app.use('/api', expressJwt({secret: process.env.SECRET, algorithms: ['HS256']}))
app.use('/api/comment', require('./routes/commentRouter.js'))
app.use('/api/issue', require('./routes/issueRouter.js'))
app.use('/auth', require('./routes/authRouter.js'))
app.use('/inventory', require('./routes/inventoryRouter.js'))

// Error handler
app.use((err, req, res, next) => {
    console.log(err)
    if(err.name === 'Unauthorized Error'){
        res.status(err.status)
     }
    return res.send({errMsg: err.message})
})


//Server listen
app.listen(port, () => {
    console.log("The server is running on " + port)
})

