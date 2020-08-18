var User = require('../models/user.model');
module.exports.user_validate = async function (req,res,next) {
    var errors = [];
    var email = req.body.email;
    var m_email = await User.findOne({email:email});
    if (!req.body.name) {
      errors.push('Name is required.');
    }
    if (!req.body.email) {
      errors.push('Email is required');
    }

    if(m_email.email==email){
      errors.push('Email exited')
    }
    if (!req.body.pw) {
      errors.push('Password is required');
    }

    if (errors.length) {
      res.render('users/create', {
        errors: errors,
        values: req.body
      });
    return;
  }

  next();
};