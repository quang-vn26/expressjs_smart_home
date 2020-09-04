var md5 = require('md5')
var shortid = require('shortid');
var db = require('../db')

module.exports.index = async function (req,res,next) {
  res.render('arduino/index');
}

module.exports.trangthai = async function (req,res,next) {
  var t =db.get('arduino').value()
  var tmp=""
  t.map(function (x) {
    tmp+=x.id+x.status
    // if(x.status = 'Bật') tmp+='_bat'
    // else tmp+='_tat'
  })
  res.send(tmp);
}

module.exports.postAPI = async function (req,res,next) {
  // req.body.date = new Date().toDateString()
  req.body.date = new Date()
  if(req.body.status == 'Bật') req.body.status = '_bat'
  else req.body.status = '_tat'
  db.get('arduino').remove({id:req.body.id}).write()
  db.get('arduino').push(req.body).write() 
  db.get('arduino_history').push(req.body).write() 
  res.redirect('/')
}
