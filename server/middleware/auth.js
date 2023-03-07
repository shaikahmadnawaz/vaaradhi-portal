// TO-DO: User authentication
import ErrorHandler  from "../utils/errorhandler";
import jwt  from "jsonwebtoken";
import User  from "../models/userModel";

exports.isAuthenticated = async (req, res, next) => {
  try{
    const { token } = req.cookies;
    if (!token) {
      return next(new ErrorHandler("Please login to access this resource ", 401));
    }
    const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decodedData.id);
    next();
  }catch(er){
    console.log(err);
  }
};
exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role :${req.user.role} is not allowed to access this resource`,
          403
        )
      );
    }
    next();
  };
};