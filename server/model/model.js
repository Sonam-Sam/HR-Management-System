const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

var schema = new mongoose.Schema({
    name : {
        type : String,
    },
    employeeid : {
        type : String,
    },
    gender : {
        type : String,
    },
    dob : {
        type : String,
    },
    designation : {
        type : String,
    },
    department : {
        type : String,
    },
    appointmentdate : {
        type : String,
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
