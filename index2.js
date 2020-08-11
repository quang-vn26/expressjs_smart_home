var express = require('express')
var bodyParser = require('body-parser')
var low = require('lowdb')
var FileSync = require('lowdb/adapters/FileSync')
var adapter = new FileSync('db.json')
 db = low(adapter)
// Set some defaults (required if your JSON file is empty)
db.defaults({ users:[]})
  .write()

var app = express()
var port = 3000;
app.set('view engine','pug')
app.set('views','./views')

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

 app.get('/',function(req,res){
  res.render('index',{
    name: 'QQQ'
  })
 })

 app.get('/users',function(req,res){
  res.render('users/index',{
    users:db.get('users').value()
  })
 })

 app.get('/users/search', (req,res) => {
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

  app.get('/users/:id',function(req,res){
    // Route parameters: thong so duong truyen
  var id = parseInt(req.params.id)
  var user = db.get('users').find({id:id}).value()
  res.render('users/view',{
    user:user
  })
})

   app.get('/users/create',function(req,res){
  res.render('users/create')
})

  app.post('/users/create',function(req,res){
    console.log(req.body)
    db.get('users').push(req.body).write()
    res.redirect('/users');
})

  app.get('/users/delete/:id',function(req,res){
    // Route parameters: thong so duong truyen
  var id = parseInt(req.params.id)
  var user = db.get('users').find({id:id}).value()
  var user = db,get('users').remove({id:id}).write()
  res.render('users/view',{
    user:user
  })
})

 //----------------------
 app.listen(port,function(){
  console.log('open in port: '+port)
 })