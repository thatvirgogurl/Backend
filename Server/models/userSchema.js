const mongoose=require('mongoose')
const bcryptjs=require('bcryptjs')
const jwt=require('jsonwebtoken')

//user schema or Document 
const UserSchema=new mongoose.Schema({
    username:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    tokens:[
        {
            token:{
                type:String,
                require:true
            }
        }
    ]
})
//hashing password

UserSchema.pre('save',async function(next){
    if(this.isModified('password')){
        this.password=bcryptjs.hashSync(this.password,10)
    }
    next();
})
//generate token to verify user

UserSchema.methods.generateToken=async function(){
    try {
        let generateToken=jwt.sign({_id:this._id},process.env.SECRET_KEY)
        this.tokens=this.tokens.concat({token:generateToken});
        await this.save();
        return generateToken;
    } catch (error) {
        console.log(error)
        
    }
}
//create model
const Users = new mongoose.model('patients',UserSchema)
module.exports=Users;