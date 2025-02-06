
import express from "express";
import { saveJob, getSavedJobs } from "../controllers/SavedJob.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js"; // Ensure user is logged in

const router = express.Router();

// Save a job for a user
router.post("/saveJob", isAuthenticated, saveJob);

// Get saved jobs for a user
router.get("/savedJobs", isAuthenticated, getSavedJobs);


export default router;
