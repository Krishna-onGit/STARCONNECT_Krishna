import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import axios from "axios";
import { deleteSavedJob } from "@/Redux/savedJobsSlice";

const SavedJobTable = () => {
  const dispatch = useDispatch();
  const { savedJobs } = useSelector((store) => store.savedJobs);

  const handleRemoveSavedJob = async (jobId) => {
    try {
      await axios.delete(`/api/v1/save-job/${jobId}`, { withCredentials: true });

      dispatch(deleteSavedJob(jobId)); // ✅ Update Redux store first
    } catch (error) {
      console.error("Error removing saved job:", error.response?.data || error.message);
    }
  };

  return (
    <div className="p-5">
      {savedJobs.length > 0 ? (
        savedJobs.map((job) => (
          <div key={job._id} className="border p-3 flex justify-between">
            <div>
              <h2 className="font-bold">{job.title || "No Title"}</h2>
              <p>{job.company?.name || "Unknown Company"}</p>
            </div>
            <Button
              variant="destructive"
              onClick={() => handleRemoveSavedJob(job._id)}
            >
              <Trash />
            </Button>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No saved jobs yet.</p>
      )}
    </div>
  );
};

export default SavedJobTable;
