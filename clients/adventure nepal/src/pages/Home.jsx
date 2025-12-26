import React from "react";
import { Navbar } from "@/components/front/Navbar";
import { HeroSection } from "@/components/front/HeroSection";
import { Footer } from "@/components/front/Footer";
import Whyus from "@/components/front/Whyus";
import { DestinationsSection } from "@/components/front/DestinationsSection";


const Home = () => {
  return (
    <div>
      <Navbar />

      <HeroSection />
   
      {/* Add more sections below if needed */}
      <Whyus />
      <DestinationsSection />


      <Footer/>
    </div>
  );
};

export default Home;
