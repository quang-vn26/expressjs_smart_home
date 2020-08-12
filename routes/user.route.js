var express = require('express')
var router = express.Router()
var user_controller = require('../controllers/user.controller.js')

router.get('/', user_controller.index)
router.get('/search', user_controller.search)
router.get('/create', user_controller.create)
router.get('/:id', user_controller.view_user)
router.get('/delete/:id', user_controller.delete)

router.post('/create', user_controller.postCreate)
module.exports = router