const moment = require('moment');
const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique:true },
    excerpt: { type: String, required: true },
    userId: {
        type: ObjectId,
        ref: "Author",
        required: true
},
    ISBN: { type: String, required: true, unique:true },
    category: { string, mandatory },
    subcategory: { type: [String], required: true }, 
    //reviews: { type:Number, default: 0, comment: Holds number of reviews of this book },
    deletedAt: { type: String, default: moment().format("DD/MM/YYYY , h:mm:ss a") } ,
    isDeleted: { type: Boolean, default: false },
    releasedAt: { type: String, default: moment().format("DD/MM/YYYY , h:mm:ss a") }
}, { timestamps: true });
module.exports = mongoose.model('Book', bookSchema)