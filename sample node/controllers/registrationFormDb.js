var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/sampledb');


var registrationSchema = mongoose.Schema({
   firstname: String,
   lastname: String,
   age: Number,
   email: String,
   mobileno:Number,
   location:String,
   nationality:String,
   timestamps:true

});
var Registration = mongoose.model("Registration", registrationSchema);
module.exports = Registration;