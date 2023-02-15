const wishlistModel = require("../models/wishlistModel")
const productModel = require("../models/productModel")
const userModel = require("../models/userModel")
const mongoose = require('mongoose')

const createCart = async function (req, res) {
    try {
        let data = req.body
        let userId = req.params.userId
        let {  productId,cartId } = data
        if (!userId) {
            return res.status(400).send({ status: false, message: "please provide userId" })
        }
        if (!productId) {
            return res.status(400).send({ status: false, message: "please provide productId" })
        }
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).send({ status: false, message: "please provied a valid productId" })
        }
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).send({ status: false, message: "please provied a valid Id" })
        }
        let product = await productModel.findOne({ _id: productId, isDeleted: false })
        if (!product) {
            return res.status(400).send({ status: false, message: "product is not exist" })
        }
        let cartExist = await wishlistModel.findOne({ userId: userId })
        if (cartExist) {
           // ----------------- validate cartId -----------------//
            if (!cartId) {
                return res.status(400).send({ status: false, message: "cart is already created provide cartId" })
            }
            if (!mongoose.Types.ObjectId.isValid(cartId)) {
                return res.status(400).send({ status: false, message: "please provied a valid cartId" })
            }
            let cart = await wishlistModel.findOne({ _id: cartId, userId: userId })
            if (!cart) {
                return res.status(400).send({ status: false, message: "cart is not exist" })
            }
           // ----------------------------------------------------//
            let productAlreadyAdded = await wishlistModel.findOne({ userId: userId, "items.productId": productId })
            if (productAlreadyAdded) {
                let incQuantity = await wishlistModel.findOneAndUpdate({ _id: cartId, "items.productId": productId }
                    , { $inc: { totalPrice: product.price, "items.$.quantity": 1 } },
                    { new: true }).populate("items.productId", ["title", "description", "productImage"])
                return res.status(201).send({ status: true, message: "Success", data: incQuantity })
            }
            let item = { productId: productId, quantity: 1 }
            let productAdd = await wishlistModel.findByIdAndUpdate(cartId,
                { $inc: { totalPrice: product.price, totalItems: 1 }, $push: { items: item } },
                { new: true }).populate("items.productId", ["title", "description", "productImage"])
            return res.status(201).send({ status: true, message: "Success", data: productAdd })
        }
        let cartObj = {
            userId: userId,
            items: [{ productId: productId }],
        }
        let savedCart = await wishlistModel.create(cartObj)
        res.status(201).send({ status: true, message: "Success", data: savedCart })
    }
    catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}



const getUsersOfOneproduct=async function (req, res) {
    try {
       // let cartId = req.params.cartId;
        let productId = req.params.productId;
        let product = await wishlistModel.find({ "items.productId": productId }).select({userId:1,_id:0})
        if (!product) {
            return res.status(400).send({ status: false, message: "product is not exist" })
        }

        res.status(200).send({ status: true, message: "Success", data: product })
    }
    catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}

module.exports = { createCart, getUsersOfOneproduct } 