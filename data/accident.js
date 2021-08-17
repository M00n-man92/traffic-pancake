const mongoose=require('mongoose')
const schema=new mongoose.Schema({
    user:{type:String},
    dicription:{type:String},
    report_id:{type:Number},


})
const report=mongoose.model('reports',schema)
module.exports=report;