var express = require('express')
var router = express.Router()
var login_controller = require('../controllers/login.controller.js')

router.get('/', login_controller.index)
router.post('/', login_controller.login)

module.exports = router