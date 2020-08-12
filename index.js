var express = require('express')
var bodyParser = require('body-parser')

var userRouter = require('./routes/user.route')
var wordRouter =  require('./routes/words.route')
var app = express()
var port = 3000;
app.set('view engine','pug')
app.set('views','./views')

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

 app.get('/',function(req,res){
  res.render('index',{
    name: 'QQQ'
  })
 })

app.use('/users',userRouter)
app.use('/words',wordRouter)
 //----------------------
 app.listen(port,function(){
  console.log('open in port: '+port)
 })