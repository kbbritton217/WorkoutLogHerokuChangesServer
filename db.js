var Sequelize = require('sequelize'); //require Sequelize so that it can communicate with the database. 
//Sequelize uses javascript to create SQL statements to talk to the database
var sequelize = new Sequelize(process.env.DATABASE_URL || //constructor method 
	'postgres://postgres:Luna2015_@localhost:5432/workoutlog', {  	//initialize connection
	dialect: 'postgres'
});

sequelize.authenticate().then( 	//authenticate connection (authenticate is a sequelize method)
	function() { //success
		console.log('connected to workoutlog postgres db');
	},
	function(err){ //failure
		console.log(err);
	}
);

var User = sequelize.import('./models/user'); 	//import user file

module.exports = sequelize; 	//export connection to be used when sequelize is required
