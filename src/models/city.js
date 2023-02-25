const mongoose = require('mongoose')

const citySchema = new mongoose.Schema({
   name:{
    type:String,
    require:true
   }
})
module.exports=mongoose.model('city', citySchema);