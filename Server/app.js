const dotenv = require('dotenv');
const express = require('express')
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser');
//configure ENV file &require connection file
dotenv.config({ path: './config.env' });
require('./db/conn')
const port = process.env.PORT


const app = express();

//these metjods is used to get data and cookies from frontend
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());


//require model
const Users = require('./models/userSchema')
const Messages = require('./models/msgSchema')

//registaion
app.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body
        const createUser = new Users({
            username: username,
            email: email,
            password: password
        });
        //save method is used to create user or insert user
        //before insert pass will be hash

        const create = await createUser.save()
        console.log(create)
        res.status(201).send('registerd')
    } catch (e) {
        res.status(500).send(e)
    }
})
//Login user

app.post('/login',async(req,res)=>{
    try {
        const {email,password}=req.body
        //find in db
        const user=await Users.findOne({email:email});
        if(user){
            const isMatch=await bcryptjs.compare(password,user.password);
            if(isMatch){
                const token =await user.generateToken();
                res.cookie('jwt',token,{
                    //expire token in 24 hr
                    expires:new Date(Date.now()+86400000),
                    httpOnly:true
                })
                res.status(200).send('LoggIn')
            }else{
                res.status(400).send("invalid credential")
            }
        }
        
    } catch (error) {
        res.status(500).send(e)
    }
})
//message
app.post('/message', async (req, res) => {
    try {
        const { name, email, message, phNum } = req.body
        const createUser = new Messages({
            name: name,
            email: email,
            phNum:phNum,
            message: message
        });
        //save method is used to create user or insert user
        //before insert pass will be hash

        const create = await sendMsg.save()
        console.log(create)
        res.status(201).send('send')
    } catch (e) {
        res.status(500).send(e)
    }
})


app.get('/', (req, res) => {
    res.send('hello world')
})
// run server
app.listen(port, () => {
    console.log('server is listening')
})
