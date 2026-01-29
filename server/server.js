// 1️⃣ Load environment variables first
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const veichleRoute=require("./routes/veichleRoute");
const adminRoutes=require("./routes/adminRoutes");

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


//veichle routes
app.use("/api/vehicles",veichleRoute);


//admin routes
app.use("/api/admin",adminRoutes);


// 3️⃣ Start server
const port = process.env.PORT || 3000;
console.log("PORT from env:", process.env.PORT);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
