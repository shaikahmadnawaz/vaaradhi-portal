/*
    getmystudents
    geteachstudent
    addprogress
    editprogress - (put,delete)

*/
import { Caretaker, Student } from "../models/index.js";
import expressAsyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import {Activity} from "../models/ActivitySchema.js";


export const Login = expressAsyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(StatusCodes.BAD_REQUEST).json({Error: "Please fill all details"});
    }
    const caretaker = await Caretaker.findOne({ email });
    if (!caretaker) {
      return res.status(StatusCodes.NOT_FOUND).json({ Error:"caretaker not found !"});
    }
  
    const isPasswordMatched = await caretaker.comparePassword(password);
    if (!isPasswordMatched) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message:"Invalid Credentials !"});
    }
    const token = caretaker.createJWT();
    const caretakerData = await Caretaker.findOne({_id:caretaker._id}).select('-password');
    return res.status(StatusCodes.OK).json({ caretakerData, token ,message:"Login Success !"});
  });

  

export const getMyStudents = expressAsyncHandler(async (req, res) => {
    const id = req.userId;
    console.log(id);
    if (!id) {
        return res.status(StatusCodes.BAD_REQUEST).json({ Error: "Fill details" });
    }
    const caretaker = await Caretaker.findOne({ _id: id });
    if (!caretaker) {
        return res.status(StatusCodes.NOT_FOUND).json({ Error: "user not found" });
    }
    const students = await caretaker["students"];
    console.log(students);
    const studentsData = [];
    for (let i = 0; i < students.length; i++) {
        const data = await Student.findOne({_id: students[i],isAcitve: "yes",}).select("-careTaker -previousCaretakers");
        studentsData.push(data);
    }
    return res.status(StatusCodes.OK).json({ message: "done", studentsData });
});

export const getEachStudent = expressAsyncHandler(async(req,res)=>{
    const studentId = req.params.studentId;
    const caretakerId = req.userId;
    try{
        const studentData = await Student.findOne({_id:studentId}).select('-previousCaretakers -careTaker');
        console.log(studentData);
        return res.status(StatusCodes.OK).json({ message: "done", studentData });
    }
    catch(err)
    {
        return res.status(StatusCodes.BAD_GATEWAY).json({message:err.message});
    }
});

export const addProgress = expressAsyncHandler(async(req,res)=>{
    const studentId = req.params.studentId;
    const {title,description,category} = req.body;
    if(!studentId || !title || !description || !category)
    {
        return res.status(StatusCodes.BAD_REQUEST).json({message:"Fill all details"});
    }
    const newActivity = await ActivitySchema
    // const studentData = await Student.findById({_id:studentId});
    // studentData['activities'].push(req.body);
    // await studentData.save();
    // return res.status(StatusCodes.OK).json({ message: "done", studentData });

});

export const updateProgress = expressAsyncHandler(async(req,res)=>{
    const studentId = req.params.id;
    const {activityId,title,description,category} = req.body;
    if(!activityId || !title || !description || !category)
    {
        return res.status(StatusCodes.BAD_REQUEST).json({message:"Fill all details"});
    }
    const student = await Student.findById({_id:studentId});
    console.log(student)
    const activities = student["activities"];
    // const updatedActivities = []
    for(let i=0;i<activities.length;i++){
        if(activities[i]._id == activityId){
            console.log("In ifl")
            for(let key in req.body){
                activities[i][key] = req.body[key];
            }
            // updatedActivities.push(activities[i]);
            activities[i].save()
        }
        // else{
        //     updatedActivities.push(activities[i]);
        // }
    }
    // student["activities"] = updatedActivities;
    //console.log(student["activities"]);
    await student.save();
    return res.status(StatusCodes.OK).json({ message: "done", student });
});

export const deleteProgress = expressAsyncHandler(async(req,res)=>{

});