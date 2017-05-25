
/*module.exports.doRegister=function(req,res){

			var data={

				name:req.body.name,
				age:req.body.age,
				location:req.body.location,	
			
			};
		
	res.json(data);

} ;*/

var Registration = require('./registrationFormDb');
module.exports.doRegister=function(req,res){

	var registrationInfo=req.body;//get the form data

	var firstName=registrationInfo.firstname;
	var lastName=registrationInfo.lastname;
	var age=registrationInfo.age;
	var email=registrationInfo.email;
	var	mobileno=registrationInfo.mobileno;
	var location=registrationInfo.location;
	var nationality=registrationInfo.nationality;


	if(!firstName || !lastName || !age || !email || !mobileno || !location || !nationality ){
		res.redirect('/register');

	}else{

		var newRegistration=new Registration({

			firstname:firstName,
			lastname:lastName,
			age:age,
			email:email,
			mobileno:mobileno,
			location:location,
			nationality:nationality

		});

	}

/*	newRegistration.save(function(err, Registration){
		if(err){
			res.json({message:'error occured while storing data'});
		}
	});*/

	res.json({message:'data submitted success fully',data:registrationInfo});
};

//getting data from registration table
module.exports.getInfo=function(req,res){

		Registration.find(function(err,data){
			if(err){
				throw err;
			}
			
			if(data.length){
				res.json(data);
			}else{
				res.json({message:"NO records Exists"})
			}
		});
		
};

//getting data of a perticular record

module.exports.getInfobyId=function(req,res){
		//var ObjectId = require('mongodb').ObjectID;
		var id=req.params.id;

		Registration.find({_id:id}, function(err,data){

			if(err){
				throw err;
			}
			
			if(data.length){
				res.json(data);
			}else{
				res.json({message:"NO record Exists by given Id"})
			}
		});


};


