import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const SavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState([]); // ✅ Ensure it's an array
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchSavedJobs = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/v1/jobs/savedJobs", { withCredentials: true });

      if (res.data.success && Array.isArray(res.data.jobs)) {
        setSavedJobs(res.data.jobs);
      } else {
        setSavedJobs([]); // ✅ Ensure no unexpected data
        console.error("Unexpected API response:", res.data);
      }
    } catch (error) {
      console.error("Error fetching saved jobs:", error.response?.data || error.message);
      toast.error("Failed to fetch saved jobs");
      setSavedJobs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSavedJobs();
  }, []);

  const handleDelete = async (jobId) => {
    try {
      const res = await axios.delete(`/api/v1/save-job/${jobId}`, { withCredentials: true });

      if (res.data.success) {
        toast.success(res.data.message);
        setSavedJobs((prev) => prev.filter((saved) => saved?.job?._id !== jobId)); // ✅ Remove locally
      }
    } catch (error) {
      console.error("Error deleting saved job:", error.response?.data || error.message);
      toast.error("Failed to delete saved job");
    }
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Saved Jobs</h1>

      {loading ? (
        <p>Loading...</p>
      ) : savedJobs.length > 0 ? (
        savedJobs.map((saved) => (
          <div key={saved._id} className="border p-4 my-2 flex justify-between items-center">
            <div>
              <h2 className="font-bold">{saved?.job?.title || "No title available"}</h2>
              <p>{saved?.job?.description || "No description available"}</p>
            </div>
            <Button onClick={() => handleDelete(saved.job?._id)}>Delete</Button>
          </div>
        ))
      ) : (
        <p>No saved jobs found.</p>
      )}

      <Button onClick={() => navigate(-1)} className="mt-4">
        Back
      </Button>
    </div>
  );
};

export default SavedJobs;
