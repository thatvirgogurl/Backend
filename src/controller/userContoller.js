const { name } = require("nodeman/lib/mustache");
const usermodel = require("../model/usermodel")
passwordregex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{15,}$/
emailregex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
phoneregex = "(0/91)?[7-9][0-9]{9}"


const ValidString = function(data){
if(typeof data!= "string"|| data.trim().length==0 ){
return false ;
}
    return true;
}

const CreateUser = async function(req,res){
//  let data = req.body
 if (Object.keys(req.body).length==0){
    res.status(400).send({status : false , msg : "Data is required"})
 }
 let requireddata = [title,name,phone,email,password,address,]
 for(data of requireddata){
    if(!isValidString(req.body[data]))
    return res.status(400).send({status:false , msg :`${data} is invalid`})
 }
 for (data of requireddata)
 if(!req["body"].OwnProperty(req.body)){
    return res.status(400).send({status : false , msg : `please provide ${data}is mandatory field`})
 }
    
 if(![Mr, Mrs, Miss].includes(title)){
    res.status(400).send({status : false , msg : `required valid title :${title}`})
 }
if(!passwordregex.test(req.body)){
    res.status(400).send({status : false , msg : "password is invalid : minlen is 8 and maxLen is 15"})
}
//=============================email validation============================//
if (!emailregex.test(req.body)){
    res.status(400).send({status : false , msg : "EmailId is invalid"})
}
let emailId = await usermodel.find({email})
    if(emailId.length!==0){
        res.status(400).send({status : false , msg : "This is emailId is already taken"})
    }
//==============================phone validation=========================//
if(!phoneregex.test(req.body)){
    res.status(400).send({status : false , msg : "Phone number is invalid"})
}
let phone =await usermodel.find({phone})
if(phone.lenght!==0){
    res.status(400).send({status : false , msg : "This Phone number is already taken"})
}

 let savedata = await usermodel.create(data)
 res.status(201).send({status : true ,  message: Success , data : savedata })

}


module.exports ={ CreateUser}
// { 
//     title: {string, mandatory, enum[Mr, Mrs, Miss]},
//     name: {string, mandatory},
//     phone: {string, mandatory, unique},
//     email: {string, mandatory, valid email, unique}, 
//     password: {string, mandatory, minLen 8, maxLen 15},
//     address: {
//       street: {string},
//       city: {string},
//       pincode: {string}
//     },
//     createdAt: {timestamp},
//     updatedAt: {timestamp}
//   }
// Create a user - atleast 5 users
// - Create a user document from request body.
// - Return HTTP status 201 on a succesful user creation. Also return the user document. The response should be a JSON object like [this](#successful-response-structure)
// - Return HTTP status 400 if no params or invalid params received in request body. The response should be a JSON object like [this](#error-response-structure)
