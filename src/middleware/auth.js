const studentModel = require("../models/studentModel")
const jwt = require('jsonwebtoken');
const  mongoose  = require("mongoose");

let authentication = async function (req, res, next) {
    try {
        let token = req.headers["x-api-key"]
        if (!token) return res.status(400).send({ status: false, message: "token must be present" })
        jwt.verify(token, "#monalisaMishra", (error, decodedToken) => {
            if (error) {
                let message = (error.message == "jwt expired" ? "token is expired ,please login again" : "token is invalid,please recheck your token")
                return res.status(401).send({ status: false, msg: message })
            }
            req.decodedToken = decodedToken.teacherId;
            next();
        })
    }
    catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}

let authorization = async function (req, res, next) {
    try {
        let studentId = req.params.studentId
        // --------------- validation ------------------
        if (!mongoose.isValidObjectId(studentId)) return res.status(400).send({ status: false, message: "please provied a valid userId" })
        let student = await studentModel.findOne({ _id: studentId })
        if (!student) return res.status(400).send({ status: false, message: "student is not exist" })
        // -----------------------------------------------//
        if (student.teacher != req.decodedToken) return res.status(403).send({ status: false, message: 'Access denied Unauthorized User' })
        next()
    }
    catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}

module.exports = { authentication, authorization }