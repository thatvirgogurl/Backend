const studentModel = require("../models/studentModel")
const createStudent = async function (req, res) {
    try {
        if (Object.keys(req.body).length == 0) { return res.status(400).send({ status: false, msg: "No parameter is found ,Plz provide detail" }) }

        let { name, subject,marks} = req.body

        let teacherId = req.params.teacherId

        if (!teacherId) return res.status(400).send({ status: false, msg: "teacherId should be pressent" })

        if (!name) return res.status(400).send({ status: false, msg: "name should be peresent" })

        if (!subject) return res.status(400).send({ status: false, msg: "subject should be peresent" })
        
        let alreadyPresent = await studentModel.findOne({
            teacher: teacherId,
            name,
            subject,
            isDeleted: false,
        });
        
        if (alreadyPresent) {
            let updateRecord = await studentModel.findOneAndUpdate(
                { name, subject, teacher:teacherId,isDeleted: false },
                { $inc: { marks: marks } },
                { new: true }
            );
            return res.status(201).send({ status: true, msg: "Success", data: updateRecord });
        }
        let createStudentt = { ...req.body, teacher: teacherId }
        let addstudent = await studentModel.create(createStudentt);
        res.status(201).send({ status: true, msg: "Success", data: addstudent });
    }

    catch (error) {
        return res.status(500).send({ status: false, msg: error.message })

    }

}
const viewStudent = async function (req, res) {
    try {
        let { name, subject } = req.query;
        if (!name || !subject) return res.status(400).send({ status: false, message: 'use filetr' })
        let condition = { isDeleted: false, name: name, subject: subject }
        let details = await studentModel.find(condition)
        if (details.length==0) {
            return res.status(400).send({ status: false, message: "no such student  found" })
        }
        res.status(200).send({ status: true, msg: "Success", data: details });

    } catch (error) {
        res.status(500).send({ status: false, msg: error.message });
    }
}

const updateStudentDetails = async function (req, res) {
    try {
        let student = req.params.studentId;
        if (Object.keys(req.body).length == 0) { return res.status(400).send({ status: false, msg: "No parameter is found ,Plz provide detail" }) }
        let { name, subject, marks } = req.body;
        if (name && subject) {
            let alreadyPresent = await studentModel.findOne({
                _id: student,
                name,
                subject,
                isDeleted: false,
            });
            if (alreadyPresent) {
                if (marks) {
                    let updatemarks = await studentModel.findByIdAndUpdate(
                        student,
                        { marks: marks },
                        { new: true }
                    );
                    return res
                        .status(200)
                        .send({ status: true, msg: "Success", data: updatemarks });
                } else {
                    return res
                        .status(200)
                        .send({ status: true, msg: "Success", data:" nothing to be update"});
                }
            } 
        }
}
    catch (err) {
        res.status(500).send({ status: false, msg: err.message });
    }
}

const deleteStudent = async function (req, res) {
    try {
        let student = req.params.studentId;
        let deleteData = await studentModel.findOneAndUpdate(
            { _id:student, isDeleted: false },
            { $set: { isDeleted: true } },
            { new: true }
        );
        if (deleteData == null) return res.status(400).send({ status: false, msg: "already deleted" })
        res.status(200).send({ status: true, msg: "Success", Data: deleteData });
    } catch (err) {
        res.status(500).send({ status: false, msg: err.message });
    }
}


module.exports = { createStudent, viewStudent, deleteStudent, updateStudentDetails }