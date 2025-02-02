import React from "react";
import { ThreeDCardDemo } from "./ThreeDCardDemo";
import SwipeCarousel from "./SwipeCarousel";
import { ThreeDCardDemo2 } from "./ThreeDCardDemo2";
import { ThreeDCardDemo3 } from "./ThreeDCardDemo3";


const Design = () => {
  return (
    <div>
      {/* <div className="flex overflow-x-hidden max-w-7xl  my-20">
        <img
          src={"/DesignItems/3d-cinema-banner-.png"}
          alt=""
          className="max-h-72 flex-shrink-0"
        />
        <img
          src={"/DesignItems/3d-cinema-banner-.png"}
          alt=""
          className="max-h-72 flex-shrink-0"
        />
        <img
          src={"/DesignItems/3d-cinema-banner-.png"}
          alt=""
          className="max-h-72 flex-shrink-0"
        />
      </div> */}
     <div className="flex flex-nowrap overflow-x-auto gap-3 mx-5 py-5">
        <div className="flex-shrink-0">
          <ThreeDCardDemo />
        </div>
        <div className="flex-shrink-0">
          <ThreeDCardDemo2 />
        </div>
        <div className="flex-shrink-0">
          <ThreeDCardDemo />
        </div>
        <div className="flex-shrink-0">
          <ThreeDCardDemo3 />
        </div>
        {/* Add more cards if needed */}
      </div>
      <div className=" my-20">
      <SwipeCarousel />  {/* Add the carousel */}
    </div>
    </div>
  );
};

export default Design;
