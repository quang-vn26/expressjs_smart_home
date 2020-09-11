var express = require('express')
var shortid = require('shortid');
var http = require('http')
var db = require('../db')

var lich = db.get('schedule').value()
var date_now = new Date().toDateString()

var arduino=  db.get('arduino').value()
module.exports.index = async function (req,res,next) {
  res.render('arduino/index',{
    arduino:arduino
  });
}

module.exports.status = function (req,res){
  res.render('arduino/status')
}
module.exports.trangthai = async function (req,res,next) {
  var t =db.get('arduino').value()
  var tmp=""
  t.map(function (x) {
    tmp+=x.id+x.status
  })
  res.send(tmp);
}


module.exports.lichsu = async function (req,res,next) {
  let history = db.get('arduino_history').value()
  res.render('arduino/lichsu',{
    arduino:history
  });
}


module.exports.xoalichsu = async function (req,res,next) {
  db.get('arduino_history').remove().write();
  res.redirect('/arduino/lichsu')
}

module.exports.datlich = function (req,res,next) {
  var arduino=  db.get('schedule').value()
  res.render('arduino/datlich',{
    arduino:arduino,date_now:date_now
  })
}

module.exports.deleteSchedule = async function (req,res,next) {
  db.get('schedule').remove().write();
  res.redirect('/arduino/datlich')
}
module.exports.deleteScheduleItem = async function (req,res,next) {
  var id = req.params.id
  console.log('id:'+id)
  db.get('schedule').remove({id:id}).write();
  // db.get('schedule').find({id:id}).value()
  res.redirect('/arduino/datlich')
}

module.exports.getAPI = async function(req, res) {
  var t =db.get('arduino').value()
 res.json(t);

};

///--------------
module.exports.chatbot = function (req,res){
  let app = express()
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  // console.log('chatbot')
  var chatbot_device = req.body.queryResult.parameters.device
  var chatbot_status = req.body.queryResult.parameters.status

  var c1 = chatbot_device;
  var c2  = chatbot_status;
  if(c1 == 'led_1' || c1== 'led_2' || c1 == 'led_3' || c1 == 'led_4' || c1 == 'fan_1'||c1 == 'fan_2'){
    var chatbot_status_on_db
    if(c2=='on') chatbot_status_on_db = '_bat';
    if(c2=='off') chatbot_status_on_db ='_tat';
    db.get('arduino')
    .find({ id: c1 })
    .assign({ status:chatbot_status_on_db})
    .write()
    // db.get('arduino_history').unshift(req.body).write() 
  }
  return res.json({
    fulfillmentText:  chatbot_device +' now is: '+chatbot_status,
    source: 'chatbot'
  })
}

// -----------------
module.exports.postSchedule = async function (req,res,next) {
  req.body.date = date_now
  req.body.id = shortid.generate();
  db.get('schedule').unshift(req.body).write()
  var t =db.get('schedule').value()
  res.redirect('/arduino/datlich')
}

module.exports.postAPI = async function (req,res,next) {
  req.body.date = new Date()
  if(req.body.status == 'Bật') req.body.status = '_bat'
  else req.body.status = '_tat'
  db.get('arduino')
  .find({ id: req.body.id })
  .assign({ status:req.body.status})
  .write()
  db.get('arduino_history').unshift(req.body).write() 
  res.redirect('/')

}


