const express = require("express")
const router = express.Router();
const userController= require("../controller/userController")
const bookController=require("../controller/bookController")
const reviewController = require("../controller/reviewController")
const middleware = require("../middleware/middleware")

//=============================== CreateUser=======================================//
router.post("/register",userController.CreateUser)

//================================= LoginUser =======================================//
router.post("/login", userController.loginuser)

//=============================== Registered a book ==================================//
router.post("/books", middleware.authentication  ,bookController.createBooks)

//=============================== Get list of book ==================================//
router.get("/books", middleware.authentication ,bookController.getallBook)
router.get("/books/:bookId" , middleware.authentication ,bookController.getBooksById)

//=============================== update book ==================================//
router.put("/books/:bookId",middleware.authentication , middleware.authorisation ,bookController.updatebooks)

//=============================== Delete Book ==================================//
router.delete("/books/:bookId" , middleware.authentication , middleware.authorisation , bookController.deletebyId)

router.post("/books/:bookId/review",reviewController.CreateReview)

router.put("/books/:bookId/review/:reviewId" , reviewController.updateReview)

router.delete("/books/:bookId/review/:reviewId" , reviewController.deleteReview)


module.exports = router;

