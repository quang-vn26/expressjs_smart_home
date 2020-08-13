var shortid = require('shortid');
var md5 = require('md5')
var db = require('../db')

module.exports.index = function(req,res){
  res.render('login/index',{
    users:db.get('users').value()
  })
 }
// login:db.get('login').value()
//var user = db.get('users').find({id:id}).value()
module.exports.login = function(req,res){
    var email = req.body.email
    var password = req.body.pw

    var user = db.get('users').find({ email: email }).value();

    if(!user){
      res.render('login/index', {
        errors: [
          'User does not exist.'
        ],
        values: req.body
      });
    return;
  }

  var hashPassword = md5(password)
  if(user.pw != hashPassword){
    res.render('login/index', {
        errors: [
          'Password does not true.'
        ],
        values: req.body
      });
    return;
  }
  // res.cookie('userId', user.id);
  res.cookie('userId',user.id,{
    signed: true
  })
  res.redirect('/users');
}