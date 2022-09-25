const jwt = require("jsonwebtoken");
const usermodel = require("../models/usermodel")
const { isValid, isValidEmailRegex, isValidPasswordRegex, isValidPhoneRegex, isValidCharRegex } = require("../validator/validator")

const CreateUser = async function (req, res) {

    try {

        if (Object.keys(req.body).length == 0) return res.status(400).send({ status: false, msg: "No parameter is found ,Plz provide detail" })

        let { title, name, phone, email, password, address } = req.body
        const requestBody = ["title", "name", "phone", "email", "password"]

        //============================ mandatory Field validation =======================//
        for (element of requestBody) {
            if (!isValid(req.body[element])) return res.status(400).send({ status: false, msg: `${element} is required and its must be valid format` })
        }
        //============================== Title validation ==============================//

        if (!["Mr", "Mrs", "Miss"].includes(title)) return res.status(400).send({ status: false, msg: `Title should be among Mr, Mrs, Miss` })

        //=============================== name validation==============================//

        if (!isValidCharRegex(name)) return res.status(400).send({ status: false, msg: "invalid name" })

        //================================== password validation =======================//
        if (!isValidPasswordRegex(password)) {
            return res.status(400).send({ status: false, msg: "Password should be min 8 ans max 15 character.It containt atleast--> 1 Uppercase letter, 1 Lowercase letter, 1 Number, 1 Special character" })
        }
        //=============================email validation=================================//
        if (!isValidEmailRegex(email)) {
            return res.status(400).send({ status: false, msg: "EmailId is invalid" })
        }
        //==============================phone validation================================//
        if (!isValidPhoneRegex(phone)) {
            return res.status(400).send({ status: false, msg: "Phone number is invalid" })
        }
        //======================================MongoDB data check=======================//
        let emailId = await usermodel.findOne({ email: email })
        if (emailId) {
            return res.status(400).send({ status: false, msg: "This is emailId is already taken" })
        }

        let phoneId = await usermodel.findOne({ phone: phone })
        if (phoneId) {
            return res.status(400).send({ status: false, msg: "This Phone number is already taken" })
        }
        //================================== End Validation ==========================================//
        console.log(address)
        let data = { title, name, phone, email, password }
        if (address) {
            if(Array.isArray(address)) return res.status(400).send({status : false , msg : "Address must be in object type"})
            if (typeof address !== "object") return res.status(400).send({ status: false, msg: "address Must be in Object" })
            data.address = address
        }
        let savedata = await usermodel.create(data)
        res.status(201).send({ status: true, message: "Success user register", data: savedata })
    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}


    const loginuser = async (req, res) => {

        try{

            if (Object.keys(req.body).length == 0) { return res.status(400).send({ status: false, msg: "No parameter is found ,Plz provide detail" }) }

            let { email, password } = req.body

            //=============================email validation=================================//

            if (!isValid(email)) return res.status(400).send({ status: false, msg: "email is required" })
            if (!isValidEmailRegex(email)) return res.status(400).send({ status: false, msg: "please enter valid Email" })

            //================================== password validation =======================//

            if (!isValid(password)) return res.status(400).send({ status: false, msg: "please is required" })
            if (!isValidPasswordRegex(password)) return res.status(400).send({ status: false, msg: "please enter valid password" })

            // ================================= Check Authentication ======================//
            let user = await usermodel.findOne({ email: email, password: password });
            if (!user) return res.status(401).send({ status: false, msg: "your email or password is incorrect" })

            // ================================= Create Token Using Jwt =====================//
            let token = jwt.sign(
                {
                    authorId: user._id.toString(),
                    team: "Group-01"
                }, "group-0-secretkey", { expiresIn: "1h" });

            let decoded = jwt.verify(token, "group-0-secretkey")

            res.setHeader("x-api-key", token);
            res.status(200).send({ status: true, msg: "login successful ", data: { token: token, iat: new Date(), exp: new Date(decoded.exp * 1000) } });

        }catch(err){
            return res.status(500).send({status : false , msg : err.message})
        }
    }


module.exports = { CreateUser, loginuser }
