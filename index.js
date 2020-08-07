var express = require('express')
var app = express()
var port = 3000;
app.set('view engine','pug')
app.set('views','./views')

 // app.get('/',function(req,res){
 //  res.send('Hello coderx')
 // })
 app.get('/',function(req,res){
  res.render('index',{
    name: 'QQQ'
  })
 })
var users = [
    {id:1,name:'Quang'},
    {id:2,name:'Hai'},
    {id:3,name:'Quang3'}
    ]
// Iteration

 app.get('/users',function(req,res){
  res.render('users/index',{
    users:[]
  })
 })

 app.get('/users/search', (req,res) => {
  var name_search = req.query.name // lấy giá trị của key name trong query parameters gửi lên

  var result = users.filter( (user) => {
    // tìm kiếm chuỗi name_search trong user name. 
    // Lưu ý: Chuyển tên về cùng in thường hoặc cùng in hoa để không phân biệt hoa, thường khi tìm kiếm
    return user.name.toLowerCase().indexOf(name_search.toLowerCase()) !== -1
  })

  res.render('users/index', {
    users: result // render lại trang users/index với biến users bây giờ chỉ bao gồm các kết quả phù hợp
  });
})

 app.listen(port,function(){
  console.log('open in port: '+port)
 })