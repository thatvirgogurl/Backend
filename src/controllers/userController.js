const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const mongoose = require('mongoose')
const userModel = require("../models/userModel")
const { validMail, validName } = require("../validator/validation")

const createUser = async function (req, res) {
    try {
        let data = req.body
        // ------------------ valiadtions start ---------------------------------
        if (data.length==0) return res.status(400).send({ status: false, msg: " body cant't be empty Please enter some data." })
        let { Name ,email, password} = data

        if (!Name) {
            return res.status(400).send({ status: false, message: "name is  required" })
        }
        if (!email) {
            return res.status(400).send({ status: false, message: "mail id is required" })
        }
        if (!password) {
            return res.status(400).send({ status: false, message: "password is required" })
        }
        if (!validName(Name)) return res.status(400).send({
            status: false, msg: "Enter a valid lname",
            validname: "length of lname has to be in between (3-20)  , use only String "
        })
        if (!validMail(email)) return res.status(400).send({
            status: false, msg: "email id is not valid",
            ValidMail: "email must be in for e.g. xyz@abc.com format."
        })
        const unique = await userModel.findOne( { email: email })
        if (unique) {
        return res.status(400).send({ message: `${email}:--This maiId is already exist  ` }) //instead of 400 we can also use 409 for conflict
        }

        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt);
        // ------------------------- validations end -----------------------------------

        const userData = {
            Name, email,password: hash
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
        // ------------------ valiadtions start ---------------------------------

        if (req.body.length==0) return res.status(400).send({ status: false, message: "request body can't be empty enter some data." })
        let email = req.body.email
        if (!email) return res.status(400).send({ status: false, message: "email required" })
        if (!validMail(email)) return res.status(400).send({ status: false, message: "enter a valid email" })
        let password = req.body.password
        if (!password) return res.status(400).send({ status: false, message: "password is required" })
        let verifyUser = await userModel.findOne({ email: email })
        if (verifyUser) {
            const result = await bcrypt.compare(password, verifyUser.password);
            if (!result) return res.status(400).send({ status: false, message: "password  is incorrect" })
        } else {
            return res.status(400).send({ status: false, message: "email  is incorrect" })
        }
        // ------------------------- validations end -----------------------------------
        let token = jwt.sign(
            { userId: verifyUser._id.toString() },
            "#@Monalisa14",
            { expiresIn: "24h" }
        );
        res.status(200).send({ status: true, message: "User login successfull", data: { userId: verifyUser["_id"], token: token } })
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
};

module.exports = { createUser, loginUser }