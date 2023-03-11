// TO-DO: User authentication
import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import ErrorHandler from "../utils/errorhandler.js";
import catchAsyncErrors from "../middleware/catchSyncErrors.js";

export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(
      new ErrorHandler("Please fill all details...", StatusCodes.BAD_REQUEST)
    );
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    return next(
      new ErrorHandler(
        "Please login to access this resource ",
        StatusCodes.BAD_REQUEST
      )
    );
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = payload.userId;
    next();
  } catch (error) {
    new ErrorHandler("Invalid access", StatusCodes.BAD_REQUEST);
  }
});

export default isAuthenticated;

// exports.authorizeRoles = (...roles) => {
//   return (req, res, next) => {
//     if (!roles.includes(req.user.role)) {
//       return next(
//         new ErrorHandler(
//           `Role :${req.user.role} is not allowed to access this resource`,
//           403
//         )
//       );
//     }
//     next();
//   };
// };
