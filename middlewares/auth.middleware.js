var db = require('../db')
module.exports.requireAuth = function (req,res, next) {
  /* body... */
  // console.log(req.signedCookies)
  // console.log(req.cookies,req.signedCookies)
  if(!req.signedCookies.userId){
    res.redirect('/login')
    return
  }
  var user = db.get('users').find({id:req.signedCookies.userId}).value()
  if(!user){
    res.redirect('/login')
    return
  }
  res.locals.muser = user
  next()
}

