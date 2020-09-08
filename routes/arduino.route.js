var express = require('express')
var router = express.Router()
var controller = require('../controllers/arduino.controller.js')
var setScheduleMiddleware = require('../middlewares/arduino.middleware')

//get
router.get('/',controller.index)
router.get('/trangthai',controller.trangthai)
router.get('/lichsu',controller.lichsu)
router.get('/xoalichsu',controller.xoalichsu)
router.get('/getApi',controller.getAPI)
router.get('/datlich',controller.datlich)
router.get('/deleteSchedule',controller.deleteSchedule)
router.get('/deleteScheduleItem/:id',controller.deleteScheduleItem)

//post
router.post('/postApi',controller.postAPI)
router.post('/postSchedule',controller.postSchedule)

module.exports = router