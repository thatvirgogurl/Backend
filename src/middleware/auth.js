const userModel = require("../models/userModel")
const jwt = require('jsonwebtoken');
const mongoose=require('mongoose')

let authentication = async function (req, res, next) {
    try {
        
        let token = req.headers["authorization"];
        if (!token) return res.status(400).send({ status: false, msg: "token must be present" });
         token= token.slice(7)
        jwt.verify(token, "#@$SamMon#TuRi14", (error, decodedToken) => {
            if (error) {
                let message = (error.message == "jwt expired" ? "token is expired ,please login again" : "token is invalid,please recheck your token")
                return res.status(401).send({ status: false, msg: message })
            }
            //console.log(decodedToken)
            req.decodedToken = decodedToken.userId;
            next();
        });

    }
    catch (error) {
        return res.status(500).send({ status: false, msg: error.message });
    }
}


let authorization = async function (req, res, next) {
    try {
        let userId = req.params.userId
         //-------------------------------Authorizition-----------------------------//

         if (userId != req.decodedToken) return res.status(403).send({ status: false, message: 'Un-Authorized User' })

         //-------------------------------Authorizition-----------------------------//
        
        if(!mongoose.isValidObjectId(userId)) return res.status(400).send({status:false,message:"please provied a valid userId"})
        let user = await userModel.findById(userId)
        if(!user) return res.status(400).send({status:false,message:"user is not exist"})
        
    req.userDoc=user
        next();
    }
    catch (error) {
        return res.status(500).send({ status: false, msg: error.message });
    }
}



module.exports = { authentication,authorization}