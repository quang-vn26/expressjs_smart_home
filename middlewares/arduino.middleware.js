var db = require('../db')
module.exports.setSchedule = async function (req,res, next) {

    console.log('Set schedule')

    var arduino=  db.get('schedule').value()

    var schedule = require('node-schedule');

    await arduino.map(function (t) {
        var hour_now = new Date().getHours()
        var minute_now = new Date().getMinutes()
        var date_now = new Date().getDate()
        var hour_schedule = t.time.slice(0,2)
        var minute_schedule = t.time.slice(3,5)
        var date_schedule = new Date(t.date).getDate()
        if( hour_schedule== hour_now && minute_schedule ==minute_now){
            if(t.repeat == 'No'){
                console.log('no')
                //thuc hien dat lich
                //update arduino value status
                //xoa schedule
            }
            else if(t.repeat == 'Everyday'){
                console.log('everyday')
                //thuc hien dat lich
                //update value
            }
                else{
                    console.log('weekly')
                    //kiem tra ngay cua week vs date_now
                    //dung dat lich
                }
        }
           
            

    })
    
    var j_daily = schedule.scheduleJob({hour: 20, minute: 42}, function(){
        console.log('Time for work!');
    });
    next()
  }
  