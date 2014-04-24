var models = require('./models');
var userModel = models.userModel;

module.exports = function(app){
    app.get('/',function(req,res,next){
        userModel.find(function(err,docs){
            if (err) return next(err);
            res.render('index',{
                title: 'Express',
                users: docs
            });
        });
    });

    app.get('/reg',function(req,res,next){
        res.render('register');
    });

    app.post('/reg',function(req, res, next){
        var name = req.body.name,
            email = req.body.email,
            password = req.body.password,
            password_re = req.body['password-repeat'];

        if (password_re != password){
            return res.redirect('/');
        }


        userModel.create({
            name: name,
            email: email,
            password: password 
        },function(err,doc){
            if (err) return next(err);
            res.send(doc);
        });
    });
    app.get('/submit',function(req,res,next){
        res.render('submit');
    });
    
}
