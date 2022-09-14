const mongoose = require("mongoose")
const collegeModels = require("../models/collegeModels");
const internModel = require("../models/internModel");

////////////////////////////////////////////////////    Function for Validation      ////////////////////////////////////////////////////////////////////////

const isValidName = function(body) {
    const nameRegex = /^[a-zA-Z_ ]*$/
    
    return nameRegex.test(body)
}

const isValidEmail = function(email){
  return /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email);

}
const isValidMobileNo = function(mobile){
  return /^[6-9]\d{9}$/.test(mobile);
  
}





////////////////////////////////////////////////////    College Validation      ////////////////////////////////////////////////////////////////////////


const collegeValidation = async function(req, res, next){
  let collegeDetails = req.body;
  let {name, fullName, logoLink} = {...collegeDetails}
  
  if (!name ) {
    return res
    .status(400)
        .send({ status: false, msg: "name is required" });
      }
      
      if (!fullName ) {
        return res
        .status(400)
        .send({ status: false, msg: "fullName is required" });
      }
      if ( !logoLink ) {
        return res
        .status(400)
        .send({ status: false, msg: "logoLink is required" });
      }
      
    let [Name, FullName, LogoLink ] = [ isValidName(name), isValidName(fullName), isValidName(logoLink)];
    
    const isNameAlreadyUsed = await collegeModels.findOne({ name }); 
    
    if ( isNameAlreadyUsed ) {
      return res.status(400).send({ status: false, message: "name already exist" });
    }

    if (!Name ) {
      return res.status(400).send({ status: false, message: "Enter valid name" });
    }

    if ( !FullName ) {
      return res.status(400).send({ status: false, message: "Enter valid firstname" });
    }

    if ( !LogoLink  ) {
      return res.status(400).send({ status: false, message: "Enter valid logoLink" });
    }
    


    next()
}



////////////////////////////////////////////////////    Intern Validation      ////////////////////////////////////////////////////////////////////////



const internValidation = async function(req, res, next){
    let internDetails = req.body;
    let {name, mobile, email, collegeName} = {...internDetails}
    
    if (!name ) {
      return res
      .status(400)
        .send({ status: false, msg: "name is required" });
    }

    if (!mobile ) {
        return res
        .status(400)
        .send({ status: false, msg: "mobile is required" });
    }
    if ( !email ) {
        return res
        .status(400)
        .send({ status: false, msg: "email is required" });
    }
    if ( !collegeName ) {
        return res
        .status(400)
        .send({ status: false, msg: "collegeName is required" });
    }
    
    let [Name, Mobile, Email, CollegeName ] = [ isValidName(name), isValidMobileNo(mobile), isValidEmail(email), isValidName(collegeName)];
    
    
    if (!Name ) {
      return res.status(400).send({ status: false, message: "Enter valid name" });
    }
    
    
    if ( !Mobile ) {
      return res.status(400).send({ status: false, message: "Enter valid Mobile Number" });
    }

    const isMobileAlreadyUsed = await internModel.findOne({ mobile }); 

    if ( isMobileAlreadyUsed ) {
        return res.status(400).send({ status: false, message: "mobile Number already exist" });
    }

    
    if ( !Email  ) {
      return res.status(400).send({ status: false, message: "Enter valid Email" });
    }

    const isEmailAlreadyUsed = await internModel.findOne({ email }); 

    if ( isEmailAlreadyUsed ) {
        return res.status(400).send({ status: false, message: "email already exist" });
    }

    if ( !CollegeName  ) {
      return res.status(400).send({ status: false, message: "Enter valid CollegeName" });
    }



    next()
}

module.exports = {collegeValidation, internValidation}
