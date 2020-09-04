var express = require('express')
var router = express.Router()
var controller = require('../controllers/arduino.controller.js')

router.get('/',controller.index)
router.get('/trangthai',controller.trangthai)
router.post('/postApi',controller.postAPI)
// router.get('/getApi',controller.postAPI)
module.exports = router