const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:String,
    balance:{
        type:Number,
        default: 100

    },
    address:String,
    age: Number,
    gender: {
        type: String,
        enum: ["male", "female", "LGBTQ"] //"falana" will give an error
    },
    isFreeAppUser:{
        type:Boolean,
        default:false
    }
    
}, { timestamps: true });

module.exports = mongoose.model('NewUser', userSchema) 


// const basicCode = async function (req, res) {
//     let tokenDataInHeaders = req.headers.token
//     console.log(tokenDataInHeaders)

//     console.log("HEADER DATA ABOVE")
//     console.log("hey man, congrats you have reached the Handler")
//     res.send({ msg: "This is coming from controller (handler)" })
// }
// module.exports.basicCode = basicCode