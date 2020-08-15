var express = require('express')
var router = express.Router()
var logout_controller = require('../controllers/logout.controller.js')

router.get('/', logout_controller.index)
// router.post('/logout', logout_controller.logout)

module.exports = router