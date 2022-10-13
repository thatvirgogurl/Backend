const productModel = require("../models/productModel")
const { uploadFile } = require("./aws3")
const mongoose = require('mongoose')


const isValidavailableSizes = function (availableSizes, inp) {
    return inp.indexOf(availableSizes) !== -1;
};

const { isValid, isValidRequestBody,isValidName, validDate, validISBN, isValidfild } = require("../validator/validation")
module.exports={
    createproduct:async function  (req, res) {
    try {
        const data = req.body
        if (!isValidRequestBody(data)) return res.status(400).send({ status: false, message: " body cant't be empty Please enter some data." })

        let { title, description,price,isFreeShipping,style,availableSizes,installments} = data

        if (!isValid(title)) return res.status(400).send({ status: false, message: "Title is required" })
        if (!isValid(description)) return res.status(400).send({ status: false, message: "Title is required" })
        title=title.trim()
        const unique = await productModel.findOne({ title: title })
        if (unique){
                return res.status(400).send({ status: false,message: `${title} is  already exist` }) //instead of 400 we can also use 409 for conflict
            } 
      if(!(/^\d{0,8}[.]?\d{1,4}$/).test(price)) return res.status(400).send({ status: false, message: "price should be in no." })
      
      if(isFreeShipping !="true" && isFreeShipping !="false")  return res.status(400).send({ status: false, message: "isFreeShipping should be a boolean value" })
      
      if (!isValidName.test(style)) return res.status(400).send({
        status: false, msg: "Enter a valid style",
        validname: "length of style has to be in between (3-20)  , use only String "
    })

    availableSizes=availableSizes.trim().split(' ')
    let arr = ["S", "XS", "M", "X", "L", "XXL", "XL"]
        for (let i = 0; i < availableSizes.length; i++) {
            if (availableSizes[i] == ",")
                continue
            else {
                if (!arr.includes(availableSizes[i]))
                    return res.
                        status(400).
                        send({ status: false, message: `availableSizes can contain only these value [${arr}]` })
            }
        }

      if(!(/^([0]?[1-9]|1[0-2])$/).test(installments)) return res.status(400).send({ status: false, message: "installments should be in no. And Between 1-12" })

const obj={title, description,price,isFreeShipping,style,availableSizes,installments}

let files = req.files
        if (files && files.length > 0) {
            const productImage = await uploadFile(files[0])
            obj.productImage=productImage
        }
        else {
            return res.status(400).send({ msg: "No file found" })
        }
        //obj.deletedAt=Date.now()
       obj.currencyFormat="₹"
       obj.currencyId="INR"


        const book = await  productModel.create(obj)
        res.status(201).send({ status: true, message: "product successfully created", data: book })
    } catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }


},
 getProducts : async function(req,res){
    try{
        let data = req.query
        let {size,name,priceLessThan,priceGreaterThan} = data
        let condition = {isDeleted : false}
        if(size){
            condition.availableSizes = size
        }
        if(name){
            condition.title = name
        }
        if(priceLessThan){
            condition.price = {$lt:priceLessThan}
        }
        if(priceGreaterThan){
            condition.price = {$gt:priceGreaterThan}
        }
        let products = await productModel.find(condition).sort({price:1})
        if(!products) return res.status(400).send({status:false,message:"product not found"})
        return res.status(200).send({ status: true, message: "Products details", data:products})        
    }
    catch(err){
        return res.status(500).send({status:false,message:error.message})
    }
},

 getProductById : async function(req,res){
    try{
        let productId = req.params.productId
        if(!mongoose.isValidObjectId(productId)) return res.status(400).send({status:false,message:"Invalid product Id"})
        let condition = {isDeleted : false,_id:productId}
        let product = await productModel.findOne(condition)
        if(!product) return res.status(400).send({status:false,message:"product not found"})
        return res.status(200).send({ status: true, message: "Product details", data:product})
    }
    catch(err){
        return res.status(500).send({status:false,message:error.message})
    }
},
 updateProduct:async function(req,res){
    try {

        let productId = req.params.productId;
        if (!productId) return res.status(400).send({ status: false, msg: "productId is required" })
        if (!mongoose.Types.ObjectId.isValid(productId)) return res.status(400).send({ status: false, msg: "Invalid bookId" })
        let data = req.body
        const { title,description,price,currencyId, currencyFormat, isFreeShipping,productImage,style
,availableSizes,installments}= { ...data }
        if (Object.keys(data) == 0)
            return res
                .status(404)
                .send({ status: false, msg: "Please provide details for updation" });
        let productDetails = await productModel.findOne({ _id: productId, isDeleted: false });
        if (!productDetails) {
            return res.status(404).send({ status: false, msg: "no such product  exist" });
        }
        let obj = {}

        if (title) {
            if (!isValidfild(title)) return res.status(400).send({ status: false, msg: "title it's must be string" })
            const isUniqueTitle = await bookModel.findOne({ title: title })
            if (isUniqueTitle) return res.status(409).send({ status: false, msg: "Title is already Exist" })
            obj["title"] = title
        }
        if (description) {
            if (!isValidfild(description)) return res.status(400).send({ status: false, msg: " it's must be string" })
            obj["description"] = description
        }
        if (price) {
            if (!isvalidprice(price)) return res.status(400).send({ status: false, msg: " it's must be number or deceimal" })
            obj["price"] = price

        }
        if (currencyId) {
            if (!isValidfild(currencyId)) return res.status(400).send({ status: false, msg: " it's must be string" })
            if (currencyId !== "INR") return res.status(400).send({ status: false, msg: " it's must be INR" })
            obj["currencyId"] = currencyId
        }
        // if (currencyFormat) {
        //     //if (currencyFormat!= ₹ )return res.status(400).send({ status: false, msg: " it's must be  ₹" })
        //     obj["currencyFormat"] = currencyFormat
        // }
        if (isFreeShipping) {
            if(!isFreeShipping==(true||false)) return res.status(400).send({status:false,msg:"its must be a boolean"})
            obj["isFreeShipping"] = isFreeShipping
        }
        if (productImage) {
            if (!isValidfild(productImage)) return res.status(400).send({ status: false, msg: " it's must be string" })
            obj["productImage"] = productImage
        }
        if (style) {
            if (!isValidfild(style)) return res.status(400).send({ status: false, msg: " it's must be string" })
            obj["style"] = style
        }
         
        if (availableSizes) {
            if (!validfun.isValidavailableSizes(availableSizes, ["S", "XS", "M", "X", "L", "XXL", "XL"])) {
            return res.status(400).send({status: false, message: `size should be among "S", "XS", "M", "X", "L", "XXL", "XL"`,
            });
        }
            subcategory = subcategory.split(",")
            obj["availableSizes"] = { $in: availableSizes }
    }
        
        if (installments) {
            if (!installments.isvalidNumber(installments))return res.status(400).send({ status: false, msg: " it's must be number" })
            obj["installments"] = installments
        }

        let updatebook = await productModel.findOneAndUpdate({ _id: productId }, { $set: obj }, { new: true })
        res.status(200).send({ status: true, message: 'Successfully Document Update', data: updatebook });

    } catch (err) {
        return res.status(500).send({ msg: err.message });
    }



},

 deleteProduct :async function(re,res){
    try{
        let productId = req.params.productId
        if(!mongoose.isValidObjectId(productId)) return res.status(400).send({status:false,message:"Invalid product Id"})
        let condition = {isDeleted : false,_id:productId}
        let product = await productModel.findOne(condition)
        if(!product) return res.status(400).send({status:false,message:"product not found"})
        await productModel.findOneAndUpdate(condition,{$set:{isDeleted:true,deletedAt:new Date()}})
        return res.status(200).send({ status: true, message: "Product deleted"})
    }
    catch(err){
        return res.status(500).send({status:false,message:error.message})
    }
}


}