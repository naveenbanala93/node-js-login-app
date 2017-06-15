var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User=require('../model/UserSchema');

 module.exports.doLogin=function(req,res){
 	var username=req.body.username;
 	var password=req.body.password;
 			
 			User.getUserByUsername(username,function(err,userdata){

 				if(err) throw err;
 				console.log(userdata);
 				if(!userdata){	
 					res.json({message:'user not exists..'});

 				}

 					
 				User.comparePassword(password,userdata[0].password,function(err,passwordMatch){

 					if(err) throw err;
 					if(passwordMatch){
 						res.json({message:'login success'});
 					}else{
 						res.json({message:'login failed'});
 					}
 				});

 			});
    
  		

	//res.json({data:'biscuit'});
 }