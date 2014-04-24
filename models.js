var Schema = require('mongoose').Schema;
var userSchema = new Schema({
    name: String,
    email: String,
    password: String
});

var newsSchema = new Schema({
    title: String,
    url: String,
    text: String,
    user_id: Schema.Types.ObjectId,
    ctime: Date,
    score: Number,
    rank: Number,
    up: Number
});

exports.userModel = db.model('userModel',userSchema);
exports.newsModel = db.model('newsModel',newsSchema);
