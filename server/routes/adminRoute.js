import express from "express";
const router = express.Router();
import {
  addDonor,
  addStudent,
  addCaretaker,
  login,
  forgotPassword,
  resetPassword,
  updateStudent,
  updateProfile,
  updateDonor,
  updateCareTaker,
  getAllDonors,
  getAllStudents,
  getAllCareTakers,
  removeDonor,
  removeStudent,
  removeCareTaker,
} from "../controllers/adminControllers.js";
import isAuthenticated from "../middleware/auth.js";

// login
router.route("/login").post(login);

// create, read
router
  .route("/students")
  .get(isAuthenticated, getAllStudents)
  .post(isAuthenticated, addStudent);
router
  .route("/donors")
  .get(isAuthenticated, getAllDonors)
  .post(isAuthenticated, addDonor);
router
  .route("/caretakers")
  .get(isAuthenticated, getAllCareTakers)
  .post(isAuthenticated, addCaretaker);

// forgot password
router.route("/password/forgot").post(isAuthenticated, forgotPassword);

// reset password
router.route("/password/reset/:token").put(isAuthenticated, resetPassword);

// updateProfile
router.route("/update").put(isAuthenticated, updateProfile);

// update
router.route("/student/update/:id").put(isAuthenticated, updateStudent);
router.route("/donor/update/:id").put(isAuthenticated, updateDonor);
router.route("/caretaker/update/:id").put(isAuthenticated, updateCareTaker);

// remove
router.route("/donor/delete/:id").delete(isAuthenticated, removeDonor);
router.route("/student/delete/:id").delete(isAuthenticated, removeStudent);
router.route("/caretaker/delete/:id").delete(isAuthenticated, removeCareTaker);

export default router;
