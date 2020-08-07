var express = require('express')
var app = express()
var port = 3000;
 app.get('/',function(req,res){
  res.send('Hello coderx')
 })

 app.listen(port,function(){
  console.log('open in port: '+port)
 })