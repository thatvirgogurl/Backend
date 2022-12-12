const express = require('express');
const bodyParser = require('body-parser');
const route = require('./router/route');
const mongoose = require('mongoose');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb+srv://Monalisamishra:MDYlL3MKtGxQa59a@cluster0.7zrfpkj.mongodb.net/monalisaMishra_db", {
    useNewUrlParser: true
})
    .then(() => console.log("MongoDb is connected"))
    .catch(err => console.log(err))
//mongoose.set('strictQuery', false);

app.use('/', route);
app.use((req, res, next) => {
    const error = new Error('/ Path not found /');
    return res.status(400).send({ status: 'ERROR', error: error.message })
});


app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});