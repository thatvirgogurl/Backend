const mongoose=require('mongoose')
const ObjectId = mongoose.Types.ObjectId
const studentSchema=new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    marks: {
        type: Number,
        required: true,
    },
    teacher: {
        type: ObjectId,
         ref: 'teacher', 
         required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
},
    { timestamps: true }
)
module.exports = mongoose.model('student', studentSchema)