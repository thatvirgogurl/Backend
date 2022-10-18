const cartModel = require("../models/cartModel")
const productModel = require("../models/productModel")
const userModel = require("../models/userModel")
const mongoose = require('mongoose')

const createCart = async function(req,res){
    try{
        let data = req.body
        let userId = req.params.userId
        let {productId,cartId} = data
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
                ,{$inc:{totalPrice:req.price,"items.$.quantity":1}},{new:true})
                return res.status(201).send({status:true,message:"product quantity increased",data:incQuantity})
            }
            let item = {productId:productId,quantity:1}
            let productAdd = await cartModel.findByIdAndUpdate(cartId,
                {$inc:{totalPrice:req.price,totalItems:1},$push:{items:item}},{new:true})
            return res.status(201).send({status:true,message:"product added to cart",data:productAdd})
        }
        let cartObj = {
            userId:userId,
            items:[{productId:productId,quantity:1}],
            totalPrice:req.price,
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
        // --------------- validation start ------------------
        let {productId,cartId,removeProduct} = data
        if(!cartId) return res.status(400).send({status:false,message:"please provide cartId"})
        if(!mongoose.isValidObjectId(cartId)) return res.status(400).send({status:false,message:"please provied a valid productId"})
        let cart = await cartModel.findById(cartId)
        if(!cart) return res.status(400).send({status:false,message:"cart is not exist"})
        if(!removeProduct) return res.status(400).send({status:false,message:"Please provide removeProduct key"})
        // if(removeProduct !== 0 || removeProduct !== 1) return res.status(400).send({status:false,message:"removeProduct key accept 0(to remove product) or 1(to decrement quantity)"})
        let productInCart = await cartModel.findOne({_id:cartId,"items.productId":productId})
        if(!productInCart) return res.status(400).send({status:false,message:"Product not in the cart"})
        // ----------------------------------------------------
        if(removeProduct == 0){
            let productRemoved = await cartModel.findByIdAndUpdate(cartId,
                {$inc:{totalPrice:-req.price,totalItems:-1},$pull:{items:{productId:productId}}},{new:true})
            return res.status(201).send({status:true,message:"product removed from cart",data:productRemoved})
        }
        if(removeProduct == 1){
            let decQuantity = await cartModel.findOneAndUpdate({_id:cartId,"items.productId":productId}
                ,{$inc:{totalPrice:-req.price,"items.$.quantity":-1}},{new:true})
            return res.status(201).send({status:true,message:"product quantity decreased",data:decQuantity})
        }
    }
    catch(err){
	    res.status(500).send({status:false,message: err.message})
    }
}



module.exports = {createCart,updateCart}