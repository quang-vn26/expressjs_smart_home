var express = require('express')
var router = express.Router()
var controller = require('../controllers/arduino.controller.js')

//get
router.get('/',controller.index)
router.get('/trangthai',controller.trangthai)
router.get('/lichsu',controller.lichsu)
router.get('/xoalichsu',controller.xoalichsu)
router.get('/datlich',controller.datlich)
router.get('/getApi',controller.getAPI)

//post
router.post('/postApi',controller.postAPI)

// router.get('/getApi',controller.postAPI)
module.exports = router