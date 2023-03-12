// TO-DO: User authentication
import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import asyncHandler from "express-async-handler";

export const isAuthenticated = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(StatusCodes.BAD_REQUEST).json({Error: "Please fill all details"});
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(StatusCodes.UNAUTHORIZED).json({Error: "Please login to access this resource "});
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = payload.userId;
    next();
  } catch (error) {
      return res.status(StatusCodes.UNAUTHORIZED).json({Error: " Access Denied"});
  }
});

export default isAuthenticated;

