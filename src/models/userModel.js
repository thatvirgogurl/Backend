const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: " name is required",
        trim: true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        required: "email address is required",
        unique: true,
        validate: {
            validator: function (email) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
            }, message: "plese enter a valied email address", isAsync: false
        }
    },
    password: {
        type: String,
        trim: true,
        required: true
    }
},
    { timestamps: true });

module.exports = mongoose.model('Userr', userSchema) 