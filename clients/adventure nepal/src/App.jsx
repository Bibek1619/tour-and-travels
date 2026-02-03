import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loader from "@/components/Loader";

// Lazy load pages
const Home = lazy(() => import("@/pages/Home"));
const VehicleBooking = lazy(() => import("@/pages/VehicleBooking"));
const TourPackagesPage = lazy(() => import("@/pages/TourPakagesPage"));
const PakagesDetailsPage = lazy(() => import("@/pages/PakagesDetailsPage"));
const SeatBooking = lazy(() => import("@/pages/SeatBooking"));
const SignupForm = lazy(() => import("@/pages/auth/SignupForm"));
const Login = lazy(() => import("@/pages/auth/LoginForm"));
const Auth = lazy(() => import("@/pages/auth/Auth"));
const VerifyCode = lazy(() => import("@/pages/auth/VerifyCode"));
const AdminDashboard = lazy(() => import("@/pages/admin/AdminDashboard"));
const AddVeichle = lazy(() => import("@/pages/admin/AddVeichle"));




function App() {
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/vehicle-booking" element={<VehicleBooking />} />
          <Route path="/tours" element={<TourPackagesPage />} />
          <Route path="/tours/:slug" element={<PakagesDetailsPage />} />
          <Route path="/seat-booking" element={<SeatBooking />} />
        <Route path="/register" element={<Auth />}>
        <Route index element={<SignupForm />} />
      </Route>
              {/* LOGIN */}
      <Route path="/login" element={<Auth />}>
        <Route index element={<Login />} />
      </Route>
      
        <Route path="/verify-code" element={<Auth />}>
    <Route index element={<VerifyCode />} />
  </Route>
    
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/add-vehicle" element={<AddVeichle />} />


        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
