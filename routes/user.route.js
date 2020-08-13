var express = require('express')
var router = express.Router()
var user_controller = require('../controllers/user.controller.js')
var validate = require('../validate/user.validate.js')

router.get('/', user_controller.index)
router.get('/search', user_controller.search)
router.get('/create', user_controller.create)
router.get('/:id',user_controller.view_user)
router.get('/delete/:id', user_controller.delete)

// router.get('/test', middkeware1, middkeware2)
// function middkeware1(req,res,next){
//   console.log('1')
//   next()
// }
// function middkeware2(req,res,next){
//   console.log('2')
//   res.send('Hello test')
// }

router.post('/create', validate.user_validate, user_controller.postCreate)
module.exports = router