import express from "express";
const router = express.Router();
import {
  addStudent,
  addDonor,
  addCaretaker,
  AdminLogin,
  forgotPassword,
  resetPassword,
  AdminLogout,
  updatePassword,
  updateProfile,
  getAllDonors,
  getAllStudents,
  getAllCareTakers,
  getDonorDetails,
  getStudentDetails,
  getCareTakerDetails,
  updateStudentProfile,
  updateDonorProfile,
  updateCareTakerProfile,
  removeDonor,
  removeStudent,
  removeCareTaker,
}
 from "../controllers/adminControllers.js";
import isAuthenticated  from "../middleware/auth.js";

router.route("/students/new").post(isAuthenticated, addStudent);

router.route("/donors/new").post(isAuthenticated, addDonor);

router.route("/caretakers/new").post(isAuthenticated, addCaretaker);

router.route("/login").post(AdminLogin);

router.route("/password/forgot").post(isAuthenticated, forgotPassword);

router.route("/password/reset/:token").put(isAuthenticated, resetPassword);

router.route("/logout").get(isAuthenticated, AdminLogout);

router.route("/password/update").put(isAuthenticated, updatePassword);

router.route("/update").put(isAuthenticated, updateProfile);

router
  .route("/donors/all")
  .get(isAuthenticated,
     getAllDonors);

router
  .route("/students/all")
  .get(isAuthenticated,
     getAllStudents);

router
  .route("/caretakers/all")
  .get(isAuthenticated,
     getAllCareTakers);

router
  .route("/donor/:id")
  .get(isAuthenticated,
     getDonorDetails);

router
  .route("/student/:id")
  .get(isAuthenticated,
     getStudentDetails);

router
  .route("/caretaker/:id")
  .get(isAuthenticated,
     getCareTakerDetails);

router
  .route("/student/update/:id")
  .put(isAuthenticated,
     updateStudentProfile);

router
  .route("/donor/update/:id")
  .put(isAuthenticated,
     updateDonorProfile);

router
  .route("/caretaker/update/:id")
  .put(isAuthenticated,
     updateCareTakerProfile);

router
  .route("/donor/delete/:id")
  .delete(isAuthenticated,
     removeDonor);

router
  .route("/student/delete/:id")
  .delete(isAuthenticated,
     removeStudent);

router
  .route("/caretaker/delete/:id")
  .delete(isAuthenticated,
     removeCareTaker);

export default router;
