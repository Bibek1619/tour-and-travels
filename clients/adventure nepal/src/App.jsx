import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loader from "@/components/Loader";
import TourPackagesPage from "./pages/TourPakagesPage";

// Lazy load pages
const Home = lazy(() => import("@/pages/Home"));
const VehicleBooking = lazy(() => import("@/pages/VehicleBooking"));
const TourPackages = lazy(() => import("@/pages/TourPakagesPage"));
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

        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
