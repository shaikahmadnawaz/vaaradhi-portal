import express from "express";
import { addProgress, getMyStudents, Login,updateProgress,deleteProgress } from "../controllers/careTakerController.js";
import isAuthenticated from "../middleware/auth.js";
const router = express.Router();

router.route('/login').post(Login)
router.route('/students').get(isAuthenticated,getMyStudents);
router.route('/progress/:id').post(isAuthenticated,addProgress).put(isAuthenticated,updateProgress).delete(isAuthenticated,deleteProgress);

export default router; 