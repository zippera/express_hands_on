var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
//var MongoStore = require('connect-mongo')(express);
var logger = require('morgan');

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
app.use(logger('dev'));
app.use(cookieParser());
app.use(session({
    secret: 'smelly cat',
    key: 'sid',
    cookie:{
        secure: true,
        maxAge: 1000 * 60 * 60 * 24 * 30 // 30 days
    }
 /*   store: new MongoStore({
        db: 'express_hands_on',
        url: uri
    })*/
}));

var routes = require('./routes');

// routes
routes(app);

// listen
app.listen(3000,function(){
    console.log("listening on localhost:3000");
});
