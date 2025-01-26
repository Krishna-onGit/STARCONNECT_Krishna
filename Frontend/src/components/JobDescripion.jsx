import React from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

const isApplied = true;
const JobDescripion = () => {
  return (
    <div className="max-w-7xl mx-auto my-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-xl ">Title</h1>
          <div className="flex items-center gap-2 mt-4 ">
            <Badge className={"text-blue-700 font-bold"} variant="ghost">
              apply
            </Badge>
            <Badge className={"text-blue-700 font-bold"} variant="ghost">
              apply
            </Badge>
            <Badge className={"text-blue-700 font-bold"} variant="ghost">
              apply
            </Badge>
          </div>
        </div>
        <Button
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
        <h1 className="font-bold my-1">Role: <span className="pl-4 font-normal text-gray-800">Actor</span></h1>
        <h1 className="font-bold my-1">Location: <span className="pl-4 font-normal text-gray-800">Actor</span></h1>
        <h1 className="font-bold my-1">Description: <span className="pl-4 font-normal text-gray-800">Actor</span></h1>
        <h1 className="font-bold my-1">Experience: <span className="pl-4 font-normal text-gray-800">Actor</span></h1>
        <h1 className="font-bold my-1">Salary: <span className="pl-4 font-normal text-gray-800">Actor</span></h1>
        <h1 className="font-bold my-1">Total Applicants: <span className="pl-4 font-normal text-gray-800">Actor</span></h1>
        <h1 className="font-bold my-1">Posted Date: <span className="pl-4 font-normal text-gray-800">Actor</span></h1>
      </div>
    </div>
  );
};

export default JobDescripion;
