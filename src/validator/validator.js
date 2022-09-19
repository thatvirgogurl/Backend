const mongoose = require("mongoose")

const isValidRequestBody = (value)=>{
    if(Object.keys(value).length == 0) return true ;
    return false;
}

const isValid = (value)=>{
    if(!value || typeof value === "undefined" || typeof value === "null") return false;
    if(typeof value !== "string" || value.trim().length === 0) return false;
    return true
}

const isValidRegex1 = (value)=>{
    if(!/^[a-zA-Z]$/.test(value)) return false
    return true
}

const isValidRegex2 = (value)=>{
    if(!/^[0-9]$/.test(value)) return false
    return true
}

const isValidObjectId = (value)=>{
    if(!mongoose.Type.ObjectId.isValid(value)) return false ;
    return true
}

module.exports = {isValidRequestBody,isValid,isValidRegex1,isValidRegex2,isValidObjectId}