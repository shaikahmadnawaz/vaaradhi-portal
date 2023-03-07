import express from 'express'
const router = express.Router();

import {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  updateProfile,
  getAllUsers,
  getSingleUser,
  updateUserRole,
  deleteUser,
} from "../controllers/userController";
import { isAuthenticated, authorizeRoles }  from "../middleware/auth";

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/password/forgot").post(isAuthenticated, forgotPassword);

router.route("/password/reset/:token").put(isAuthenticated, resetPassword);

router.route("/logout").get(isAuthenticated, logoutUser);

router.route("/me").get(isAuthenticated, getUserDetails);

router.route("/password/update").put(isAuthenticated, updatePassword);

router.route("/me/update").put(isAuthenticated, updateProfile);

router
  .route("/admin/users")
  .get(isAuthenticated, authorizeRoles("admin"), getAllUsers);

router
  .route("/admin/user/:id")
  .get(isAuthenticated, authorizeRoles("admin"), getSingleUser);

router
  .route("/admin/user/update/:id")
  .put(isAuthenticated, authorizeRoles("admin"), updateUserRole);

router
  .route("/admin/user/delete/:id")
  .delete(isAuthenticated, authorizeRoles("admin"), deleteUser);

module.exports = router;