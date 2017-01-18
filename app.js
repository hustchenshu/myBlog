var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var hbs_extend = require('./lib/hbsExtends');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// 设定上传
var multer = require('multer');
var upload = multer({dest:'./public/upload'})

// 设定数据库
var mongoose = require('mongoose');

global.dbHandel = require('./database/dbHandel');
global.db = mongoose.connect("mongodb://localhost:27017/blogdb");



// 设定会话
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

var renderData = { 
    title: '静水流深',
    author:{firstName:'chen',lastName:'shu'},
    barname:'静水流深',
    VerNavs:[
        {name:'浏览',method:'getPublicBlog',url:'/read'},
        {name:'写博客',method:'editBlog',url:'/edit'},
        {name:'博客管理',method:'personalInfos',url:'/manage'},
        {name:'收藏',method:'collections',url:'/collections'}
    ],
    qq:'569874886',
    csdn:'http://blog.csdn.net/dujiajiyiyi',
    github:'https://github.com/hustchenshu',
    address:'Hust'
}
global.renderData = renderData;

app.use(session({ 
    secret: 'secret',
    cookie:{ 
        maxAge: 1000*60*30
    },
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({   //创建新的mongodb数据库
        host: 'localhost',    //数据库的地址，本机的话就是127.0.0.1，也可以是网络主机
        port: 27017,          //数据库的端口号
        //db: 'blogdb'        //数据库的名称。
        url:'mongodb://localhost/blogdb'
    })
}));
app.use(function(req,res,next){ 
    res.locals.user = req.session.user;   // 从session 获取 user对象
    var err = req.session.error;   //获取错误信息
    delete req.session.error;
    res.locals.message = "";   // 展示的信息 message
    if(err){ 
        res.locals.message = '<div class="alert alert-danger" style="margin-bottom:20px;color:red;">'+err+'</div>';
    }
    next();  //中间件传递
});
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(multer());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 定义hbs的扩展
var hbs = require('hbs');
hbs.registerPartials(__dirname + '/views/partials');
hbs_extend.extend();

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});











//module.exports = app;// 这是 4.x 默认的配置，分离了 app 模块,将它注释即可，上线时可以重新改回来

// 下面这点是为了使用nodemon


var debug = require('debug')('my-application'); // debug模块
app.set('port', process.env.PORT || 3000); // 设定监听端口
//启动监听
var server = app.listen(app.get('port'), function() {
debug('Express server listening on port ' + server.address().port);
});

