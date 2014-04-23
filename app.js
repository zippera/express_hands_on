var express = require('express');
var mongoose = require('mongoose');


// connect mongodb
var uri = 'mongodb://localhost/express_hands_on';
global.db = mongoose.createConnection(uri);


var routes = require('./routes');
var app = express();
// routes
routes(app);

// listen
app.listen(3000,function(){
    console.log("listening on localhost:3000");
});
