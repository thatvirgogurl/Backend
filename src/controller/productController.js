const productModel = require("../models/productModel")

const CreateProduct = async function (req, res) {
    let product = req.body
    let productCreated = await productModel.create(product)
    res.send({ data: productCreated })
}
module.exports.CreateProduct=CreateProduct;