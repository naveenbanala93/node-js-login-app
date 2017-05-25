var mongoose=require('mongoose');

//mongoose.connect('mongodb://naveen:chintu@ds137100.mlab.com:37100/sairam');
mongoose.connect('mongodb://sample:sample@ds129031.mlab.com:29031/sampledb');
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
