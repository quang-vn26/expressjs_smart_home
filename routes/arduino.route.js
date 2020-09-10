var express = require('express')
var router = express.Router()
var controller = require('../controllers/arduino.controller.js')
var setScheduleMiddleware = require('../middlewares/arduino.middleware')

var authMiddleware = require('../middlewares/auth.middleware.js')

//get
router.get('/',authMiddleware.requireAuth,controller.index)
// router.get('/chatbot',controller.chatbot)
router.get('/status',controller.status)
router.get('/trangthai',controller.trangthai)
router.get('/lichsu',authMiddleware.requireAuth,controller.lichsu)
router.get('/xoalichsu',authMiddleware.requireAuth,controller.xoalichsu)
router.get('/getApi',controller.getAPI)
router.get('/datlich',authMiddleware.requireAuth,controller.datlich)
router.get('/deleteSchedule',controller.deleteSchedule)
router.get('/deleteScheduleItem/:id',controller.deleteScheduleItem)

//post
router.post('/postApi',controller.postAPI)
router.post('/postSchedule',controller.postSchedule)

module.exports = router