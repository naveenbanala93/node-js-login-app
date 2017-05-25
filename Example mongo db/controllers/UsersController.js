var Products= require('../models/ProductDatabase');
var UsersDetails= require('../models/UsersDatabase');

/*code to insert product details into collection*/
module.exports.userCreation=function(req,res){
	var userInfo=req.body;
	var userName=userInfo.username.trim();
	var mobileNo=userInfo.mobileno.trim();
	var productName=userInfo.productname.trim();
	var mobileName=userInfo.mobilename;
	var tvName=userInfo.tvname;
	var laptopName=userInfo.laptopname;
	var brandName;
	if(mobileName!=""){
		brandName=mobileName;
	}
	if(tvName!=""){
		brandName=tvName;
	}

	if(laptopName!=""){
		brandName=laptopName;
	}


		Products.find({productname:productName,brandname:brandName},function(err,data){
		if(data.length){
				//user mobile already registered...
				UsersDetails.find({mobileno:mobileNo},function(err,usersdata){
					if(usersdata.length){
						console.log(data[0]._id);
						usersdata[0].productdetails.push(data[0]._id);
						usersdata[0].save();
						
						res.json({data:"success"});
					}else{

						var newUserDetails=new UsersDetails({
							username:userName,
							mobileno:mobileNo,
							productdetails:data[0]._id
						});

						newUserDetails.save(function(err,data){
						if(err){
							res.json({error:'some thing went wrong'});
							console.log("error  "+ err);
						}
						res.json({data:"success"});
						});

					}//else close


				});
			
		}
		else{
			res.json({message:"product data not found "});
		}

	});


};


/*code to generate bill*/

module.exports.generateBill=function(req,res){

	var billInfo=req.body;
	var userName=billInfo.username.trim();
	var mobileNo=billInfo.mobileno;
	UsersDetails.find({mobileno:mobileNo})
    .populate('productdetails','price') // multiple path names in one requires mongoose >= 3.6
    .exec(function(err, usersDocuments) {
    	if(usersDocuments.length){
    		var userData=usersDocuments[0];
	    	var userProductsLength=userData.productdetails.length;
	    	var price=0;
	    	for(i=0;i<userProductsLength;i++){
	    		price=price+userData.productdetails[i].price;
	    	}
	    
	        res.json({Bill:price});

    	}else{
    		res.json({data:"user not exists"});
    	}
    	
    });




};