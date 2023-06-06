const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

var schema = new mongoose.Schema({
    name : {
        type : String,
        require : true
    },
    employeeid : {
        type : String,
        require : true
    },
    gender : {
        type : String,
        require : true
    },
    dob : {
        type : String,
        require : true
    },
    designation : {
        type : String,
        require : true
    },
    department : {
        type : String,
        require : true
    },
    appointmentdate : {
        type : String,
        require : true
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
    },
    password : {
        type : String,
        select : false,
        require : true
    }
});

schema.plugin(passportLocalMongoose, {usernameField : 'employeeid'});
module.exports = mongoose.model('Userdb', schema);
