const { name } = require("nodeman/lib/mustache");
const usermodel = require("../model/usermodel")


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
 let requireddata = [title,name,phone,email,password,address,{streer,city,pincode}]
 for(data of requireddata){
    if(!isValidString(req.body[data]))
    return res.status(400).send({status:false , msg :`${data} is invalid`})
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
