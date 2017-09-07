require('dotenv').config();
var express = require('express');
var app = express();
var http = require('http').Server(app);
var bodyParser = require('body-parser');
var sequelize = require('./db.js');


//User.sync(); // reads whats in the database
/****** THIS WILL DROP (DELETE) THE USER TABLE ******/
//User.sync({force:true}); //drops the tale completely 
sequelize.sync();
app.use(bodyParser.json());

app.use(require('./middleware/headers'));
app.use(require('./middleware/validate-session'));
app.use('/api/user', require('./routes/user'));
app.use('/api/login', require('./routes/session'));
app.use('/api/definition', require('./routes/definition'));
app.use('/api/log', require('./routes/log'));

http.listen (process.env.PORT || 3000, function(){
	console.log("app is listening on 3000");
});



