const express=require('express');
// const route=express.Router()
const route = require('./routes/router.js');
const mongoose=require('mongoose')
const app=express( )
const multer=require('multer')
const PORT = 3000 || process.env.PORT
aap.use(express.json())
app.use(multer().any())

mongoose.connect("",{
    useNewUrlParser:true
})
.then(()=>
    console.log('mongodb connected'),
    err=>
        console.log(err))

app.use('/',route);
app.listen(PORT,function (){
    console.log('Express app running on port ' + PORT)
})