/*
    getmystudents
    geteachstudent
    addprogress
    editprogress - (put,delete)

*/
import { Caretaker, Student } from "../models/index.js";
import expressAsyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
export const getMyStudents = expressAsyncHandler(async (req, res) => {
  const id = req.body.id;
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
    const data = await Student.findOne({
      _id: students[i],
      isAcitve: "yes",
    }).select("-careTaker -previousCaretakers");
    studentsData.push(data);
  }
  return res.status(StatusCodes.OK).json({ message: "done", studentsData });
});
