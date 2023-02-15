const productModel = require("../models/productModel")
const { uploadFile } = require("./awss3")
const mongoose = require('mongoose')
 const { validImage } = require("../validator/validation")


module.exports = {
    createproduct: async function (req, res) {
        try {
            const data = req.body
            const invalidrequest = {}
            // ------------------------- validations start -----------------------------------
            if (data.length == 0) return res.status(400).send({ status: false, msg: " body cant't be empty Please enter some data." })
            let { title, description } = data
            console.log(title)
            if (!title) return res.status(400).send({ status: false, msg: " Please provide a Title" })
            if (!(/^[a-zA-Z0-9.%$#@*&' ]{3,40}$/).test(title)) return res.status(400).send({ status: false, msg: "Title length should not be greater than 20" })
            if (!description) return res.status(400).send({ status: false, msg: " description is required" })
            else if (!(/^[a-zA-Z0-9.%$#@*&, ']{10,80}$/).test(description)) return res.status(400).send({ status: false, msg: "description length in between 10-80" })
            const obj = { title, description}
            let files1 = req.files
            if (files1 && files1.length > 0) {
                let files = req.files[0]
                if (!validImage(files)) return res.status(400).send({ status: false, message: "Product Image should be an Image" })
                const productImage = await uploadFile(files)
                obj.productImage = productImage
            } else return res.status(400).send({ status: false, msg: "Please provide Product image" })
            // ------------------------- validations end -----------------------------------            
            const product = await productModel.create(obj)
            res.status(201).send({ status: true, message: "Success", data: product })
        } catch (err) {
            res.status(500).send({ status: false, message: err.message })
        }
    },

        getProducts: async function (req, res) {
        try {
            let title = req.query
          
            if (!title) {
                return res.status(400).send({ status: false, msg: " Please use filter" })
            }
           
            let products = await productModel.find(title)
            
            return res.status(200).send({ status: true, message: "Success", data: products })
        }

        catch (err) {
            return res.status(500).send({ status: false, message: err.message })
        }
    },

    getProductById: async function (req, res) {
        try {
            let productId = req.params.productId
            // ------------------------- validations start -----------------------------------
            if (!mongoose.Types.ObjectId.isValid(productId)) {
                return res.status(400).send({ status: false, message: "Invalid product Id" })
            }
            let product = await productModel.findById(productId)
            if (!product) {
                return res.status(400).send({ status: false, message: "product not found" })
            }
            // ------------------------- validations end -----------------------------------
            return res.status(200).send({ status: true, message: "Success", data: product })
        }
        catch (err) {
            return res.status(500).send({ status: false, message: err.message })
        }
    },

    updateProduct: async function (req, res) {
        try {

            let productId = req.params.productId;
            // ------------------------- validations start -----------------------------------
            if (!productId) return res.status(400).send({ status: false, msg: "productId is required" })
            if (!mongoose.Types.ObjectId.isValid(productId)) return res.status(400).send({ status: false, msg: "Invalid productId " })
            let data = req.body
            if (data.length == 0)
                return res
                    .status(400)
                    .send({ status: false, msg: "Please provide details for updation" });
            let obj = {}
            let { title, description } = data
            let productDetails = await productModel.findOne({ _id: productId, isDeleted: false });
            if (!productDetails) {
                return res.status(404).send({ status: false, msg: "no such product  exist" });
            }

            if (title) {
                // if (!title) return res.status(400).send({ status: false, msg: "title it's must be string" })
                obj["title"] = title
            }
            if (description) {
               //  if (!isValidfild(description)) return res.status(400).send({ status: false, msg: " it's must be string" })
                obj["description"] = description
            }
            const files1 = req.files
            if (files1.length >= 1) {
                let files = req.files[0]
                if (!validImage(files)) return res.status(400).send({ status: false, message: "Please provide a valid product Image" })
                const productImage = await uploadFile(files)
                obj["productImage"] = productImage
            }
            
            // ------------------------- validations end ------------------------------------
            let updatebook = await productModel.findOneAndUpdate({ _id: productId, isDeleted: false }, { $set: obj }, { new: true })
            res.status(200).send({ status: true, message: 'Successfully Document Update', data: updatebook });

        } catch (err) {
            return res.status(500).send({ msg: err.message });
        }
    },
    deleteProduct: async function (req, res) {
        try {
            let productId = req.params.productId
            // ------------------------- validations start -----------------------------------
            if (!mongoose.Types.ObjectId.isValid(productId)) {
                return res.status(400).send({ status: false, message: "Invalid product Id" })
            }
            let condition = { isDeleted: false, _id: productId }
            let product = await productModel.findOneAndUpdate(condition, { $set: { isDeleted: true, deletedAt: new Date() } })
            if (!product) return res.status(400).send({ status: false, message: "product not found" })
            // ------------------------- validations end --------------------------------------
            return res.status(200).send({ status: true, message: "Product deleted" })
        }
        catch (err) {
            return res.status(500).send({ status: false, message: err.message })
        }
    }
}