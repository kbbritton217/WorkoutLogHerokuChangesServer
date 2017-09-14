var router = require('express').Router(); //use express router to handle requests
var sequelize = require('../db.js');
var User = sequelize.import('../models/user');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

router.post('/', function(req,res) {
	//when we post to api user, it will want a user object in the body
	var username = req.body.user.username; //the username that is put in by the client/user -- var 1
	var pass = req.body.user.password;	//the password that is put in by the client/user -- var 2
	//Need to create a user object and use sequelize to put that user into our database
	User.create({ //creating user object
		username: username, // value is same as var 1; key is same as models/user.js
		passwordhash: bcrypt.hashSync(pass, 10) //limits the password hash to 10 hashes; value is the same as var 2; key is same as models/user.js
	}).then( //promise that comes after user is created
			//Sequelize is going to return the object it created from db.
			function createSuccess(user){ //if create is successful, create token
				var token = jwt.sign({id:user.id}, process.env.JWT_SECRET, {expiresIn:60*60*24}); //create token for specific user and set it to expire in X time
				//unique identifier, secret phrase, time slot to expire
				//Successful get this:
				res.json({ //response returned from server when successful; the data for line 54 in web-user/auth.js
					user: user,
					message: 'created',
					sessionToken: token
				})
			},
			function createError(err){ //if create user is unsuccessful send this error
				res.send(500, err.message);
			}
	);
});

module.exports = router; // export this module to be used when router is required