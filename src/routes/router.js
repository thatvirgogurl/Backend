const express = require('express')
const router = express.Router()
const bookController = require("../controller/bookController")

//------------------------------Registered a book -----------------------------------------------//
router.post("/books", bookController.createBooks)




module.exports = router;