import React from "react";
import { motion } from "framer-motion"; // <-- import framer-motion
import { Navbar } from "@/components/front/Navbar";
import { HeroSection } from "@/components/front/HeroSection";
import { Footer } from "@/components/front/Footer";
import Whyus from "@/components/front/Whyus";
import { DestinationsSection } from "@/components/front/DestinationsSection";

// Updated: longer animation duration
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5, ease: "easeOut" } // slower and smoother
  },
};

const Home = () => {
  return (
    <div>
      <Navbar />

      {/* Hero Section */}
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <HeroSection />
      </motion.div>

      {/* Why Us Section */}
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <Whyus />
      </motion.div>

      {/* Destinations Section */}
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <DestinationsSection />
      </motion.div>

      <Footer />
    </div>
  );
};

export default Home;
