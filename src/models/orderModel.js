const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const orderSchema = new mongoose.Schema({
    
    userId: {
        type: ObjectId,
        ref: "NewUser"
    },
    productId:{
        type:ObjectId,
        ref:"Product"

    },
    
    amount: Number ,
    isFreeAppUser: Boolean,
    date: String
}, { timestamps: true });

module.exports = mongoose.model('order', orderSchema)