const userModel=require("../models/userModel")
const productModel = require("../models/productModel")
const orderModel=require("../models/orderModel")
const mid1=function(req,res,next)
{
    if(!req.headers.isfreeappuser)
    {
        return res.send({msg:"the request is missing a mandatory header"})
    }
    
    next()
}
const midUserId = async function (req, res, next) {
    
    if (!req.body.userId) {
        return res.send({ status: false, msg: "newuser id is a mandatory field" })
    }
   
    let NewUser = await userModel.findById(req.body.userId)
    if (!NewUser) {
        return res.send({ status: false, msg: "NewUser id is not valid" })
    }
    next()
}

const midProductId = async function (req, res, next) {
    if (!req.body.productId) {
        return res.send({ status: false, msg: "product id is a mandatory field" })
    }
  
    let product = await productModel.findById(req.body.productId)
    if (!product) {
        return res.send({ status: false, msg: "Publisher id is not valid" })
    }
    
    next()
}

module.exports = { mid1, midUserId, midProductId}


































// const mid1 = function (req, res, next) {
//     req.falana = "hi there. i am adding something new to the req object"
//     console.log("Hi I am a middleware named Mid1")
//     next()
// }

// const mid2 = function (req, res, next) {
//     console.log("Hi I am a middleware named Mid2")
//     next()
// }

// const mid3 = function (req, res, next) {
//     console.log("Hi I am a middleware named Mid3")
//     next()
// }

// const mid4 = function (req, res, next) {
//     console.log("Hi I am a middleware named Mid4")
//     next()
// }
// const middlewareTime = function (req, res, next) {
//     let date = moment().format();
//     console.log(date);
//     console.log(req.socket.remoteAddress)
//     console.log(req.originalUrl)
//     next()
// }

// module.exports.mid5 = middlewareTime
// module.exports.mid1= mid1
// module.exports.mid2= mid2
// module.exports.mid3= mid3
// module.exports.mid4= mid4