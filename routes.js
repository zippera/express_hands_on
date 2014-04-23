var userModel = require('./model');

module.exports = function(app){
    app.get('/',function(req,res,next){
        userModel.find(function(err,docs){
            if (err) return next(err);
            res.send(docs)
        });
    });

    app.get('/add',function(req, res, next){
        userModel.create({
            name: 'name' + Date.now(),
            email: 'email' + Date.now(),
            password: 'password' + Date.now()
        },function(err,doc){
            if (err) return next(err);
            res.send(doc);
        });
    });
    
}
