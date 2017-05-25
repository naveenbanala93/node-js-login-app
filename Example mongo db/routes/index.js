var express = require('express');
var router = express.Router();
var products=require('../controllers/ProductController');
var users=require('../controllers/UsersController');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* Inserting Products */
router.post('/insertProduct', function(req, res, next) {
  products.insertProductDetails(req,res);
});

/* Creating Users */
router.get('/buyItem', function(req, res, next) {
  res.render('newuser');
});
/* Creating Users */
router.post('/buyItem', function(req, res, next) {
  users.userCreation(req,res);
});

/* Creating Users */
router.post('/generateBill', function(req, res, next) {
  users.generateBill(req,res);
});


/* get all products data  */
router.get('/getallproducts', function(req, res, next) {
  products.getAllProducts(req,res);
});

module.exports = router;
