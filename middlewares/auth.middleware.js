var User = require('../models/user.model')
module.exports.requireAuth = function (req,res, next) {
  if(!req.signedCookies.userId){
    res.redirect('/login')
    return
  }
  try {
    var user = User.findOne({_id:req.signedCookies.userId})
  } catch(e) {
    console.log(e);
  }
  
  if(!user){
    res.redirect('/login')
    return
  }
  res.locals.muser = user
  console.log('name: '+user.name)
  next()
}

