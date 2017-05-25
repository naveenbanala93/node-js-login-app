var Users=require('../models/UserSchema');
var bcrypt=require('bcrypt');
var session=require('express-session');
const nodemailer=require('nodemailer');
const xoauth2=require('xoauth2');



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



/* code to send password change link to email.. */

module.exports.sendLinkToEmail=function(req,res){
	var emailId=req.body.email;
	var tokenGenerated;
	var link;
	Users.find({email:emailId},function(err,data){
		if(data.length){

			//generate a token for password change link..

			tokenGenerated=(Math.random() + 1).toString(36).substring(16) + Date.now() + (Math.random() + 1).toString(36).substring(16);
			link="http://192.168.150.69:3000/users/changePassword/"+ tokenGenerated;
			
			//update generated token in database
			Users.update({email:emailId},{passtoken:tokenGenerated},function(err){
				if(err){
					throw err;
					console.log("error"+err);
				}

				// create reusable transporter object using the default SMTP transport
                var mailOptions =  {
                    from:'admin@no-reply<sampleproject888@gmail.com>', 
                    to:data[0].email, 
                    subject:'password Chage Link', 
                    html:'<p>Please Click the link to Reset Your password</p> <a href='+link+'>Click To Reset Password </a> ' // html body

                };
                transporter.sendMail(mailOptions, function (err, res) {
                    if (err) {
                        console.log('Error' + err);
                        throw err;
                    }else {
                        console.log('Email Sent'); 
                    }
                });

			});
			req.flash('linkSent', 'Password change link sent Successfully');
			res.redirect('/');
			
		}else{
			res.json({message:"Email Id Not exists.."});
		}

	});

};


/* code to change the password.. */

module.exports.changePassword=function(req,res){

	var password1=req.body.password1;
	var password2=req.body.password2;
	var passToken=req.body.pToken;
	if(password1==password2){

		Users.find({passtoken:passToken},function(err,data){

		if(data.length && passToken==data[0].passtoken){
			var id=data[0]._id;
				
			//Hash Making code 
			var hashedString = bcrypt.hashSync(password1,10);
	
			Users.update({_id:id}, {password:hashedString,updated_at:new Date()},function(err){

				if(err){
					throw err;
					console.log("error"+err);
				}

				// create reusable transporter object using the default SMTP transport
                var mailOptions =  {
                    from:'admin@no-reply<sampleproject888@gmail.com>', 
                    to:data[0].email, 
                    subject:'Your Password Changed ', 
                    html:'<p>You have Successfully changed your password. Please click the link to login</p> <a href= "http://192.168.150.69:3000/" >Click To Login </a> ' // html body

                };
                transporter.sendMail(mailOptions, function (err, res) {
                    if (err) {
                        console.log('Error' + err);
                        throw err;
                    }else {
                        console.log('Email Sent'); 
                    }
                    //token null after successfull..
                    Users.update({_id:id},{passtoken:null},function(err){
                    	if(err){
						throw err;
						console.log("error"+err);
						}
                    });

                });

			});
			req.flash('changed', 'Password changed Successfully');
			res.redirect('/');		
		}else{
			res.redirect('/');
		}

		});

	}else{
		res.redirect('/users/changePassword');
	}
	

	

};