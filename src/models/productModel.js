const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    productImage: {
        type: String,
        required: true
    },
    deletedAt: {
        type: Date,
        default: null

    },
    isDeleted: {
        type: Boolean,
        default: false
    },
},
    { timestamps: true });

module.exports = mongoose.model('Product', productSchema) 