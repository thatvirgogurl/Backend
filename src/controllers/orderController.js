const cartModel = require("../models/cartModel")
const orderModel = require("../models/orderModel")
const mongoose = require('mongoose')

const createOrder = async function(req,res){
    try{
        let data = req.body
        let userId = req.params.userId
        let {cartId,cancellable,status} = data
        // ----------------- validations start ----------------
        if(!cartId) return res.status(400).send({status:false,message:"please provide cartId"})
        if(!mongoose.isValidObjectId(cartId)) return res.status(400).send({status:false,message:"please provied a valid productId"})
        let cart = await cartModel.findOne({_id:cartId,userId:userId})
        if(!cart) return res.status(400).send({status:false,message:"cart is not exist"})
        if(cart.totalItems == 0) return res.status(400).send({status:false,message:"Cart is empty nothing to order"})
        let order = await orderModel.findOne({userId:userId})
        if(order) return res.status(400).send({status:false,message:"order is already executed"})
        // ----------------------------------------------------
        let totalQuantity = 0
        for(let i=0;i<cart.items.length;i++){
            totalQuantity = totalQuantity+cart.items[i].quantity
        }
        orderObj = {
            userId : userId,
            items : cart.items,
            totalPrice : cart.totalPrice,
            totalItems : cart.totalItems,
            totalQuantity : totalQuantity,
            cancellable : true,
            status : 'pending'
        }
        if(cancellable){
            if(typeof cancellable !== 'boolean') return res.status(400).send({status:false,message:"provide boolean value in cancellable"})
            orderObj.cancellable = cancellable            
        }
        if(status){
            if(!status.match(/pending|completed|cancelled/)) return res.status(400).send({status:false,message:"provide pending or completed or cancelled in status"})
            if(status=="cancelled")  return res.status(400).send({status:false,message:"you cant cancele a order while creating"})  
        }
        let savedOrder = await orderModel.create(orderObj)

        let emptyCart = await cartModel.findOneAndUpdate({userId:userId},{$set:{totalPrice:0,totalItems:0,items:[]}},{new:true})
        res.status(201).send({status:true,message:"order executed",data:savedOrder})
    }
    catch(err){
	    res.status(500).send({status:false,message: err.message})
    }
}

const updateOrder = async function(req,res){
    try{
        let data = req.body
        let userId = req.params.userId
        let {orderId,status} = data
        // ----------------- validation start ----------------
        if(!orderId) return res.status(400).send({status:false,message:"please provide orderId"})
        if(!mongoose.isValidObjectId(orderId)) return res.status(400).send({status:false,message:"please provied a valid orderId"})
        if(!status.match(/pending|completed|cancelled/)) return res.status(400).send({status:false,message:"provide pending or completed or cancelled in status"})
        let order = await orderModel.findOne({_id:orderId,userId:userId})
        if(!order) return res.status(400).send({status:false,message:"order is not exist"})
        if(status=='cancelled'){
        if(order.cancellable == false) return res.status(400).send({status:false,message:"order is not cancellable"})
    }
        if(order.status == 'cancelled') return res.status(400).send({status:false,message:"order is already cancelled"})
        if(order.status == 'completed') return res.status(400).send({status:false,message:"order is completed you can't cancel no"})
        // ----------------------------------------------------
        let cancelled = await orderModel.findByIdAndUpdate(orderId,{$set:{status:status}},{new:true})
        res.status(201).send({status:true,message:"order cancelled",data:cancelled})
    }
    catch(err){
	    res.status(500).send({status:false,message: err.message})
    }
}

module.exports = {createOrder,updateOrder}