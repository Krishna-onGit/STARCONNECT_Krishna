import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
// import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from "react-router-dom";

// LOGIC YET TO BE ADDED
const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className="text-center">
      <div className="flex flex-col gap-5 my-10">
        {/* No.1 TAG */}
        <span className=" mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#3B1D89] font-bold">
          No. 1 Job Hunt Website
        </span>

        {/* CALL TO ACTIO - CTA */}
        <h1 className="text-5xl font-bold text-[#ceb2ff]">
          Search, Apply & <br /> Get Your{" "}
          <span className="text-[#6A38C2]">Dream Role</span>
        </h1>

        {/* INTRO STATEMENT */}
        <h2 className="font-medium text-white ">
          The stage is set, and the spotlight is yours. 🌟
        </h2>

        {/* <p className="font-medium text-white mb-2">Showcase your talent, build your dream portfolio, and connect with casting directors like never before.</p>
  <p className="font-medium text-white mb-2">From auditions to breakthroughs, your journey starts here.Let your star shine bright in the entertainment universe!</p> */}

        {/* searchbar */}
        <div className="flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto">
          <input
            type="text"
            placeholder="Find your DREAM Role"
            onChange={(e) => setQuery(e.target.value)}
            className="outline-none border-none w-full bg-inherit "
          />
          <Button
            onClick={searchJobHandler}
            className="rounded-r-full bg-[#6A38C2]"
          >
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
