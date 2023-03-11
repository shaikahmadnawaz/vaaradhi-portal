import crypto from "crypto";
import { StatusCodes } from "http-status-codes";
import { ErrorHandler, sendEmail } from "../utils/index.js";
import { Donor, Admin, Caretaker, Student } from "../models/index.js";
import catchAsyncErrors from "../middleware/catchSyncErrors.js";
// import bcrypt from "bcrypt";
// import { send } from "process";
// import sendToken from "../utils/jwttoken";

//Registering Donor
export const addDonor = catchAsyncErrors(async (req, res, next) => {
  const {
    name,
    image,
    dateOfBirth,
    email,
    password,
    mobile,
    occupation,
    students,
    transactions,
  } = req.body;

  if (
    !name ||
    !image ||
    !dateOfBirth ||
    !email ||
    !password ||
    !mobile ||
    !occupation
  ) {
    return next(
      new ErrorHandler("Please fill all details...", StatusCodes.BAD_REQUEST)
    );
  }
  const isDonor = await Donor.findOne({ email });
  if (isDonor) {
    return next(
      new ErrorHandler("Email already exists", StatusCodes.BAD_REQUEST)
    );
  }
  const donor = await Donor.create({
    name,
    image,
    dateOfBirth,
    email,
    password,
    mobile,
    occupation,
    students,
    transactions,
  });
  res.status(StatusCodes.CREATED).json({ donor, msg: "Donor created" });
});

// Registering Student
export const addStudent = catchAsyncErrors(async (req, res, next) => {
  const {
    name,
    image,
    aadharNumber,
    dateOfBirth,
    gender,
    mother,
    father,
    guardian,
    careTaker,
    donor,
    category,
    education,
    documents,
  } = req.body;

  if (
    !name ||
    !aadharNumber ||
    !image ||
    !dateOfBirth ||
    !gender ||
    !category ||
    !education
  ) {
    return next(
      new ErrorHandler("Please fill all details ", StatusCodes.BAD_REQUEST)
    );
  }
  const isUser = await Student.findOne({ email: email });
  if (isUser) {
    return next(
      new ErrorHandler("Email already exists", StatusCodes.BAD_REQUEST)
    );
  }
  const student = await Student.create({
    name,
    image,
    aadharNumber,
    dateOfBirth,
    gender,
    mother,
    father,
    guardian,
    careTaker,
    donor,
    category,
    education,
    documents,
  });
  res.status(StatusCodes.CREATED).json({ donor, msg: "Student created" });
  // sendToken(student, 201, res);
});

// Registering CareTaker
export const addCaretaker = catchAsyncErrors(async (req, res, next) => {
  const { name, image, dateOfBirth, email, password, mobile, students } =
    req.body;
  if (!name || !image || !dateOfBirth || !mobile || !email || !password) {
    return next(
      new ErrorHandler("Please fill all details ", StatusCodes.BAD_REQUEST)
    );
  }
  const isUser = await Caretaker.findOne({ email: email });
  if (isUser) {
    return next(
      new ErrorHandler("Email already exists", StatusCodes.BAD_REQUEST)
    );
  }
  const caretaker = await Caretaker.create({
    name,
    image,
    dateOfBirth,
    email,
    password,
    mobile,
    students,
  });
  res
    .status(StatusCodes.CREATED)
    .json({ caretaker, msg: "Care taker created" });
});

//Login Admin
export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  //Verifying  all fields are filled or not
  if (!email || !password) {
    return next(
      new ErrorHandler(
        "Please fill both Email and Password ",
        StatusCodes.BAD_REQUEST
      )
    );
  }
  const admin = await Admin.findOne({ email }).select("+password");
  if (!admin) {
    return next(new ErrorHandler("User does not exist", StatusCodes.NOT_FOUND));
  }
  const isPasswordMatched = await admin.comparePassword(password);
  // const isPasswordMatched = await bcrypt.compare(password, admin.password);
  if (!isPasswordMatched) {
    return next(
      new ErrorHandler("Invalid Email or Password ", StatusCodes.UNAUTHORIZED)
    );
  }
  const token = admin.createJWT();
  admin.password = undefined;
  res.status(StatusCodes.OK).json({ admin, token });
  // sendToken(admin, 200, res);
});

//Forgot Password
export const forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const admin = await Admin.findOne({ email: req.body.email });
  if (!admin) {
    return next(new ErrorHandler("User not Found", StatusCodes.NOT_FOUND));
  }
  // if (req.body.email !== req.admin.email) {
  //   return next(
  //     new ErrorHandler("Enter your Registered Email ", StatusCodes.NOT_FOUND)
  //   );
  // }
  //Get Reset Password Token
  const resetToken = admin.getResetPasswordToken();
  await admin.save({ validateBeforeSave: false });
  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/password/reset/${resetToken}`;
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
export const resetPassword = catchAsyncErrors(async (req, res, next) => {
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
    return next(
      new ErrorHandler(
        "Reset Password Token is Invalid or has been Expired",
        400
      )
    );
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

//Update Admin Password
// exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
//   const { oldPassword, newPassword, confirmPassword } = req.body;
//   if (!oldPassword || !newPassword || !confirmPassword) {
//     return next(new ErrorHandler("Please fill all the details ", 400));
//   }
//   const admin = await Admin.findById(req.admin.id).select("+password");
//   const isPasswordMatched = await bcrypt.compare(oldPassword, admin.password);
//   if (!isPasswordMatched) {
//     return next(new ErrorHandler("Old Password is incorrect ", 400));
//   }
//   if (newPassword !== confirmPassword) {
//     return next(new ErrorHandler("Passwords does not match", 400));
//   }
//   if (oldPassword === newPassword) {
//     return next(
//       new ErrorHandler("New Password must be different from Old Password", 400)
//     );
//   }
//   admin.password = newPassword;
//   await admin.save();
//   sendToken(admin, 200, res);
// });

//Update Student Profile
export const updateStudent = catchAsyncErrors(async (req, res, next) => {
  // const student = await Student.findById(req.params.id);
  const student = await Student.findById(req.body.id);
  if (!student) {
    return next(
      new ErrorHandler(`student does not exist`, StatusCodes.NOT_FOUND)
    );
  }
  // else {
  //   const isOthersData = await Student.findOne({ email: req.body.email });
  //   if (isOthersData) {
  //     if (req.student.email === req.body.email) {
  //       //we will add cloud url later (for avatar)
  //       const student = await student.findByIdAndUpdate(
  //         req.student.id,
  //         req.body,
  //         {
  //           new: true,
  //           runValidators: true,
  //           useFindAndModify: false,
  //         }
  //       );
  //       res.status(200).json({
  //         success: true,
  //         message: "Profile Updated Successfully",
  //       });
  //     } else {
  //       return next(
  //         new ErrorHandler(
  //           "Email is already in use, Please choose a different email",
  //           400
  //         )
  //       );
  //     }
  //   }
  // }
  const updatedStudent = await Student.findByIdAndUpdate(
    req.body.id,
    req.body,
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );
  res.status(StatusCodes.OK).json({ updatedStudent });
});

//Update Admin Profile
export const updateProfile = catchAsyncErrors(async (req, res, next) => {
  // const admin = await Admin.findById(req.params.id);
  const admin = await Admin.findById(req.body.id);
  if (!admin) {
    return next(
      new ErrorHandler(
        `admin does not exist with id : ${req.admin.id}`,
        StatusCodes.NOT_FOUND
      )
    );
  }
  // else {
  //   const isOthersData = await Admin.findOne({ email: email });
  //   if (isOthersData) {
  //     if (req.admin.email === req.body.email) {
  //       //we will add cloud url later (for avatar)
  //       const admin = await admin.findByIdAndUpdate(req.admin.id, req.body, {
  //         new: true,
  //         runValidators: true,
  //         useFindAndModify: false,
  //       });
  //       res.status(200).json({
  //         success: true,
  //         message: "Profile Updated Successfully",
  //       });
  //     } else {
  //       return next(
  //         new ErrorHandler(
  //           "Email is already in use,Please choose a different email",
  //           400
  //         )
  //       );
  //     }
  //   }
  // }
  const updatedUser = await Admin.findByIdAndUpdate(req.body.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  const token = updatedUser.createJWt();
  res.status(StatusCodes.OK).json({ updatedUser, token });
});

//Update Donor Profile
export const updateDonor = catchAsyncErrors(async (req, res, next) => {
  // const donor = await Donor.findById(req.params.id);
  const donor = await Donor.findById(req.body.id);
  if (!donor) {
    return next(
      new ErrorHandler(
        `donor does not exist with id : ${req.donor.id}`,
        StatusCodes.NOT_FOUND
      )
    );
  }
  // else {
  //   const isOthersData = await donor.findOne({ email: email });
  //   if (isOthersData) {
  //     if (req.donor.email === req.body.email) {
  //       //we will add cloud url later (for avatar)
  //       const donor = await donor.findByIdAndUpdate(req.donor.id, req.body, {
  //         new: true,
  //         runValidators: true,
  //         useFindAndModify: false,
  //       });
  //       res.status(200).json({
  //         success: true,
  //         message: "Profile Updated Successfully",
  //       });
  //     } else {
  //       return next(
  //         new ErrorHandler(
  //           "Email is already in use,Please choose a different email",
  //           400
  //         )
  //       );
  //     }
  //   }
  // }
  const updatedDonor = await Student.findByIdAndUpdate(req.body.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(StatusCodes.OK).json({ updatedDonor });
});

//Update CareTaker Profile
export const updateCareTaker = catchAsyncErrors(async (req, res, next) => {
  // const caretaker = await Caretaker.findById(req.params.id);
  const caretaker = await Caretaker.findById(req.body.id);
  if (!caretaker) {
    return next(
      new ErrorHandler(
        `caretaker does not exist with id : ${req.caretaker.id}`,
        StatusCodes.NOT_FOUND
      )
    );
  }
  // else {
  //   const isOthersData = await Caretaker.findOne({ email: email });
  //   if (isOthersData) {
  //     if (req.caretaker.email === req.body.email) {
  //       //we will add cloud url later (for avatar)
  //       const caretaker = await caretaker.findByIdAndUpdate(
  //         req.caretaker.id,
  //         req.body,
  //         {
  //           new: true,
  //           runValidators: true,
  //           useFindAndModify: false,
  //         }
  //       );
  //       res.status(200).json({
  //         success: true,
  //         message: "Profile Updated Successfully",
  //       });
  //     } else {
  //       return next(
  //         new ErrorHandler(
  //           "Email is already in use,Please choose a different email",
  //           400
  //         )
  //       );
  //     }
  //   }
  // }
  const updatedCareTaker = await Caretaker.findByIdAndUpdate(
    req.body.id,
    req.body,
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );
  res.status(StatusCodes.OK).json({ updatedCareTaker });
});

//Get All Donors
export const getAllDonors = catchAsyncErrors(async (req, res, next) => {
  const donors = await Donor.find();
  res.status(200).json({
    success: true,
    donors,
  });
});

//Get All Students
export const getAllStudents = catchAsyncErrors(async (req, res, next) => {
  const students = await Student.find();
  res.status(200).json({
    success: true,
    students,
  });
});

//Get All CareTakers
export const getAllCareTakers = catchAsyncErrors(async (req, res, next) => {
  const caretakers = await Caretaker.find();
  res.status(200).json({
    success: true,
    caretakers,
  });
});

//Get Single Student
// exports.getStudentDetails = catchAsyncErrors(async (req, res, next) => {
//   const student = await Student.findById(req.params.id);
//   if (!student) {
//     return next(
//       new ErrorHandler(`student does not exist with id : ${req.params.id}`, 404)
//     );
//   }
//   res.status(200).json({
//     success: true,
//     student,
//   });
// });

//Get Single Donor
// exports.getDonorDetails = catchAsyncErrors(async (req, res, next) => {
//   const donor = await Donor.findById(req.params.id);
//   if (!donor) {
//     return next(
//       new ErrorHandler(`donor does not exist with id : ${req.params.id}`, 404)
//     );
//   }
//   res.status(200).json({
//     success: true,
//     donor,
//   });
// });

//Get Single CareTaker
// const getCareTakerDetails = catchAsyncErrors(async (req, res, next) => {
//   const caretaker = await Caretaker.findById(req.params.id);
//   if (!caretaker) {
//     return next(
//       new ErrorHandler(
//         `caretaker does not exist with id : ${req.params.id}`,
//         404
//       )
//     );
//   }
//   res.status(200).json({
//     success: true,
//     caretaker,
//   });
// });

//Remove Donor
export const removeDonor = catchAsyncErrors(async (req, res, next) => {
  const donor = await Donor.findById(req.params.id);
  if (!donor) {
    return next(
      new ErrorHandler(
        `donor does not exist with id : ${req.params.id}`,
        StatusCodes.NOT_FOUND
      )
    );
  }
  await donor.remove();
  res.status(200).json({
    success: true,
    message: "donor Removed Successfully",
  });
});

//Remove Student
export const removeStudent = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.params.id);
  if (!student) {
    return next(
      new ErrorHandler(
        `student does not exist with id : ${req.params.id}`,
        StatusCodes.NOT_FOUND
      )
    );
  }
  await student.remove();
  res.status(200).json({
    success: true,
    message: "student Removed Successfully",
  });
});

//Remove CareTaker
export const removeCareTaker = catchAsyncErrors(async (req, res, next) => {
  const caretaker = await Caretaker.findById(req.params.id);
  if (!caretaker) {
    return next(
      new ErrorHandler(
        `caretaker does not exist with id : ${req.params.id}`,
        StatusCodes.NOT_FOUND
      )
    );
  }
  await caretaker.remove();
  res.status(200).json({
    success: true,
    message: "Caretaker Removed Successfully",
  });
});
