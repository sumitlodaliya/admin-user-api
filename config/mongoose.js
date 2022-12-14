const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/apiproject');

const db = mongoose.connection;

db.on('err',console.error.bind(console,"db not connect"));

db.once('open',(err)=>{
    if(err)
    {
        console.log("db is start");
        return false;
    }
    console.log("db is start");
});

module.exports = db;