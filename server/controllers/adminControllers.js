import crypto from "crypto";
import { StatusCodes } from "http-status-codes";
import { ErrorHandler, sendEmail } from "../utils/index.js";
import { Donor, Admin, Caretaker, Student } from "../models/index.js";
import asyncHandler from "express-async-handler";

//Registering Donor
export const addDonor = asyncHandler(async(req, res, next) => {

  const { name, image, dateOfBirth, email, password, mobile, occupation} = req.body;
  //checking if any of the required details are not received 
  if ( !name || !image || !dateOfBirth || !email || !password || !mobile ) {
    res.status(StatusCodes.BAD_REQUEST);
    throw new Error("Fill all the details !");
  }

  //checking whether the donor is previously registered or not (same email)
  const isDonor = await Donor.findOne({ email });
  
  //if the donor already exists returning error message
  if(isDonor) {
    res.status(StatusCodes.CONFLICT);
    throw new Error("Donor Already Exists !")
  }

  //else creating the donor
  const donor = await Donor.create(req.body);

  //returning the details of the donor along with a success message
  const donorData = await Donor.findOne({_id:donor._id}).select('-password');
  return res.status(StatusCodes.CREATED).json({ donorData, msg: "Donor created" });
});



// Registering CareTaker
export const addCaretaker = asyncHandler(async (req, res, next) => {

  const {name, image, dateOfBirth, email, password, mobile} = req.body;

  if (!name || !image || !dateOfBirth || !mobile || !email || !password) {
    throw new Error('Fill all the required details');
  }

  const isCaretaker = await Caretaker.findOne({ email });
  if (isCaretaker) {
    res.status(StatusCodes.CONFLICT);
    throw new Error('Caretaker already exists');
  }

  const caretaker = await Caretaker.create(req.body);
  const caretakerData = await Caretaker.findOne({_id:caretaker._id}).select('-password');
  res.status(StatusCodes.CREATED).json({ caretakerData, msg: "Caretaker created" });
});



// Registering Student
export const addStudent = asyncHandler(async (req, res, next) => {
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
  const isUser = await Student.findOne({ aadhar: aadhar });
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



//Login Admin
export const login = asyncHandler(async (req, res, next) => {
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
export const forgotPassword = asyncHandler(async (req, res, next) => {
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
export const resetPassword = asyncHandler(async (req, res, next) => {
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
export const updatePassword = asyncHandler(async (req, res, next) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;
  if (!oldPassword || !newPassword || !confirmPassword) {
    return next(new ErrorHandler("Please fill all the details ", 400));
  }
  const admin = await Admin.findById(req.body.id).select("+password");
  const isPasswordMatched = await admin.comparePassword(oldPassword);
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
  res.status(StatusCodes.OK).json({ admin, message: "password updated" });
  // sendToken(admin, 200, res);
});

//Update Student Profile
export const updateStudent = asyncHandler(async (req, res, next) => {
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
export const updateProfile = asyncHandler(async (req, res, next) => {
  // const admin = await Admin.findById(req.params.id);
  const admin = await Admin.findById(req.body.id).select("+password");
  if (!admin) {
    return next(new Error("Admin not Found !"));
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
  const token = updatedUser.createJWT();
  res.status(StatusCodes.OK).json({ updatedUser, token });
});

//Update Donor Profile
export const updateDonor = asyncHandler(async (req, res, next) => {
  // const donor = await Donor.findById(req.params.id);
  const donor = await Donor.findById(req.params.id);
  if (!donor) {
    return next(new Error("Admin not Found !"));
  }
  const updatedDonor = await Donor.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(StatusCodes.OK).json({ updatedDonor });
});

//Update CareTaker Profile
export const updateCareTaker = asyncHandler(async (req, res, next) => {
  // const caretaker = await Caretaker.findById(req.params.id);
  const caretaker = await Caretaker.findById(req.params.id);
  if (!caretaker) {
    throw new Error("Caretaker doesnot exists !")
  }
  const updatedCareTaker = await Caretaker.findByIdAndUpdate(
    req.params.id,
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
export const getAllDonors = asyncHandler(async (req, res, next) => {
  const donors = await Donor.find();
  res.status(200).json({
    success: true,
    donors,
  });
});

//Get All Students
export const getAllStudents = asyncHandler(async (req, res, next) => {
  const students = await Student.find();
  res.status(200).json({
    success: true,
    students,
  });
});

//Get All CareTakers
export const getAllCareTakers = asyncHandler(async (req, res, next) => {
  const caretakers = await Caretaker.find();
  res.status(200).json({
    success: true,
    caretakers,
  });
});

//Get Single Student
// exports.getStudentDetails = asyncHandler(async (req, res, next) => {
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
// exports.getDonorDetails = asyncHandler(async (req, res, next) => {
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
// const getCareTakerDetails = asyncHandler(async (req, res, next) => {
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
export const removeDonor = asyncHandler(async (req, res, next) => {
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

export const removeStudent = asyncHandler(async (req, res, next) => {
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
export const removeCareTaker = asyncHandler(async (req, res, next) => {
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
