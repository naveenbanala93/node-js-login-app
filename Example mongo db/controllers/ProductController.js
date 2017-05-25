var Products= require('../models/ProductDatabase');

/*code to insert product details into collection*/
module.exports.insertProductDetails=function(req,res){

	var productName=req.body.productname;
	var brandName=req.body.brandname;
	var price=req.body.price;
	
	var newProductDetails=new Products({
			productname:productName,
			brandname:brandName,
			price:price

	});

	newProductDetails.save(function(err,data){
		if(err){
			res.json({error:'some thing went wrong'});
			console.log("error  "+ err);
		}
		res.json({data:newProductDetails});
	});

};

module.exports.getAllProducts=function(req,res){

	Products.find({},function(err,data){
		if(err) throw err;
		res.json({data:data});
	});
};