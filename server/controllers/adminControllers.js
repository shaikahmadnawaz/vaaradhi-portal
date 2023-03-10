import ErrorHandler from "../utils/errorhandler";
import Donor from "../models/Donor";
import Admin from "../models/Admin";
import Caretaker from "../models/Caretaker";
import Student from "../models/Student";
import sendToken from "../utils/jwttoken";
import sendEmail from "../utils/sendEmail";
import catchAsyncErrors from "../middleware/catchSyncErrors";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import { send } from "process";

//Registering Donor
exports.addDonor = catchAsyncErrors(async (req, res, next) => {
  const { name, image, dateOfBirth, email, password, mobile, occupation, students, transactions} = req.body;

  if (!name || !image || !dateOfBirth || !email || !password || !mobile || !occupation) {
    return next(new ErrorHandler("Please fill all details ", 400));
  }
  const isDonor = await Donor.findOne({ email: email });
  if (isDonor) {
    return next(new ErrorHandler("Email already exists", 400));
  }
  const donor = await new Donor({
    name,image,dateOfBirth,email,password,mobile,occupation,students,transactions,
  });
  password = await bcrypt.hash(password, 12);
  await donor.save();
  //Creating token for future login
  sendToken(donor, 201, res);
});

// Registering Student
exports.addStudent = catchAsyncErrors(async (req, res, next) => {
  const { name, image, dateOfBirth, gender, mother, father, guardian, careTaker, donor, category, education, previousCaretakers, previousDonors, documents, activities} = req.body;
    
  if (!name || !image || !dateOfBirth || !gender || !careTaker || !donor || !category || !education) {
    return next(new ErrorHandler("Please fill all details ", 400));
  }
  const isUser = await Student.findOne({ email: email });
  if (isUser) {
    return next(new ErrorHandler("Email already exists", 400));
  }
  const student = await new Student({
    name,image:"sample-url",dateOfBirth,gender,mother,father,guardian,careTaker,donor,category,education,previousCaretakers,previousDonors,documents,activities,
  });
  await student.save();
  sendToken(student, 201, res);
});

// Registering CareTaker
exports.addCaretaker = catchAsyncErrors(async (req, res, next) => {
  const { name, image, dateOfBirth, email, password, mobile, students } = req.body;

  if (!name || !image || !dateOfBirth || !mobile || !email || !password) {
    return next(new ErrorHandler("Please fill all details ", 400));
  }
  const isUser = await Caretaker.findOne({ email: email });
  if (isUser) {
    return next(new ErrorHandler("Email already exists", 400));
  }
  const caretaker = await new Caretaker({ 
    name, image:"sample url", dateOfBirth, email, password, mobile, students,
  });
  password = await bcrypt.hash(password, 12);
  await caretaker.save();
  sendToken(caretaker, 201, res);
});


//Login Admin
exports.AdminLogin = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  //Verifying  all fields are filled or not
  if (!email || !password) {
    return next(new ErrorHandler("Please fill both Email and Password ", 400));
  }
  const admin = await Admin.findOne({ email: email }).select("+password");
  if (!admin) {
    return next(new ErrorHandler("Invalid Email or Password ", 401));
  }
  const isPasswordMatched = await bcrypt.compare(password, admin.password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email or Password ", 401));
  }
  sendToken(admin, 200, res);
});

//Logout Admin
exports.AdminLogout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Logged out",
  });
});

//Forgot Password
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const admin = await Admin.findOne({ email: req.body.email });
  if (!admin) {
    return next(new ErrorHandler("User not Found", 404));
  }
  if (req.body.email !== req.admin.email) {
    return next(new ErrorHandler("Enter your Registered Email ", 404));
  }
  //Get Reset Password Token
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
    res.status(200).json({
      success: true,
      message: `Email sent to ${admin.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(error.message, 500));
  }
});

//Reset Password
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  //creating hashed token
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  const admin = await admin.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!admin) {
    return next( new ErrorHandler("Reset Password Token is Invalid or has been Expired",400));
  }
  if (req.body.newPassword !== req.body.confirmNewPassword) {
    return next(new ErrorHandler("Passwords does not match", 400));
  }
  admin.password = req.body.newPassword;
  admin.resetPasswordToken = undefined;
  admin.resetPasswordExpire = undefined;
  await admin.save();
  sendToken(admin, 200, res);
});

//Get Student Details
// exports.getStudentDetails = catchAsyncErrors(async (req, res, next) => {
//   const student = await Student.findById(req.student.id);
//   res.status(200).json({
//     sucess: true,
//     student,
//   });
// });

//Get Donor Details
// exports.getDonorDetails = catchAsyncErrors(async (req, res, next) => {
//   const donor = await Donor.findById(req.donor.id);
//   res.status(200).json({
//     sucess: true,
//     donor,
//   });
// });

//Get Caretaker Details
// exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
//   const caretaker = await Caretaker.findById(req.caretaker.id);
//   res.status(200).json({
//     sucess: true,
//     caretaker,
//   });
// });


//Update Admin Password
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;
  if (!oldPassword || !newPassword || !confirmPassword) {
    return next(new ErrorHandler("Please fill all the details ", 400));
  }
  const admin = await Admin.findById(req.admin.id).select("+password");
  const isPasswordMatched = await bcrypt.compare(oldPassword, admin.password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Old Password is incorrect ", 400));
  }
  if (newPassword !== confirmPassword) {
    return next(new ErrorHandler("Passwords does not match", 400));
  }
  if (oldPassword === newPassword) {
    return next(
      new ErrorHandler("New Password must be different from Old Password", 400)
    );
  }
  admin.password = newPassword;
  await admin.save();
  sendToken(admin, 200, res);
});

//Update Student Profile
exports.updateStudentProfile = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.params.id);
  if (!student) {
    return next(new ErrorHandler(`student does not exist with id : ${req.student.id}`, 404));
  } 
  else {
    const isOthersData = await Student.findOne({ email: req.body.email });
    if (isOthersData) {
      if (req.student.email === req.body.email) {
        //we will add cloud url later (for avatar)
        const student = await student.findByIdAndUpdate(req.student.id, req.body, {
          new: true,
          runValidators: true,
          useFindAndModify: false,
        });
        res.status(200).json({
          success: true,
          message: "Profile Updated Successfully",
        });
      } else {
        return next(new ErrorHandler("Email is already in use, Please choose a different email",400));
      }
    }
  }
});

//Update Admin Profile
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
  const admin = await Admin.findById(req.params.id);
  if (!admin) {
    return next(new ErrorHandler(`admin does not exist with id : ${req.admin.id}`, 404));
  } 
  else {
    const isOthersData = await Admin.findOne({ email: email });
    if (isOthersData) {
      if (req.admin.email === req.body.email) {
        //we will add cloud url later (for avatar)
        const admin = await admin.findByIdAndUpdate(req.admin.id, req.body, {
          new: true,
          runValidators: true,
          useFindAndModify: false,
        });
        res.status(200).json({
          success: true,
          message: "Profile Updated Successfully",
        });
      } else {
        return next(new ErrorHandler("Email is already in use,Please choose a different email",400));
      }
    }
  }
});

//Update Donor Profile
exports.updateDonorProfile = catchAsyncErrors(async (req, res, next) => {
  const donor = await Donor.findById(req.params.id);
  if (!donor) {
    return next(new ErrorHandler(`donor does not exist with id : ${req.donor.id}`, 404));
  } 
  else {
    const isOthersData = await donor.findOne({ email: email });
    if (isOthersData) {
      if (req.donor.email === req.body.email) {
        //we will add cloud url later (for avatar)
        const donor = await donor.findByIdAndUpdate(req.donor.id, req.body, {
          new: true,
          runValidators: true,
          useFindAndModify: false,
        });
        res.status(200).json({
          success: true,
          message: "Profile Updated Successfully",
        });
      } else {
        return next(new ErrorHandler("Email is already in use,Please choose a different email",400));
      }
    }
  }
});

//Update CareTaker Profile
exports.updateCareTakerProfile = catchAsyncErrors(async (req, res, next) => {
  const caretaker = await Caretaker.findById(req.params.id);
  if (!caretaker) {
    return next(new ErrorHandler(`caretaker does not exist with id : ${req.caretaker.id}`, 404));
  } 
  else {
    const isOthersData = await Caretaker.findOne({ email: email });
    if (isOthersData) {
      if (req.caretaker.email === req.body.email) {
        //we will add cloud url later (for avatar)
        const caretaker = await caretaker.findByIdAndUpdate(req.caretaker.id, req.body, {
          new: true,
          runValidators: true,
          useFindAndModify: false,
        });
        res.status(200).json({
          success: true,
          message: "Profile Updated Successfully",
        });
      } else {
        return next(new ErrorHandler("Email is already in use,Please choose a different email",400));
      }
    }
  }
});

//Get All Donors
exports.getAllDonors = catchAsyncErrors(async (req, res, next) => {
  const donors = await Donor.find();
  res.status(200).json({
    success: true,
    donors,
  });
});

//Get All Students
exports.getAllStudents = catchAsyncErrors(async (req, res, next) => {
  const students = await Student.find();
  res.status(200).json({
    success: true,
    students,
  });
});

//Get All CareTakers
exports.getAllCareTakers = catchAsyncErrors(async (req, res, next) => {
  const caretakers = await Caretaker.find();
  res.status(200).json({
    success: true,
    caretakers,
  });
});

//Get Single Student
exports.getStudentDetails = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.params.id);
  if (!student) {
    return next(new ErrorHandler(`student does not exist with id : ${req.params.id}`, 404));
  }
  res.status(200).json({
    success: true,
    student,
  });
});

//Get Single Donor
exports.getDonorDetails = catchAsyncErrors(async (req, res, next) => {
  const donor = await Donor.findById(req.params.id);
  if (!donor) {
    return next(new ErrorHandler(`donor does not exist with id : ${req.params.id}`, 404));
  }
  res.status(200).json({
    success: true,
    donor,
  });
});

//Get Single CareTaker
exports.getCareTakerDetails = catchAsyncErrors(async (req, res, next) => {
  const caretaker = await Caretaker.findById(req.params.id);
  if (!caretaker) {
    return next(new ErrorHandler(`caretaker does not exist with id : ${req.params.id}`, 404));
  }
  res.status(200).json({
    success: true,
    caretaker,
  });
});


//Remove Donor
exports.removeDonor = catchAsyncErrors(async (req, res, next) => {
  const donor = await Donor.findById(req.params.id);
  if (!donor) {
    return next(new ErrorHandler(`donor does not exist with id : ${req.params.id}`, 404));
  }
  await donor.remove();
  res.status(200).json({
    success: true,
    message: "donor Removed Successfully",
  });
});

//Remove Student
exports.removeStudent = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.params.id);
  if (!student) {
    return next(new ErrorHandler(`student does not exist with id : ${req.params.id}`, 404));
  }
  await student.remove();
  res.status(200).json({
    success: true,
    message: "student Removed Successfully",
  });
});

//Remove CareTaker
exports.removeCareTaker = catchAsyncErrors(async (req, res, next) => {
  const caretaker = await Caretaker.findById(req.params.id);
  if (!caretaker) {
    return next(new ErrorHandler(`caretaker does not exist with id : ${req.params.id}`, 404));
  }
  await caretaker.remove();
  res.status(200).json({
    success: true,
    message: "Caretaker Removed Successfully",
  });
});
