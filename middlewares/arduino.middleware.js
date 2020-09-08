var db = require('../db')
module.exports.setSchedule = async function (req,res, next) {
    var arduino=  db.get('schedule').value()
    //dat lich cho arduino
    //demo thu dat lich xem sao
    var schedule = require('node-schedule');
    var cronExpress = '*/5 * * * * * *';
    var j = schedule.scheduleJob(cronExpress, function(fireDate){
    console.log('running job!');
    console.log(fireDate)
    });
    var j_daily = schedule.scheduleJob({hour: 20, minute: 42}, function(){
        console.log('Time for work!');
    });
    next()
  }
  