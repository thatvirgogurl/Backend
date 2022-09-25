const bookModel = require("../models/bookmodel");
const userModel = require("../models/usermodel")
const reviewModel = require("../models/reviewmodel")
const moment = require("moment")
const { isValid, isValidISBNRegex } = require("../validator/validator");
const { default: mongoose } = require("mongoose");



const createBooks = async function (req, res) {

    try {

        if (Object.keys(req.body).length == 0) return res.status(400).send({ status: false, msg: "No parameter is found ,Plz provide detail" })

        //============================== Mandatory Field Validation===========================//

        let { title, excerpt, userId, ISBN, category, subcategory, releasedAt } = req.body
        const requestBody = ["title", "excerpt", "userId", "ISBN", "category", "subcategory"]

        for (element of requestBody) {
            if (!isValid(req.body[element])) return res.status(400).send({ status: false, msg: `${element} is required and its must be valid format` })
        }
        //=================================== Title Validation================================//

        if (!(/^([a-zA-Z" "_-]+)$/.test(title))) return res.status(400).send({ status: false, msg: `Invalid title , If book name  contain any intger Write in Roman Digit` })
        title = title.split(" ").filter(x => x).join(" ")

        //==================================== Excerpt Validation=============================//

        if (!(/^([a-zA-Z" "_-]+)$/.test(excerpt))) return res.status(400).send({ status: false, msg: `Invalid excerpt If excerpt name contain any intger Write in Roman Digit` })
        excerpt = excerpt.split(" ").filter(x => x).join(" ")

        //====================================category Subcategoty Validation=================//

        if (!/^([a-zA-Z-_]+)$/.test(category)) return res.status(400).send({ status: false, msg: `Invalid category` })
        if (!/^([a-zA-Z-_]+)$/.test(subcategory)) return res.status(400).send({ status: false, msg: `Invalid subcategory` })

        //================================== Validate ISBN and userId=========================//

        if (!isValidISBNRegex(ISBN)) return res.status(400).send({ status: false, msg: "Invalid ISBN number" })
        if (!mongoose.Types.ObjectId.isValid(userId)) return res.status(400).send({ status: false, msg: "Invalid userId" })

        //================================ Validate Realised Date ============================//

        if (!releasedAt) return res.status(400).send({ status: false, msg: `realisedAt is required ` })
        if (!(/^[12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/).test(releasedAt)) return res.status(400).send({ status: false, msg: "RealisedAt Must be in the format of DD-MM-YYYY" })
        if (!(moment(releasedAt).isBefore(moment().format()))) return res.status(400).send({ status: false, msg: "Please Provide Past date" })

        //================================== Mongo DB data Check=============================//

        const isUniqueTitle = await bookModel.findOne({ title: title })
        if (isUniqueTitle) return res.status(400).send({ status: false, msg: "Title is already Exist" })

        const isIdreferUserModel = await userModel.findById(userId)
        if (!isIdreferUserModel) return res.status(400).send({ status: false, msg: "userId is not from user Collection" })

        const isUniqueISBN = await bookModel.findOne({ ISBN: ISBN })
        if (isUniqueISBN) return res.status(409).send({ status: false, msg: "ISBN number is already exist" })

        //==================================End Validation=======================================//
        const data = { title, excerpt, userId, ISBN, category, subcategory, releasedAt }
        const saveData = await bookModel.create(data)

        return res.status(201).send({ status: true, msg: "Book detail is successfully registered", data: saveData })

    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}

const getallBook = async function (req, res) {

    try {

        let { userId, category, subcategory } = req.query
        let obj = { isDeleted: false }
        console.log(req.query)

        if (userId) {

            if (!isValid(userId)) return res.status(400).send({ status: false, msg: "userId must be string" })
            if (!mongoose.Types.ObjectId.isValid(userId)) return res.status(400).send({ status: false, msg: "Invalid userId" })

            const isIdreferUserModel = await userModel.findById(userId)
            if (!isIdreferUserModel) return res.status(400).send({ status: false, msg: "userId is not from user Collection" })
            obj.userId = userId
        }
        if (category) {

            if (!isValid(category)) return res.status(400).send({ status: false, msg: "category must be string" })
            if (!/^([a-zA-Z-_]+)$/.test(category)) return res.status(400).send({ status: false, msg: "Invalid category" })
            obj.category = category
        }
        if (subcategory) {
            if (!isValid(subcategory)) return res.status(400).send({ status: false, msg: "subcategory must be string" })
            if (!/^([a-zA-Z-_]+)$/.test(subcategory)) return res.status(400).send({ status: false, msg: "Invalid subcategory" })
            obj.subcategory = subcategory
        }

        let listOfbook = await bookModel.find(obj).select({ isDeleted: 0, subcategory: 0, ISBN: 0, createdAt: 0, updatedAt: 0, __v: 0 }).sort({ title: 1 })
        if (listOfbook.length == 0) {
            return res.status(404).send({ status: false, msg: "no document found" })
        }

        return res.status(200).send({ status: true, message: 'Books list', Data: listOfbook })
    }
    catch (err) {
        res.status(500).send({
            status: false,
            msg: err.message
        })
    }
}

const getBooksById = async function (req, res) {

    try {

        const bookId = req.params.bookId;


        if (!isValid(bookId)) return res.status(400).send({ status: false, msg: "bookId is required" })
        if (!mongoose.Types.ObjectId.isValid(bookId)) {
            return res.status(400).send({ status: false, msg: "invalid bookId" })
        }

        const foundedBook = await bookModel.findOne({ _id: bookId, isDeleted: false }).select({ __v: 0, ISBN: 0 })
        console.log(foundedBook)

        if (!foundedBook) {
            return res.status(404).send({ status: false, message: "book not found" })
        }
        const availableReviews = await reviewModel.find({ bookId: foundedBook._id, isDeleted: false })
            .select({ isDeleted: 0, createdAt: 0, updatedAt: 0, __v: 0 })
        let found = JSON.parse(JSON.stringify(foundedBook))

        if (availableReviews.length == 0) {
            found["reviewsData"] = []
            return res.status(200).send({ status: true, data: found })
        }
        found["reviewData"] = availableReviews
        return res.status(200).send({ status: true, message: "Books list", data: found })
    } catch (error) {
        res.status(500).send({ msg: error.message })
    }
}


const updatebooks = async function (req, res) {

    try {

        let bookId = req.params.bookId;

        if (!isValid(bookId)) return res.status(400).send({ status: false, msg: "bookId is required" })
        if (!mongoose.Types.ObjectId(bookId)) return res.status(400).send({ status: false, msg: "Invalid userId" })

        let bookDetails = await bookModel.findOne({ _id: bookId, isDeleted: false });
        if (!bookDetails) {
            return res.status(404).send({ status: false, msg: "no such book  exist" });
        }

        if (Object.keys(req.body).length == 0) return res.status(200).send({ status: true, msg: "No such thing You are Update", data: bookDetails })

        let { title, excerpt, ISBN, releasedAt } = req.body;
        let obj = {}

        if (title) {

            if (!isValid(title)) return res.status(400).send({ status: false, msg: "title it's must be string" })
            if (!(/^([a-zA-Z" "_-]+)$/.test(title))) return res.status(400).send({ status: false, msg: `Invalid title` })
            title = title.split(" ").filter(x => x).join(" ")

            const isUniqueTitle = await bookModel.findOne({ title: title })
            if (isUniqueTitle) return res.status(400).send({ status: false, msg: "Title is already Exist" })

            obj["title"] = title

        }
        if (excerpt) {

            if (!isValid(excerpt)) return res.status(400).send({ status: false, msg: "excerpt it's must be string" })
            if (!(/^([a-zA-Z" "_-]+)$/.test(excerpt))) return res.status(400).send({ status: false, msg: `Invalid excerpt` })
            excerpt = excerpt.split(" ").filter(x => x).join(" ")

            obj["excerpt"] = excerpt
        }

        if (ISBN) {

            if (!isValid(ISBN)) return res.status(400).send({ status: false, msg: "ISBN number is required and it's must be string" })
            if (!isValidISBNRegex(ISBN)) return res.status(400).send({ status: false, msg: "Invalid ISBN number" })

            const isUniqueISBN = await bookModel.findOne({ ISBN: ISBN })
            if (isUniqueISBN) return res.status(409).send({ status: false, msg: "ISBN number is already exist" })

            obj["ISBN"] = ISBN

        }

        if (releasedAt) {

            if (!(/^[12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/).test(releasedAt)) return res.status(400).send({ status: false, msg: "RealisedAt Must be in the format of YYYY-MM-DD" })
            if (!(moment(releasedAt).isBefore(moment().format()))) return res.status(400).send({ status: false, msg: "Please Provide Past date" })

            obj["releasedAt"] = releasedAt
        }

        let updatebook = await bookModel.findOneAndUpdate({ _id: bookId }, { $set: obj }, { new: true })
        res.status(200).send({ status: true, message: 'Successfully Document Update', data: updatebook });

    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message });
    }
}


const deletebyId = async function (req, res) {

    try {

        let bookId = req.params.bookId

        if (!isValid(bookId)) return res.status(400).send({ status: false, msg: "bookId is required" })
        if (!mongoose.Types.ObjectId(bookId)) { return res.status(400).send({ status: false, msg: "This is invalid bookId" }) }

        let bookData = await bookModel.findOne({ _id: bookId, isDeleted: false })
        if (!bookData) {
            return res.status(404).send({ status: false, msg: "This bookId does not exit or already deleted" })
        }

        let getbookDoc = await bookModel.findOneAndUpdate({ _id: bookId }, { $set: { isDeleted: true, deletedAt: new Date() } }, { new: true })
        return res.status(200).send({ status: true, message: "Successfully Document Deleted" })

    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}

module.exports = { createBooks, deletebyId, getallBook, getBooksById, updatebooks }


