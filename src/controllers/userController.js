const userModel = require("../models/usermodel")
// let imageRegex = "((http|https)://)(www.)?"
//     + "[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]"
//     + "{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)"
const CreateUser = async function (req, res) {

    let userDetails = req.body
    let { fname, lname, email, profileImage, phone,password, address, ...rest } = { ...userDetails }
    if (Object.keys(rest) != 0)
        return res.status(404).send({
            status: false,
            msg: "Please provide required details only => title, name, phone, email, password, address",
        });

    if (Object.keys(userDetails) == 0)
        return res
            .status(404)
            .send({ status: false, msg: "Please provide details" });
    if (!fname) {
        return res.status(400).send({ status: false, msg: "title is required" });
    }

    if (!lname) {
        return res.status(400).send({ status: false, msg: "Name is required" });
    }
    if (!phone) {
        return res.status(400).send({ status: false, msg: "phone number is required" });
    }
    if (!email) {
        return res.status(400).send({ status: false, msg: "email is required" });
    }
    if (!profileImage) {
        return res.status(400).send({ status: false, msg: "profileImage is required" });
    }
    // if (!profileImage.match(imageRegex)) {
    //     return res.status(400).send({ status: false, message: "invalid profileImage" })
    // }

    if (!password) {
        return res.status(400).send({ status: false, msg: "password is required" });
    }
    const existemail = await userModel.findOne({ $or: [{ email: email }, { phone: phone }] })
    if (existemail) return res.status(400).send({ status: false, msg: "email or phone no already exits" })
    const data = { fname, lname, email, profileImage, phone, password, address }
    let savedata = await userModel.create(data)
    res.status(201).send({ status: true, message: "User created successfully", data: savedata })
}
const getuserById = async function (req, res) {
    try {
        const userId = req.params.userId;
    
        if (!userId)
            return res
                .status(404)
                .send({ status: false, msg: "Please send userId" });
      //Make sure that userId in url param and in token is same
    
        let userDetails = await userModel.findOne({
            _id: userId,
            isDeleted: false,
        });
        if (!userDetails)
            return res
                .status(404)
                .send({ status: "false", msg: "user not exist" });

        let obj = {}

        let objectOfuserDetails = userDetails.toObject();
        obj = { ...objectOfuserDetails };
        return res.status(200).send({ status: true, message: "User profile details" ,data: obj });
    } catch (error) {
        return res.status(500).send({ msg: error.message });

    }
}
module.exports = { getuserById, CreateUser }










