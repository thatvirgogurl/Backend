const express = require('express')

const router = express.Router()

const { createStudent, viewStudent, deleteStudent ,updateStudentDetails} = require("../controller/student")

const { createTeacher, loginTeacher } = require("../controller/teacher")

const { authentication, authorization } = require('../middleware/auth')

//..................................................................................//
router.post("/register",createTeacher)

router.post("/login",loginTeacher)
//......................................................................................//

router.post("/crateStudent/:teacherId",authentication,createStudent)

router.get("/getStudent", authentication, viewStudent)

router.delete("/deleteStudent/:studentId", authentication, authorization ,deleteStudent)

router.put("/updateStudentDetails/:studentId", authentication, authorization,updateStudentDetails)

module.exports= router