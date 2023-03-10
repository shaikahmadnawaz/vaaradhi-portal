// TO-DO: User authentication
import ErrorHandler from "../utils/errorhandler.js";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";
import catchAsyncErrors from "../middleware/catchSyncErrors.js";

const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
      return next(new ErrorHandler("Please login to access this resource ", 401));
    }
    const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.admin = await Admin.findById(decodedData.id);
    next();
});

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

export default isAuthenticated