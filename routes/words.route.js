var express = require('express')
var shortid = require('shortid');
var db = require('../db')

var router = express.Router()

router.get('/',function(req,res){
  res.render('words/index',{
    words:db.get('words').value()
  })
 })

 router.get('/search', (req,res) => {
  console.log(req.query);
  var name_search = req.query.q 
  var words = db.get('words').value()
  var result = words.filter( (word) => {
    return word.name.toLowerCase().indexOf(name_search.toLowerCase()) !== -1
  })

  res.render('words/index', {
    words: result // render lại trang words/index với biến words bây giờ chỉ bao gồm các kết quả phù hợp
  });
})


 router.get('/create',function(req,res){
  res.render('words/create')
})

  router.get('/:id',function(req,res){
  var id = req.params.id
  var word = db.get('words').find({id:id}).value()
  res.render('words/view',{
    word:word
  })
})

//luu y duong dan va view
  router.get('/delete/:id',function(req,res){
    // Route parameters: thong so duong truyen
  var id = req.params.id
  var word = db.get('words').find({id:id}).value()
  var word = db.get('words').remove({id:id}).write()
  res.redirect('/words')
})


  router.post('/create',function(req,res){
    req.body.id = shortid.generate();
    req.body.date = new Date().toDateString()
    db.get('words').push(req.body).write()
    res.redirect('/words');
})
module.exports = router