const userModel=require("../models/userModel")
const createUser=async function(req,res)
{
    let data=req.body
    let headerData =req.headers.isfreeappuser
    if (headerData === "true") {
        data.isFreeAppUser = Boolean("true")
    }

   else if (headerData === "false") {
            data.isFreeAppUser = Boolean("false")
       
    }
    let saveData = await userModel.create(data)
    res.send({msg:saveData})

}
const getAllUser=async function(req,res)
{
    let allUser=await userModel.find()
    res.send({msg:allUser})
}
module.exports.createUser=createUser;
module.exports.getAllUser=getAllUser;






 