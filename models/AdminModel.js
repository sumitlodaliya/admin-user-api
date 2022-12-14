const mongoose = require('mongoose');

const registerSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    contact : {
        type : String,
        required : true
    },
    designation : {
        type : String,
        required : true
    },
    city : {
        type : String,
        required : true
    }
});

const admin = mongoose.model('register',registerSchema);
module.exports = admin;