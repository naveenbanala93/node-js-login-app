var express = require('express');

var router = express.Router();

var registerController=require('../controllers/registerController');
var fileUploadController=require('../controllers/fileUploadController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//get register page..
router.get('/register',function(req,res){
	res.render('register',message=null);
});
//submit register form
router.post('/registersubmit',function(req,res){
		registerController.doRegister(req,res);
});
//api to get register info 
router.get('/registrationinfo',function(req,res){
	registerController.getInfo(req,res);
});
//api to get perticular record info
router.get('/getInfobyId/:id',function(req,res){
	registerController.getInfobyId(req,res);
});


//route to upload a file 
router.get('/fileUpload',function(req,res){
	res.render('fileupload');
});
//file uplaod post
router.post('/fileUploaded',function(req,res){
	fileUploadController.uploadedFile(req,res);
});


module.exports = router;
