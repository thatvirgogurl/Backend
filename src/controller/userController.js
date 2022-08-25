//const userModel=require("../model/userModel")
const basicCode = async function (req, res) {
    let tokenDataInHeaders = req.headers.token
    console.log(tokenDataInHeaders)

    console.log("HEADER DATA ABOVE")
    console.log("hey man, congrats you have reached the Handler")
    res.send({ msg: "This is coming from controller (handler)" })
}
module.exports.basicCode = basicCode


// const createUser=async function(req,res)
// {
//     let data=req.body
//     let saveData=await userModel.create(data)
//     res.send({msg:saveData})
// }
// const getAllUser=async function(req,res)
// {
//     let allUser=await userModel.find()
//     res.send({msg:allUser})
// }
// module.exports.createUser=createUser;
// module.exports.getAllUser=getAllUser;
// const creatUser=async function(req,res)
// {
//     var data=req.body
//     let savedata= await userModel.create(data)
//     res.send({msg:savedata})
// }
// const getallUser=async function(req,res)
// {
//     let allUser=await userModel.find()
//     res.send({msg:allUser})
// }
// module.exports.creatUser=creatUser
// module.exports.getallUser=getallUser