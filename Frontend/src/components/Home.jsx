import React, { useEffect } from "react";
import Navbar from "./Shared/Navbar";
import HeroSection from "./HeroSection";
import CategoryCarousel from "./CategoryCarousel";
import LatestJobs from "./LatestJobs";
import Footer from "./Shared/Footer";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import Design from "./Design-UI/Design";
const Home = () => {

  useGetAllJobs();
  const { user } = useSelector(store => store.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.role === 'Director') {
      navigate("/admin/Companies");
    }
  }, []);

  return (
    // Apply the background to the main div
    <div className="bg-main-bg ">
      <div className="bg-overlay-bg">

      <Navbar />
      
      <HeroSection />
      <CategoryCarousel />
      <LatestJobs />
      <Design />
      <Footer />
      
      </div>
      
        
    </div>
  );
};

export default Home;

//<div class="relative h-full w-full bg-slate-950"><div class="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#3e3e3e,transparent)]"></div></div>


// final bg: bg-gradient-to-bl from-purple-950 via-black to-purple-950 min-h-screen bg-cover bg-fixed