// module.exports = {
//   a=1,
//   b=2
// }
// module.exports.a = 1
// module.exports.b = 2

var shortid = require('shortid');
var db = require('../db')

module.exports.index = function(req,res){
  res.render('login/index',{
    users:db.get('users').value()
  })
 }
// login:db.get('login').value()
//var user = db.get('users').find({id:id}).value()
module.exports.login = function(req,res){
    var errors = [];
    var t2 =req.body.name
    var t = db.get('users').map('name').value()
    var t3 = t.indexOf(t2)
    console.log("t3:"+t3)
    // console.log(req.body.name)
    if (!req.body.name &&  !db.get('users').find({ name:req.body.name }).value()) {
      errors.push('Name is not true');
    }

    if (!req.body.pw && !db.get('users').find({ pw:req.body.pw }).value()) {
      errors.push('Password is not true');
    }

    if (errors.length) {
      res.render('login/index', {
        errors: errors,
        values: req.body
      });
    return;
  }
    res.redirect('/');
}