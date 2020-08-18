var shortid = require('shortid');
var db = require('../db')

module.exports.index = function(req,res){
  res.render('words/index',{
    words:db.get('words').value()
  })
 }

module.exports.search =  (req,res) => {
  console.log(req.query);
  var name_search = req.query.q 
  var words = db.get('words').value()
  var result = words.filter( (word) => {
    return word.name.toLowerCase().indexOf(name_search.toLowerCase()) !== -1
  })

  res.render('words/index', {
    words: result // render lại trang words/index với biến words bây giờ chỉ bao gồm các kết quả phù hợp
  });
}


module.exports.create = function(req,res){
  res.render('words/create')
}

module.exports.view_word = function(req,res){
  var id = req.params.id
  var word = db.get('words').find({id:id}).value()
  res.render('words/view',{
    word:word
  })
}

module.exports.delete = function(req,res){
    // Route parameters: thong so duong truyen
  var id = req.params.id
  var word = db.get('words').find({id:id}).value()
  var word = db.get('words').remove({id:id}).write()
  res.redirect('/words')
}

module.exports.postCreate = function(req,res){
    req.body.id = shortid.generate();
    req.body.date = new Date().toDateString()
    //req.body.id = shortid.generate();
    db.get('words').push(req.body).write()
    res.redirect('/words/create');
}