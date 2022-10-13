const productModel = require("../models/productModel")
const { uploadFile } = require("./aws3")
const mongoose = require('mongoose')
const moment = require('moment')

const { isValid, isValidRequestBody,isValidName, validDate, validISBN, isValidfild } = require("../validator/validation")
module.exports={
    createproduct:async function  (req, res) {
    try {
        const data = req.body
        if (!isValidRequestBody(data)) return res.status(400).send({ status: false, message: " body cant't be empty Please enter some data." })

        let { title, description,price,isFreeShipping,style,availableSizes,installments} = data

        if (!isValid(title)) return res.status(400).send({ status: false, message: "Title is required" })
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

    availableSizes=availableSizes.split(' ')
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
        res.status(201).send({ status: true, message: "Boook successfully created", data: book })
    } catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }


}

}