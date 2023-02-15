const express = require('express');
const router = express.Router()

router.get("/test-me", function (req, res) {
    res.status(200).send({ status: true, message: "Testing API" })
})
const { authentication,  authorization }=require('../middlewares/auth')
const { createUser, loginUser } = require('../controllers/userController')
const { createproduct, getProducts, getProductById, updateProduct, deleteProduct } =require('../controllers/productController')
const { createCart, getUsersOfOneproduct } = require('../controllers/wishlistController')

router.post('/register', createUser)
router.post('/login', loginUser)


router.post('/createProduct', createproduct)
router.get('/getUsingFilter', getProducts)
 router.get('/products/:productId', getProductById)
router.put("/products/:productId", updateProduct)
router.delete('/products/:productId', deleteProduct)
router.get("/users/:productId/cart", getUsersOfOneproduct)


router.post("/users/:userId/cart", authentication, authorization, createCart)

router.all("/*", (req, res) => { res.status(400).send({ status: false, message: "Endpoint is not correct plese provide a proper end-point" }) })

module.exports = router;