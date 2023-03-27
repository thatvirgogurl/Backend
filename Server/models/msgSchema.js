const mongoose = require('mongoose')

//user schema or Document 
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    phNum:{
        type: String,
        require: true,
        unique: true
    },
    message: {
        type: String,
        require: true
    }
})
    //create model
const Message = new mongoose.model('msg', UserSchema)
module.exports = Message