const express = require('express');
const router = express.Router();
const CowinController=require("../controllers/cowinController")
const memesController=require("../controllers/memesController")
const weatherController=require("../controllers/weatherController")



router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
 })


router.get("/cowin/states", CowinController.getStates)
router.get("/cowin/districtsInState/:stateId", CowinController.getDistricts)
router.get("/cowin/getByPin", CowinController.getByPin)

router.post("/cowin/getOtp", CowinController.getOtp)
//vaccination sessions by districcowint id"
router.get("/cowin/getDistrictId", CowinController.getDistrictsId)
// WRITE A GET API TO GET THE LIST OF ALL THE "vaccination sessions by district id" for any given district id and for any given date
router.get("/getWeather", weatherController.getWeather)
router.get("/getWeatherAfterSort", weatherController.getWeatherAftersort)
router.post("/meme",memesController.meme)

module.exports = router;