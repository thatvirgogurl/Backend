const bookModel = require("../../models/bookmodel");
const userModel = require("../models/usermodel")
const moment = require("moment")
const {isValidRequestBody,isValid,isValidRegex1,isValidRegex2,isValidObjectId} = require("../validator/validator")


const createBooks = async function (req, res) {

    try {

        const requestBody = req.body;

        if (!isValidRequestBody(requestBody)) return res.status(400).send({ status: false, msg: "No parameter is found ,Plz provide detail" })

        // destructuring parameter of request body 

        const { title, excerpt, userId, ISBN, category, subcategory,reviews, } = requestBody

        //----------------------------- Start Validation ----------------------------------------------

        if (!isValid(title)) return res.status(400).send({ status: false, msg: "title is required" })
        if (!isValidRegex1(title)) return res.status(400).send({ status: false, msg: "Invalid title" })

        if (!isValid(excerpt)) return res.status(400).send({ status: false, msg: "excerpt is required" })
        if (!isValidRegex1(excerpt)) return res.status(400).send * { status: false, msg: "Invalid excerpt" }

        if (!isValid(userId)) return res.status(400).send({ status: false, msg: "userId is required" })
        if (!isValidObjectId(userId)) return res.status(400).send({ status: false, msg: "Invalid userId" })

        if (!isValid(ISBN)) return res.status(400).send({ status: false, msg: "ISBN number is required" })
        if (!isValidRegex2(ISBN)) return res.status(400).send({ status: false, msg: "Invalid ISBN number" })

        if (!isValid(category)) return res.status(400).send({ status: false, msg: "category is required" })
        if (!isValidRegex1(category)) return res.status(400).send * { status: false, msg: "Invalid category" }

        if (!isValid(subcategory)) return res.status(400).send({ status: false, msg: "category is required" })
        if (!isValidRegex1(subcategory)) return res.status(400).send({ status: false, msg: "Invalid subcategory" })

        if (reviews) {
            if (typeof reviews !== "number") return res.status(400).send({ status: false, msg: "reviews in Nuber type" })
            if (!/^[0-9]$/.test(reviews)) return res.status(400).send({ status: false, msg: "Invalid review format" })
        }

        const isUniqueTitle = await bookModel.findOne({ title: title })
        if (isUniqueTitle) return res.status(409).send({ status: false, msg: "Title is already Exist" })

        const isIdreferUserModel = await userModel.findById(userId)
        if (!isIdreferUserModel) return res.status(400).send({ status: false, msg: "userId is not from user Collection" })

        const isUniqueISBN = await bookModel.findOne({ ISBN: ISBN })
        if (isUniqueISBN) return res.status(409).send({ status: false, msg: "ISBN number is already exist" })

        const data = { title, excerpt, userId, ISBN, category, subcategory, releasedAt :moment().format("DD/MM/YYYY , h:mm:ss a"), reviews }

        const saveData = await bookModel.Create(data)

        return res.status(200).send({ status: true, msg: "Book detail is successfully registered", data: saveData })

    } catch (err) {
        return res.status(500).send(err.message)
    }
}

module.exports.createBooks = createBooks