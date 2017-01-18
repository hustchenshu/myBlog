var express = require('express');
var router = express.Router();

/*
var crypto = require('crypto'),
    User = require('../models/user.js');
*/

/* GET users listing. */

//  http://localhost:3000/users
router.get('/readWithUser/:uname', function(req, res, next) {
    console.log(req.params.uname)
    var User = global.dbHandel.getModel('user'); 
    User.findOne({name:req.params.uname},function(err,doc){   //通过此model以用户名的条件 查询数据库中的匹配信息
        if(err){                                         //错误就返回给原post处（login.html) 状态码为500的错误
            //res.send(500);
            console.log(err);
        }else if(!doc){                                 //查询不到用户名匹配信息，则用户名不存在
            req.session.error = '用户名不存在';
            console.log( '用户名不存在');
            res.send('用户名不存在');
            //res.send(404);                            //    状态码返回404
        //    res.redirect("/login");
        }else{ 
            var blogsource = global.dbHandel.getModel('blog');  
            blogsource.find({user:req.params.uname},function (err,doc) {
            /* body... */
            if(err){
              console.log(err)
            }
            renderData.type = 'read';
            renderData.blogs = doc;
            console.log(renderData);
            res.render('centerContext',renderData);
          });
        }
    }); 
});

router.get('/readWithId/:titleId', function(req, res, next) {
    console.log(req.params.uname)
    var blogsource = global.dbHandel.getModel('blog');  
    blogsource.findById(req.params.titleId,function (err,doc) {
        /* body... */
        if(err){
          console.log(err)
        }
        var renderData = global.renderData;
        renderData.blog = doc;
        console.log(renderData);
        res.render('blogContext',renderData);
    });
});


router.get('/login', function(req, res, next) {
    if(req.session.user!=undefined){
        res.redirect('/');
    }else{
	   res.render('login',{js:['/javascripts/userRegister.js']});
    }
})
router.post('/login',function(req,res){
	console.log(req.body)
	var User = global.dbHandel.getModel('user');  
    var uname = req.body.uname;                //获取post上来的 data数据中 uname的值
    var upwd = req.body.upwd;
    User.findOne({name:uname},function(err,doc){   //通过此model以用户名的条件 查询数据库中的匹配信息
        if(err){                                         //错误就返回给原post处（login.html) 状态码为500的错误
            //res.send(500);
            console.log(err);
        }else if(!doc){                                 //查询不到用户名匹配信息，则用户名不存在
            req.session.error = '用户名不存在';
            console.log( '用户名不存在');
            res.send('用户名不存在');
            //res.send(404);                            //    状态码返回404
        //    res.redirect("/login");
        }else{ 
            if(upwd != doc.password){     //查询到匹配用户名的信息，但相应的password属性不匹配
                req.session.error = "密码错误";
                console.log( '密码错误');
                res.send('密码错误');
                //res.send(404);
            //    res.redirect("/login");
            }else{                                     //信息匹配成功，则将此对象（匹配到的user) 赋给session.user  并返回成功
                req.session.user = doc;
                res.send('success');
                //res.send(200);
                //res.redirect("/");
            }
        }
    });
});

router.get('/register', function(req, res, next) {
	console.log(req.body.name)
	console.log(req.body.pwd)
	console.log(req.body);
    if(req.session.user!=undefined){
        res.redirect('/');
    }else{
    	res.render('register',{js:['/javascripts/userRegister.js']});
    }
})
router.post('/register',function(req,res){
	 //这里的User就是从model中获取user对象，通过global.dbHandel全局方法（这个方法在app.js中已经实现)
    var User = global.dbHandel.getModel('user');
    var uname = req.body.uname;
    var upwd = req.body.upwd;
    User.findOne({name: uname},function(err,doc){   // 同理 /login 路径的处理方式
    	    	console.log('-----------------------------------------------')
                console.log(doc)
        if(err){ 
            //res.send(500);
            req.session.error =  '网络异常错误！';
            res.send('网络异常错误！');
            console.log(err);
        }else if(doc){ 
            req.session.error = '用户名已存在！';
            res.send('用户名已存在！');
            //res.send(500);
        }else{   
            User.create({                             // 创建一组user对象置入model
                name: uname,
                password: upwd
                },function(err,doc){ 
                    if (err) {
                        //res.send(500);
                        res.send('500');
                        console.log(err);
                    } else {
                        req.session.error = '用户名创建成功！';
                        res.send('success');
                        //res.send(200);
                    }
                }
            );
        }
    });
});

router.get('/logout',function (req,res) {
    /* body... */
    //req.session.destroy();
    delete req.session.user;
    
    req.session.destroy(function(err){
        if(err){
            console.log('err');
            return;
        }
        res.clearCookie('secret');
        res.redirect('/users/login');
    });
})
// http://localhost:3000/users/1
router.get('/1', function(req, res, next) {
  res.send('respond with 1111111111111a resource');
});





module.exports = router;
