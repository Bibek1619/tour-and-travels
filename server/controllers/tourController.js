const tourPackage =require("../models/tourPackage.js")

exports.createTourPackage=async (req,res)=>
{
    try{
        const tour=await tourPackage.create(req.body);
        res.status(201).json({
            sucess:true,
            message:"Tour Package created successfully",
            data:tour,

        });
    

    } catch(error){
        res.status(500).json({
            sucess:false,
            message:"error.message",
    });
}
}

exports.getAllTourPackages=async(req,res)=>{
    try{
        const tours=await tourPackage.find().sort({createdAt:-1});
        res.status(200).json({
            success:true,
            count:tours.length,
            data:tours,

        });

    }catch(error){
        res.status(500).json({
            sucess:false,
            message:error.message,

        })
    }
}

exports.getTourPackageById=async(req,res)=>{
    try{
        const tour=await tourPackage.findById(req.params.id)
         if(!tour){
            return res.staus(404).json({
                sucess:false,
                message:'tour package not found',
            });
         }
         res.status(200).json({
      success: true,
      data: tour,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
    };



    exports.updateTourPackage=async(req,res)=>{
        try{
            const tour=await tourPackage.findByIdAndUpdate(
                req.params.id,
                req.body,
                {
                    new:true,
                    runValidators:true,
                }
            )
            if(!tour){
                return res.status(404).json({
                    success:false,
                    message:"Tour Package not found",
                })
            }
            res.status(200).json({
                success:true,
                message:"Tour Package updated successfully",
                data:tour,
            })
        }catch(error){
            res.status(500).json({
                success:false,
                message:error.message,
            })
        }
    }


   exports.deleteTourPackage = async (req, res) => {
  try {
    const tour = await TourPackage.findById(req.params.id);

    if (!tour) {
      return res.status(404).json({
        success: false,
        message: "Tour package not found",
      });
    }

    await tour.deleteOne();

    res.status(200).json({
      success: true,
      message: "Tour package deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};