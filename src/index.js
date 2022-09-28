const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/route');
const mongoose = require('mongoose');
const app = express();
const multer = require("multer")

app.use(bodyParser.json());
app.use(multer().any())


mongoose.connect("mongodb+srv://Monalisamishra:MDYlL3MKtGxQa59a@cluster0.7zrfpkj.mongodb.net/group1Database", {
    useNewUrlParser: true
})
    .then(() => console.log("MongoDb is connected"))
    .catch(err => console.log(err))

app.use('/', route);

app.use((req, res, next) => {
    const error = new Error('/ Path not found /');
    return res.status(400).send({ status: 'ERROR', error: error.message })
});


app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});