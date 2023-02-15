const express = require('express');
const route = require('./routers/router.js');
const mongoose = require('mongoose');
const app = express();
//const bodyParser=require('body-parser')
const multer = require("multer")
const PORT = process.env.PORT || 3000

app.use(express.json());

app.use(multer().any())
mongoose.set('strictQuery', true);
mongoose.connect("mongodb+srv://Monalisamishra:MDYlL3MKtGxQa59a@cluster0.7zrfpkj.mongodb.net/monalisaMishra_db", {
    useNewUrlParser: true
})
    .then(() => console.log("MongoDb is connected"), err => console.log(err))


app.use('/', route);


app.listen(PORT, function () {
    console.log('Express app running on port ' + PORT)
});


