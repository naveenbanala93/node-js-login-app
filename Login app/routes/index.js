var express = require('express');
var router = express.Router();
var userController=require('../controller/UserRegisterController');
var fs=require('fs');
//var flash = require('flash-messages');



/* GET home page. */
router.get('/', function(req, res, next) {
	var linksent=req.flash('linkSent');
	var changed=req.flash('changed');
	var register=req.flash('register');
	 res.render('login-form',{linkMessage:linksent,changeMessage:changed,registerMessage:register});
});

 router.get('/addFlash', function (req, res) {
 	console.log("console at first " + req.flash('info'));

    req.flash('info', 'Flash Message Added');
    res.redirect('/demo');
  });
router.get('/demo', function(req, res, next) {
	var Message=req.flash('info');
	console.log("console at " + Message);
  res.render('index', { message: Message});
})




//route to check 
router.get('/check', function(req, res, next) {
	var time=0;
	var timer=setInterval(function(){
		time +=2;
		if(time>2){
			clearInterval(timer);
			res.send('hi');
			}
	},2000);
});
router.get('/image',function(req,res,next){
	fileToLoad = fs.readFileSync('D:/node js/node js projects/project3images/Hydrangeas-1494262205326.jpg');
    res.writeHead(200, {'Content-Type':  'image/jpeg' });
    res.end(fileToLoad, 'binary');

});

router.get('/token',function(req,res,next){

var token;


res.json({token:token});

});
module.exports = router;
