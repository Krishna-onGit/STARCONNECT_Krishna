import React from "react";
import { ContainerScroll } from "../ui/container-scroll-animation";
import { Camera, Theater, Video, Award, Star } from "lucide-react";
import { motion } from "framer-motion";

export function HeroScrollDemo() {
  const steps = [
    { icon: <Camera  />, title: "Create a Portfolio", description: "Showcase your skills and experience." },
    { icon: <Theater />, title: "Find Auditions", description: "Apply for roles that suit your talent." },
    { icon: <Video />, title: "Get Callbacks", description: "Nail your auditions and receive callbacks." },
    { icon: <Award />, title: "Book a Role", description: "Land your first acting job." },
    { icon: <Star />, title: "Build Reputation", description: "Grow your career and get recognized." }
  ];
  return (
    <div className="flex flex-col overflow-hidden">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-black dark:text-white">
              Unleash the power of <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                Scroll Animations
              </span>
            </h1>
          </>
        }
      >
        {/* <img
          src="/linear.webp"
          alt="hero"
          height={720}
          width={1400}
          className="mx-auto rounded-2xl object-cover h-full object-left-top"
          draggable={false}
        /> */}
         <div className="flex flex-col items-center justify-center w-96 rounded-lg min-h-screen bg-gray-900 text-white py-10">
      <h2 className="text-3xl font-bold mb-8">Your Acting Journey</h2>
      <div className="relative flex flex-col items-center space-y-10">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            className="relative flex items-center space-x-6 p-4 rounded-lg bg-gray-800 shadow-lg w-80"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.3 }}
          >
            <div className="text-4xl text-[#48cfcb]">{step.icon}</div>
            <div>
              <h3 className="text-xl font-semibold">{step.title}</h3>
              <p className="text-gray-300 text-sm">{step.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
      </ContainerScroll>
    </div>
  );
}

export default HeroScrollDemo;
