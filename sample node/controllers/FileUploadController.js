
var multer=require('multer');
module.exports.uploadedFile=function(req,res){

	var storage = multer.diskStorage({
  		destination: function (req, file, cb) {
    	cb(null, 'D:/node js/fileuploads')
  		},
  		filename: function (req, file, cb) {
  		var arr=file.originalname.split(".");
    	cb(null, arr[0] + '-' + Date.now()+ "."+arr[1])
  		}
	});	
	var upload = multer({ storage: storage }).single('file');
	upload(req, res, function (err) {
    if(err) {
     res.send('error while uploading file');
    }
    res.send('file uploaded successfully');
  	});

};