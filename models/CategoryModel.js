const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
    faculty_name : {
        type : String,
        required : true
    },
    registerfaculty_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "register"
    },

});

const Category = mongoose.model('category',CategorySchema);
module.exports = Category;