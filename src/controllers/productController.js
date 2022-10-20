const productModel = require("../models/productModel")
const { uploadFile } = require("./aws3")
const mongoose = require('mongoose')


const { isValid, isValidRequestBody, isValidName, isValidfild ,isValidUrl} = require("../validator/validation")
module.exports = {
    createproduct: async function (req, res) {
        try {
            const data = req.body
            const invalidrequest = {}
            if (!isValidRequestBody(data)) invalidrequest.invalidBody = { status: false, message: " body cant't be empty Please enter some data." }

            let { title, description, price, isFreeShipping, style, availableSizes, installments } = data

            if (!isValid(title)) {
                invalidrequest.invalidTitle = "Please provide a Title "
            }
            if (!(/^[a-zA-Z0-9.%$#@*&' ]{3,40}$/).test(title)) {
                invalidrequest.invalidTitle = "Title length should not be greater than 20"
            }else if(title) {
                title = title.trim()
                const unique = await productModel.findOne({ title: title })
                if (unique) {
                    invalidrequest.invalidTitle = `[*${title}*]is  already exist`
                }
            }
            if (!isValid(description)) {
                invalidrequest.description = "description is required"
            }else if(!(/^[a-zA-Z0-9.%$#@*& ']{10,80}$/).test(description)) {
                invalidrequest.invalidDescription = "description length in between 10-40"
            }

            if (!(/^\d{0,8}[.]?\d{1,4}$/).test(price)) {
                invalidrequest.invalidPrice = "price should be in no."
            }

            if (isFreeShipping != "true" && isFreeShipping != "false") {
                invalidrequest.invalidIsFreeShipping = "isFreeShipping should be a boolean value"
            }

            if (!isValidName.test(style)) {
                invalidrequest.invalidStyle = {
                    status: false, msg: "Enter a valid style",
                    validname: "length of style has to be in between (3-20)  , use only String "
                }
            }
            if (availableSizes) {
                availableSizes = availableSizes.trim().toUpperCase().split(' ')
                let arr = ["S", "XS", "M", "X", "L", "XXL", "XL"]
                for (let i = 0; i < availableSizes.length; i++) {
                    if (availableSizes[i] == ",")
                        continue
                    else {
                        if (!arr.includes(availableSizes[i])) {
                            invalidrequest.invalidAvailableSizes = `availableSizes can contain only these value [${arr}]`
                        }
                    }
                }
            } else {
                invalidrequest.invalidAvailableSizes = "availableSizes is required"
            }

            if (!(/^([0]?[1-9]|1[0-2])$/).test(installments)) {
                invalidrequest.invalidInstallments = "installments should be in no. And Between 1-12"
            }

            const obj = { title, description, price, isFreeShipping, style, availableSizes, installments }

            let files = req.files
            if (files && files.length > 0) {
                const productImage = await uploadFile(files[0])
                if (!isValidUrl.test(productImage)) {
                    invalidrequest.invalidProductImage ="Product image should be an Image"
                }
                obj.productImage = productImage
            }
            else {
                invalidrequest.invalidProductImage ="Please provide Product image"
            }
            if (isValidRequestBody(invalidrequest)) return res.status(400).send({ status: false, message: "invalidrequest", invalidrequest: invalidrequest })
            obj.currencyFormat = "₹"
            obj.currencyId = "INR"


            const book = await productModel.create(obj)
            res.status(201).send({ status: true, message: "product successfully created", data: book })
        } catch (err) {
            res.status(500).send({ status: false, message: err.message })
        }


    },
    getProducts: async function (req, res) {
        try {
            let data = req.query
            let { size, name, priceLessThan, priceGreaterThan, priceSort } = data
            let condition = { isDeleted: false }
            if (size) {
                condition.availableSizes = size
            }
            if (name) {
                condition.title = { "$options": "i", "$regex": name }
            }
            if (priceLessThan) {
                if (priceGreaterThan) {
                    condition.price = { $gt: priceGreaterThan, $lt: priceLessThan }
                } else {
                    condition.price = { $lt: priceLessThan }
                }
            }
            if (priceGreaterThan) {
                condition.price = { $gt: priceGreaterThan }
            }
            let products = await productModel.find(condition)
            if (products.length == 0) return res.status(400).send({ status: false, message: "product not found" })
            if (priceSort) {
                if (priceSort == 1) {
                    products.sort((a, b) => {
                        let fa = a.price
                        fb = b.price
                        if (fa < fb) return -1;
                        if (fa > fb) return 1;
                        return 0
                    })
                } else if (priceSort == -1) {
                    products.sort((a, b) => {
                        let fa = a.price
                        fb = b.price
                        if (fa < fb) return 1;
                        if (fa > fb) return -1;
                        return 0
                    })
                }
            }
            return res.status(200).send({ status: true, message: "Products details", data: products })
        }

        catch (err) {
            return res.status(500).send({ status: false, message: err.message })
        }
    },

    getProductById: async function (req, res) {
        try {
            let productId = req.params.productId
            if (!mongoose.isValidObjectId(productId)) return res.status(400).send({ status: false, message: "Invalid product Id" })
            let condition = { isDeleted: false, _id: productId }
            let product = await productModel.findOne(condition)
            if (!product) return res.status(400).send({ status: false, message: "product not found" })
            return res.status(200).send({ status: true, message: "Product details", data: product })
        }
        catch (err) {
            return res.status(500).send({ status: false, message: err.message })
        }
    },

    updateProduct: async function (req, res) {
        try {

            let productId = req.params.productId;
            if (!productId) return res.status(400).send({ status: false, msg: "productId is required" })
            if (!mongoose.Types.ObjectId.isValid(productId)) return res.status(400).send({ status: false, msg: "Invalid bookId" })
            let data = req.body
            let obj = {}
            let { title, description, price, isFreeShipping, productImage, style, availableSizes, installments } = data
            if (Object.keys(data) == 0)
                return res
                    .status(400)
                    .send({ status: false, msg: "Please provide details for updation" });
            let productDetails = await productModel.findOne({ _id: productId, isDeleted: false });
            if (!productDetails) {
                return res.status(404).send({ status: false, msg: "no such product  exist" });
            }

            if (title) {
                if (!isValidfild(title)) return res.status(400).send({ status: false, msg: "title it's must be string" })
                const isUniqueTitle = await productModel.findOne({ title: title })
                if (isUniqueTitle) return res.status(409).send({ status: false, msg: "Title is already Exist" })
                obj["title"] = title
            }
            if (description) {
                if (!isValidfild(description)) return res.status(400).send({ status: false, msg: " it's must be string" })
                obj["description"] = description
            }
            if (price) {
                if (!(/^\d{0,8}[.]?\d{1,4}$/).test(price)) return res.status(400).send({ status: false, message: "price should be in no." })
                obj["price"] = price

            }
            if (isFreeShipping) {
                if (isFreeShipping != "true" && isFreeShipping != "false") return res.status(400).send({ status: false, msg: "its must be a boolean" })
                obj["isFreeShipping"] = isFreeShipping
            }
            let files = req.files
            if (files && files.length > 0) {
            const productImage = await uploadFile(files[0])
            if (!isValidUrl.test(productImage)) return res.status(400).send({
                status: false, message: "Product image should be an Image"
            }) 
            obj["productImage"] = productImage
        }
            if (style) {
                if (!isValidfild(style)) return res.status(400).send({ status: false, msg: " it's must be string" })
                obj["style"] = style
            }

            if (availableSizes) {
                availableSizes = availableSizes.split(",").map((x) => x.trim().toUpperCase())
                let sizes = ["S", "XS", "M", "X", "L", "XXL", "XL"]
                for (let i = 0; i < availableSizes.length; i++) {
                    if (!sizes.includes(availableSizes[i])) {
                        return res.status(400).send({ status: false, message: "Available sizes shoule be [S, XS, M, X, L, XXL, XL]" })
                    }
                }
                // obj.availableSizes ={}
                // //obj = { availableSizes: { $each: [availableSizes]}}
                // obj.availableSizes.$each = availableSizes
                obj.availableSizes = [...new Set(availableSizes)]
            }
            if (installments) {
                if ((/^ ([0] ? [1 - 9] | 1[0 - 2])$/).test(installments)) return res.status(400).send({ status: false, msg: " it's must be 1 to 12" })
                obj["installments"] = installments

            }

            let updatebook = await productModel.findOneAndUpdate({ _id: productId }, { $set: obj }, { new: true })
            res.status(200).send({ status: true, message: 'Successfully Document Update', data: updatebook });

        } catch (err) {
            return res.status(500).send({ msg: err.message });
        }
    },
    deleteProduct: async function (req, res) {
        try {
            let productId = req.params.productId
            if (!mongoose.isValidObjectId(productId)) return res.status(400).send({ status: false, message: "Invalid product Id" })
            let condition = { isDeleted: false, _id: productId }
            let product = await productModel.findOneAndUpdate(condition, { $set: { isDeleted: true, deletedAt: new Date() } })
            if (!product) return res.status(400).send({ status: false, message: "product not found" })
            return res.status(200).send({ status: true, message: "Product deleted" })
        }
        catch (err) {
            return res.status(500).send({ status: false, message: err.message })
        }
    }
}