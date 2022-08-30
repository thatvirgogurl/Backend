const express = require('express');
const router = express.Router();
const userController= require("../controllers/userController")
const auth = require("../middlewares/auth")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/users", userController.createUser  )//registation

router.post("/login", userController.loginUser)

//The userId is sent by front end
router.get("/users/:userId", auth.validateToken, auth.checkforAuthorization, userController.getUserData)

router.put("/users/:userId", auth.validateToken, auth.checkforAuthorization, userController.updateUser)

router.delete("/users/:userId", auth.validateToken, auth.checkforAuthorization, userController.deleteUser)

module.exports = router;