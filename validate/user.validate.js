module.exports.user_validate = function (req,res,next) {
  var errors = [];

    if (!req.body.name) {
      errors.push('Name is required.');
    }

    if (!req.body.phone) {
      errors.push('Phone is required');
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