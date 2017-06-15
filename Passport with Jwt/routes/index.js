var express = require('express');
var router = express.Router();
var registerController=require('../controllers/registerController');
var userLoginController=require('../controllers/UserLogin');
var User=require('../model/UserSchema');
var jwt=require('jsonwebtoken');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


/* Register User page... */
router.post('/register', function(req, res, next) {
  	registerController.doRegister(req,res);
});


/* Login User page... */
/*router.post('/login', function(req, res, next) {
  	userLoginController.doLogin(req,res);
})
*/

router.get('/loginpage',function(req,res,next){
	res.render('loginpage');
});


passport.use(new LocalStrategy(
  function(username, password, done) {
   User.getUserByUsername(username,function(err,user){

 				if(err) throw err;
 				console.log(user);
 				if(!user){	
 					return done (null,false,{message:'user unknown ..'});
 					//res.json({message:'user not exists..'});

 				}

 					
 				User.comparePassword(password,user[0].password,function(err,passwordMatch){

 					if(err) throw err;
 					if(passwordMatch){
 						return done(null,user);
 					}else{
 						return done (null,false,{message:'password is invalid ..'});
 						//res.json({message:'login failed'});
 					}
 				});
  });
}));



passport.serializeUser(function(user, done) {
  done(null, user[0].id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});


router.post('/login',
  passport.authenticate('local',{successRedirect:'/home', failureRedirect:'/login'}),
  function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    	//res.json({username:req.user[0].name});
    	res.redirect('/home');

  });

/* GET home page. */
router.get('/home', function(req, res, next) {
  if(req.user){

  	res.render('home',{name:req.user.name});
  /*res.json({message:'user login success',
			username: req.user.name});*/	
  }else{
  	res.json({message:'Please login to access page'});
  }
});


router.get('/logout', function(req, res){
	req.logout();
	res.redirect('/loginpage');
	//res.json({message:'Logout success..'});
});

//json web token generation and checking for time out..
router.get('/generatetoken', function(req, res){
  
  var secret= 'abcdef';
  var token=jwt.sign({data:'tokendata'},secret,{expiresIn: 60});

  res.json({message:'token expired in 10 sec',token:token});

});

router.get('/verifytoken', function(req, res){
        tokenFromQuery=req.query.token;

        jwt.verify(tokenFromQuery,'abcdef',function(err,decode){
            if(decode){
              console.log("token verified");
              console.log("decode dayt:"+ decode.data);
              //res.json({decodedata:decode})
            }else{
               console.log("token EXPIRED ");     
            }
          
        })
      res.json({data:tokenFromQuery});

      });



module.exports = router;
