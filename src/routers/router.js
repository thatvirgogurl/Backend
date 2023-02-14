const express = require('express');
const router = express.Router()
const { authentication, authorization } = require('../middleware/auth.js')
const { createUser, getuserById, loginUser, updateUser } = require('../controllers/userController')
const { createproduct, getProducts, getProductById, updateProduct, deleteProduct } = require('../controllers/productController')
const { createCart, updateCart, getCart, deleteCart } = require('../controllers/cartController')
const { createOrder, updateOrder } = require('../controllers/orderController')