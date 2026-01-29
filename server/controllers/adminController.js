exports.adminDashboard=(req,res)=>{
    res.json({
        message:"welcome admin you are hero of the page",
        admin:{
            id:req.user._id,
            email:req.user.email,
            role:req.user.role
        }
    })
}