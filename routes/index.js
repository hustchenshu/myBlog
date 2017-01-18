var express = require('express');
var router = express.Router();
var app = express();
/* GET home page. */
router.get('/login',function(req,res,next){
  res.render('login');
})

router.get('/', function(req, res, next) {
  console.log(req.session.user)
  var renderData = global.renderData;
  renderData.items=[
      {
        id:1,
        src:'images/1.png',
        alt:'image',
        title:'1',
        active:true
      },
      {
        id:2,
        src:'images/2.png',
        alt:'image',
        title:'2'
      },
      {
        id:3,
        src:'images/3.png',
        title:'3',
        alt:'image'
      },
      {
        id:4,
        src:'images/4.png',
        title:'4',
        alt:'image'
      },
      {
        id:5,
        src:'images/5.png',
        alt:'image'
      }
  ];
  if(req.session.user!=undefined){
    renderData.user=req.session.user
  }
  console.log(renderData)
  res.render('index', renderData);
});

router.get('/edit',function (req,res,next) {
  /* body... */
  var renderData = global.renderData;
  renderData.type = 'edit';
  res.render('centerContext',renderData);

});

router.get('/collections',function (req,res,next) {
  /* body... */
  var renderData = global.renderData;
  renderData.type = 'collections';
  res.render('index',renderData);

});

router.get('/read',function (req,res,next) {
  /* body... */
  var renderData = global.renderData;
  renderData.type = 'read';
  var blogsource = global.dbHandel.getModel('blog');  
  blogsource.find(function (err,doc) {
    /* body... */
    if(err){
      console.log(err)
    }
    renderData.blogs = doc;
    console.log(renderData);
  res.render('centerContext',renderData);
  });
  

})

router.get('/manage',function (req,res,next) {
  /* body... */
  var renderData = global.renderData;
  renderData.type = 'read';
  var blogsource = global.dbHandel.getModel('blog');  
  blogsource.find({user:req.session.user.name},function (err,doc) {
    /* body... */
    if(err){
      console.log(err)
    }
    renderData.blogs = doc;
    console.log(renderData);
  res.render('centerContext',renderData);
  });
 

})

router.post('/post', function(req, res, next) {
  console.log('----------------------------------------------------------------');
  console.log(req.body);
  var blog = global.dbHandel.getModel('blog');  
  var uname = req.session.user.name;                //获取post上来的 data数据中 uname的值\
  // 添加MarkDowm 支持
  var markdown = require('markdown').markdown;
  var htmlcontent = req.body.post;
  var markDownContent='';
  if(req.body.isMD){
    markDownContent = htmlcontent;
    htmlcontent = markdown.toHTML(req.body.post);
  } 
  blog.create({                             // 创建一组user对象置入model
      user: uname,
      title: req.body.title,
      content:htmlcontent,
      MDcontent:markDownContent,
      postDate:new Date()
      },function(err,doc){ 
          if (err) {
              //res.send(500);
              res.send('500');
              console.log(err);
          } else {
              req.session.error = '创建成功！';
              //res.send('success');
              res.render('index', renderData);
          }
      }
  );
});

router.get('/test', function(req, res, next) {
  res.render('test', { num: 2,author:{firstName:'chesssn',lastName:'shu'}});
});

module.exports = router;
