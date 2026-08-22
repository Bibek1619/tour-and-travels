import React, { Suspense, lazy } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/front/Navbar";
import { HeroSection } from "@/components/front/HeroSection";
import IntroSection from "@/components/front/IntroSection";
import DailyTripsBooking from "@/components/front/DailyTripsBooking";
import { Footer } from "@/components/front/Footer";
import Whyus from "@/components/front/Whyus";
import TestimonialsSection from "@/components/front/TestimonialsSection";

const DestinationsSection = lazy(() => import("@/components/front/DestinationsSection").then(m => ({ default: m.DestinationsSection })));
const BestSellingPackages = lazy(() => import("@/components/front/BestSellingPackages"));
const PeakClimbingSection = lazy(() => import("@/components/front/PeakClimbingSection"));

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

const SectionLoader = () => (
  <div className="py-20 flex justify-center items-center">
    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
  </div>
);

const Home = () => {
  return (
    <div>
      <Navbar />

      <Section><HeroSection /></Section>
      <Section><IntroSection /></Section>

      {/* No animation wrapper — renders immediately, no risk of staying hidden */}
      <Suspense fallback={<SectionLoader />}>
        <BestSellingPackages />
      </Suspense>

      {/* <Section><PeakClimbingSection /></Section> */}
      <Section><DailyTripsBooking /></Section>
      <Suspense fallback={<SectionLoader />}>
        <Section><DestinationsSection /></Section>
      </Suspense>
      <Section><TestimonialsSection /></Section>
      <Section><Whyus /></Section>

      <Footer />
    </div>
  );
};

export default Home;
