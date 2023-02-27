const express = require("express");
const app = express();
 let axios = require("axios")
const redis = require("redis")
const { promisify } = require("util")

const port = 9001;

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

app.get("/city/:cityId/weather", async function (req, res) {
    let cityId = req.params.cityId
    try {
        var options = {
            method: "get",
            url: `http://api.openweathermap.org/data/2.5/weather?q=${cityId}&appid=d09b3d4f30bb6431ea1e1159eccca82c`
        }
        let alredaypresent = await GET_ASYNC(`${cityId}`)
        if (alredaypresent){
            const data = JSON.parse(alredaypresent)
            return res.status(200).send({ status: true, msg: data })
       }else{
        let result = await axios(options)
           await SET_ASYNC(`${cityId}`, JSON.stringify(result.data.weather))
            return res.status(200).send({ status: true, msg: result.data.weather })
        }
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
});
app.get("/city/:cityId", async function (req, res) {
    let name = req.params.cityId
    let key = "AnIql3sAGJQ4dDNtqtLQdWywGB7YYSZz"
    try {
        url =`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${key}&q=${name}`
        let alredaypresent = await GET_ASYNC(`${name}`)
        if (alredaypresent) {
            const data = JSON.parse(alredaypresent)
            return res.status(200).send({ status: true, msg: data })
        }else{
        let result = await fetch(url)
       const data=await result.json()
            await SET_ASYNC(`${name}`, JSON.stringify(data[0]))
            return res.status(200).send({ status: true, msg: data[0]})
        }
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }

});
app.get("/topCities", async function (req, res) {
    let key = "AnIql3sAGJQ4dDNtqtLQdWywGB7YYSZz"
   let limit=req.query.limit;//50
    try {
        url = `http://dataservice.accuweather.com/locations/v1/topcities/${limit}?apikey=${key}`
        let alredaypresent = await GET_ASYNC(`${limit}`)
        if (alredaypresent) {
            const data = JSON.parse(alredaypresent)
            return res.status(200).send({ status: true, msg: data })
        } else {
            let result = await fetch(url)
            const data = await result.json()
            await SET_ASYNC(`${limit}`, JSON.stringify(data))
            return res.status(200).send({ status: true, msg: data })
        }
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }

});
app.get("/city/:cityID/averages", async function (req, res) {
    let key = "AnIql3sAGJQ4dDNtqtLQdWywGB7YYSZz"
    let limit = req.params.cityID;
    try {
        url = `http://dataservice.accuweather.com/locations/v1/topcities/${limit}?apikey=${key}`
        let result = await fetch(url)
        const data = await result.json()
        let arr=[]
        for(let i=0;i<data.length;i++){
            if (data[i]["Rank"]>20){
                arr.push(data[i])
            }
        }
        console.log(data)
        res.send({ msg: arr })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }

});


app.get("/", (req, res) => {
    res.send("server1 called");
});

app.listen(port, () => {
    console.log("Listening at localhost " + port);
})