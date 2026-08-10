import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loader from "@/components/Loader";
import { Toaster } from "react-hot-toast";
import AddTour from "./pages/admin/AddTour";
import AddTrek from "./pages/admin/AddTrek";

// Lazy load pages
const Home = lazy(() => import("@/pages/Home"));
const VehicleBooking = lazy(() => import("@/pages/VehicleBooking"));
const TourPackagesPage = lazy(() => import("@/pages/TourPakagesPage"));
const TrekPackagesPage = lazy(() => import("@/pages/TrekPackagesPage"));
const TrekRegionPage = lazy(() => import("@/pages/TrekRegionPage"));
const TrekDetailsPage = lazy(() => import("@/pages/TrekDetailsPage"));
const PakagesDetailsPage = lazy(() => import("@/pages/PakagesDetailsPage"));
const SeatBooking = lazy(() => import("@/pages/SeatBooking"));
const SeatBookingDetail = lazy(() => import("@/pages/SeatBookingDetail"));
const AdventuresPage = lazy(() => import("@/pages/AdventuresPage"));
const AdventureDetailPage = lazy(() => import("@/pages/AdventureDetailPage"));
const AdventurePackageDetailPage = lazy(() => import("@/pages/AdventurePackageDetailPage"));
const SignupForm = lazy(() => import("@/pages/auth/SignupForm"));
const Login = lazy(() => import("@/pages/auth/LoginForm"));
const Auth = lazy(() => import("@/pages/auth/Auth"));
const VerifyCode = lazy(() => import("@/pages/auth/VerifyCode"));
const AdminDashboard = lazy(() => import("@/pages/admin/AdminDashboard"));
const AddVeichle = lazy(() => import("@/pages/admin/AddVeichle"));
const ManageTours = lazy(() => import("@/pages/admin/ManageTours"));
const ManageTreks = lazy(() => import("@/pages/admin/ManageTreks"));
const RegionTreks = lazy(() => import("@/pages/admin/RegionTreks"));
const ManageVehicles = lazy(() => import("@/pages/admin/ManageVehicles"));
const ManageAdventures = lazy(() => import("@/pages/admin/ManageAdventures"));
const CategoryAdventures = lazy(() => import("@/pages/admin/CategoryAdventures"));
const CreateAdventure = lazy(() => import("@/pages/admin/CreateAdventure"));
const AddAdventure = lazy(() => import("@/pages/admin/AddAdventure"));
const EditAdventure = lazy(() => import("@/pages/admin/EditAdventure"));
const EditTour = lazy(() => import("@/pages/admin/EditTour"));
const EditTrek = lazy(() => import("@/pages/admin/EditTrek"));
const ManageDailyRoutes = lazy(() => import("@/pages/admin/ManageDailyRoutes"));
const AddDailyRoute = lazy(() => import("@/pages/admin/AddDailyRoute"));
const ManageEnquiries = lazy(() => import("@/pages/admin/ManageEnquiries"));
const ManageReviews = lazy(() => import("@/pages/admin/ManageReviews"));
const About = lazy(() => import("@/pages/about/About"));
const Contact = lazy(() => import("@/pages/contact/Contact"));

function App() {
  return (
    <Router>
      <Toaster position="bottom-right" reverseOrder={false} />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/vehicle-booking" element={<VehicleBooking />} />
          <Route path="/tours" element={<TourPackagesPage />} />
          <Route path="/tours/:slug" element={<PakagesDetailsPage />} />
          <Route path="/trek-packages" element={<TrekPackagesPage />} />
          <Route path="/trek-packages/:regionId" element={<TrekRegionPage />} />
          <Route path="/treks/:slug" element={<TrekDetailsPage />} />
          <Route path="/seat-booking" element={<SeatBooking />} />
          <Route path="/seat-booking/:vehicleId" element={<SeatBookingDetail />} />
          <Route path="/adventures" element={<AdventuresPage />} />
          <Route path="/adventures/:slug" element={<AdventureDetailPage />} />
          <Route path="/adventures/:slug/:packageId" element={<AdventurePackageDetailPage />} />
          <Route path="/register" element={<Auth />}>
            <Route index element={<SignupForm />} />
          </Route>
          <Route path="/login" element={<Auth />}>
            <Route index element={<Login />} />
          </Route>
          <Route path="/verify-code" element={<Auth />}>
            <Route index element={<VerifyCode />} />
          </Route>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/dashboard/add-vehicle" element={<AddVeichle />} />
          <Route path="/admin/dashboard/add-tour" element={<AddTour />} />
          <Route path="/admin/dashboard/add-trek" element={<AddTrek />} />
          <Route path="/admin/dashboard/tours" element={<ManageTours />} />
          <Route path="/admin/dashboard/edit-tour/:id" element={<EditTour />} />
          <Route path="/admin/dashboard/treks" element={<ManageTreks />} />
          <Route path="/admin/dashboard/treks/:regionId" element={<RegionTreks />} />
          <Route path="/admin/dashboard/edit-trek/:id" element={<EditTrek />} />
          <Route path="/admin/dashboard/vehicles" element={<ManageVehicles />} />
          <Route path="/admin/dashboard/adventures" element={<ManageAdventures />} />
          <Route path="/admin/dashboard/adventures/:category" element={<CategoryAdventures />} />
          <Route path="/admin/dashboard/create-adventure" element={<CreateAdventure />} />
          <Route path="/admin/dashboard/add-adventure" element={<AddAdventure />} />
          <Route path="/admin/dashboard/edit-adventure/:id" element={<EditAdventure />} />
          <Route path="/admin/dashboard/daily-routes" element={<ManageDailyRoutes />} />
          <Route path="/admin/dashboard/add-daily-route" element={<AddDailyRoute />} />
          <Route path="/admin/dashboard/enquiries" element={<ManageEnquiries />} />
          <Route path="/admin/dashboard/reviews" element={<ManageReviews />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
