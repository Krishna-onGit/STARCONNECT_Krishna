import React from "react";
import { Button } from "@/components/ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { saveJob, deleteSavedJob } from "@/Redux/savedJobsSlice";

const JobCompo = ({ job, savedJobs }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Check if job is saved
  const isSaved = savedJobs?.some((savedJob) => savedJob.job?._id === job._id);


  // Save or remove job
  const handleSaveJob = () => {
    if (isSaved) {
      dispatch(deleteSavedJob(job._id));
    } else {
      dispatch(saveJob(job._id)); // ✅ Pass only job._id
    }
  };

  // Function to calculate days since job was posted
  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 60 * 60 * 24)); // Convert to days
  };

  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          {job?.createdAt
            ? daysAgoFunction(job?.createdAt) === 0
              ? "Today"
              : `${daysAgoFunction(job?.createdAt)} days ago`
            : "No date available"}
        </p>
      </div>

      <div className="flex items-center gap-2 my-2">
        <Button className="p-6" variant="outline" size="icon">
          <Avatar>
            <AvatarImage
              src={job?.company?.logo || "/default-company-logo.png"} // ✅ Fallback image
              alt="Company Logo"
            />
          </Avatar>
        </Button>
        <div>
          <h1 className="font-medium text-lg">{job?.company?.name}</h1>
          <p className="text-sm text-gray-500">India</p>
        </div>
      </div>

      <div>
        <h1 className="font-bold text-lg my-2">{job?.title}</h1>
        <p className="text-sm text-gray-600">{job?.description}</p>
      </div>

      <div className="flex items-center gap-2 mt-4">
        <Badge className={"text-blue-700 font-bold"} variant="ghost">
          {job?.position}
        </Badge>
        <Badge className={"text-blue-700 font-bold"} variant="ghost">
          {job?.jobType}
        </Badge>
        <Badge className={"text-blue-700 font-bold"} variant="ghost">
          {job?.salary}
        </Badge>
      </div>

      <div className="flex items-center gap-4 mt-4">
        <Button
          onClick={() => navigate(`/description/${job?._id}`)}
          variant="outline"
          className="bg-black"
        >
          Details
        </Button>
        <Button
          variant="outline"
          className={`rounded-sm ${isSaved ? "bg-green-500" : "bg-black"}`}
          size="icon"
          onClick={handleSaveJob} // ✅ Remove disabled={isSaved}
        >
          {isSaved ? "Saved" : "Save for Later"}
          <Bookmark />
        </Button>
      </div>
    </div>
  );
};

export default JobCompo;
