var db = require('../db')
let cookieParser = require('cookie-parser'); 

module.exports.index = function(req,res){
  res.clearCookie('userId');
  res.redirect('/')
 }