
const express = require("express")
const router = express.Router();
const userController= require("../controllers/userController")


router.post("/register",userController.CreateUser)

module.exports
const express = require('express')
const router = express.Router()
const bookController = require("../controller/bookController")

//------------------------------Registered a book -----------------------------------------------//
router.post("/books", bookController.createBooks)




module.exports = router;
>>>>>>> 683a05741b66800887b0a24bb050914c542be283
