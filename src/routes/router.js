const express = require("express")
const router = express.Router();
const userController= require("../controller/userController")
const bookController = require("../controller/bookController")

//=============================== CreateUse r=======================================//
router.post("/register",userController.CreateUser)

//=============================== Registered a book ==================================//
router.post("/books", bookController.createBooks)


module.exports = router;

