var models = require('./models');
var userModel = models.userModel;
var newsModel = models.newsModel;

module.exports = function(app){
    app.get('/',function(req,res,next){
        var news,users;
        newsModel.find(function(err,docs){
            if (err) return next(err);
            var news = docs;
           // res.send(docs);
        });
        userModel.find(function(err,docs){
            if (err) return next(err);
            /*res.render('index',{
                title: 'Express',
                users: docs,
                user: req.session.user
            });*/
           var users = docs;
        });
        res.send(news + ' ' + users);
        /*res.render('index',{
            title: 'Express',
            users: users,
            news: news,
            user: req.session.user
        });*/
    });

    app.get('/reg',function(req,res,next){
        res.render('register');
    });

    app.post('/reg',function(req, res, next){
        var fnid = req.body.fnid;
        if (fnid == 'reg'){
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
                req.session.user = doc;
                res.redirect('/');
            });
        }
        else if(fnid == 'log'){
            var name = req.body.lname,
                password = req.body.lpassword;
            userModel.find({name: name},function(err,doc){
                if (err) return next(err);
                if (doc[0].password == password){
                    req.session.user = doc[0];
                    res.redirect('/');
                }
                else
                    res.render('register',{error: 'Username or password is wrong!'});
            });
        }
        else
            res.render('register',{error: 'Something is wrong!'});
    });

    app.get('/submit',function(req,res,next){
        res.render('submit');
    });

    app.post('/submit',function(req,res){
        var title = req.body.news_title,
            url = req.body.news_url,
            text = req.body.news_text;
        if (!title){
            res.send('Title should not be empty!');
        }
        else{
            newsModel.create({
                title: title,
                url: url,
                text: text,
                user_id: req.session.user,
                ctime: Date.now(),
                score: 1,
                rank: 1,
                up: 1
            },function(err,doc){
                res.send(doc);
            });
        }
    });
    
}
