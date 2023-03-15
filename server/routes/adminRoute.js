import express from "express";
const router = express.Router();

import {addAdmin, addDonor,addCaretaker, updateDonor, updateCareTaker, addStudent, Login, forgotPassword, resetPassword, updatePassword, updateStudent, removeDonor, removeCaretaker, removeStudent, getAllDonors, getAllCareTakers, getAllStudents, getMyDetails, updateProfile } from "../controllers/adminControllers.js";
import { isAuthenticated } from '../middleware/auth.js'
// import { addAdmin } from '../controllers/adminControllers.js'


//Actions for Donor
router.route("/donors/:id").patch(isAuthenticated, updateDonor).delete(isAuthenticated, removeDonor);
router.route("/donors").get(isAuthenticated, getAllDonors).post( isAuthenticated, addDonor);;


//Actions for CareTaker
router.route("/caretakers").get(isAuthenticated, getAllCareTakers).post(isAuthenticated, addCaretaker);
router.route("/caretakers/:id").patch(isAuthenticated, updateCareTaker).delete(isAuthenticated, removeCaretaker);



//Actionss for Student
router.route("/students").get(isAuthenticated, getAllStudents).post(isAuthenticated, addStudent);
router.route("/student/:id").put(isAuthenticated, updateStudent).delete(isAuthenticated, removeStudent);



//Actions for Admin
router.route("/login").post(Login);
router.route("/password/forgot").post(isAuthenticated, forgotPassword);
router.route("/password/reset/:token").put(isAuthenticated, resetPassword); 
router.route("/password/update").put(isAuthenticated, updatePassword);
router.route('/me/update').put(isAuthenticated, updateProfile);
router.route('/me').get(isAuthenticated,getMyDetails);
router.route("/new").post(isAuthenticated, addAdmin)


export default router;
