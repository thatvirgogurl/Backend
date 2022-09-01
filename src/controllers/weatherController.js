
let axios = require("axios") 
let getWeather = async function (req, res) {
    try {
        let place = req.query.q
        let appid = req.query.appid
        
        var options = {
            method: "get",
            url: `http://api.openweathermap.org/data/2.5/weather?q=London&appid=d09b3d4f30bb6431ea1e1159eccca82c`
        }
        let result = await axios(options)
        console.log(result.data)
        res.status(200).send({ msg: result.data })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}
let getWeatherAftersort = async function (req, res) {
    try {
        let city = ["Bengaluru", "Mumbai", "Delhi", "Kolkata", "Chennai", "London", "Moscow"] 
        let cityObjArray=[] 
        for(let i=0;i<city.length;i++){
            let obj={city:city[i]}
        let resp = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city[i]}&appid=d09b3d4f30bb6431ea1e1159eccca82c`)
        obj.temp=(resp.data.main.temp)
        cityObjArray.push(obj)
        }
        //sortArraybasedonTemp
        let sorted = cityObjArray.sort(function(a,b)
        {
            return a.temp-b.temp

        })

    
        console.log(sorted)
        res.status(200).send({ msg: sorted })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}
module.exports.getWeather = getWeather
module.exports.getWeatherAftersort=getWeatherAftersort