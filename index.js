require('dotenv').config()
// console.log(process.env.SESSION_SECRECT)
var express = require('express')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')

var userRouter = require('./routes/user.route')
var wordRouter =  require('./routes/words.route')
var loginRouter = require('./routes/login.route')
var productRouter = require('./routes/product.route')
var cartRoute = require('./routes/cart.route');

var authMiddleware = require('./middlewares/auth.middleware.js')
var sessionMiddleware = require('./middlewares/session.middleware');

var app = express()
var port = 3000;
app.set('view engine','pug')
app.set('views','./views')

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser(process.env.SESSION_SECRECT))
app.use(sessionMiddleware);

app.use(express.static('public'))
 //router
app.use('/users',authMiddleware.requireAuth,userRouter)
app.use('/words',authMiddleware.requireAuth,wordRouter)
app.use('/',loginRouter)
app.use('/products',authMiddleware.requireAuth,productRouter)
app.use('/cart', cartRoute);

 app.get('/',authMiddleware.requireAuth,function(req,res){
  res.render('index',{
    name: 'QQQ'
  })
 })
 //----------------------
 app.listen(port,function(){
  //console.log('open in port: '+port)
 })