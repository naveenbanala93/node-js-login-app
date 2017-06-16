var Search = require('../app/models/search');

// app/routes.js
module.exports = function(app, passport) {

	// =====================================
	// HOME PAGE (with login links) ========
	// =====================================
	// app.get('/', function(req, res) {
	// 	res.render('index.ejs'); // load the index.ejs file
	// });

	// =====================================
	// LOGIN ===============================
	// =====================================
	// show the login form
	app.get('/login', function(req, res) {
		// render the page and pass in any flash data if it exists
		res.render('login.ejs', { message: req.flash('loginMessage') });
	});

	// process the login form
	app.post('/login', passport.authenticate('local-login', {}),
		
		function(req, res){
			 res.json({
             	"token" : token,
				 "id":req.user._id
             });
		}
	);

	// =====================================
	// SIGNUP ==============================
	// =====================================
	// show the signup form
	app.get('/signup', function(req, res) {

		// render the page and pass in any flash data if it exists
		res.render('signup.ejs', { message: req.flash('signupMessage') });
	});

	// process the signup form
	app.post('/signup', passport.authenticate('local-signup', {}),
		function(req, res){
			res.json({"loggedmessage":"sucess"})
		}
	);
app.get('/search', function(req,res){
	Search.find({}, function (err, searches) {
		var searchMap  =  {};

		searches.forEach(function(search){
			searchMap = search;
		})
		res.send(searches);
	});
})
app.post('/search', function(req, res){
			// Search.find({}, function (err, search) {
			// 	var searches = search;
			// 	console.log(searches);
			// });
			Search.find({ 'searchId' : req.body.searchId }, function(err, docs) {
				if (err) {
					res({"message":error})
				}
				if(!docs){
					
					var newSearch = new Search({
						search  : req.body.search, 
						searchId: req.body.searchId
					});
					newSearch.save(function(err,docs1){
						if (err) console.log("error")
						else res.json(docs1);
					})
				}
				else {

					Search.update({searchId: req.body.searchId}, {search:req.body.search} ,  {upsert: true, new: true }, function(err, doc){
						if(err){
							console.log("Something wrong when updating data!");
						}
						else{
							res.json(docs);
							console.log(docs)
						}
					});
				}
				
		});
	});


	
	// app.post('/search', function(req, res){
	// 		Search.find({}, function (err, users) {
	// 			//res.send(users);
	// 			console.log(users[0].sessionId);
	// 		});
	// 		Search.find({ 'sessionId' : req.body.searchId }, function(err, docs) {
	// 			if (err) {
	// 				res({"message":error})
	// 			}
	// 			console.log(docs);
	// 			if(!docs){
					
	// 				var newSearch = new Search({
	// 					search  : req.body.search, 
	// 					searchId: req.body.searchId
	// 				});
	// 				newSearch.save(function(err,docs1){
	// 					if (err) console.log("error")
	// 					else res.json(docs1);
	// 				})
	// 			}
	// 			else {

	// 				console.log(req.body.search);
	// 				Search.update({sessionId: req.body.searchId}, {search:req.body.search} ,  {upsert: true, new: true }, function(err, doc){
	// 					if(err){
	// 						console.log("Something wrong when updating data!");
	// 					}
	// 					else{
	// 						console.log(doc);
	// 						res.json(docs);
	// 					}
	// 				});
	// 			}
				
	// 	});
	// });

	// =====================================
	// PROFILE SECTION =========================
	// =====================================
	// we will want this protected so you have to be logged in to visit
	// we will use route middleware to verify this (the isLoggedIn function)
	// app.get('/profile', isLoggedIn, function(req, res) {
	// 	res.render('profile.ejs', {
	// 		user : req.user // get the user out of session and pass to template
	// 	});
	// });

	// =====================================
	// LOGOUT ==============================
	// =====================================
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});
};
