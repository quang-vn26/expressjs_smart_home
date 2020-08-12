var express = require('express')
var router = express.Router()
var word_controller = require('../controllers/word.controller.js')

router.get('/', word_controller.index)
router.get('/search', word_controller.search)
router.get('/create', word_controller.create)
router.get('/:id', word_controller.view_word)
router.get('/delete/:id', word_controller.delete)

router.post('/create', word_controller.postCreate)
module.exports = router