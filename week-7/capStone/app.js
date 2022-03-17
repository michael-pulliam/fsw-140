
//Module Dependencies
var express = require('express')
routes = require('./routes')
user = require('./routes/user')
http= require('http')
path = require('path');
//var mehodOverride = require('method-override')
var session = require('express-session')
var app = express();
const { Pool } = require('pg/lib');
const postgre = require('pg').Pool;
var bodyParser = require('body-parser');
const pool = new Pool ({
    host: 'localhost',
    user: 'postgres',
    password: 'Murdamike314',
    port: 5432,
    database: 'social_app'
});
pool.connect()
global.pool = pool;

// All Environments
app.set('port', process.env.PORT || 9000);
app.set('views', _dirname =+ '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.join(_dirname, 'public')));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}));

//Development Only
app.get('/', routes.index);//call for main index page
app.get('/signup', user.signup);//call for signup page
app.post('/signup', user.signup);//call for signup post
app.get('login', routes.index);//call for login page
app.post('login', user.login);//call for login post
app.get('/home/dashboard', user.dashboard);//call for dashboard page after login
app.get('/home/logout', user.logout);//call for logout
app.get('/home/profile', user.profile);//to render users profile

//Middleware
app.listen(9000);