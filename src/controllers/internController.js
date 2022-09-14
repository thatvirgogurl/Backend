const collegeModel = require("../models/collegeModels")
const internModel = require("../models/internModel")


const createIntern = async function(req,res){
    try {
        let reqData = req.body
        let {name, mobile, email} = {...reqData}
        let Name = req.body.collegeName
    
        let data = await collegeModel.findOne({ Name})
        let collegeId = data["_id"]
        
        let toCreateIntern = {name,mobile,email,collegeId} 
        let savedData = await internModel.create(toCreateIntern)

        res.status(201).send({ status: true, data: savedData });

        
    } catch (error) {
        res.status(500).send({ status: false, error: error.message });
    }

}

module.exports = {createIntern}