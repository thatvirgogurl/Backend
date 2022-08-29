const userModel = require("../models/userModel")
const orderModel = require("../models/orderModel")
 const productModel = require("../models/productModel")
const CreateOrder = async function (req, res) {
    let headerData = req.headers["isfreeappuser"]
    let orderData = req.body;
    let productData = await productModel.findById(orderData.productId)
    let userData = await userModel.findById(orderData.userId)





    if (headerData === "true") {
        orderData.amount = 0
        orderData.isFreeAppUser = Boolean("true")
    }

    if (headerData === "false") {
        if (userData.balance >= productData.price) {
            await userModel.findByIdAndUpdate(orderData.userId, { $inc: { balance: -(productData.price) }, new: true })
            orderData.isFreeAppUser = Boolean("false")
            orderData.amount = productData.price
        } else {
            return res.send("User haven't Sufficient Balance to buy Product.")
        }
    }

    let orderCreated = await orderModel.create(orderData);
    res.send({ data: orderCreated });

}
    // const createAndUpdateUsrer = async function (req, res) {
    //     let data = req.body
    //     let user = data.userID
    //     let Product = data.productID
        
    //     let coust_Balance = await userModel.findById({ _id:NewUser }).select({ balance: 1 ,_id:0})
    //     let product_Price = await productModel.findById({ _id: Product }).select({ price: 1 ,_id:0})

    //     let a = coust_Balance
    //     let b = product_Price

    //     if (req.headers["isfreeappuser"] === 'false') {
    //         if (a > b) {

    //             let c = a - b
    //             req.isFreeAppUser =Boolean (req.headers["isfreeappuser"])
    //             let updated_coustmer = await userModel.findByIdAndUpdate(({_id:{$eq:user._id}} ), { $set: { balance: c, isFreeAppUser: req.isFreeAppUse, new: true } })
    //             let updated_order = await orderModel.findOneAndUpdate({ userID: user}, { $set: { amount: b, isFreeAppUser: req.isFreeAppUse, new: true } })
    //             let element = { updated_coustmer, updated_order }


    //             res.send({ msg: element })
    //         }
    //         else {
    //             res.send({ msg: "Insufficient Balance" })
    //         }

    //     }

    //     else if (req.headers["isfreeappuser"] === 'true') {
    //         req.isFreeAppUser = Boolean(req.headers["isfreeappuser"])
    //         let updated_order = await orderModel.findOneAndUpdate({ userID: user }, { $set: { amount: 0, isFreeAppUser: req.isFreeAppUse, new: true } })
    //         res.send({ msg: updated_order })
    //     }


    // }

const getAllOrderData = async function (req, res) {
    let allData = await orderModel.find().populate(["userId", "productId"])
    res.send({ data: allData });

};

module.exports.getAllOrderData = getAllOrderData


module.exports.CreateOrder = CreateOrder
    