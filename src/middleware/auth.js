const userModel = require("../models/userModel")
const jwt = require('jsonwebtoken');
const { default: mongoose } = require("mongoose");

let authentication = function (req, res, next) {
    try {
        let token = req.headers["authorization"];
        if (!token) return res.status(400).send({ status: false, msg: "token must be present" });

        jwt.verify(token, "#@$SamMon#TuRi14", (error, decodedToken) => {
            if (error) {
                let message = (error.message == "jwt expired" ? "token is expired ,please login again" : "token is invalid,please recheck your token")
                return res.status(401).send({ status: false, msg: message })
            }
            //console.log(decodedToken)
            req.decodedToken = decodedToken;
            next();
        });

    }
    catch (error) {
        return res.status(500).send({ status: false, msg: error.message });
    }
}

let authorisation = async function (req, res, next) {

    try {

        let userIdFromToken = req.decodedToken["userId"]
        let userIdFromClient = req.params.userId

        if (userIdFromClient) {

            if (!mongoose.Types.ObjectId.isValid(userIdFromClient)) return res.status(400).send({ msg: "userId is InValid", status: false })
            let findUserDoc = await userModel.findById(userIdFromClient)
            if (!findUserDoc) return res.status(404).send({ msg: "No user resister", status: false })
            if (userIdFromToken !== findUserDoc.userId.toString()) return res.status(403).send({ msg: "user is not Authorised for this operation", status: false })
            next()
        }
        return res.send({ status: false, msg: "Please provide user ID" })

    } catch (err) {
        return res.status(500).send({ msg: err.message, status: false })
    }
}


module.exports = { authentication, authorisation }