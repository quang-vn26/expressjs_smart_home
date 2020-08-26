var md5 = require('md5')
var shortid = require('shortid');
// var db = require('../db')
var User = require('../models/user.model');

module.exports.index = async function(req,res){
  var user = await User.find()
  res.render('users/index',{
    users:user
  })
 }

module.exports.search = async  (req,res) => {
  // console.log(req.query);
  var name_search = req.query.q 
  // var users = db.get('users').value()
  var users = await User.find()
  var result = users.filter( (user) => {
    return user.name.toLowerCase().indexOf(name_search.toLowerCase()) !== -1
  })

  res.render('users/index', {
    users: result // render lại trang users/index với biến users bây giờ chỉ bao gồm các kết quả phù hợp
  });
}


module.exports.create = function(req,res){
  // console.log(req.cookies)
  res.render('users/create')
}

module.exports.view_user = async function(req,res){
  var id = req.params.id
  // var user = db.get('users').find({id:id}).value()
  let m_user = await User.findOne({_id:id})
  // res.json(user)
  //console.log(m_user.avatar)
  res.render('users/view',{
    user:m_user
  })
}

module.exports.delete = async function(req,res){
    // Route parameters: thong so duong truyen
  var id = req.params.id
  // var user = db.get('users').find({id:id}).value()
  // var user = db.get('users').remove({id:id}).write()
  User.deleteOne({_id:id}).then(
    res.redirect('/users')
  ).catch(err => err);
  
}


module.exports.postCreate =async function(req,res){
    req.body.id = shortid.generate();
    req.body.pw = md5(req.body.pw)
    req.body.avatar = req.file.path.split('/').slice(1).join('/');
    const doc = new User(req.body);
    await doc.save()
    res.redirect('/users');
}
module.exports.edit = async function(req,res){
  var id = req.params.id
  let m_user = await User.findOne({_id:id})
  res.render('users/edit',{
    values:m_user
  })
}

module.exports.postEdit = async function(req,res){
  res.redirect('/users');
  try {
    var id = req.params.id
    await User.deleteOne({_id:id})
    req.body.pw = md5(req.body.pw)
    req.body.avatar = req.file.path.split('/').slice(1).join('/');
    const doc = new User(req.body);
    await doc.save()
    res.redirect('/users');
  } catch (error) {

  }
    
}
