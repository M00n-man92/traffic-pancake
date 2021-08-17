const mongoose = require('mongoose')
const schema = new mongoose.Schema({
     fullname:{type:String,unique:true},
     dlType:{type:String},
     dlNum:{type:Number},
     state:{type:String},
     phone_no:{type:Number,min:10},
    nationality:{type:String},
     birday:{type:Date},
     issued_date:{type:Date,default:new Date()},
     expiry_date:{type:Date},
   house_no:{type:Number},
    bloodtype: {
        type: String
        },
    
     sex:{type:String},
     subsity:{type:String},
     district:{type:Number}
     


})

const User = mongoose.model('users', schema)
module.exports = User;