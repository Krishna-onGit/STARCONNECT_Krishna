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


const isApplied = true;
const JobDescripion = ({job}) => {
  const {singleJob} = useSelector(store => store.job);
    const {user} = useSelector(store=>store.auth);
    const isIntiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isIntiallyApplied);

    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {withCredentials:true});
            
            if(res.data.success){
                setIsApplied(true); // Update the local state
                const updatedSingleJob = {...singleJob, applications:[...singleJob.applications,{applicant:user?._id}]}
                dispatch(setSingleJob(updatedSingleJob)); // helps us to real time UI update
                toast.success(res.data.message);

            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    useEffect(()=>{
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`,{withCredentials:true});
                if(res.data.success){
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(application=>application.applicant === user?._id)) // Ensure the state is in sync with fetched data
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSingleJob(); 
    },[jobId,dispatch, user?._id]);
  return (
    <div className="bg-main-bg min-h-screen">
<div className="bg-overlay-bg min-h-screen">
<Navbar />
    <div className="max-w-7xl mx-auto mt-10 rounded-2xl bg-white py-5  px-5">
      <div className="flex items-center justify-between ">
        <div>
          <h1 className="font-bold text-xl ">{singleJob?.title}</h1>
          <div className="flex items-center gap-2 mt-4 ">
            <Badge className={"text-blue-700 font-bold"} variant="ghost">
            {singleJob?.postion} Positions
            </Badge>
            <Badge className={"text-blue-700 font-bold"} variant="ghost">
            {singleJob?.jobType}
            </Badge>
            <Badge className={"text-blue-700 font-bold"} variant="ghost">
            {singleJob?.salary}LPA
            </Badge>
          </div>
        </div>
        <Button
         onClick={isApplied ? null : applyJobHandler}
          disabled={isApplied}
          className={`rounded-lg ${
            isApplied
              ? "bg-gray-950 cursor-not-allowed"
              : "bg-slate-950 hover:bg-slate-500"
          }`}
        >
          {isApplied ? "Already applied " : "Apply now"}
        </Button>
      </div>
      <h1 className="border-b-2 border-b-gray-300 font-medium py-4">
        Job Discription
      </h1>
      <div className="my-4 ">
        <h1 className="font-bold my-1">Role: <span className="pl-4 font-normal text-gray-800">{singleJob?.title}</span></h1>
        <h1 className="font-bold my-1">Location: <span className="pl-4 font-normal text-gray-800">{singleJob?.location}</span></h1>
        <h1 className="font-bold my-1">Description: <span className="pl-4 font-normal text-gray-800">{singleJob?.description}</span></h1>
        <h1 className="font-bold my-1">Experience: <span className="pl-4 font-normal text-gray-800">{singleJob?.experience} yrs</span></h1>
        <h1 className="font-bold my-1">Salary: <span className="pl-4 font-normal text-gray-800">{singleJob?.salaryPerDay}LPA</span></h1>
        <h1 className="font-bold my-1">Total Applicants: <span className="pl-4 font-normal text-gray-800">{singleJob?.applications?.length}</span></h1>
        <h1 className="font-bold my-1">Posted Date: <span className="pl-4 font-normal text-gray-800">{singleJob?.createdAt.split("T")[0]}</span></h1>
        <h1 className="font-bold my-1">Project Type <span className="pl-4 font-normal text-gray-800">{singleJob?.projectType}</span></h1>

        <h1 className="font-bold my-1">Project Type <span className="pl-4 font-normal text-gray-800">{singleJob?.subProjectType}</span></h1>

        <h1 className="font-bold my-1">Project Type <span className="pl-4 font-normal text-gray-800">{singleJob?.subGenres}</span></h1>

        <h1 className="font-bold my-1">Project Type <span className="pl-4 font-normal text-gray-800">{singleJob?.roleType}</span></h1>

        <h1 className="font-bold my-1">Project Type <span className="pl-4 font-normal text-gray-800">{singleJob?.roleName}</span></h1>

        <h1 className="font-bold my-1">Project Type <span className="pl-4 font-normal text-gray-800">{singleJob?.gender}</span></h1>
        {/* <h1 className="font-bold my-1">Project Type <span className="pl-4 font-normal text-gray-800">{singleJob?.age}</span></h1>
        <h1 className="font-bold my-1">Project Type <span className="pl-4 font-normal text-gray-800">{singleJob?.height}</span></h1>
        <h1 className="font-bold my-1">Project Type <span className="pl-4 font-normal text-gray-800">{singleJob?.weight}</span></h1> */}
        <h1 className="font-bold my-1">Project Type <span className="pl-4 font-normal text-gray-800">{singleJob?.skills}</span></h1>
        <h1 className="font-bold my-1">Project Type <span className="pl-4 font-normal text-gray-800">{singleJob?.roleDescription}</span></h1>
        <h1 className="font-bold my-1">Project Type <span className="pl-4 font-normal text-gray-800">{singleJob?.mediaRequirement}</span></h1>
        <h1 className="font-bold my-1">Project Type <span className="pl-4 font-normal text-gray-800">{singleJob?.expectedWorkHours}</span></h1>
        <h1 className="font-bold my-1">Project Type <span className="pl-4 font-normal text-gray-800">{singleJob?.expectedCompletionTime}</span></h1>
        <h1 className="font-bold my-1">Project Type <span className="pl-4 font-normal text-gray-800">{singleJob?.specialSubmissionAuditions}</span></h1>
        <h1 className="font-bold my-1">Project Type <span className="pl-4 font-normal text-gray-800">{singleJob?.auditionDetails}</span></h1>
        <h1 className="font-bold my-1">Project Type <span className="pl-4 font-normal text-gray-800">{singleJob?.company}</span></h1>
        <h1 className="font-bold my-1">Project Type <span className="pl-4 font-normal text-gray-800">{singleJob?.created_by}</span></h1>
        <h1 className="font-bold my-1">Project Type <span className="pl-4 font-normal text-gray-800">{singleJob?.age}</span></h1>
        <h1 className="font-bold my-1">Project Type <span className="pl-4 font-normal text-gray-800">{singleJob?.age}</span></h1>
        <h1 className="font-bold my-1">Project Type <span className="pl-4 font-normal text-gray-800">{singleJob?.age}</span></h1>
        <h1 className="font-bold my-1">Project Type <span className="pl-4 font-normal text-gray-800">{singleJob?.age}</span></h1>

      </div>
    </div>
    </div>
</div>
  );
};

export default JobDescripion;
