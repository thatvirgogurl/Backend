const teacherModel = require("../models/teacherModel")
const jwt = require('jsonwebtoken')
const createTeacher = async function (req, res) {
    try {
        if (Object.keys(req.body).length == 0) { return res.status(400).send({ status: false, msg: "No parameter is found ,Plz provide detail" }) }

        let { name, mobile, email, password } = req.body

        if (!name) return res.send({ status: false, msg: "name is required" })

        if (!mobile) return res.send({ status: false, msg: "mobile is required" })

        if (!email) return res.send({ status: false, msg: "email is required" })

        if (!password) return res.send({ status: false, msg: "password is required" })

        let findemail = await teacherModel.findOne({ email: email })

        if (findemail) return res.send({ status: false, msg: "email is already exists" })

        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))

            return res.status(400).send({ msg: "email is invalid", status: false })
            
        if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password))

            return res.status(400).send({ msg: "Password is invalid", status: false })

        const teacherData = {
            name ,mobile, email, password
        }
        let savedData = await teacherModel.create(teacherData)
        res.status(201).send({ status: true, message: "Success", data: savedData })
    

    } catch (error) {

        res.status(500).send({ status: false, msg: error.message })
    }
}
const loginTeacher = async (req, res) => {

    try {

        if (Object.keys(req.body).length == 0) { return res.status(400).send({ status: false, msg: "No parameter is found ,Plz provide detail" }) }

        let { email, password } = req.body

        if (!email) return res.status(400).send({ status: false, msg: "email is required" })

        if (!password) return res.status(400).send({ status: false, msg: "please is required" })

        let teacher = await teacherModel.findOne({ email: email, password: password });

        if (!teacher) return res.status(401).send({ status: false, msg: "your email or password is incorrect" })

        // ================================= Create Token Using Jwt =====================//
        let token = jwt.sign(
            { teacherId: teacher._id.toString() },
            "#monalisaMishra",
            { expiresIn: "24h" }
        );
        res.status(200).send({ status: true, message: "teacher login successfull", data: { teacherId: teacher["_id"], token: token } })

    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}

module.exports = { createTeacher,loginTeacher}