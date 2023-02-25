const city = require("../models/city")
// const fetch = require('node-fetch')
const cities = require('country-state-city').City
const mongoose = require('mongoose');
//console.log(cities.getAllCities())
//console.log(cities.getCitiesOfCountry("IN"));
//console.log(cities.getCitiesOfState("UP"));
const getCity = async function getcity(req, res) {

    let cityID = req.params.cityID;
    if (!cityID) {
        return res.status(400).send({ status: false, message: "please provide cityID" })
    }
    if (!mongoose.Types.ObjectId.isValid(cityID)) {
        return res.status(400).send({ status: false, message: "please provied a valid cityID" })
    }
   // const mypost = await fetch("https://jsonplaceholder.typicode.com/posts");
    // const res = await mypost.json();
    // for (let i = 0; i < res.length; i++) {
    //     const post = new city({  
    //         user_id: res[i]['userId'],
    //         id: res[i]['id'],
    //         title: res[i]['title'],
    //         description: res[i]['body']
    //     })
    //     city.save()
    //}
}

module.exports = { getCity}