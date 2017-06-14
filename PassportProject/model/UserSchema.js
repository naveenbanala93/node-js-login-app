
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
mongoose.connect('mongodb://passportdb:passportdb@ds121622.mlab.com:21622/passportdb');
var userSchema=mongoose.Schema({

	name:{type:String},
	email:{type:String, unique:true},
	password:{type:String}
});

var User= mongoose.model("User",userSchema);
module.exports= User;

module.exports.registerUser=function(newUser,callback){
	bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(newUser.password, salt, function(err, hash) {
        newUser.password=hash;
        newUser.save(callback);
    });
});
}

module.exports.getUserByUsername=function(username,callback){

	var query={email:username};
	User.find(query,callback,function(data){
		//console.log(data);
	});

}

module.exports.getUserById=function(id,callback){
	User.findById(id,callback);
}

module.exports.comparePassword=function(userPassword,hash,callback){
	bcrypt.compare(userPassword, hash, function(err, passwordMatch) {
    if(err) throw err;
    callback(null,passwordMatch);

});
}
