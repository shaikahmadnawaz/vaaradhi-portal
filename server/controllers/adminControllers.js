// TO-DO: admin controller
import crypto from "crypto";
import { StatusCodes } from "http-status-codes";
import { sendEmail } from "../utils/index.js";
import { Donor, Admin, Caretaker, Student,Transaction } from "../models/index.js";
import asyncHandler from "express-async-handler";




// CREATE

//ADD ADMIN
export const addAdmin = asyncHandler(async(req, res, next) => {
  const { name, image, email, password, mobile} = req.body;
  if ( !name || !image || !email || !password || !mobile ) {
    return res.status(StatusCodes.BAD_REQUEST).json({Error: "Please fill all details"});
  }
  const isAdmin = await Admin.findOne({ email });
  if(isAdmin) {
    return res.status(StatusCodes.CONFLICT).json({ message:"Admin Already Exists !"});
  }
  const admin = await Admin.create(req.body);
  const adminData = await Admin.findOne({_id:admin._id}).select('-password');
  return res.status(StatusCodes.CREATED).json({  msg: "Admin Added ",adminData });
});


//adding donor
export const addDonor = asyncHandler(async(req, res, next) => {
  const { name, image, dateOfBirth, email, password, mobile} = req.body;
  if ( !name ||  !dateOfBirth || !email || !password || !mobile ) {
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
  return res.status(StatusCodes.CREATED).json({ message: "Caretaker created", caretakerData });
});

//register student
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
  const savedData = await Student.findById({_id:student._id});
  return res.status(StatusCodes.CREATED).json({ msg: "Student created" ,savedData});
});


//READ

//admin login
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
  const caretakers = await Caretaker.find().populate({path:"students",select:['_id','name','gender','category']});
  res.status(StatusCodes.OK).json({ caretakers });
});


//get each  Donor
export const getEachDonor = asyncHandler(async (req, res, next) => {
  const donors = await Donor.findById(req.params.id).populate('transactions').populate({path:"students",select:['_id','name','gender','category','gender','dateOfBirth','image']});
  res.status(StatusCodes.OK).json({ donors });
});


//get each  Student
export const getEachStudent = asyncHandler(async (req, res, next) => {
  const student = await Student.findById(req.params.id).populate('activites documents');
  res.status(StatusCodes.OK).json({ student });
});


//get each  CareTaker
export const getEachCareTaker = asyncHandler(async (req, res, next) => {
  const caretakers = await Caretaker.findById(req.params.id);
  res.status(StatusCodes.OK).json({ caretakers });
});

//UPDATE

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
  return res.status(StatusCodes.OK).json({ message: "password updated" , admin });
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
  return res.status(StatusCodes.OK).json({message : "Donor Details Updated !", updatedDonor });
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
  return res.status(StatusCodes.OK).json({ message : "Student Updated !",updatedStudent });
});


//add students to caretaker
const addStudentToCaretaker = asyncHandler(async(req,res) =>{
  const caretakerId = req.body.caretakerId;
  const caretaker = await Caretaker.findOne({_id:caretakerId});
  if(!caretaker)
  {
    return res.status(400).json({message : "caretaker not found!"});
  }
  else{
    const studentId = req.body.studentId;
    const studentData = await Student.findOne({_id:studentId});
    if(!studentData)
    {
      return res.status(400).json({message:"user not found !"});
    }
    else{
      studentData.careTaker = caretakerId;
      studentData.save();
      return res.status(StatusCodes.OK).json({message : "Added student to caretaker"})
    }
}});



//REMOVE
//Remove Student
export const removeStudent = asyncHandler(async(req, res, next) => {
  const student = await Student.findById(req.params.id);
  if (!student) {
    return res.status(StatusCodes.NOT_FOUND).json({ Error:"User not found!"});
  }
  const update = await Student.findByIdAndUpdate(req.params.id,{isActive : false},{
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  return res.status(StatusCodes.OK).json({message : "Student Removed !"});
});

//remove caretaker
export const removeCaretaker = asyncHandler(async (req, res, next) => {
  const caretaker = await Caretaker.findById(req.params.id);
  if (!caretaker) {
    return res.status(StatusCodes.NOT_FOUND).json({ Error:"User not found!"});
  }
  await Caretaker.findByIdAndUpdate(req.params.id,{isActive : false},{
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  await Student.updateMany({ careTaker: req.params.id }, { $set: { careTaker: null } });
  return res.status(StatusCodes.OK).json({ message: "Caretaker Removed !" });
});

// Remove Donor
export const removeDonor = asyncHandler(async (req, res, next) => {
  const donor = await Donor.findById(req.params.id);
  if (!donor) {
    return res.status(StatusCodes.NOT_FOUND).json({ Error: "User not found!" });
  }
  // Find the student with the donor and remove the donor id
  const students = await Student.updateMany(
    { donors: { $in: [req.params.id] } },
    { $pull: { donors: req.params.id }, $push: { previousDonors: req.params.id } }
  );
  // Update the donor's isActive field to false
  const updatedDonor = await Donor.findByIdAndUpdate(req.params.id, { isActive: false }, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(StatusCodes.OK).json({ message: "Donor Removed ", });
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
  return res.status(StatusCodes.OK).json({  message: "Password updated" });
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
  const message = `\n Click on this link to reset your password \n\n ${resetPasswordUrl} \n\n If you have not requested this email then please ignore it`;
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
