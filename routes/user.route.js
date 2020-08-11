var express = require('express')
var shortid = require('shortid');
var db = require('../db')

var router = express.Router()

router.get('/',function(req,res){
  res.render('users/index',{
    users:db.get('users').value()
  })
 })

 router.get('/search', (req,res) => {
  console.log(req.query);
  var name_search = req.query.q 
  var users = db.get('users').value()
  var result = users.filter( (user) => {
    return user.name.toLowerCase().indexOf(name_search.toLowerCase()) !== -1
  })

  res.render('users/index', {
    users: result // render lại trang users/index với biến users bây giờ chỉ bao gồm các kết quả phù hợp
  });
})


 router.get('/create',function(req,res){
  res.render('users/create')
})

  router.get('/:id',function(req,res){
  var id = req.params.id
  var user = db.get('users').find({id:id}).value()
  res.render('users/view',{
    user:user
  })
})

//luu y duong dan va view
  router.get('/delete/:id',function(req,res){
    // Route parameters: thong so duong truyen
  var id = req.params.id
  var user = db.get('users').find({id:id}).value()
  var user = db.get('users').remove({id:id}).write()
  res.redirect('/users')
})


  router.post('/create',function(req,res){
    req.body.id = shortid.generate();
    db.get('users').push(req.body).write()
    res.redirect('/users');
})
module.exports = router