const express = require('express');

const routes = express.Router();

const admincontroller = require('../controllers/AdminControllers');
const studentontroller = require('../controllers/StudentControllers');

const passport = require('passport');

console.log("admin routes start");

routes.post('/registerdata',admincontroller.registerdata);
routes.post('/logindata',admincontroller.logindata);
routes.patch('/updateprofile',passport.authenticate('jwt',{session : false}),admincontroller.updateprofile);




routes.post('/emailData',admincontroller.emailData); 
routes.post('/otpData',admincontroller.otpData);
routes.post('/newpassData',admincontroller.newpassData);


routes.post('/category',admincontroller.category);
routes.get('/categoryviewsubcategory',admincontroller.categoryviewsubcategory);

routes.post('/subcategory',studentontroller.subcategory);
routes.get('/viewsubcategory',studentontroller.viewsubcategory);

routes.post('/studentlogindata',studentontroller.studentlogindata);
routes.patch('/studentupdateprofile',passport.authenticate('jwt',{session : false}),studentontroller.studentupdateprofile);


routes.post('/studentemailData',passport.authenticate('jwt',{session : false}),studentontroller.studentemailData); 
routes.post('/studentotpData',passport.authenticate('jwt',{session : false}),studentontroller.studentotpData);
routes.post('/studentnewpassData',passport.authenticate('jwt',{session : false}),studentontroller.studentnewpassData);


module.exports = routes;