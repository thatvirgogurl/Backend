
const jwt = require('jsonwebtoken');


let authentication = function (req, res, next) {
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



module.exports = { authentication}