const mongoose = require("mongoose")

const isValidRequestBody = (value)=>{
    if(Object.keys(value).length == 0) return false ;
    return true;
}

const isValid = (value)=>{
    if(!value || typeof value === "undefined" || typeof value === "null") return false;
    if(typeof value !== "string" || value.trim().length === 0) return false;
    return true
}

const isValidRegex1 = (value)=>{
    if(/^[a-zA-Z-" "]{2,}$/.test(value)) return true
    return false
}

const isValidRegex2 = (value)=>{
    if(!/^(?:ISBN(?:-13)?:?\ )?(?=[0-9]{13}$|(?=(?:[0-9]+[-\ ]){4})[-\ 0-9]{17}$)97[89][-\ ]?[0-9]{1,5}[-\ ]?[0-9]+[-\ ]?[0-9]+[-\ ]?[0-9]$/.test(value)) return false
    return true
}

const isValidObjectId = (value)=>{
    if(!mongoose.Types.ObjectId.isValid(value)) return false;
    return true
}

const isValidPasswordRegex = (value)=>{
    if(!/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&])[a-zA-Z0-9@#$%&]{8,15}$/.test(value)) return false
    return true
}

const isValidEmailRegex = (value)=>{
    if(!/^[a-z0-9_]{3,}@[a-z]{3,}[.]{1}[a-z]{3,6}$/.test(value)) return false
    return true
}

const isValidPhoneRegex = (value)=>{
    if(/^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/.test(value)) return true
    return false
}
module.exports = {isValidRequestBody,isValid,isValidRegex1,isValidRegex2,isValidObjectId,isValidPasswordRegex,isValidEmailRegex,isValidPhoneRegex}