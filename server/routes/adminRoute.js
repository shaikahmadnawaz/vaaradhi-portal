import express from "express";
const router = express.Router();

import { addDonor,addCaretaker, updateDonor, updateCareTaker, addStudent, Login, forgotPassword, resetPassword, updatePassword, updateStudent, removeDonor, removeCareTaker, removeStudent, getAllDonors, getAllCareTakers, getAllStudents, getMyDetails, updateProfile } from "../controllers/adminControllers.js";
import { isAuthenticated } from '../middleware/auth.js'
// import { addAdmin } from '../controllers/adminControllers/js'


//Actions for Donor
router.route("/donor/new").post( isAuthenticated, addDonor);
router.route("/donor/update/:id").put(isAuthenticated, updateDonor);
router.route("/donor/delete/:id").delete(isAuthenticated, removeDonor);
router.route("/donors/all").get(isAuthenticated, getAllDonors);


//Actions for CareTaker
router.route("/caretaker/new").post(isAuthenticated, addCaretaker);
router.route("/caretaker/update/:id").put(isAuthenticated, updateCareTaker);
router.route("/caretaker/delete/:id").delete(isAuthenticated, removeCareTaker);
router.route("/caretakers/all").get(isAuthenticated, getAllCareTakers);


//Actionss for Student
router.route("/student/new").post(isAuthenticated, addStudent);
router.route("/student/update/:id").put(isAuthenticated, updateStudent);
router.route("/student/delete/:id").delete(isAuthenticated, removeStudent);
router.route("/students/all").get(isAuthenticated, getAllStudents);


//Actions for Admin
router.route("/login").post(Login);
router.route("/password/forgot").post(isAuthenticated, forgotPassword);
router.route("/password/reset/:token").put(isAuthenticated, resetPassword); 
router.route("/password/update").put(isAuthenticated, updatePassword);
router.route('/me/update').put(isAuthenticated, updateProfile);
router.route('/me').get(isAuthenticated,getMyDetails);
// router.route("/new").post(isAuthenticated, addAdmin)


export default router;
