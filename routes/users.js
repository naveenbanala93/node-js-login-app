var Users=require('../models/UserSchema');
var bcrypt=require('bcrypt');
var express = require('express');
var router = express.Router();
var session=require('express-session');

var userController=require('../controller/UserRegisterController');
var userLoginController=require('../controller/UserLoginController');
var userForgotController=require('../controller/ForgotPasswordController');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* Get registration Form..*/
router.get('/register',function(req,res,next){
	res.render('user-register');
});
/* Do registration.. */
router.post('/register',function(req,res,next){
		userController.doRegister(req,res);
});


/*users Login... */
router.post('/login',function(req,res){
	userLoginController.doLogin(req,res);
});

/*users home... */
router.get("/home",function(req,res){

	if(req.session.uniqueId){
		res.render('user-home',{userProfile:req.session.uniqueId});
	}else{
		res.redirect('/');
	}	
});


/*users profile pic change... */
router.post("/setProfilePic",function(req,res){

	if(req.session.uniqueId){
		userController.updateProfilePic(req,res);
	}else{
		res.redirect('/');
	}	
});


/*users Logout... */
router.get('/logout',function(req,res){
	userLoginController.doLogout(req,res);    
});



/*users Change Password ... */
router.get('/forgotPass',function(req,res,next){
	res.render('forgot-password');
});

router.post('/forgotPass',function(req,res,next){
	userForgotController.sendLinkToEmail(req,res);
});

//link from email...
router.get('/changePassword/:id',function(req,res,next){
	res.render('change-password',{pToken:req.params.id});
});

router.post('/changePassword',function(req,res,next){
	userForgotController.changePassword(req,res);
});



module.exports = router;
