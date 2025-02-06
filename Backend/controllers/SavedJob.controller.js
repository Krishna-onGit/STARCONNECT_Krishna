import SavedJob from "../Models/SavedJob.model.js";


// Save a job for a user
export const saveJob = async (req, res) => {
    const { jobId } = req.body; // User ID comes from `isAuthenticated`
    const userId = req.user._id;
  
    if (!jobId) {
      return res.status(400).json({ message: "Job ID is required." });
    }
  
    try {
      // Check if the job is already saved
      const existing = await SavedJob.findOne({ user: userId, job: jobId });
      if (existing) {
        return res.status(200).json({ message: "Job already saved." });
      }
  
      // Save the job
      const savedJob = new SavedJob({ user: userId, job: jobId });
      await savedJob.save();
  
      res.status(201).json({ message: "Job saved successfully.", savedJob });
    } catch (error) {
      console.error("Error saving job:", error);
      res.status(500).json({ message: "Server error." });
    }
  };
  
  // Get saved jobs for a user
  export const getSavedJobs = async (req, res) => {
    const userId = req.user._id;
  
    try {
      const savedJobs = await SavedJob.find({ user: userId }).populate("job");
      res.status(200).json(savedJobs);
    } catch (error) {
      console.error("Error fetching saved jobs:", error);
      res.status(500).json({ message: "Server error." });
    }
  };
