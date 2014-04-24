var Schema = require('mongoose').Schema;
var userSchema = new Schema({
    name: String,
    email: String,
    password: String
});

exports.userModel = db.model('userModel',userSchema);
