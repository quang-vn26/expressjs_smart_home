var Product = require('../../models/product.model');

module.exports.index = async function(req, res) {
  var products = await Product.find();
  res.json(products);
};

module.exports.create = async function (req,res) {
  /* body... */
  var product = await Product.create(req.body)
  res.json(product)
}
module.exports.viewId = async function (req,res) {
  let id = req.params.id
  let product = await Product.find({_id:id})
  res.json(product)
}