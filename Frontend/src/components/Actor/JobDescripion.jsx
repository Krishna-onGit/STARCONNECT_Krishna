import React, { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "@/components/Shared/Navbar";
import axios from "axios";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/util/constant";
import { setSingleJob } from "@/Redux/JobSlice";
import { toast } from "sonner";

const JobDescription = () => {
  const { singleJob } = useSelector(store => store.job);
  const { user } = useSelector(store => store.auth);
  const isInitiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
  const [isApplied, setIsApplied] = useState(isInitiallyApplied);

  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });
      if (res.data.success) {
        setIsApplied(true);
        const updatedSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] };
        dispatch(setSingleJob(updatedSingleJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to apply");
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(res.data.job.applications.some(application => application.applicant === user?._id));
        }
      } catch (error) {
        toast.error("Failed to fetch job details");
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  const renderField = (label, value) => {
    if (!value && value !== 0) return null;
    return (
      <h1 className="font-bold my-1">
        {label}: <span className="pl-4 font-normal text-gray-800">{value}</span>
      </h1>
    );
  };

  const renderRangeField = (label, min, max, unit = "") => {
    if (!min && !max) return null;
    return (
      <h1 className="font-bold my-1">
        {label}: <span className="pl-4 font-normal text-gray-800">{min} - {max}{unit}</span>
      </h1>
    );
  };

  const renderArrayField = (label, array) => {
    if (!array?.length) return null;
    return (
      <h1 className="font-bold my-1">
        {label}: <span className="pl-4 font-normal text-gray-800">{array.join(", ")}</span>
      </h1>
    );
  };

  return (
    <div className="bg-main-bg min-h-screen">
      <div className="bg-overlay-bg min-h-screen">
        <Navbar />
        <div className="max-w-7xl mx-auto mt-10 rounded-2xl bg-white py-8 px-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-bold text-2xl text-gray-900">{singleJob?.title}</h1>
              <div className="flex flex-wrap items-center gap-3 mt-4">
                <Badge className="text-white font-semibold px-3 py-1 rounded-full border border-purple-950 shadow-purple-300 shadow-md">
                  {singleJob?.projectType}
                </Badge>
                <Badge className="text-white font-semibold px-3 py-1 rounded-full border border-purple-950 shadow-purple-300 shadow-md">
                  {singleJob?.roleType}
                </Badge>
                <Badge className="text-white font-semibold px-3 py-1 rounded-full border border-purple-950 shadow-purple-300 shadow-md">
                  ₹{singleJob?.salaryPerDay}/day
                </Badge>
              </div>
            </div>
  
            <Button
              onClick={isApplied ? null : applyJobHandler}
              disabled={isApplied}
              className={`rounded-lg px-6 py-2 text-lg font-semibold transition ${
                isApplied
                  ? "bg-gray-300 text-gray-700 cursor-default"
                  : "bg-gradient-to-r from-blue-600 to-blue-800 text-white hover:from-blue-700 hover:to-blue-900"
              }`}
            >
              {isApplied ? "Already Applied" : "Apply Now"}
            </Button>
          </div>
  
          {/* Job Description */}
          <h1 className="border-b-2 border-b-gray-300 font-semibold text-lg py-4 text-gray-800">
            Job Description
          </h1>
  
          <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            {renderField("Project", singleJob?.title)}
            {renderField("Description", singleJob?.description)}
            {renderField("Project Type", singleJob?.projectType)}
            {renderField("Sub Project Type", singleJob?.subProjectType)}
            {renderArrayField("Genres", singleJob?.subGenres)}
            {renderField("Role Type", singleJob?.roleType)}
            {renderField("Role Name", singleJob?.roleName)}
            {renderField("Gender", singleJob?.gender)}
            {renderRangeField("Age", singleJob?.age?.min, singleJob?.age?.max, " years")}
            {renderRangeField("Height", singleJob?.height?.min, singleJob?.height?.max, " cm")}
            {renderRangeField("Weight", singleJob?.weight?.min, singleJob?.weight?.max, " kg")}
            {renderField("Skills Required", singleJob?.skills)}
            {renderField("Role Description", singleJob?.roleDescription)}
            {renderArrayField("Media Requirements", singleJob?.mediaRequirement)}
            {renderField("Salary Per Day", `₹${singleJob?.salaryPerDay}`)}
            {renderField("Expected Work Hours", `${singleJob?.expectedWorkHours} hours`)}
            {renderField("Expected Completion Time", singleJob?.expectedCompletionTime)}
            {renderField("Audition Type", singleJob?.specialSubmissionAuditions)}
          </div>
  
          {/* Audition Details */}
          {singleJob?.auditionDetails && (
            <div className="mt-6 bg-gray-50 p-5 rounded-lg shadow-purple-300 shadow-md">
              <h2 className="font-semibold text-lg mb-3">🎭 Audition Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {renderField("Location", singleJob.auditionDetails.location)}
                {renderField("Date", singleJob.auditionDetails.date ? new Date(singleJob.auditionDetails.date).toLocaleDateString() : null)}
                {renderField("Video Required", singleJob.auditionDetails.videoRequired ? "Yes" : "No")}
                {singleJob.auditionDetails.script && renderField("Script Available", "Yes")}
              </div>
            </div>
          )}
  
          {/* Company Details */}
          <div className="mt-6 bg-gray-100 p-5 shadow-purple-300 shadow-lg rounded-lg">
            <h2 className="font-semibold text-lg mb-3">🏢 Company Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderField("Company", singleJob?.company?.name)}
              {renderField("Posted Date", singleJob?.createdAt ? new Date(singleJob.createdAt).toLocaleDateString() : null)}
              {renderField("Total Applications", singleJob?.applications?.length)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
  
};

export default JobDescription;