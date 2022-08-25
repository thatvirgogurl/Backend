const express = require('express');
var bodyParser = require('body-parser');

const route = require('./routes/route.js');
//const moment=require('moment')

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    function (req, res, next) {
        console.log("inside GLOBAL MW");
        next();
    }
);
// var getIp = require("ipware")().get_ip;
// app.use((req,res,next)=>{
//     var ipInfo=getIp(req);
//     const x=moment().format("yyyy-mm-dd hh-mm-ss");
//     console.log(x,ipInfo);
//     res.send({msg:"this is response of global mw"})
// next();
// });
app.use('/', route);
const { default: mongoose } = require("mongoose");

mongoose
    .connect(
        "mongodb+srv://Monalisamishra:MDYlL3MKtGxQa59a@cluster0.7zrfpkj.mongodb.net/monalisaMishra_db",
        {
            useNewUrlParser: true,
        }
    )
    .then(() => {
        console.log("MongoDb is connected");
    })
    .catch((err) => console.log(err))
app.use(function (req, res, next) {
    console.log("hii i am global middleare")
    next()
})

app.listen(process.env.PORT || 3002, function() {
    console.log('Express app running on port ' + (process.env.PORT || 3002))
});
