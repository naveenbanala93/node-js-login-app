var express = require('express');
var router = express.Router();
var userController=require('../controller/UserRegisterController');
var fs=require('fs');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login-form');
});


module.exports = router;
