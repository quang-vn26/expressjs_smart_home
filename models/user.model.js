  var mongoose = require('mongoose');
  var userSchema = mongoose.Schema({
    id: String,
    email: String,
    password: String,
    name: String,
    avatar: String,
  });

  //luu vao users colection
  var User = mongoose.model('Users',userSchema,'users')

  module.exports = User