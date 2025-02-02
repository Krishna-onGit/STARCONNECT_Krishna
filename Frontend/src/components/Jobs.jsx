import React, { useEffect, useState } from "react";
import Navbar from "./Shared/Navbar";
import Filtercard from "./Filtercard";
import Job from "./JobCompo";
import { useSelector } from "react-redux";

const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector((store) => store.job); //to fetch jobs
  const [filterJobs, setFilterJobs] = useState(allJobs);

  useEffect(() => {
    if (searchedQuery) {
      const filteredJobs = allJobs.filter((job) => {
        return (
          job.title.toLowercase().includes(searchedQuery.toLowercase()) ||
          job.description.toLowercase().includes(searchedQuery.toLowercase()) ||
          job.description.toLowercase().includes(searchedQuery.toLowercase())
        );
      });
    } else {
      setFilterJobs(allJobs);
    }
  }, [allJobs, searchedQuery]);
  return (
    <div className="bg-main-bg  min-h-screen text-white">
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5">
        <div className="flex gap-5">
          <div className="w-20%">
            <Filtercard />
          </div>
          {filterJobs.length <= 0 ? (
            <span>Job not found</span>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
              <div className="grid grid-cols-3 gap-4">
                {filterJobs.map((job) => (
                  <Job job={job} />
                  
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
