import React from "react";
import { Navbar } from "@/components/front/Navbar";
import { HeroSection } from "@/components/front/HeroSection";
import { Footer } from "@/components/front/Footer";

const Home = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      {/* Add more sections below if needed */}


      <Footer/>
    </div>
  );
};

export default Home;
