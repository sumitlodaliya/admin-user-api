const mongoose = require('mongoose');

const multer = require('multer');

const path = require('path');

const AVATAR_PATH = path.join("/uploads/image");

const SubCategorySchema = mongoose.Schema({
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
    city : {
        type : String,
        required : true
    },
    course : {
        type : String,
        required : true
    },
    fees : {
        type : String,
        required : true
    },
    faculty_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "category"
    },
    faculty_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "register"
    },
    
    avatar : {
        type : String,
        required : true
    }
    
});

const userstorage = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null,path.join(__dirname,'..',AVATAR_PATH));
    },
    filename : (req,file,cb)=>{
        cb(null,file.fieldname+"-"+Date.now());
    }
});
SubCategorySchema.statics.uploadedAvatar = multer({storage : userstorage}).single('avatar');
SubCategorySchema.statics.uploadPath = AVATAR_PATH;

const subcategory = mongoose.model('subcategory',SubCategorySchema);
module.exports = subcategory;