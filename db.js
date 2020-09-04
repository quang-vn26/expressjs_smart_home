var low = require('lowdb')
var FileSync = require('lowdb/adapters/FileSync')
var adapter = new FileSync('db.json')
db = low(adapter)
db.defaults({ words:[]}).write()
db.defaults({ arduino:[],arduino_history:[],schedule:[]}).write()
module.exports = db
