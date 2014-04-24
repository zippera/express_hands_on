var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var bodyParser = require('body-parser');


// connect mongodb
var uri = 'mongodb://localhost/express_hands_on';
global.db = mongoose.createConnection(uri);


var app = express();

// view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//public
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());// req.body.name
app.use(bodyParser.urlencoded());

var routes = require('./routes');

// routes
routes(app);

// listen
app.listen(3000,function(){
    console.log("listening on localhost:3000");
});
