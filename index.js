const express = require('express');

const port = 9050;

const app = express();

const path = require('path');

const db = require('./config/mongoose');

const jwt = require('./config/passport-jwt-strategy');
const jwtdata = require('./config/passport-jwt-strategy-student');

const passport = require('passport');

const session = require('express-session');

const cookieParser = require('cookie-parser');

app.use(express.urlencoded());
app.use('/uploads',express.static(path.join(__dirname,'uploads')));
app.use(session({
    name : "milan",
    secret : "rw1",
    resave : false,
    saveUninitialized : false,
    cookie : {
        maxAge : 1000*60*60*24
    }
})); 
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());


app.use(express.urlencoded());

app.use('/',require('./routes'));

app.listen(port,(err)=>{
    if(err){
        console.log("not start");
        return false;
    }
    console.log("server start"+port);
})