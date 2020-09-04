var User = require('../models/user.model')
module.exports.requireAuth = async function (req,res, next) {
  if(!req.signedCookies.userId){
    res.redirect('/login')
    return
  }
  try {
    console.log('cookies:'+req.signedCookies.userId)
    var user =   User.findOne({_id:req.signedCookies.userId})
    console.log('user')
  } catch(e) {
    console.log("err is:"+e);
  }
  
  if(!user){
    res.redirect('/login')
    return
  }
  res.locals.muser = user
  // console.log('name: '+user.name)
  next()
}

