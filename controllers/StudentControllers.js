const subcategory = require('../models/subcategory');

const jwtdata = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const fs = require('fs');

const path = require('path');




module.exports.subcategory = async (req, res) => {

    try {
        let data = await subcategory.uploadedAvatar(req, res, (err) => {
            if (err) {
                console.log("File not upload");
                return false;
            }

            let avatar = "";
            if (req.file) {
                avatar = subcategory.uploadPath + "/" + req.file.filename;
            }

            subcategory.create({
                name : req.body.name,
                email : req.body.email,
                password : req.body.password,
                city : req.body.city,
                course : req.body.course,
                fees : req.body.fees,
                avatar: avatar,
                faculty_id : req.body.faculty_id,
                
            },(err,data)=>{
        
                if(err){
                    res.json(err);
                    return false;
                }
                return res.json({"status" : "1","messege" : "Subcategory successfully add", "data":data});
            })
        });

        // if (data) {
        //     console.log("Record successfully insert");
        //     return res.redirect('back');
        // }
        // else {
        //     console.log("Something wrong");
        //     return res.redirect('back');
        // }
    }
    catch (err) {
        console.log(err);
    }


}


// module.exports.subcategory = (req,res)=> {
//     subcategory.create({
//         student_name : req.body.student_name,
//         student_email : req.body.student_email,
//         student_password : req.body.student_password,
//         student_city : req.body.student_city,
//         student_course : req.body.student_course,
//         student_fees : req.body.student_fees,
//         faculty : req.body.faculty,
        
//     },(err,data)=>{

//         if(err){
//             res.json(err);
//             return false;
//         }
//         return res.json({"status" : "1","messege" : "Subcategory successfully add", "data":data});
//     })
// }



module.exports.viewsubcategory = (req,res)=>{
    subcategory.aggregate([
        {
            $lookup : {
                from : "categories",
                localField : "faculty_id",
                foreignField : "_id",
                as : "category"
            }
        },
    ],(err,data)=>{
        res.json({"status" : "1",'data':data});
    })
}





module.exports.studentlogindata = (req,res) => {
    subcategory.findOne({email : req.body.email},(err,data)=>{
        if(err)
        {
            res.json(err);
            return false;
        }
        if(!data || data.password != req.body.password)
        {
            res.json({"status" : "0","messege" : "email & password not match"})
        }
        const token = jwtdata.sign(data.toJSON(),'secret',{expiresIn : 1000*60*60});
        return res.json({"status" : "1","token" : token})
    })
}







module.exports.studentupdateprofile = async (req, res) => {

    try {
        let data = await subcategory.uploadedAvatar(req, res, (err) => {
            if (err) {
                console.log("File not upload");
                return false;
            }

            let avatar = "";
            if (req.file) {
                avatar = subcategory.uploadPath + "/" + req.file.filename;
            }
            let id = req.query.id;
            console.log(id);

            subcategory.findByIdAndUpdate(id,{
                name : req.body.name,
                email : req.body.email,
                password : req.body.password,
                city : req.body.city,
                course : req.body.course,
                fees : req.body.fees,
                avatar: avatar,
                faculty_id : req.body.faculty_id,
            },(err,data)=>{
                if(err){
                    res.json(
                        {
                            "status" : "0",
                            "messege" : "data not update"
                        }
                    )
                    return false;
                }
                res.json(
                    {
                        "status" : "1",
                        "messege" : data
                    }
                )
        
            })
        });


    }
    catch (err) {
        console.log(err);
    }


}
module.exports.studentemailData = (req, res) => {
    let email = req.body.email;
    console.log(email);
    subcategory.findOne({ email: email }, (err, userdata) => {
        if (err) {
            console.log("Record not found");
            return false;
        }
        let otp = Math.floor(Math.random() * 1000000);
        var smtpTransport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "lodaliyasumit@gmail.com",
                pass: "rujrieleccrmpdvo"

            }
        });
        var mailOptions = {
            from: "lodaliyasumit@gmail.com",
            to: email,
            subject: 'Reset Password',
            text: 'OTP :- ' + otp
        }

        smtpTransport.sendMail(mailOptions, (error, info) => {
            if (error) {
                res.json(
                    {
                        "status" : "0",
                        "messege" : error
                    }
                )
            }
            res.json(
                {
                    "status" : "1",
                    "messege" : info.messageId
                }
            )
        });
        res.cookie('userotp', {
            email: email,
            otp: otp
        });
    })
}

module.exports.studentotpData = (req, res) => {

    if (req.cookies.userotp.otp == req.body.otp) {
        res.json(
            {
                "status" : "1",
                "messege" : "opt match"
            }
        )
    } else {
        res.json(
            {
                "status" : "0",
                "messege" : "opt not match"
            }
        )
    }

}


module.exports.studentnewpassData = (req, res) => {
    let newpass = req.body.newpass;
    let cpass = req.body.cpass;

    if (newpass == cpass) {
        let email = req.cookies.userotp.email;
        subcategory.findOneAndUpdate({email: email},{
            password: newpass
        },(err,data)=>{
            if (err) {
                res.json(
                    {
                        "status" : "0",
                        "messege" : "password not chang"
                    }
                )
            }
            res.json(
                {
                    "status" : "1",
                    "messege" : "password chang"
                }
            )

        });
    }
    else {
        console.log("Newpassword and confirm password are not match");
        return res.redirect('back');
    }
}