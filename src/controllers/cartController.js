const cartModel = require("../models/cartModel")
const productModel = require("../models/productModel")
const userModel = require("../models/userModel")
const mongoose = require('mongoose')

const createCart = async function(req,res){
    try{
        let data = req.body
        let userId = req.params.userId
        // --------------- validation start ------------------
        if(!mongoose.isValidObjectId(userId)) return res.status(400).send({status:false,message:"please provied a valid userId"})
        let user = await userModel.findById(userId)
        if(!user) return res.status(400).send({status:false,message:"user is not exist"})
        let {productId,cartId} = data
        if(!productId) return res.status(400).send({status:false,message:"please provide productId"})
        if(!mongoose.isValidObjectId(productId)) return res.status(400).send({status:false,message:"please provied a valid productId"})
        let product = await productModel.findById(productId)
        if(!product) return res.status(400).send({status:false,message:"product is not exist"})
        let cartExist = await cartModel.findOne({userId:userId})
        if(cartExist){
            // ----------------- validate cartId -----------------
            if(!cartId) return res.status(400).send({status:false,message:"cart is already created provide cartId"})
            if(!mongoose.isValidObjectId(cartId)) return res.status(400).send({status:false,message:"please provied a valid productId"})
            let cart = await cartModel.findById(cartId)
            if(!cart) return res.status(400).send({status:false,message:"cart is not exist"})
            // ----------------------------------------------------
            let productAlreadyAdded = await cartModel.findOne({_id:cartId,"items.productId":productId})
            if(productAlreadyAdded){
                let incQuantity = await cartModel.findOneAndUpdate({_id:cartId,"items.productId":productId}
                ,{$inc:{totalPrice:product.price,"items.$.quantity":1}},{new:true})
                return res.status(201).send({status:true,message:"product quantity increased",data:incQuantity})
            }
            let item = {productId:productId,quantity:1}
            let productAdd = await cartModel.findByIdAndUpdate(cartId,
                {$inc:{totalPrice:product.price,totalItems:1},$push:{items:item}},{new:true})
            return res.status(201).send({status:true,message:"product added to cart",data:productAdd})
        }
        let cartObj = {
            userId:userId,
            items:[{productId:productId,quantity:1}],
            totalPrice:product.price,
            totalItems:1
        }
        let savedCart = await cartModel.create(cartObj)
        res.status(201).send({status:true,message:"Cart created",data:savedCart})
    }
    catch(err){
	    res.status(500).send({status:false,message: err.message})
    }
}

const updateCart = async function(req,res){
    try{
        let data = req.body
        let userId = req.params.userId
        // --------------- validation start ------------------//
        let {productId,cartId} = data
        if(!productId) return res.status(400).send({status:false,message:"please provide productId"})
        if(!mongoose.isValidObjectId(productId)) return res.status(400).send({status:false,message:"please provied a valid productId"})
        let product = await productModel.findOne({_id:productId,isDeleted:false})
        if(!product) return res.status(400).send({status:false,message:"product is not exist"})
        // -----------------------------------------------------
        let cartExist = await cartModel.findOne({userId:userId})
        if(cartExist){
            // ----------------- validate cartId -----------------
            if(!cartId) return res.status(400).send({status:false,message:"please provide cartId"})
            if(!mongoose.isValidObjectId(cartId)) return res.status(400).send({status:false,message:"please provied a valid productId"})
            let cart = await cartModel.findById(cartId)
            if(!cart) return res.status(400).send({status:false,message:"cart is not exist"})
            // ----------------------------------------------------
            let productAlreadyAdded = await cartModel.findOne({"items.productId":productId})
            if(productAlreadyAdded){
                let incProductQuantity = await cartModel.findOneAndUpdate({"items.productId":productId}
                ,{$inc:{totalPrice:product.price,"items.$.quantity":1}},{new:true})
                return res.status(201).send({status:true,message:"product quantity increased",data:incProductQuantity})
            }
            let item = {productId:productId,quantity:1}
            let newCart = await cartModel.findByIdAndUpdate(cartExist._id,
                {$inc:{totalPrice:product.price,totalItems:1},$push:{items:item}},{new:true})
            return res.status(201).send({status:true,message:"product added to cart",data:newCart})
        }
        let cartObj = {
            userId:userId,
            items:[{productId:productId,quantity:1}],
            totalPrice:product.price,
            totalItems:1
        }
        let savedCart = await cartModel.create(cartObj)
        res.status(201).send({status:true,message:"Cart created",data:savedCart})
    }
    catch(err){
	    res.status(500).send({status:false,message: err.message})
    }
}

module.exports = {createCart,UpdateCart}