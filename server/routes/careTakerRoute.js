import express from "express";
import { getMyStudents } from "../controllers/careTakerController.js";
const router = express.Router();


router.route('/students').get(getMyStudents);

export default router; 