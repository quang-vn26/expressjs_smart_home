// 'use strict'
require('dotenv').config()
// console.log(process.env.SESSION_SECRECT)
var express = require('express')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var mongoose = require('mongoose');
var http = require('http');
mongoose.connect(process.env.MONGO_URL,{ useNewUrlParser: true,useUnifiedTopology: true });
var db = require('./db')

var userRouter = require('./routes/user.route')
var loginRouter = require('./routes/login.route')
var logoutRouter = require('./routes/logout.route')

var arduinoRouter = require('./routes/arduino.route')
// var apiArduinoRoute = require('./api/routes/arduino.route');

var authMiddleware = require('./middlewares/auth.middleware.js')
var sessionMiddleware = require('./middlewares/session.middleware');
var setScheduleMiddleware = require('./middlewares/arduino.middleware')

var app = express()
var port = process.env.PORT || 3000;
var server = http.createServer(app);
app.set('view engine','pug')
app.set('views','./views')

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser(process.env.SESSION_SECRECT))
app.use(sessionMiddleware);


app.use(express.static('public'))
// app.use(express.static(__dirname+'/public'))
// app.use(express.static(__dirname + "/staticFiles")); 
 //router
app.use('/users',authMiddleware.requireAuth,userRouter)
app.use('/login',loginRouter)
app.use('/logout',logoutRouter)
app.use('/arduino/',setScheduleMiddleware.setSchedule,arduinoRouter)

 app.get('/',authMiddleware.requireAuth,function(req,res){
  var arduino=  db.get('arduino').value()
  res.render('index',{
    arduino:arduino
  })
 })

app.use(function(req, res, next){
  res.status(404);
  if (req.accepts('html')) {
    res.render('404', { url: req.url });
    return;
  }
  // respond with json
  if (req.accepts('json')) {
    res.send({ error: 'Not found' });
    return;
  }
  // default to plain-text. send()
  res.type('txt').send('Not found');
});

 //----------------------
 


 //for chatbot
const APP_SECRET = process.env.APP_SECRET;
const VALIDATION_TOKEN = process.env.VALIDATION_TOKEN;
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

app.get('/webhook', function(req, res) { // Đây là path để validate tooken bên app facebook gửi qua
  if (req.query['hub.verify_token'] === VALIDATION_TOKEN) {
    res.send(req.query['hub.challenge']);
  }
  res.send('Error, wrong validation token');
});

app.post('/webhook', function(req, res) { // Phần sử lý tin nhắn của người dùng gửi đến
  var entries = req.body.entry;
  for (var entry of entries) {
    var messaging = entry.messaging;
    for (var message of messaging) {
      var senderId = message.sender.id;
      if (message.message) {
        if (message.message.text) {
          var text = message.message.text;
          sendMessage(senderId, "Hello!! I'm a bot. Your message: " + text);
        }
      }
    }
  }
  res.status(200).send("OK");
});

// Đây là function dùng api của facebook để gửi tin nhắn
function sendMessage(senderId, message) {
  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {
      access_token: PAGE_ACCESS_TOKEN,
    },
    method: 'POST',
    json: {
      recipient: {
        id: senderId
      },
      message: {
        text: message
      },
    }
  });
}

app.set('ip', process.env.IP || "0.0.0.0");

//chay server
server.listen(app.get('port'), app.get('ip'), function() {
  console.log("Chat bot server listening at %s:%d ", app.get('ip'), app.get('port'));
});
// app.listen(port,function(){
//   //console.log('open in port: '+port)
//  })