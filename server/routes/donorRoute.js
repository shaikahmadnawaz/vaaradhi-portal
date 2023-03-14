import express from "express";
const router = express.Router();

import { getMyStudents ,Login} from "../controllers/donorController.js";
import isAuthenticated from "../middleware/auth.js";

router.route("/students").get(isAuthenticated, getMyStudents);
router.route("/login").post(Login);

export default router;
