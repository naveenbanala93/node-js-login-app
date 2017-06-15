var user=require('../model/UserSchema');

module.exports.doRegister=function(req,res){
//collecting form data ...
	

	var username=req.body.name;
	var emailId=req.body.email;	
	var password=req.body.password;

//saving into model...

	var newUser=new user({

		name:username,
		email:emailId,
		password:password

	});

	user.registerUser(newUser,function(err,user){

		if(err) throw err;
		console.log(user);
	});

	res.json({message:'registration success...'});

};