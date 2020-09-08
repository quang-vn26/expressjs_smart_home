var db = require('../db')
module.exports.setSchedule = async function (req,res, next) {
    console.log('Set schedule')
    var arduino=  db.get('schedule').value()
    await arduino.map(function (t) {
        var hour_now = new Date().getHours()
        var minute_now = new Date().getMinutes()
        var date_now = new Date().getDate()
        if(t.time == undefined) next()
        console.log('t.time:'+t.time)
        var hour_schedule = t.time.charAt(0)+t.time.charAt(1)
        // var minute_schedule = t.time.slice(3,5)
        var minute_schedule = t.time.charAt(3)+t.time.charAt(4)
        var date_schedule = new Date(t.date).getDate()
        if( hour_schedule== hour_now && minute_schedule ==minute_now){
            if(t.repeat == 'No'){
                console.log('no is now doing')
                //thuc hien dat lich
                //update arduino value status
                update_date(t)
                //xoa schedule
                db.get('schedule').remove({id:t.id}).write();
            }
            else if(t.repeat == 'Everyday'){
                console.log('everyday')
                //thuc hien dat lich
                 //update value
                update_date(t)
            }
                else{
                    console.log('weekly')
                    //kiem tra ngay cua week vs date_now
                    if(date_now==date_schedule)
                        update_date(t)
                }
        }
           
            

    })
    function update_date(collection){
        var set_schedule = db.get('arduino')
        .find({ id: collection.device })
        .assign({ status:collection.status,date:new Date()})
        .write()
        db.get('arduino_history').unshift(set_schedule).write() 
    }
    next()
  }
  