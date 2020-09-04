var express = require('express');
var controller = require('../controllers/arduino.controller');
var router = express.Router();


router.get('/getAPI', controller.getAPI);
// router.post('/',controller.create);
// router.get('/:id',controller.viewId)
module.exports = router;
