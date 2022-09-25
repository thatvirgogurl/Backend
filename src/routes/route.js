const express = require("express")
const router = express.Router();
const userController= require("../controller/userController")
const bookController=require("../controller/bookController")
const reviewController = require("../controller/reviewController")
const {authentic,authorise} = require("../middleware/middleware")

//=============================== CreateUser=======================================//
router.post("/register",userController.CreateUser)

//================================= LoginUser =======================================//
router.post("/login", userController.loginuser)

//=============================== Registered a book ==================================//
router.post("/books", authentic, authorise ,bookController.createBooks)

//=============================== Get list of book ==================================//
router.get("/books", authentic ,bookController.getallBook)
router.get("/books/:bookId" , authentic ,bookController.getBooksById)

//=============================== update book ==================================//
router.put("/books/:bookId",authentic, authorise ,bookController.updatebooks)

//=============================== Delete Book ==================================//
router.delete("/books/:bookId" , authentic ,authorise, bookController.deletebyId)

router.post("/books/:bookId/review",reviewController.CreateReview)

router.put("/books/:bookId/review/:reviewId" , reviewController.updateReview)

router.delete("/books/:bookId/review/:reviewId" , reviewController.deleteReview)


module.exports = router;

