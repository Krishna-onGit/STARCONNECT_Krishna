import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";

const Job = ({ job }) => {
  const navigate = useNavigate();
  //save for later feature
  const [isSaved, setIsSaved] = useState(false);
  const { user } = useSelector((store) => store.auth);

  // const JobId="hhahhaha"
  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  };

  const handleSaveJob = async (jobs) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/jobs/saveJob", // No extra "/saveJob" at the end
        { jobs },
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success("Job saved successfully!");
        setIsSaved(true);
      } else {
        toast.error(res.data.message || "Failed to save job");
      }
    } catch (error) {
      console.error("Error saving job:", error.response?.data || error.message);
      toast.error("Failed to save job");
    }
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
        <Button variant="outline" className="rounded-full bg-black" size="icon">
          <Bookmark />
        </Button>
      </div>
      <div className="flex items-center gap-2 my-2">
        <Button className="p-6" variant="outline" size="icon">
          <Avatar>
            <AvatarImage src={job?.company?.logo} />
          </Avatar>
        </Button>
        <div>
          <h1 className="font-medium text-lg">{job?.company?.name}</h1>
          <p className="text-sm text-gray-500">India</p>
        </div>
      </div>

      <div>
        <h1 className="font-bold text-lg my-2">{job?.title} </h1>
        <p className="text-sm text-gray-600">{job?.description}</p>
      </div>
      <div className="flex items-center gap-2 mt-4 ">
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
          onClick={() => handleSaveJob(job?._id)}
          variant="outline"
          className={`bg-black ${
            isSaved ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isSaved}
        >
          {isSaved ? "Saved" : "Save For Later"}
        </Button>
      </div>
    </div>
  );
};

export default Job;
