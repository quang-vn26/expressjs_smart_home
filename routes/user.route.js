var express = require('express')
var multer  = require('multer');
var router = express.Router()
var user_controller = require('../controllers/user.controller.js')
var validate = require('../validate/user.validate.js')
var upload = multer({ dest: './public/uploads/' });


router.get('/cookie',function(req,res){
  var tmp = res.cookie('user-id',12313)
  res.send('hi')
})
router.get('/', user_controller.index)
router.get('/search', user_controller.search)
router.get('/create', user_controller.create)
router.get('/:id',user_controller.view_user)
router.get('/edit/:id', user_controller.edit)
router.get('/postEdit/:id', user_controller.postEdit)
router.get('/delete/:id', user_controller.delete)

// router.post('/create', validate.user_validate, user_controller.postCreate)
router.post('/create',
  upload.single('avatar'),
  validate.user_validate,
  user_controller.postCreate
);


module.exports = router