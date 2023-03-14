// getmyStudents,
// getTransactions,
// getMyDetails,
// updateProfile

import crypto from "crypto";
import { StatusCodes } from "http-status-codes";
import { Donor, Transaction, Student } from "../models/index.js";
import asyncHandler from "express-async-handler";


//Login
export const Login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(StatusCodes.BAD_REQUEST).json({Error: "Please fill all details"});
  }
  const donor = await Donor.findOne({ email });
  if (!donor) {
    return res.status(StatusCodes.NOT_FOUND).json({ Error:"User not found !"});
  }

  const isPasswordMatched = await donor.comparePassword(password);
  if (!isPasswordMatched) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message:"Invalid Credentials !"});
  }
  const token = donor.createJWT();
  const donorData = await Donor.findOne({_id:donor._id}).select('-password');
  return res.status(StatusCodes.OK).json({ donorData, token });
});


export const getMyStudents = asyncHandler(async (req, res) => {
  const id = req.userId;
  console.log(id);
  if (!id) {
    return res.status(StatusCodes.BAD_REQUEST).json({ Error: "Fill details" });
  }
  const donor = await Donor.findOne({ _id: id }).populate("students");
  if (!donor) {
    return res.status(StatusCodes.NOT_FOUND).json({ Error: "user not found" });
  }
  console.log(donor);
  //   const students = await donor["students"].
  //   const studentsData = [];
  //   for (let i = 0; i < students.length; i++) {
  //     const data = await Student.findOne({
  //       _id: students[i],
  //       isAcitve: "yes",
  //     }).select("-donor -previousdonors");
  //     studentsData.push(data);
  //   }
  return res.status(StatusCodes.OK).json({ message: "done", studentsData });
});
