import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getAdminJobs, getAllJobs, getJobById, postJob , deleteJob , updateJob, uploadAuditionVideo, getAuditionVideos} from "../controllers/job.controller.js";
import { uploadVideo } from "../middlewares/multer.js";

const router = express.Router();

router.route("/post").post(isAuthenticated, postJob);
router.route("/get").get(isAuthenticated, getAllJobs);
router.route("/getadminjobs").get(isAuthenticated, getAdminJobs);
router.route("/get/:id").get(isAuthenticated, getJobById);
router.route("/delete/:id").delete(isAuthenticated,deleteJob);//added for deletion the jobs
router.route("/update/:id").put(isAuthenticated,updateJob);//added for updating the jobs
router.post("/:jobId/audition", isAuthenticated, uploadVideo, uploadAuditionVideo);
router.get("/:jobId/auditions", isAuthenticated, getAuditionVideos);// Get all audition videos for a job (Casting Director)

export default router;
