import React from "react";
import { motion } from "framer-motion"; // <-- import framer-motion
import { Navbar } from "@/components/front/Navbar";
import { HeroSection } from "@/components/front/HeroSection";
import IntroSection from "@/components/front/IntroSection";
import DailyTripsBooking from "@/components/front/DailyTripsBooking";
import LastMinuteTrips from "@/components/front/LastMinuteTrips";
import { Footer } from "@/components/front/Footer";
import Whyus from "@/components/front/Whyus";
import { DestinationsSection } from "@/components/front/DestinationsSection";
import BestSellingPackages from "@/components/front/BestSellingPackages";
import PeakClimbingSection from "@/components/front/PeakClimbingSection";

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

      {/* Last Minute Trips Section */}
      {/* <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <LastMinuteTrips />
      </motion.div> */}

      {/* Intro Section */}
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <IntroSection />
      </motion.div>

      {/* Best Selling Packages Section */}
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <BestSellingPackages />
      </motion.div>

      {/* Peak Climbing Section */}
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <PeakClimbingSection />
      </motion.div>

      {/* Daily Trips Booking Section */}
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <DailyTripsBooking />
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

      {/* Why Us Section */}
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <Whyus />
      </motion.div>

      <Footer />
    </div>
  );
};

export default Home;
