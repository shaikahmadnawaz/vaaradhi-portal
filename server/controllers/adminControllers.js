import crypto from "crypto";
import { StatusCodes } from "http-status-codes";
import { sendEmail } from "../utils/index.js";
import { Donor, Admin, Caretaker, Student } from "../models/index.js";
import asyncHandler from "express-async-handler";

//Registering Admin -- For Testing
// export const addAdmin = asyncHandler(async(req, res, next) => {
//   const { name, image, email, password, mobile} = req.body;
//   if ( !name || !image || !email || !password || !mobile ) {
//     return res.status(StatusCodes.BAD_REQUEST).json({Error: "Please fill all details"});
//   }
//   const isAdmin = await Admin.findOne({ email });
//   if(isAdmin) {
//     return res.status(StatusCodes.CONFLICT).json({ message:"Admin Already Exists !"});
//   }
//   const admin = await Admin.create(req.body);
//   const adminData = await Admin.findOne({_id:admin._id}).select('-password');
//   return res.status(StatusCodes.CREATED).json({  msg: "Admin Added ",adminData });
// });


//Registering Donor
export const addDonor = asyncHandler(async(req, res, next) => {
  const { name, image, dateOfBirth, email, password, mobile} = req.body;
  if ( !name || !image || !dateOfBirth || !email || !password || !mobile ) {
    return res.status(StatusCodes.BAD_REQUEST).json({Error: "Please fill all details"});
  }
  const isDonor = await Donor.findOne({ email });
  if(isDonor) {
    return res.status(StatusCodes.CONFLICT).json({ message:"Donor Already Exists !"});
  }
  const donor = await Donor.create(req.body);
  const donorData = await Donor.findOne({_id:donor._id}).select('-password');
  return res.status(StatusCodes.CREATED).json({ msg: "Donor created" ,donorData});
});


// Registering CareTaker
export const addCaretaker = asyncHandler(async (req, res, next) => {
  const {name, image, dateOfBirth, email, password, mobile} = req.body;
  if (!name || !image || !dateOfBirth || !mobile || !email || !password) {
    return res.status(StatusCodes.BAD_REQUEST).json({Error: "Please fill all details"});
  }
  const isCaretaker = await Caretaker.findOne({ email });
  if (isCaretaker) {
    return res.status(StatusCodes.CONFLICT).json({ message:"CareTaker Already Exists !"});
  }
  const caretaker = await Caretaker.create(req.body);
  const caretakerData = await Caretaker.findOne({_id:caretaker._id}).select('-password');
  return res.status(StatusCodes.CREATED).json({ msg: "Caretaker created", caretakerData });
});


// Registering Student
export const addStudent = asyncHandler(async (req, res, next) => {
  const { name, image, aadhar, dateOfBirth, gender,category, education} = req.body;
  if ( !name || !aadhar || !image || !dateOfBirth || !gender || !category || !education) {
   return res.status(StatusCodes.BAD_REQUEST).json({Error: "Please fill all details"});
  }
  const isUser = await Student.findOne({ aadhar: aadhar });
  if (isUser) {
   return res.status(StatusCodes.CONFLICT).json({ message:"Student Already Exists !"});
  }
  const student = await Student.create(req.body);
  return res.status(StatusCodes.CREATED).json({ msg: "Student created" ,student});
});


//Login Admin
export const Login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(StatusCodes.BAD_REQUEST).json({Error: "Please fill all details"});
  }
  const admin = await Admin.findOne({ email });
  if (!admin) {
    return res.status(StatusCodes.NOT_FOUND).json({ Error:"User not found !"});
  }

  const isPasswordMatched = await admin.comparePassword(password);
  if (!isPasswordMatched) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message:"Invalid Credentials !"});
  }
  const token = admin.createJWT();
  const adminData = await Admin.findOne({_id:admin._id}).select('-password');
  return res.status(StatusCodes.OK).json({ adminData, token });
});

//Forgot Password
export const forgotPassword = asyncHandler(async (req, res, next) => {
  const admin = await Admin.findOne({ email: req.body.email });
  if (!admin) {
    return res.status(StatusCodes.NOT_FOUND).json({ Error: "User not found!" });
  }
  const resetToken = admin.getResetPasswordToken();
  await admin.save({ validateBeforeSave: false });
  const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/password/reset/${resetToken}`;
  const message = `Click on this link to reset your password \n\n ${resetPasswordUrl} \n\n If you have not requested this email then please ignore it`;
  try {
    await sendEmail({
      email: admin.email,
      subject: `Password Recovery`,
      message,
    });
    res.status(StatusCodes.OK).json({message: `Email sent to ${admin.email} successfully`});
  } catch (error) {
    admin.resetPasswordToken = undefined;
    admin.resetPasswordExpire = undefined;
    await admin.save({ validateBeforeSave: false });
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message:error.message});
  }
});


//Reset Password
export const resetPassword = asyncHandler(async (req, res, next) => {
  const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");
  const admin = await Admin.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!admin) {
    return res.status(StatusCodes.BAD_REQUEST).json({Error: "Reset Password Token is Invalid or has been Expired"});
  }
  if (req.body.newPassword !== req.body.confirmNewPassword) {
     return res.status(StatusCodes.UNAUTHORIZED).json({ message:"Password and Confirm Password must be same !"});
  }
  admin.password = req.body.newPassword;
  admin.resetPasswordToken = undefined;
  admin.resetPasswordExpire = undefined;
  await admin.save();
  return res.status(StatusCodes.OK).json();
});

//Update Admin Password
export const updatePassword = asyncHandler(async (req, res, next) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;
  if (!oldPassword || !newPassword || !confirmPassword) {
    return res.status(StatusCodes.BAD_REQUEST).json({Error: "Please fill all details"});
  }
  const admin = await Admin.findById(req.userId);
  const isPasswordMatched = await admin.comparePassword(oldPassword);
  if (!isPasswordMatched) {
     return res.status(StatusCodes.UNAUTHORIZED).json({ message:"Invalid Credentials !"});
  }
  if (newPassword !== confirmPassword) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message:"Password and Confirm Password must be same !"});
  }
  if (oldPassword === newPassword) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message:"New Password must be different from Old Password"});
  }
  admin.password = newPassword;
  await admin.save();
  return res.status(StatusCodes.OK).json({ admin, message: "password updated" });
});


//Update Admin Profile
export const updateProfile = asyncHandler(async (req, res, next) => {
  const admin = await Admin.findById(req.userId).select("-password");
  if (!admin) {
    return res.status(StatusCodes.NOT_FOUND).json({ Error: "User not found!" });
  }
  const updatedUser = await Admin.findByIdAndUpdate(req.userId, req.body, 
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
  });
  return res.status(StatusCodes.OK).json({ updatedUser });
});


//Update Student Profile
export const updateStudent = asyncHandler(async (req, res, next) => {
  const student = await Student.findById(req.params.id);
  if (!student) {
    return res.status(StatusCodes.NOT_FOUND).json({ Error: "User not found!" });
  }
  const updatedStudent = await Student.findByIdAndUpdate(req.params.id,req.body,
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );
  return res.status(StatusCodes.OK).json({ updatedStudent });
});


//Update Donor Profile
export const updateDonor = asyncHandler(async (req, res, next) => {
  const donor = await Donor.findById(req.params.id).select("-password");
  if (!donor) {
    return res.status(StatusCodes.NOT_FOUND).json({ Error: "User not found!" });
  }
  const updatedDonor = await Donor.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  return res.status(StatusCodes.OK).json({ updatedDonor });
});

//Update CareTaker Profile
export const updateCareTaker = asyncHandler(async (req, res, next) => {
  const caretaker = await Caretaker.findById(req.params.id).select("-password");
  if (!caretaker) {
    return res.status(StatusCodes.NOT_FOUND).json({ Error: "User not found!" });
  }
  const updatedCareTaker = await Caretaker.findByIdAndUpdate(req.params.id,req.body,
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );
  return res.status(StatusCodes.OK).json({ updatedCareTaker });
});


//Get Admin Details
export const getMyDetails = asyncHandler(async (req, res, next) => {
  const admin = await Admin.findById(req.userId);
  res.status(StatusCodes.OK).json({ admin });
});


//Get All Donors
export const getAllDonors = asyncHandler(async (req, res, next) => {
  const donors = await Donor.find();
  res.status(StatusCodes.OK).json({ donors });
});


//Get All Students
export const getAllStudents = asyncHandler(async (req, res, next) => {
  const students = await Student.find();
  res.status(StatusCodes.OK).json({ students });
});


//Get All CareTakers
export const getAllCareTakers = asyncHandler(async (req, res, next) => {
  const caretakers = await Caretaker.find();
  res.status(StatusCodes.OK).json({ caretakers });
});


//Remove Donor
export const removeDonor = asyncHandler(async (req, res, next) => {
  const donor = await Donor.findById(req.params.id);
  if (!donor) {
    return res.status(StatusCodes.NOT_FOUND).json({ Error:"User not found!"});
  }
  await donor.deleteOne();
  res.status(StatusCodes.OK).json({message: "Donor Removed ",});
});


//Remove Student
/*
  When a student is removed the array containing the student id of the caretaker should also be updated

*/
export const removeStudent = asyncHandler(async (req, res, next) => {
  const student = await Student.findById(req.params.id);
  if (!student) {
    return res.status(StatusCodes.NOT_FOUND).json({ Error:"User not found!"});
  }
  const caretaker = await Caretaker.findOne({_id:student.careTaker});
  const studentsOfCaretaker = caretaker['students'];
  const newStudents = studentsOfCaretaker.filter((student)=>{
    return student !== req.params.id;
  })
  caretaker.students = newStudents;
  caretaker.save();
  await student.deleteOne();
  res.status(StatusCodes.OK).json({message: "Student Removed and caretaker profile updated"});
});


//Remove CareTaker
/*
  When a caretaker is removed all the students of the caretaker should also be changed.
  careTaker id of the student is set to null
*/
export const removeCareTaker = asyncHandler(async (req, res, next) => {
  const caretaker = await Caretaker.findById(req.params.id);
  if (!caretaker) {
    return res.status(StatusCodes.NOT_FOUND).json({ Error:"User not found!"});
  }
  console.log(caretaker)
  await caretaker.deleteOne();
  const students = await Student.find({careTaker : caretaker._id});
  students.map(async(student) =>{
    student.careTaker = null;
    await student.save();
  })
  res.status(StatusCodes.OK).json({message: "Caretaker Removed ",});
});


//add students to caretaker

const addStudentToCaretaker = asyncHandler(async(req,res) =>{
  const caretakerId = req.body.caretakerId;
  const caretaker = await careTaker.findOne({_id:caretakerId});
  if(!caretaker)
  {
    return res.status(400).json({message : "Invalid caretaker data !"});
  }
  else{
    const studentId = req.body.studentId;
    const isValidStudent = await Student.findOne({_id:studentId});

    if(!isValidStudent)
    {
      return res.status(400).json({message:"Invalid student data !"});
    }
    else{
      try{
        const newStudents = caretaker['students'];
        newStudents.push(studentId);
        caretaker.students = newStudents;
        await caretaker.save();
      }
      catch(err)
      {
        return res.status(400).json({message:"something went wrong"});
      }
    }
  }
  


})