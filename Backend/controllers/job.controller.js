import { Job } from "../Models/job.model.js";

// Admin posting a job
export const postJob = async (req, res) => {
  try {
    const userId = req.id;
    const {
      title,
      description,
      projectType,
      roleType,
      roleName,
      gender,
      ageMin,
      ageMax,
      heightMin,
      heightMax,
      weightMin,
      weightMax,
      skills,
      roleDescription,
      mediaRequirement,
      salaryPerDay,
      expectedWorkHours,
      expectedCompletionTime,
      specialSubmissionAuditions,
      subGenres,
      subProjectType,
      auditionDetails,
      companyId,
    } = req.body;

    // Define missingFields at the start
    const missingFields = [];

    if (!title) missingFields.push("title");
    if (!description) missingFields.push("description");
    if (!projectType) missingFields.push("projectType");
    if (!roleType) missingFields.push("roleType");
    if (!roleName) missingFields.push("roleName");
    if (!ageMin) missingFields.push("ageMin");
    if (!ageMax) missingFields.push("ageMax");
    if (!heightMin) missingFields.push("heightMin");
    if (!heightMax) missingFields.push("heightMax");
    if (!weightMin) missingFields.push("weightMin");
    if (!weightMax) missingFields.push("weightMax");
    if (!gender) missingFields.push("gender");
    if (!skills) missingFields.push("skills");
    if (!roleDescription) missingFields.push("roleDescription");
    if (!mediaRequirement) missingFields.push("mediaRequirement");
    if (!salaryPerDay) missingFields.push("salaryPerDay");
    if (!expectedWorkHours) missingFields.push("expectedWorkHours");
    if (!expectedCompletionTime) missingFields.push("expectedCompletionTime");
    if (!specialSubmissionAuditions)
      missingFields.push("specialSubmissionAuditions");
    if (!companyId) missingFields.push("companyId");
    if (!subGenres) missingFields.push("subGenres");
    if (!subProjectType) missingFields.push("subProjectType");

    if (missingFields.length > 0) {
      return res.status(400).json({
        message: `Missing required fields: ${missingFields.join(", ")}`,
        missingFields,
        success: false,
      });
    }

    const job = await Job.create({
      title,
      description,
      projectType,
      subProjectType,
      subGenres,
      roleType,
      roleName,
      gender,
      age: { min: Number(ageMin), max: Number(ageMax) },
      height: { min: Number(heightMin), max: Number(heightMax) },
      weight: { min: Number(weightMin), max: Number(weightMax) },
      skills: Array.isArray(skills) ? skills : skills.split(","),
      roleDescription,
      mediaRequirement: Array.isArray(mediaRequirement) ? mediaRequirement : [],
      salaryPerDay,
      expectedWorkHours,
      expectedCompletionTime,
      specialSubmissionAuditions,
      auditionDetails,
      company: companyId,
      created_by: userId,
    });

    return res.status(201).json({
      message: "New job created successfully.",
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error.",
      success: false,
    });
  }
};

// Student fetching all jobs
export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
        { roleName: { $regex: keyword, $options: "i" } },
      ],
    };
    const jobs = await Job.find(query)
      .populate({
        path: "company",
      })
      .sort({ createdAt: -1 });

    if (!jobs.length) {
      return res.status(404).json({
        message: "Jobs not found.",
        success: false,
      });
    }

    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error.",
      success: false,
    });
  }
};

// Student fetching job by ID
export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "applications",
    });

    if (!job) {
      return res.status(404).json({
        message: "Job not found.",
        success: false,
      });
    }

    return res.status(200).json({ job, success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error.",
      success: false,
    });
  }
};

// Admin fetching jobs they have created
export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.id;
    const jobs = await Job.find({ created_by: adminId })
      .populate({
        path: "company",
      })
      .sort({ createdAt: -1 });

    if (!jobs.length) {
      return res.status(404).json({
        message: "No jobs found.",
        success: false,
      });
    }

    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error.",
      success: false,
    });
  }
};

//added for deletion the jobs
export const deleteJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const adminId = req.id;
    const job = await Job.findOneAndDelete({
      _id: jobId,
      created_by: adminId,
    });
    if (!job) {
      return res.status(404).json({
        message: "Job not found or unauthorized",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Job deleted successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      success: false,
    });
  }
};
//added for updating the jobs
export const updateJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const adminId = req.id; // Ensure this is set by middleware
    const updates = req.body;

    console.log("Updating Job:", updates); // Log incoming data

    const job = await Job.findOneAndUpdate(
      { _id: jobId, created_by: adminId },
      updates,
      { new: true, runValidators: true }
    );

    if (!job) {
      return res.status(404).json({
        message: "Job not found or unauthorized",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Job updated successfully",
      job,
      success: true,
    });
  } catch (error) {
    console.error("Error updating job:", error); // Log error details
    res.status(500).json({
      message: "Server error",
      error: error.message, // Capture detailed error message
      stack: error.stack,
      success: false,
    });
  }
};
