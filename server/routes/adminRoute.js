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
  updatePassword,
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

router
  .route("/students/:id")
  .put(isAuthenticated, getAllStudents)
  .delete(isAuthenticated, addStudent);

// forgot password
router.route("/password/forgot").post(isAuthenticated, forgotPassword);

// reset password
router.route("/password/reset/:token").put(isAuthenticated, resetPassword);

// updateProfile
router.route("/update").put(isAuthenticated, updateProfile);

// update password
router.route("/updatePassword").put(isAuthenticated, updatePassword);

// update
router.route("/student/update/:id").put(isAuthenticated, updateStudent);
router.route("/donor/update/:id").put(isAuthenticated, updateDonor);
router.route("/caretaker/update/:id").put(isAuthenticated, updateCareTaker);

router.route("/caretakers/all").get(
  isAuthenticated,
  // authorizeRoles("admin"),
  getAllCareTakers
);

router.route("/donor/:id").get(
  isAuthenticated,
  // authorizeRoles("admin"),
  //getDonorDetails
);

router.route("/student/:id").get(
  isAuthenticated,
  // authorizeRoles("admin"),
  //getStudentDetails
);

router.route("/caretaker/:id").get(
  isAuthenticated,
  // authorizeRoles("admin"),
  //getCareTakerDetails
);

router.route("/student/update/:id").put(
  isAuthenticated,
  // authorizeRoles("admin"),
  updateStudentProfile
);

router.route("/donor/update/:id").put(
  isAuthenticated,
  // authorizeRoles("admin"),
  updateDonorProfile
);

router.route("/caretaker/update/:id").put(
  isAuthenticated,
  // authorizeRoles("admin"),
  updateCareTakerProfile
);

router.route("/donor/delete/:id").delete(
  isAuthenticated,
  // authorizeRoles("admin"),
  removeDonor
);

router.route("/student/delete/:id").delete(
  isAuthenticated,
  // authorizeRoles("admin"),
  removeStudent
);

router.route("/caretaker/delete/:id").delete(
  isAuthenticated,
  // authorizeRoles("admin"),
  removeCareTaker
);

export default router;
