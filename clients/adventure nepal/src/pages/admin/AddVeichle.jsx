import CreateVehicle from "@/components/admin/addVehicle/CreateVehicle";
import AdminNavbar from "@/components/admin/AdminNavbar";

const AddVehicle =()=>{
    return(
       < div className=" bg-gray-50 px-4 py-6">
          <AdminNavbar />   
        <div className="min-h-screen bg-gray-50 px-4 py-6">
         

            <div className="max-w-4xl mx-auto">
                <h1 className="text-2xl font-semibold mb-6"> Add New Vehicle</h1>

                <CreateVehicle />
            </div>
        </div>
        </div>
    )
}
export default AddVehicle;