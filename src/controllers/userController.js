const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const createUser = async function (abcd, xyz) {

  try{
  let data = abcd.body;
  let savedData = await userModel.create(data);
      xyz.status(201).send({ msg: savedData })
  }

catch(err){
  xyz.status(400).send({ "error 400":err.message});
}
};

const loginUser = async function (req, res) {
    try{
  let userName = req.body.emailId;
  let password = req.body.password;

  let user = await userModel.findOne({ emailId: userName, password: password });
  if (!user)
    return res.status(403).send({
      status: false,
      msg: "username or the password is not correct",
    });

  // Once the login is successful, create the jwt token with sign function
  // Sign function has 2 inputs:
  // Input 1 is the payload or the object containing data to be set in token
  // The decision about what data to put in token depends on the business requirement
  // Input 2 is the secret
  // The same secret will be used to decode tokens
  let token = jwt.sign(
    {
      userId: user._id.toString(),
      batch: "plutonium",
      organisation: "FUnctionUp",
    },
    "functionup-plutonium-very-very-secret-key"
  );
  //res.setHeader("x-auth-token", token);
  res.status(200).send({ status: true, data: token });
}
    catch (err) {
        res.status(500).send({ "error 500": err.message });
    }
};

const getUserData = async function (req, res) {
try{
  let userId = req.params.userId;
  let userDetails = await userModel.findById(userId);


  if (!userDetails)

    return res.status(403).send({ status: false, msg: "No such user exists" });

  res.status(200).send({ status: true, data: userDetails });
}
catch (err) {
    res.status(401).send({ "error 401": err.message });
}
};

const updateUser = async function (req, res) {
  let userId = req.params.userId;
  try{
  let user = await userModel.findById(userId);
  //Return an error if no user with the given id exists in the db
  if (!user) {
    return res.status(403).send("No such user exists");
  }

  let userData = req.body;
  let updatedUser = await userModel.findOneAndUpdate({ _id: userId }, userData, {new: true});
  res.status(201).send({ status: true, data: updatedUser });
}
  catch (err) {
      res.status(400).send({ "error 400": err.message });
  }
};

const deleteUser = async function(req, res) {  
    try{  
  let userId = req.params.userId
  let user = await userModel.findById(userId)
  if(!user) {
      return res.status(403).send({status: false, message: "no such user exists"})
  }
  let updatedUser = await userModel.findOneAndUpdate({_id: userId}, {isDeleted: true}, {new: true})
  res.status(201).send({status: true, data: updatedUser})
}
  catch (err) {
        res.status(400).send({ "error 400": err.message });
    }
}

module.exports.createUser = createUser;
module.exports.getUserData = getUserData;
module.exports.updateUser = updateUser;
module.exports.loginUser = loginUser;
module.exports.deleteUser = deleteUser
