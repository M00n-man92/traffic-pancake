const mongoose=require('mongoose')
const schema=new mongoose.Schema({
  penalities : [  {penalty_rank:{type:Number},
    penalty_grade:{type:Number},
    timestamp:{type:Date},
    trafficId:{type:Number},
    penalityloc_lon:{type:Number},
    penalityloc_lat:{type:Number},
    paid:{type:Boolean},
    amount:{type:Number},
    isPaid:{type:Boolean}

}],
owner:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'users'
}
}
)
const Penality=mongoose.model('penalty',schema)
module.exports=Penality;