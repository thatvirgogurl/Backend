const bookModel = require("../models/bookmodel");
const userModel = require("../models/usermodel")
const moment = require("moment")
const {isValidRequestBody,isValid,isValidRegex1,isValidRegex2,isValidObjectId} = require("../validator/validator")


const createBooks = async function (req, res) {

    try {

        const requestBody = req.body;

        if (!isValidRequestBody(requestBody)) return res.status(400).send({ status: false, msg: "No parameter is found ,Plz provide detail" })

        // destructuring parameter of request body 

        const { title, excerpt, userId, ISBN, category, subcategory,reviews} = requestBody


        //----------------------------- Start Validation ----------------------------------------------

        if (!isValid(title)) return res.status(400).send({ status: false, msg: "title is required and it's must be string" })
        if (!isValidRegex1(title)) return res.status(400).send({ status: false, msg: "Invalid title" })
        
        if (!isValid(excerpt)) return res.status(400).send({ status: false, msg: "excerpt is required and it's must be string" })
        if (!isValidRegex1(excerpt)) return res.status(400).send({ status: false, msg: "Invalid excerpt" })

        if (!isValid(userId)) return res.status(400).send({ status: false, msg: "userId is required and it's must be string" })
        if (!isValidObjectId(userId)) return res.status(400).send({ status: false, msg: "Invalid userId" })

        if (!isValid(ISBN)) return res.status(400).send({ status: false, msg: "ISBN number is required and it's must be string" })
        if (!isValidRegex2(ISBN)) return res.status(400).send({ status: false, msg: "Invalid ISBN number" })

        if (!isValid(category)) return res.status(400).send({ status: false, msg: "category is required and it's must be string" })
        if (!isValidRegex1(category)) return res.status(400).send({ status: false, msg: "Invalid category" })

        if (!Array.isArray(subcategory)) return res.status(400).send({ status: false, msg: "subcategory is required and it's must be Array" })
        for(let element of subcategory){
            if(!isValidRegex1(element)) return res.status(400).send({status : false, msg :`invalid subcategory value ${element}`})
        }

        if (reviews) {
            if (typeof reviews !== "number") return res.status(400).send({ status: false, msg: "reviews in Nuber type" })
            if (!/^[0-9]$/.test(reviews)) return res.status(400).send({ status: false, msg: "Invalid review Number" })
        }

        const isUniqueTitle = await bookModel.findOne({ title: title })
        if (isUniqueTitle) return res.status(409).send({ status: false, msg: "Title is already Exist" })

        const isIdreferUserModel = await userModel.findById(userId)
        if (!isIdreferUserModel) return res.status(400).send({ status: false, msg: "userId is not from user Collection" })

        const isUniqueISBN = await bookModel.findOne({ ISBN: ISBN })
        if (isUniqueISBN) return res.status(409).send({ status: false, msg: "ISBN number is already exist" })

        const data = { title, excerpt, userId, ISBN, category, subcategory, releasedAt :moment().format("DD-MM-YYYY"), reviews } // check when i not send released at then what happen

        const saveData = await bookModel.create(data)

        return res.status(201).send({ status: true, msg: "Book detail is successfully registered", data: saveData })

    } catch (err) {
        return res.status(500).send({status : false, msg : err.message})
    }
}
const deletebyId = async function(req,res){
try {
    let bookId = req.param.bookId
    if(!isValidObjectId(bookId)){
        return res.status(400).send({status : false , msg : "This is invalid bookId"})
    }
    let BookId = await bookModel.findOne({_id : bookId , isDeleted : false})
    if(!BookId){
        return res.status(404).send({status : false , msg : "This bookId does not exit , Its deleted"})
    }
    let getbookId = await bookModel.findOneAndUpdate({_id:data},{$set :{isDeleted:true}})
    return res.status(200).send({status : true ,message: 'Success',data : getbookId})

    
} catch (err) {
    return res.status(500).send({status : false, msg : err.message})
}

}

// ### DELETE /books/:bookId
// - Check if the bookId exists and is not deleted. If it does, mark it deleted and return an HTTP status 200 with a response body with status and message.
// - If the book document doesn't exist then return an HTTP status of 404 with a body like [this](#error-response-structure) 

module.exports = {createBooks ,deletebyId}

