const express = require('express');
const router = express.Router()
//..............//
const {getCity} = require('../controllers/cityController');
//-----------------------------------------------------------------------------------------------------//
//Retrieve a city
router.get("/city/:cityID", getCity )
//Add a new city
router.post("/city",)
// Retrieve data on a city's average characteristics
router.get("/city/: cityID / averages",)
// Retrieve the list of top cities
router.get("/topCities",)

// Get the current weather on a city
router.get(" /city/: cityID / weather",)

// Get the list of mass transit providers and links to their websites
router.get("/ city /: cityID / transitProvders",)

// Add a new transit provider
router.post("/ city /: cityID / transitProvders",)

//--------------------------------------------------------------------------------------------------------------//
router.all("/*", (req, res) => { res.status(400).send({ status: false, message: "Endpoint is not correct plese provide a proper end-point" }) })



module.exports = router