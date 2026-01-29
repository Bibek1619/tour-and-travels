const express=require('express');
const router=express.Router();
const {adminDashboard}=require("../controllers/adminController");
const {protect,adminOnly}=require("../middleware/authMiddleware");

//admin route
router.get("/dashboard",protect,adminOnly,adminDashboard);

module.exports=router;