var express = require('express')
var bodyParser = require('body-parser')
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
var users = [
    {id:1,name:'Quang',phone :'123123'},
    {id:2,name:'Hai',phone:'1231231234'},
    {id:3,name:'Quang3',phone:'1231231313'}
    ]
// Iteration

 app.get('/users',function(req,res){
  res.render('users/index',{
    users:users
  })
 })

 app.get('/users/search', (req,res) => {
  console.log(req.query);
  var name_search = req.query.q 
  var result = users.filter( (user) => {
    return user.name.toLowerCase().indexOf(name_search.toLowerCase()) !== -1
  })

  res.render('users/index', {
    users: result // render lại trang users/index với biến users bây giờ chỉ bao gồm các kết quả phù hợp
  });
})


 app.get('/users/create',function(req,res){
  res.render('users/create')
})

  app.post('/users/create',function(req,res){
    console.log(req.body)
    users.push(req.body)
    res.redirect('/users');
})
 //----------------------
 app.listen(port,function(){
  console.log('open in port: '+port)
 })