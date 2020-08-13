// var db = require('../db');

// module.exports.index = function(req, res) {
//   var page = parseInt(req.query.page) || 1; // n
//   var perPage = 8; // x

//   var start = (page - 1) * perPage;
//   var end = page * perPage;

//   var drop = (page - 1) * perPage;

//   res.render('products/index', {
//     //products: db.get('products').value().slice(start, end)
//     products: db.get('products').drop(drop).take(perPage).value()
//   });
// };



var md5 = require('md5')
var shortid = require('shortid');
var db = require('../db')

module.exports.index = function(req,res){
  var page = parseInt(req.query.p) || 1 //n
  var perPage = 8;
  var start = (page-1)*perPage
  var end = page*perPage
  var drop = (page -1)*perPage

  res.render('products/index',{
    // products:db.get('products').value().slice(start,end)
    products:db.get('products').drop(drop).take(perPage).value(),
    page:page
  })
 }

module.exports.search =  (req,res) => {
  console.log(req.query);
  var name_search = req.query.q 
  var products = db.get('products').value()
  var result = products.filter( (product) => {
    return product.name.toLowerCase().indexOf(name_search.toLowerCase()) !== -1
  })

  res.render('products/index', {
    products: result // render lại trang products/index với biến products bây giờ chỉ bao gồm các kết quả phù hợp
  });
}


module.exports.create = function(req,res){
  console.log(req.cookies)
  res.render('products/create')
}

module.exports.view_product = function(req,res){
  var id = req.params.id
  var product = db.get('products').find({id:id}).value()
  res.render('products/view',{
    product:product
  })
}

module.exports.delete = function(req,res){
    // Route parameters: thong so duong truyen
  var id = req.params.id
  var product = db.get('products').find({id:id}).value()
  var product = db.get('products').remove({id:id}).write()
  res.redirect('/products')
}

module.exports.postCreate = function(req,res){
    req.body.id = shortid.generate();
    req.body.pw = md5(req.body.pw)
    db.get('products').push(req.body).write()
    res.redirect('/products');
}