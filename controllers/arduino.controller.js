var md5 = require('md5')
var shortid = require('shortid');
var db = require('../db')

var arduino=  db.get('arduino').value()
module.exports.index = async function (req,res,next) {
  res.render('arduino/index',{
    arduino:arduino
  });
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
module.exports.datlich = async function (req,res,next) {
  res.render('/arduino/datlich')
}
module.exports.getAPI = async function(req, res) {
  var t =db.get('arduino').value()
 res.json(t);
};

module.exports.postAPI = async function (req,res,next) {
  // req.body.date = new Date().toDateString()
  req.body.date = new Date()
  if(req.body.status == 'Bật') req.body.status = '_bat'
  else req.body.status = '_tat'
  // db.get('arduino').remove({id:req.body.id}).write()
  // db.get('arduino').push(req.body).write() 
  
  db.get('arduino')
  .find({ id: req.body.id })
  .assign({ status:req.body.status})
  .write()
  db.get('arduino_history').unshift(req.body).write() 
  res.redirect('/')

}
