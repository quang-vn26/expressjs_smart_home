var low = require('lowdb')
var FileSync = require('lowdb/adapters/FileSync')
var adapter = new FileSync('db.json')
db = low(adapter)
// db.defaults({ users:[]}).write()
db.defaults({ words:[]}).write()
// db.defaults({ products:[]}).write()
db.defaults({ arduino:[],arduino_history: [] }).write()
// db.defaults({ users: [], sessions: [] })
//   .write();
module.exports = db
