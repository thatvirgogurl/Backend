
const { name } = require("nodeman/lib/mustache")
const usermodel = require("../models/usermodel")
const passwordregex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{15,}$/
const emailregex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
const phoneregex = /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/
const {isValid} = require("../validator/validator")


const CreateUser = async function(req,res){

 let {title,name,phone,email,paasword} = req.body
 let data = req.body
 if (Object.keys(data).length==0){
    res.status(400).send({status : false , msg : "Data is required"})
 }
 if(!["Mr", "Mrs", "Miss"].includes(title)){
    res.status(400).send({status : false , msg : `required valid title :${title}`})
 }
 let requireddata = ["title","name","phone","email","password"]
 for(data of requireddata){
    if(!isValid(req.body[data]))
    return res.status(400).send({status:false , msg :`${data} is invalid`})
 }
//  for (data of requireddata)
//  if(!req["body"].OwnProperty(req.body)){
//     return res.status(400).send({status : false , msg : `please provide ${data}is mandatory field`})
//  }
    
 
if(!passwordregex.test(data.password)){
    res.status(400).send({status : false , msg : "password is invalid : minlen is 8 and maxLen is 15"})
}
//=============================email validation============================//
if (!emailregex.test(data.email)){
    res.status(400).send({status : false , msg : "EmailId is invalid"})
}
let emailId = await usermodel.findOne({email:data.email})
    if(emailId){
        res.status(400).send({status : false , msg : "This is emailId is already taken"})
    }
//==============================phone validation=========================//
if(!phoneregex.test(data.phone)){
    res.status(400).send({status : false , msg : "Phone number is invalid"})
}
let phoneId =await usermodel.findOne({phone:data.email})
if(phoneId){
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

//---format---//

// let validE = validEmail.test(email)
// if (!validE) { return res.status(400).send({ status: false, msg: "email id valid format =>(examplexx@xyz.xyz)" }) }
// let validP = passValid.test(password)
// // if (!validP) { return res.status(400).send({ status: false, msg: "please fill a valid password" }) }


// const loginuser = async (req, res) => {
// let data = req.body

//         if (Object.keys(data).length == 0) 
//         { return res.status(400).send({ status: false, msg: "incomplete request data/please provide more data" }) }


//         let { email, password } = data
//         if (!email) {
//             return res.status(400).send({ status: false, msg: "please enter  your email" })
//         } else if (!password) {
//             return res.status(400).send({ status: false, msg: "please enter your password" })
//         } else {
//             let user = await userModel.findOne({ email: email, password: password });
//             if (!user) {
//                 return res.status(401).send({ status: false, msg: "your email or password is incorrect" })
//             } else {
//                 let token = jwt.sign(
//                     {
//                         authorId: user._id.toString(),
//                         exp: "uug",
//                         iat: "hhj",
//                         team: "Group-01"
//                     }, "group-0-secretkey");
//                res.setHeader("x-api-key", token);
//              res.status(200).send({ status: true, msg: "login successful ",token });
//            }
//   }
// }
// module.exports={CreateUser,loginuser}