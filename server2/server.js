const express = require("express");
const app = express();

let axios = require("axios")
const redis = require("redis")
const { promisify } = require("util")

const redisClient = redis.createClient(

    17520,
    "redis-17520.c302.asia-northeast1-1.gce.cloud.redislabs.com",
    { no_ready_check: true }
);

redisClient.auth("e4bdGv7XMhTRht2Zr4eCAX5jB5LIgHpa", function (err) {
    if (err) throw err;
});

redisClient.on("connect", async function () {
    console.log("Connected to Redis..");
});


// //1. connect to the server
// //2. use the commands :



//Connection setup for redis

const SET_ASYNC = promisify(redisClient.SET).bind(redisClient);
const GET_ASYNC = promisify(redisClient.GET).bind(redisClient);

const port = 9003;


// Add a new city
// POST / city



// Add a new transit provider
// POST / city /: cityID / transitProvders


//GET /city/:cityID/transitProvders
app.get(" /city/:cityID/transitProvders", async function (req, res) {
    let key = "AnIql3sAGJQ4dDNtqtLQdWywGB7YYSZz"
    let cityId = req.params.cityID;
    try {
        url = " "//`http://dataservice.accuweather.com/locations/v1/topcities/${limit}?apikey=${key}`
        let result = await fetch(url)
        const data = await result.json()
        res.send({ msg: data })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }

});

app.get("/", (req,res)=>{
    res.send("server2 called");
});

app.listen(port, ()=>{
    console.log("Listening at localhost "+ port);    
})