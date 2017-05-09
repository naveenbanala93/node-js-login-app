var mongoose=require('mongoose');
mongoose.connect('conncetion to mongo db');

var usersSchema=mongoose.Schema({

	firstname:String,
	lastname:String,
	gender:String,
	email:{type:String,unique:true},
	mobileno:String,
	password:String,
	created_at:Date,
	updated_at:Date,
	imagename:String,
	passtoken:String
});

var Users = mongoose.model("Users", usersSchema);
module.exports = Users;
