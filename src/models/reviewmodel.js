const moment = require('moment');
const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId
const reviewSchema = new mongoose.Schema({
    bookId: {
        type: ObjectId,
        ref: "Author",
        required: true
},
    // reviewedBy: {
    //     type: String, required: true, default: 'Guest', value: "reviewer's name"},
  reviewedAt: { type: String, default: moment().format("DD/MM/YYYY , h:mm:ss a")  },
    rating: { type: Number, required: true, maxlength: 5 },
    review: { type:String },
  isDeleted: { type:Boolean, default: false },
},{ timestamps: true });
module.exports = mongoose.model('review', reviewSchema)