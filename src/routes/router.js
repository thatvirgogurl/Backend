const express = require('express');
const router = express.Router();
const { authentication }=require('../middleware/auth.js')
const { createUser, getuserById ,loginUser,updateUser} = require('../controllers/userController')

const {createproduct,getProducts,getProductById,updateProduct,deleteProduct}=require('../controllers/productController')


//..............................Test API.........................//

router.get("/test-me" , function(req,res){
    res.status(200).send({status:true,message:"Testing API"})
})


//........................................User API............................................//

router.post('/register', createUser)


router.get("/user/:userId/profile",authentication,getuserById)

router.post('/login', loginUser)

router.put("/user/:userId/profile",authentication,updateUser)




//----------------------------------------Product API--------------------------//

router.post('/products', createproduct)
router.get('/products', getProducts)
router.get('/products/:productId', getProductById)
router.put("/products /:productId", updateProduct)
router.delete('/products', deleteProduct)







 router.all("/*", (req, res) => { res.status(400).send({ status: false, message: "Endpoint is not correct plese provide a proper end-point" }) })



module.exports = router