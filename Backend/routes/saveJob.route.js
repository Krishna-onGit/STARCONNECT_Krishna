import express from "express";
import { saveJob, getSavedJobs, deleteSavedJob } from "../controllers/SavedJob.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

// POST to save a job
router.post("/", isAuthenticated, saveJob);

// GET to fetch all saved jobs for the logged-in user
router.get("/", isAuthenticated, getSavedJobs);

// DELETE to remove a saved job (pass jobId as a URL parameter)
router.delete("/saveJob/:jobId", isAuthenticated, deleteSavedJob);

export default router;

