const express = require("express");
const app = express();
const port = 9003;

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



// Add a new city
app.post("/city", async function (req, res) {
    try{
        let body = req.body;
        let name=req.body.name;
        let alredaypresent = await GET_ASYNC(`${name}`)
        if (alredaypresent) {
            const data = JSON.parse(alredaypresent)
            return res.status(200).send({ status: true, msg: data })
        } else {
            axios.post("http://url.in/api/..", { body }).then((res) =>{
            SET_ASYNC(`${name}`, JSON.stringify(body))
                return res.status(201).send({ status: true, msg: created })
        }).catch((err)=>
             res.status(401).send({ status: true, msg: err }))
        }
    }catch(err){
        console.log(err)
        res.status(500).send({ msg: err.message })
    }

})
//Add a new transit provider
//POST / city /: cityID / transitProvders



app.post("/city/:cityID/transitProvders", async function (req, res) {
    try {
        let body = req.body;
        let transitProvdersId = req.params.cityID;
        let alredaypresent = await GET_ASYNC(`${transitProvdersId}`)
        if (alredaypresent) {
            const data = JSON.parse(alredaypresent)
            return res.status(200).send({ status: true, msg: data })
        } else {
            axios.post("http://url.in/api/..", { body }).then((res) => {
                SET_ASYNC(`${transitProvdersId}`, JSON.stringify(body))
                return res.status(201).send({ status: true, msg: created })
            }).catch((err) =>
                res.status(401).send({ status: true, msg: err }))
        }
    } catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }

})

//GET /city/:cityID/transitProvders
app.get("/city/:cityID/transitProvders", async function (req, res) {
    let key = "AnIql3sAGJQ4dDNtqtLQdWywGB7YYSZz"
    let cityId = req.params.cityID;
    try {
        url = `http://dataservice.accuweather.com/locations/v1/topcities/${cityId}?apikey=${key}`
        let result = await fetch(url)
        const data = await result.json()
        res.status(401).send({ msg: data })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }

});

app.get("/", (req, res) => {
    res.send("server2 called");
});

app.listen(port, () => {
    console.log("Listening at localhost " + port);
})