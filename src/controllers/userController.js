
const jwt = require("jsonwebtoken")
const { uploadFile } = require("./aws3")
const bcrypt = require("bcrypt")
const mongoose = require('mongoose')
const { validBody, validName, validMail, validPhone, validPassword, validAddress } = require('../validator/validator')
const userModel = require("../models/userModel")
const { isValidMail, isValid, isValidName, isValidRequestBody, isValidMobile, isValidPassword, isValidpin } = require("../validator/validation")

const createUser = async function (req, res) {
    try {

        let data = req.body


        if (!isValidRequestBody(data)) return res.status(400).send({ status: false, msg: " body cant't be empty Please enter some data." })
        let { fname, lname, phone, email, password, address } = data
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
        if (data.address) {
            address = JSON.parse(address)
            const { shipping, billing } = address
            if (!isValid(shipping.street)) {
                return res.status(400).send({ status: false, message: "Shipping : street feild is Mandatory" })
            }
            if (!isValid(shipping.city)) {
                return res.status(400).send({ status: false, message: "Shipping : city feild is Mandatory" })
            }
            if (!isValidpin(shipping.pincode)) {
                return res.status(400).send({ status: false, message: "Shipping : pincode feild is Mandatory" })
            }
            if (!isValid(billing.street)) {
                return res.status(400).send({ status: false, message: "Shipping : street feild is Mandatory" })
            }
            if (!isValid(billing.city)) {
                return res.status(400).send({ status: false, message: "Shipping : city feild is Mandatory" })
            }
            if (!isValidpin(billing.pincode)) {
                return res.status(400).send({ status: false, message: "Shipping : pincode feild is Mandatory" })
            }

        } else {
            return res.status(400).send({ status: false, msg: " Address is mandatory" })
        }
        let files = req.files
        if (files && files.length > 0) {
            var profileImage = await uploadFile(files[0])
        }
        else {
            return res.status(400).send({ msg: "No file found" })
        }

        const userData = {
            fname, lname, email, phone, password: hash, address, profileImage
        }
        let savedData = await userModel.create(userData)
        res.status(201).send({ status: true, message: "Success", data: savedData })

    }
    catch (err) {
        res.status(500).send({ msg: err.message })
    }

}



const loginUser = async function (req, res) {

    try {
        if (!isValidRequestBody(req.body)) return res.status(400).send({ status: false, message: "request body can't be empty enter some data." })
        let email = req.body.email
        if (!isValid(email)) return res.status(400).send({ status: false, message: "email required" })
        if (!isValidMail.test(email)) return res.status(400).send({ status: false, message: "enter a valid email" })

        let password = req.body.password
        if (!isValid(password)) return res.status(400).send({ status: false, message: "password is required" })

        let verifyUser = await userModel.findOne({ email: email })

        if (verifyUser) {
            const result = await bcrypt.compare(password, verifyUser.password);
            if (!result) return res.status(400).send({ status: false, message: "password  is incorrect" })
        } else {
            return res.status(400).send({ status: false, message: "email  is incorrect" })
        }

        let token = jwt.sign(
            { userId: verifyUser._id.toString() },
            "#@$SamMon#TuRi14",
            { expiresIn: "24h" }
        );
        res.status(201).send({ status: true, message: "User login successfull", data: { userId: verifyUser["_id"], token: token } })
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
};



const getuserById = async function (req, res) {
    try {
        const userId = req.params.userId;

        if (!mongoose.isValidObjectId(userId)) return res.status(400).send({ status: false, message: "please provied a valied userId" })

        let userDetails = await userModel.findById(userId);
        if (!userDetails)
            return res
                .status(404)
                .send({ status: "false", msg: "user not exist" });

        let obj = {}

        let objectOfuserDetails = userDetails.toObject();
        obj = { ...objectOfuserDetails };
        return res.status(200).send({ status: true, message: "User profile details", data: obj });
    } catch (error) {
        return res.status(500).send({ msg: error.message });

    }
}



const updateUser = async function (req, res) {
    try {
        let data = req.body
        let userId = req.params.userId

        if (!mongoose.isValidObjectId(userId)) return res.status(400).send({ status: false, message: "please provied a valied userId" })

        //-------------------------------Authorizition-----------------------------//

        if (userId != req.decodedToken) return res.status(403).send({ status: false, message: 'Un-Authorized User' })

        //-------------------------------Authorizition-----------------------------//

        let files = req.files
        if (!validBody(data)) return res.status(400).send({ status: false, message: 'Please provide something to update' })
        let { fname, lname, email, phone, password, address } = data
        let update = {}
        if (fname) {
            if (validName(fname)) return res.status(400).send({ status: false, message: 'Please provide valid fname' })
            update.fname = fname
        }
        if (lname) {
            if (validName(lname)) return res.status(400).send({ status: false, message: 'Please provide valid lname' })
            update.lname = lname
        }
        if (email) {
            if (!validMail(email)) return res.status(400).send({ status: false, message: 'Please provide valid email' })
            let emailExist = await userModel.findOne({ email: email })
            if (emailExist) return res.status(400).send({ status: false, message: 'email is already exist' })
            update.email = email
        }
        if (files && files.length > 0) {
            let profileImage = await uploadFile(files[0])
            update.profileImage = profileImage
        }
        if (phone) {
            if (!validPhone(phone)) return res.status(400).send({ status: false, message: 'Please provide valid mobile no.' })
            let phoneExist = await userModel.findOne({ phone: phone })
            if (phoneExist) return res.status(400).send({ status: false, message: 'mobile no. is already exist' })
            update.phone = phone
        }
        if (password) {
            if (!validPassword(password)) return res.status(400).send({ status: false, message: 'Please provide valid password' })
            let hash = await bcrypt.hash(password, 10);
            update.password = hash
        }
        if (address) {
            if (!validAddress(JSON.pase(address))) return res.status(400).send({ status: false, message: 'Please provide valid password' })
            update.address = address
        }
        let updatedUser = await userModel.findOneAndUpdate({ _id: userId }, { $set: update }, { new: true })
        return res.status(200).send({ status: true, message: 'User profile updated', data: updatedUser })
    }
    catch (error) {
        return res.status(500).send(error.message)
    }
}


module.exports = { createUser, loginUser, getuserById, updateUser }