import express from "express";
import { login, logout, register, updateProfile , getUserProfile , getAllActors, getAllDirector,updateDirectorProfile,deleteAccount} from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { multipleUpload } from "../middlewares/multer.js";

const router = express.Router();

router.route("/register").post(multipleUpload,register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile/update").post(isAuthenticated, multipleUpload, updateProfile);
router.route("/profile/:id").get(getUserProfile);
router.route("/actors").get(getAllActors); // Fetch all actors
router.route("/director").get(getAllDirector);
router.route("/Director/profile/:id").get(getUserProfile);
router.route("/CDprofile/update").post(isAuthenticated,multipleUpload,updateDirectorProfile)
router.delete("/delete-account", isAuthenticated, deleteAccount);//added 
// Route to update quiz status
router.put("/update-quiz-status", isAuthenticated, updateQuizStatus);
// Route to get quiz status
router.get("/quiz-status", isAuthenticated, getQuizStatus);


export default router;