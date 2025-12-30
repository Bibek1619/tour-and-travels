import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loader from "@/components/Loader";
import TourPackagesPage from "./pages/TourPakagesPage";
import PakagesDetailsPage from "./pages/PakagesDetailsPage";
// Lazy load pages
const Home = lazy(() => import("@/pages/Home"));
const VehicleBooking = lazy(() => import("@/pages/VehicleBooking"));
const TourPackages = lazy(() => import("@/pages/TourPakagesPage"));
const PakagesDetails = lazy(() => import("@/pages/PakagesDetailsPage"));

// Add other pages as needed
// const About = lazy(() => import("@/pages/About"));

function App() {
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/vehicle-booking" element={<VehicleBooking />} />
          {/* <Route path="/about" element={<About />} /> */}
          <Route path="/tours" element={<TourPackagesPage />} />
          <Route path="/tours/:slug" element={<PakagesDetailsPage />} />

        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
