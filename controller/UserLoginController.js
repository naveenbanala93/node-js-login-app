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

//code for Login ... 

module.exports.doLogin=function(req,res){
    
	var userName=req.body.email;
    var passWord=req.body.password;
    
    Users.find({email:userName},function(err,data){

         if(data.length){

            bcrypt.compare(passWord,data[0].password,function(err,result){
                if(result){ 
                    // create reusable transporter object using the default SMTP transport
                    var mailOptions =  {
                        from:'admin@no-reply<sampleproject888@gmail.com>', 
                        to:data[0].email, 
                        subject:'Sample project', 
                        html:'<p>You have logged in sample project at'+ new Date()+'</p>' // html body

                    };
                   /* transporter.sendMail(mailOptions, function (err, res) {
                        if (err) {
                            console.log('Error' + err);
                            throw err;
                        }else {
                            console.log('Email Sent'); 
                        }
                    });*/

                    req.session.uniqueId=data[0];
                    //console.log("At login  :"+req.session.uniqueId);
                    res.redirect('/users/home');
                }else{
                    
                    res.json({message:"Login Failed Please try again"});
                }
            }); 
        }else{
            res.json({message:"Email ID not Exists"});
        }

    });
	
};


//Log Out ...

module.exports.doLogout=function(req,res){
    console.log("Before session Destroy  :"+req.session);
    req.session.destroy(function (err) {
        if (err) return next(err);
        console.log("Before session Destroy  :"+req.session);
        res.redirect('/');
    });
};