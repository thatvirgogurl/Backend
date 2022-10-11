const jwt = require("jsonwebtoken")
const {uploadFile}=require("./aws3")
const bcrypt = require("bcrypt")

const userModel = require("../models/userModel")
const { isValidMail, isValid, isValidName, isValidRequestBody, isValidMobile, isValidPassword,isValidpin } = require("../validator/validation")





const createUser=async function(req, res){

    try{

        
        let files= req.files
        
        if(files && files.length>0){
              let profileImage= await uploadFile( files[0] )
     
              let data = req.body

        if (!isValidRequestBody(data)) return res.status(400).send({ status: false, msg: " body cant't be empty Please enter some data." })

        let { fname,lname, phone, email, password, address } = data



        if (!isValid(fname)) return res.status(400).send({ status: false, message: "name is  required" })
        if (!isValid(lname)) return res.status(400).send({ status: false, message: "name is  required" })
        if (!isValid(email)) return res.status(400).send({ status: false, message: "mail id is required" })
        if (!isValid(phone)) return res.status(400).send({ status: false, message: "phone no. is required" })
        if (!isValid(password)) return res.status(400).send({ status: false, message: "password is required" })

        
        if (!isValidName.test(fname)) return res.status(400).send({
            status: false, msg: "Enter a valid fname",
            validname: "length of fname has to be in between (3-20)  , use only String "
        })

        if (!isValidName.test(lname)) return res.status(400).send({
            status: false, msg: "Enter a valid lname",
            validname: "length of lname has to be in between (3-20)  , use only String "
        })


        if (!isValidMail.test(email)) return res.status(406).send({
            status: false, msg: "email id is not valid",
            ValidMail: "email must be in for e.g. xyz@abc.com format."
        })

        if (!isValidMobile.test(phone)) return res.status(406).send({
            status: false, message: "mobile no. is not valid",
            ValidMobile: "it must be 10 digit Number & it should be a indian mobile no."
        })

        const unique = await userModel.findOne({ $or: [{ phone: phone }, { email: email }] })
        if (unique) {
            if (unique.phone == phone.trim()) {
                return res.status(400).send({ message: `${phone} This phone No. is  already exist` }) //instead of 400 we can also use 409 for conflict
            } else { return res.status(400).send({ message: `${email}:--This maiId is already exist  ` }) } //instead of 400 we can also use 409 for conflict

        }
        if (!isValidPassword(password)) return res.status(400).send({
            status: false, message: "enter valid password  ",
            ValidPassWord: "passWord in between(8-15)& must be contain ==> upperCase,lowerCase,specialCharecter & Number"
        })
        const hash = await bcrypt.hash(password, 10);
        
        if(data.address){
            address=JSON.parse(address)
            const  {shipping,billing}=address
            if(!isValid(shipping.street)){
                return res.status(400).send({status : false, message : "Shipping : street feild is Mandatory"}) 
            }
            if(!isValid(shipping.city)){
                return res.status(400).send({status : false, message : "Shipping : city feild is Mandatory"}) 
            }
            if(!isValidpin(shipping.pincode)){
                return res.status(400).send({status : false, message : "Shipping : pincode feild is Mandatory"}) 
            }
            if(!isValid(billing.street)){
                return res.status(400).send({status : false, message : "Shipping : street feild is Mandatory"}) 
            }
            if(!isValid(billing.city)){
                return res.status(400).send({status : false, message : "Shipping : city feild is Mandatory"}) 
            }
            if(!isValidpin(billing.pincode)){
                return res.status(400).send({status : false, message : "Shipping : pincode feild is Mandatory"}) 
            }
        }else{
            return res.status(400).send({ status: false, msg: " Address is mandatory" })
        }

        const userData = {
            fname,lname,  email,phone, password:hash, address,profileImage
        }
        let savedData = await userModel.create(userData)
        res.status(201).send({ status: true, message: "Success", data: savedData })

        }
        else{
            res.status(400).send({ msg: "No file found" })
        }
        
    }
    catch(err){
        res.status(500).send({msg: err})
    }
    
}





module.exports={createUser}