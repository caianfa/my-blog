var express = require('express')
var mongoose = require('mongoose')
var swig = require('swig')
var bodyPaser = require('body-parser')


var app = express();
//第一个参数: 模板引擎的名称 同时也是模板文件的后缀 第二个参数表示用于解析处理模板内容的方法
app.engine('html', swig.renderFile)
//设置模板文件存放的目录 第一个参数必须是views 第二个参数是目录
app.set('views', './views')
//注册所使用的模板引擎 第一个参数是 view engine 第二个参数和app.engine这个方法中定义的模板引擎的名称（第一个参数）是一致的
app.set('view engine', 'html')
//在开发过程中 需要取消模板缓存
swig.setDefaults({cache: false})
//设置静态文件托管
app.use('/public', express.static(__dirname + '/public'))

app.use(bodyPaser.urlencoded({extended: true}))

app.use('/admin', require('./routers/admin'))
app.use('/api', require('./routers/api'))
app.use('/main', require('./routers/main'))

mongoose.connect('mongodb://localhost:27018')

var db = mongoose.connection;

db.on('error', function () {
  console.log('connect error')
});
db.once('open', function () {
  console.log('open sucess!')
  app.listen(9527, function() {
    console.log('server listen at 9527')
  })
})

