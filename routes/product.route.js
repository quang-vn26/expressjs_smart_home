var express = require('express')
var router = express.Router()
var product_controller = require('../controllers/product.controller.js')
// var validate = require('../validate/product.validate.js')
router.get('/cookie',function(req,res){
  var tmp = res.cookie('product-id',12313)
  res.send('hi')
})
router.get('/', product_controller.index)
router.get('/search', product_controller.search)
router.get('/create', product_controller.create)
router.get('/:id',product_controller.view_product)
// router.get('?:p',product_controller.index)
router.get('/delete/:id', product_controller.delete)

router.post('/create',product_controller.postCreate)
module.exports = router