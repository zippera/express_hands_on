var Schema = require('mongoose').Schema;
var userSchema = new Schema({
    name: String,
    email: String,
    password: String
});

module.exports = db.model('userModel',userSchema);
