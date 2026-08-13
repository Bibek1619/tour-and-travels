// 1️⃣ Load environment variables first
require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const veichleRoute=require("./routes/veichleRoute");
const adminRoutes=require("./routes/adminRoutes");
const tourPackageRoutes=require("./routes/tourRoutes");
const regionRoutes=require("./routes/regionRoutes");
const adventureRoutes=require("./routes/adventureRoutes");
const categoryRoutes=require("./routes/categoryRoutes");
const dailyRouteRoutes=require("./routes/dailyRouteRoutes");
const enquiryRoutes=require("./routes/enquiryRoutes");
const reviewRoutes=require("./routes/reviewRoutes");
const homepageRoutes=require("./routes/homepageRoutes");


// 2️⃣ Connect to MongoDB
connectDB();

const app = express();

// ✅ CORS config
app.use(
  cors({
    origin: "*",
    methods: ["GET", "PUT", "POST", "DELETE"],
  })
);

// ✅ Parse JSON request body
app.use(express.json());

// ✅ Test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/auth", authRoutes);

//region routes
app.use("/api/regions", regionRoutes);

//adventure routes
app.use("/api/adventures", adventureRoutes);

//category routes
app.use("/api/categories", categoryRoutes);

//daily route routes
app.use("/api/daily-routes", dailyRouteRoutes);

//enquiry routes
app.use("/api/enquiries", enquiryRoutes);

//review routes
app.use("/api/reviews", reviewRoutes);

//veichle routes
app.use("/api/vehicles",veichleRoute);

app.use("/api/tours", tourPackageRoutes);

//homepage routes
app.use("/api/homepage", homepageRoutes);

//admin routes
app.use("/api/admin",adminRoutes);
const path = require("path");


app.use("/images", express.static(path.join(__dirname, "public/images")));




// 3️⃣ Start server
const port = process.env.PORT || 3000;
console.log("PORT from env:", process.env.PORT);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
