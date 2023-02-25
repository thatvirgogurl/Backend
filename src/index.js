
const express = require('express');
const route = require('./routers/router.js');
const mongoose = require('mongoose');
const app = express();
// import fetch from 'node-fetch'
app.use(express.json());

const PORT = process.env.PORT || 3000
// import mongoose  from 'mongoose';
mongoose.set('strictQuery', true);

mongoose.connect("mongodb+srv://Monalisamishra:MDYlL3MKtGxQa59a@cluster0.7zrfpkj.mongodb.net/group4Database",{
    useNewUrlParser: true
}).then(() => console.log("MongoDb is connected"), err => console.log(err))

app.use('/', route);


app.listen(PORT, function () {
    console.log('Express app running on port ' + PORT)
});

