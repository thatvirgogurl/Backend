const mongoose = require('mongoose');


const authorSchema = new mongoose.Schema({
title: {
        type: String,
        required: true,
        enum: ["Mr", "Mrs", "Miss"]
},
    name: {
        type: String,
        required: true },
    phone: {
        type: String,
        required: true,
        unique: true },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: true,
        match: [/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{15,}$/,'please fill a valid password']
},
    address: {
        street: { type:String },
        city: {type: String },
        pincode: { type: String },
    },
       
},
 { timestamps: true });
 
module.exports = mongoose.model('author',authorSchema)