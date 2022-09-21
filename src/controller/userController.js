
//const { name } = require("nodeman/lib/mustache");
const jwt = require("jsonwebtoken");
const usermodel = require("../models/usermodel")
const { isValid, isValidEmailRegex, isValidPasswordRegex, isValidPhoneRegex, isValidRegex1 } = require("../validator/validator")

const CreateUser = async function (req, res) {

    let { title, name, phone, email, password } = req.body

    if(Object.keys(req.body).length == 0) return res.status(400).send({ status: false, msg: "Data is required" })

    //============================== Title validation ==========================================//

    if(!isValid(title)) return res.status(400).send({status : false , msg : "Please give data in Correct format"})
    if (!["Mr", "Mrs", "Miss"].includes(title)) return res.status(400).send({ status: false, msg: `Title should be among Mr, Mrs, Miss` })
    
    //=============================== name validation==============================//
    
    if (!isValid(name)) return res.status(400).send({ status: false, msg: "Please give data in correct format" })
    if (!isValidRegex1(name)) return res.status(400).send({ status: false, msg: "invalid name" })

    //================================== password validation ====================================//

    if (!isValid(password)) {
        return res.status(400).send({ staus: false, msg: "Please give data in correct format" })
    }
    if (!isValidPasswordRegex(password)) {
        return res.status(400).send({ status: false, msg: "Password should be min 8 ans max 100 character.It containt atleast--> 1 Uppercase letter, 1 Lowercase letter, 1 Number, 1 Special character" })
    }

    //=============================email validation============================//

    if (!isValid(email)) {
        return res.status(400).send({ staus: false, msg: "Please give data in correct format" })
    }
    if (!isValidEmailRegex(email)) {
        return res.status(400).send({ status: false, msg: "EmailId is invalid" })
    }

    //==============================phone validation=========================//

    if (!isValid(phone)) {
        return res.status(400).send({ staus: false, msg: "Please give data in correct format" })
    }
    if (!isValidPhoneRegex(phone)) {
        return res.status(400).send({ status: false, msg: "Phone number is invalid" })
    }

    //======================================MongoDB data check==================================================

    let passId = await usermodel.findOne({ password: password })
    if (passId) {
        return res.status(400).send({ status: false, msg: "This is password is already taken" })
    }

    let emailId = await usermodel.findOne({ email: email })
    if (emailId) {
        return res.status(400).send({ status: false, msg: "This is emailId is already taken" })
    }

    let phoneId = await usermodel.findOne({ phone:phone })
    if (phoneId) {
        return res.status(400).send({ status: false, msg: "This Phone number is already taken" })
    }

    //================================== End Validation ==========================================//

    const data = {title, name, phone, email, password}
    let savedata = await usermodel.create(data)
    res.status(201).send({ status: true, message: "Success user register", data: savedata })
}


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

// Create a user - atleast 5 users
// - Create a user document from request body.
// - Return HTTP status 201 on a succesful user creation. Also return the user document. The response should be a JSON object like [this](#successful-response-structure)
// - Return HTTP status 400 if no params or invalid params received in request body. The response should be a JSON object like [this](#error-response-structure)

//const userModel = require("../models/usermodel")
//const jwt = require("jsonwebtoken");
const validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
const passValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{15,}$/

//---format---//

// let validE = validEmail.test(email)
// if (!validE) { return res.status(400).send({ status: false, msg: "email id valid format =>(examplexx@xyz.xyz)" }) }
// let validP = passValid.test(password)
// if (!validP) { return res.status(400).send({ status: false, msg: "please fill a valid password" }) }

// }
// module.exports={CreateUser,loginuser}

const loginuser = async (req, res) => {
    let data = req.body

    if (Object.keys(data).length == 0) { return res.status(400).send({ status: false, msg: "incomplete request data/please provide more data" }) }


    let { email, password } = data
    if (!email) {
        return res.status(400).send({ status: false, msg: "please enter  your email" })
    } else if (!password) {
        return res.status(400).send({ status: false, msg: "please enter your password" })
    } else {
        let user = await userModel.findOne({ email: email, password: password });
        if (!user) {
            return res.status(401).send({ status: false, msg: "your email or password is incorrect" })
        } else {
            let token = jwt.sign(
                {
                    authorId: user._id.toString(),
                    exp: "uug",
                    iat: "hhj",
                    team: "Group-01"
                }, "group-0-secretkey");
            res.setHeader("x-api-key", token);
            res.status(200).send({ status: true, msg: "login successful ", token });
        }
    }
}
module.exports = { CreateUser, loginuser }

