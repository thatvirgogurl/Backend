const UserModel = require("../models/userModel")




const basicCode = async function (req, res) {
    let tokenDataInHeaders = req.headers.token
    console.log(tokenDataInHeaders)

    console.log("HEADER DATA ABOVE")
    console.log("hey man, congrats you have reached the Handler")
    res.send({ msg: "This is coming from controller (handler)" })
}
module.exports.basicCode = basicCode