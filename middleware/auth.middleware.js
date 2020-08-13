// var db = require('../db');

// module.exports.requireAuth = function(req, res, next) {
//   if (!req.cookies.userId) {
//     res.redirect('/login');
//     return;
//   }
//   var user = db.get('users').find({ id: req.cookies.userId }).value();
//   if (!user) {
//     res.redirect('/login');
//     return;
//   }

//   next();
// };

var db = require('../db')
module.exports.requireAuth = function (req,res, next) {
  /* body... */
  if(!req.cookies.userId){
    res.redirect('/login')
    return
  }
  var user = db.get('users').find({id:req.cookies.userId}).value()
  if(!user){
    res.redirect('/login')
    return
  }
  next()
}

