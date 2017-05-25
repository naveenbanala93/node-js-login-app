
var mongoose=require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://');

var productSchema=mongoose.Schema({

	productname:String,
	brandname:String,
	price:Number,

});

var Products = mongoose.model("Products",productSchema);
module.exports=Products;