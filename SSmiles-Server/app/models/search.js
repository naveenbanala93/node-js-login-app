// app/models/user.js
// load the things we need
var mongoose = require('mongoose');


// define the schema for our user model
var searchSchema = mongoose.Schema({

        search     : String,
        searchId   : String,
        //searchDate : Date
    
});

// methods ======================
// generating a hash
// searchSchema.methods.saveSearch = function(data) {
//     return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
// };

// create the model for users and expose it to our app
module.exports = mongoose.model('Search', searchSchema);

