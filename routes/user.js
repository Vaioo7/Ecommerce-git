const express = require("express");
const routes = express.Router();
const { isAuthenticatedUser } = require("../src/middleware/auth");

const user = require('../controllers/user');

//profile
routes.get('/profile',isAuthenticatedUser,user.profile);
routes.get('/Editprofile',isAuthenticatedUser,user.Editprofile);
routes.post('/Editprofilepage',isAuthenticatedUser,user.Editprofilepage);

//register 
routes.get('/register',user.register);
routes.post('/registerpost',user.registerpost);

//login
routes.get('/login',user.login);
routes.post('/loginpost',user.loginpost);

routes.get('/logout',function(req,res){
    // res.cookie('token','');
    // return res.redirect('/login');
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });
    return res.redirect('/login');
})

//change password
routes.get('/password',isAuthenticatedUser,user.password);
routes.post('/chnagepassword',isAuthenticatedUser,user.chnagepassword);

//lost password
routes.get('/lostpass',user.lostpass);
routes.post('/lostpassword',user.lostpassword);


//otp check
routes.get('/checkOtp',user.checkOtp);
routes.post('/verifyOtp',user.verifyOtp);


//generateNewPass
routes.get('/generateNewPass',user.generateNewPass);
routes.post('/resetPassword',user.resetPassword);


module.exports = routes;
