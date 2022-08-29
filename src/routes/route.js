
const express = require('express');
const router = express.Router();

const userController = require("../controller/userController")
const orderController = require("../controller/orderController")
const productController = require("../controller/productController");

const commonMW = require("../middleware/commonMiddware")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})
router.post('/creatUser', commonMW.mid1, userController.createUser)
router.post('/creatProduct', productController.CreateProduct)
router.post("/creatOrder", commonMW.mid1, commonMW.midUserId, commonMW.midProductId, orderController.CreateOrder)
router.get("/getAllorderData",orderController.getAllOrderData)




// const mid1= function ( req, res, next) {
//     console.log("Hi I am a middleware named Mid1")
//     // logic
//     let loggedIn = false

//     if (loggedIn== true) { 
//         console.log( "OK LOGGED IS IS TRUE NOW")
//         next ()
//     }
//     else {
//         res.send ("Please login or register")
//     }
// }

// e.g. restricted and open-to-all API's can be handled like below now:
// router.get('/homePage', mid1, UserController.feeds)
// router.get('/profileDetails', mid1, UserController.profileDetails)
// router.get('/friendList', mid1, UserController.friendList)
// router.get('/changePassword', mid1, UserController.changePassword)

// router.get('/termsAndConditions',  UserController.termsAndConditions)
// router.get('/register',  UserController.register)




//router.get("/gettime",commonMW.mid5,UserController.simplecode)
// router.get("/basicRoute", commonMW.mid1, commonMW.mid2, commonMW.mid3, commonMW.mid4, commonMW.mid5, UserController.basicCode)
// router.get("/basicRoute2", commonMW.mid1, UserController.basicCode2)
// router.get("/basicRoute3", commonMW.mid2, UserController.basicCode3)
// router.get("/basicRoute4", commonMW.mid1, commonMW.mid4, UserController.basicCode4)


// router.post("/createBook", BookController.createBook  )




// router.post("/createUser", UserController.createUser  )
//  router.get("/getUsersData", UserController.getUsersData)







module.exports = router;































// const commonMW = require("../middlewares/commonMiddlewares")

// router.get("/test-me", function (req, res) {
//     res.send("My first ever api!")
// })



// //MOMENT JS
// // const moment = require('moment');
// // router.get("/dateManipulations", function (req, res) {

//     // const today = moment();
//     // let x= today.add(10, "days")

//     // let validOrNot= moment("29-02-1991", "DD-MM-YYYY").isValid()
//     // console.log(validOrNot)

//     // const dateA = moment('01-01-1900', 'DD-MM-YYYY');
//     // const dateB = moment('01-01-2000', 'DD-MM-YYYY');
//     // router.post("/createUser", UserController.createUser  )
//     // router.get("/getUsersData", UserController.getUsersData)


//     // const mid1= function ( req, res, next) {
//     //     console.log("Hi I am a middleware named Mid1")
//     //     // logic
//     //     let loggedIn = false

//     //     if (loggedIn== true) { 
//     //         console.log( "OK LOGGED IS IS TRUE NOW")
//     //         next ()
//     //     }
//     //     else {
//     //         res.send ("Please login or register")
//     //     }
//     // }

//     // // e.g. restricted and open-to-all API's can be handled like below now:
//     // router.get('/homePage', mid1, UserController.feeds)
//     // router.get('/profileDetails', mid1, UserController.profileDetails)
//     // router.get('/friendList', mid1, UserController.friendList)
//     // router.get('/changePassword', mid1, UserController.changePassword)

//     // router.get('/termsAndConditions',  UserController.termsAndConditions)
//     // router.get('/register',  UserController.register)





//     router.get("/basicRoute", commonMW.mid1, commonMW.mid2, commonMW.mid3, commonMW.mid4, UserController.basicCode)


//     // const mid1= function ( req, res, next) {
//     //     console.log("Hi I am a middleware named Mid1")
//     //     // logic
//     //     let loggedIn = false

//     //     if (loggedIn== true) { 
//     //         console.log( "OK LOGGED IS IS TRUE NOW")
//     //         next ()
//     //     }
//     //     else {
//     //         res.send ("Please login or register")
//     //     }
//     // }

//     // // e.g. restricted and open-to-all API's can be handled like below now:
//     // router.get('/homePage', mid1, UserController.feeds)
//     // router.get('/profileDetails', mid1, UserController.profileDetails)
//     // router.get('/friendList', mid1, UserController.friendList)
//     // router.get('/changePassword', mid1, UserController.changePassword)

//     // router.get('/termsAndConditions',  UserController.termsAndConditions)
//     // router.get('/register',  UserController.register)





//     // router.get("/basicRoute2", commonMW.mid1, UserController.basicCode2)
//     // router.get("/basicRoute3", commonMW.mid2, UserController.basicCode3)
//     // router.get("/basicRoute4", commonMW.mid1, commonMW.mid4, UserController.basicCode4)


// //     let x = dateB.diff(dateA, "days")
// //     console.log(x)

// //     res.send({ msg: "all good" })
// // })













// //const abc = require('../introduction/intro')

























// // router.post("/createAuthorlist", authorController.createAuthorlist);
// // router.post("/createBooklist",authorController .createBooklist);
// // router.get("/booklist", authorController.booklist);

// // router.get("/findAuthor", authorController.findAuthor);
// // router.get("/listBetween", authorController.listBetween);

// //const BookController2=require("../controller/BookController2.js")
// //router.post("/createBooklist", BookController2.createBooklist)
// //router.get("/getAllBooks", BookController2.getAllBooks)
// //router.get("/allBooksList", BookController2.allBooksList)
// //router.get("/yearDetails", BookController2.yearDetails)
// //router.get("/particularBooks", BookController2.particularBooks)
// //router.get("/priceDetails", BookController2.priceDetails)
// //router.get("/randomBooks", BookController2.randomBooks)










// //const userController=require("../controller/userController.js")
// //const bookcontroller=require("../controller/bookcontroller.js")

// // router.post("/createUser", userController.createUser)
// // router.get("/getAllUser", userController.getAllUser)
// // router.post("/createBooklist", bookcontroller.createBooklist)
// // router.post("/getAllBooks", bookcontroller.getAllBooks)


















// // //const userController=require('../controller/userController')
// // router.post("/ ", BookController.createBook)
// // router.get("/getbookList", BookController.getbookList)
// // router.post("/getBookYear", BookController.getBookyear)
// // router.post("/getParticularBookData", BookController.getParticularBookData)
// // router.get("/getRandomBooks", BookController.getRandomBook)
// // router.get("/getXINRBooks", BookController.getXINRBooks)
// // // router.post('/creatUser', userController.creatUser)
// // router.get("/getallUser",userController.getallUser)
// // router.get('/test-me', function (req, res) {
// //     console.log('My batch is', abc.name)
// //     abc.printName()
// //     res.send('My second ever api!')
// // });
// // router.get('/test-you', function(req, res){
// //     res.send('This is the second routes implementation')
// // })

// // router.get('/give-me-students-data',function(req, res){

// // })
// module.exports = router;
// // adding this comment for no reason