import express from "express";
import { login, logout, register, updateProfile , getUserProfile} from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { multipleUpload } from "../middlewares/multer.js";
 
const router = express.Router();

router.route("/register").post(multipleUpload,register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile/update").post(isAuthenticated, multipleUpload, updateProfile);
router.route("/profile/:id").get(getUserProfile);


export default router;