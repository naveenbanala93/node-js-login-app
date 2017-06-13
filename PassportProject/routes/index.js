var express = require('express');
var router = express.Router();
var registerController=require('../controllers/registerController');
var userLoginController=require('../controllers/UserLogin');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


/* Register User page... */
router.post('/register', function(req, res, next) {
  	registerController.doRegister(req,res);
});


/* Login User page... */
router.post('/login', function(req, res, next) {
  	userLoginController.doLogin(req,res);
})

module.exports = router;
