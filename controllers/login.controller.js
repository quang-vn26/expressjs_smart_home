var shortid = require('shortid');
var md5 = require('md5')
var db = require('../db')
//yeu cau model
var User = require('../models/user.model')

module.exports.index = function(req,res){
  res.render('login/index')
 }
// login:db.get('login').value()
//var user = db.get('users').find({id:id}).value()
module.exports.login = async function(req,res){
    var email = req.body.email
    var password = req.body.pw
    // let user = await User.findOne({email:email})
    var user = db.get('users').find({ email: email }).value();
    try {
      user = await User.findOne({email:email})
    } catch(e) {
      // statements
      console.log(e);
    }
    console.log(user.name,user.pw)
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