const bookModel = require("../models/bookmodel")
const jwt = require('jsonwebtoken');
const { default: mongoose } = require("mongoose");
const { isValid } = require("../validator/validator");

let authentic = function (req, res, next) {


    try {

        let token = req.headers["x-api-key"];
        if (!token) return res.status(400).send({ status: false, msg: "token must be present" });

        jwt.verify(token, "group-0-secretkey", (error, decodedToken) => {
            if (error) {
                let message = (error.message == "jwt expired" ? "token is expired ,please login again" : "token is invalid,please recheck your token")
                return res.status(401).send({ status: false, msg: message })
            }
            console.log(decodedToken)
            req.decodedToken = decodedToken;
            next();
        });

    }
    catch (error) {
        return res.status(500).send({ status: false, msg: error.message });
    }
}

let authorise = async function (req, res, next) {

    try {

        let userIdFromToken = req.decodedToken["authorId"]
        let userIdFromClient = req.params.bookId
        console.log(userIdFromClient)
        console.log(userIdFromToken)

        if (userIdFromClient) {

            if (!mongoose.Types.ObjectId.isValid(userIdFromClient)) return res.status(400).send({ msg: "bookId is InValid", status: false })
            let findBookDoc = await bookModel.findById({ _id: userIdFromClient })
            if (!findBookDoc) return res.status(404).send({ msg: "No user resister", status: false })
            if (userIdFromToken !== findBookDoc.userId.toString()) {
                return res.status(403).send({ msg: "user is not Authorised for this operation", status: false })
            }
            next()
        } else if (req.method === "POST" && req.path === "/books") {

            let userIdFromClient = req.body.userId;
            if(!isValid(userIdFromClient)) return res.status(400).send({status : false , msg : "userId is required"})
            if (!mongoose.Types.ObjectId.isValid(userIdFromClient)) return res.status(400).send({ msg: "user is InValid", status: false })
            if (userIdFromToken !== userIdFromClient.toString()) {
                return res.status(403).send({ msg: "user is not Authorised for this operation", status: false })

            }
            next()
        }
        else {
            return res.status(400).send({ status: false, msg: "Please provide BlogID" })
        }

    } catch (err) {
        return res.status(500).send({ msg: err.message, status: false })
    }
}


module.exports = { authentic, authorise }