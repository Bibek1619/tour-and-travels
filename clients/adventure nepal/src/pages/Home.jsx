import React from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/front/Navbar";
import { HeroSection } from "@/components/front/HeroSection";
import IntroSection from "@/components/front/IntroSection";
import DailyTripsBooking from "@/components/front/DailyTripsBooking";
import { Footer } from "@/components/front/Footer";
import Whyus from "@/components/front/Whyus";
import TestimonialsSection from "@/components/front/TestimonialsSection";
import { DestinationsSection } from "@/components/front/DestinationsSection";
import BestSellingPackages from "@/components/front/BestSellingPackages";
import PeakClimbingSection from "@/components/front/PeakClimbingSection";

// amount: 0.1 — only 10% of section needs to be visible to trigger animation
// This prevents sections from staying hidden on short mobile screens
const fade = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const Section = ({ children }) => (
  <motion.div
    variants={fade}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.1 }}
  >
    {children}
  </motion.div>
);

const Home = () => {
  return (
    <div>
      <Navbar />

      <Section><HeroSection /></Section>
      <Section><IntroSection /></Section>

      {/* No animation wrapper — renders immediately, no risk of staying hidden */}
      <BestSellingPackages />

      {/* <Section><PeakClimbingSection /></Section> */}
      <Section><DailyTripsBooking /></Section>
      <Section><DestinationsSection /></Section>
      <Section><TestimonialsSection /></Section>
      <Section><Whyus /></Section>

      <Footer />
    </div>
  );
};

export default Home;
