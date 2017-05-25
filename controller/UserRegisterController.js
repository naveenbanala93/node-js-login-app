var Users=require('../models/UserSchema');
var bcrypt=require('bcrypt');
const nodemailer=require('nodemailer');
const xoauth2=require('xoauth2');
var multer=require('multer');
var session=require('express-session');


//code for sending emails..
var transporter = nodemailer.createTransport( {
                        service:'gmail', 
                        auth: {
                            type:'OAuth2', 
                            user:'sampleproject888@gmail.com', 
                            clientId:'454521292873-gt6s2i4r8tfi8eg56mo4512lv7dhbkkd.apps.googleusercontent.com', 
                            clientSecret:'4D_zfRDA0twr2ni1BOwduhAQ', 
                            refreshToken:'1/dF_z_q_aQfx6G76uX_PIbv67Tx98d1O1CSfAIsn7__c', 
                            accessToken:'ya29.Gls_BM9D_c67g7kAAJokISRd4l3Brwb_248zlrnfpdEHCEgKctGiBSWCRHqX3yP111kPnNjmuXLbVd3jbIxihLFOsZcM_oGYpo9NRNNPYMpKe1E8QegG21D3p0HE'
                        }
                    })

//Hash Making code 
var hashMaking=function(password){
	var hashedString = bcrypt.hashSync(password,10);
	return hashedString;
};

module.exports.doRegister=function(req,res){

	var registrationInfo=req.body; //Get the form data

	//storing in variables 
	var firstName=registrationInfo.firstname.trim();
	var lastName=registrationInfo.lastname.trim();
	var gender= registrationInfo.gender.trim();
	var emailID=registrationInfo.email.trim();
	var mobileNo=registrationInfo.mobile.trim();
	var password=hashMaking(registrationInfo.password.trim());


	if(!firstName || !lastName || !gender || !emailID || !mobileNo || !password ){
		res.redirect('/users/register');

	}else{

		var newUserRegistration=new Users({		
				
				firstname:firstName,
				lastname:lastName,
				gender:gender,
				email:emailID,
				mobileno:mobileNo,
				password:password,
				created_at:new Date(),
				updated_at:new Date()

		});

	}

	newUserRegistration.save(function(err, Users){
		if(err){
			res.json({message:'error occured while storing data'});
		}
	});
	// create reusable transporter object using the default SMTP transport
                    var mailOptions =  {
                        from:'admin@no-reply<sampleproject888@gmail.com>', 
                        to:emailID, 
                        subject:'Sample project Registration', 
                        html:'<p>You have Successfully Registered with us Please click the link to login</p> <a href= "http://192.168.150.69:3000/" >Click To Login </a> ' // html body
                        	
                    };
                    transporter.sendMail(mailOptions, function (err, res) {
                        if (err) {
                            console.log('Error' + err);
                            throw err;
                        }else {
                            console.log('Email Sent'); 
                        }
                    });
    req.flash('register', 'Registered Successfully Please Login');                
	res.redirect('/');

};


module.exports.updateProfilePic=function(req,res){
	var finalFileName;
	var storage = multer.diskStorage({
  		destination: function (req, file, cb) {
    	cb(null, 'D:/node js/node js projects/project3images')
  		},
  		filename: function (req, file, cb) {
  		var arr=file.originalname.split(".");
  		finalFileName=arr[0] + '-' + Date.now()+ "."+arr[1]
    	cb(null,finalFileName )
  		}
	});	
	var upload = multer({ storage: storage }).single('file');
	upload(req, res, function (err) {
    if(err) {
     res.redirect('/users/home');
    }
    //file upload success and update the file name in database..
    var userId=req.session.uniqueId._id;
   	Users.update({_id:userId},{imagename:finalFileName},function(err){

			if(err){
				throw err;
				console.log("error"+err);
			}
		});
   	req.session.uniqueId.imagename=finalFileName;
    res.redirect('/users/home');
  	});
};

