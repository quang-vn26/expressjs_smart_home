var db = require('../../db')

module.exports.getAPI = async function(req, res) {
   var t =db.get('arduino').value()
  res.json(t);
};