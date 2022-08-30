const { response } = require("express");
const jwt = require("jsonwebtoken");

const validateToken = function(req, res, next) {
  try{
    let token = req.headers["x-auth-token"];
    //if (!token) token = req.headers["x-auth-token"];
  
    //If no token is present in the request header return error
    if (!token) return res.status(403).send({ status: false, msg: "token must be present" });
  
    console.log(token);
  
    let decodedToken = jwt.verify(token, "functionup-plutonium-very-very-secret-key");
    if (!decodedToken) {
      return res.status(403).send({ status: false, msg: "token is invalid" });
    }
  req.loggedInUserId = decodedToken.userId
}
  catch(err) {
    res.status(400).send({ "error 400": err.message });
  }
    next()
}
const checkforAuthorization=function(req,res,next)
{
  try{
  let requireId = req.params.userId
  if(requireId!==req.loggedInUserId)
  {
    return res.status(401).send({msg:false,msg:"permission denied"})
  }
}
catch(err) {
    res.status(400).send({ "error 400": err.message });
  }
  next()
}
module.exports.validateToken = validateToken
module.exports.checkforAuthorization=checkforAuthorization