var Products= require('../models/ProductDatabase');
var mongoose=require('mongoose');
mongoose.Promise = global.Promise;
//mongoose.connect('mongodb:');

var UsersDetailsSchema=mongoose.Schema({

	username:String,
	mobileno:{type:Number,unique:true},
	productdetails:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Products' }]

});

var UsersDetails = mongoose.model("UsersDetails",UsersDetailsSchema);
module.exports=UsersDetails;