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
} from "../controllers/adminControllers";

//import { isAuthenticated, authorizeRoles }  from "../middleware/auth";

router.route("/students/new").post(addStudent);

router.route("/donors/new").post(addDonor);

router.route("/caretakers/new").post(addCaretaker);

router.route("/login").post(AdminLogin);

router.route("/password/forgot").post(isAuthenticated, forgotPassword);

router.route("/password/reset/:token").put(isAuthenticated, resetPassword);

router.route("/logout").get(isAuthenticated, AdminLogout);

router.route("/password/update").put(isAuthenticated, updatePassword);

router.route("/update").put(isAuthenticated, updateProfile);

router
  .route("/donors/all")
  .get(isAuthenticated, 
    // authorizeRoles("admin"),
     getAllDonors);

router
  .route("/students/all")
  .get(isAuthenticated, 
    // authorizeRoles("admin"),
     getAllStudents);

router
  .route("/caretakers/all")
  .get(isAuthenticated, 
    // authorizeRoles("admin"),
     getAllCareTakers);

router
  .route("/donor/:id")
  .get(isAuthenticated, 
    // authorizeRoles("admin"),
     getDonorDetails);

router
  .route("/student/:id")
  .get(isAuthenticated, 
    // authorizeRoles("admin"),
     getStudentDetails);

router
  .route("/caretaker/:id")
  .get(isAuthenticated, 
    // authorizeRoles("admin"),
     getCareTakerDetails);

router
  .route("/student/update/:id")
  .put(isAuthenticated, 
    // authorizeRoles("admin"),
     updateStudentProfile);

router
  .route("/donor/update/:id")
  .put(isAuthenticated, 
    // authorizeRoles("admin"),
     updateDonorProfile);

router
  .route("/caretaker/update/:id")
  .put(isAuthenticated, 
    // authorizeRoles("admin"),
     updateCareTakerProfile);

router
  .route("/donor/delete/:id")
  .delete(isAuthenticated, 
    // authorizeRoles("admin"),
     removeDonor);

router
  .route("/student/delete/:id")
  .delete(isAuthenticated, 
    // authorizeRoles("admin"),
     removeStudent);

router
  .route("/caretaker/delete/:id")
  .delete(isAuthenticated, 
    // authorizeRoles("admin"),
     removeCareTaker);

module.exports = router;
