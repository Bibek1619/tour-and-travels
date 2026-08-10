import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Mountain, Waves, Anchor, Wind, Zap, Activity } from "lucide-react";

const CreateAdventure = () => {
  const navigate = useNavigate();

  const categories = [
    { 
      id: "rafting", 
      name: "White Water Rafting",
      icon: Waves,
      color: "from-blue-500 to-cyan-500",
      description: "Create rafting packages and experiences"
    },
    { 
      id: "kayaking", 
      name: "Kayaking", 
      icon: Anchor,
      color: "from-cyan-500 to-blue-400",
      description: "Create kayaking courses and trips"
    },
    { 
      id: "paragliding", 
      name: "Paragliding",
      icon: Wind,
      color: "from-purple-500 to-pink-500",
      description: "Create paragliding flight packages"
    },
    { 
      id: "bungee", 
      name: "Bungee Jumping",
      icon: Zap,
      color: "from-red-500 to-orange-500",
      description: "Create bungee jumping experiences"
    },
    { 
      id: "zipline", 
      name: "Zip Lining",
      icon: Activity,
      color: "from-yellow-500 to-orange-500",
      description: "Create zipline adventure packages"
    },
    { 
      id: "canyoning", 
      name: "Canyoning",
      icon: Mountain,
      color: "from-green-500 to-teal-500",
      description: "Create canyoning expedition packages"
    },
  ];

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Create Adventure Package</h1>
            <p className="text-gray-600 mt-1">
              Select the type of adventure you want to create
            </p>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => {
              const Icon = category.icon;
              
              return (
                <Card
                  key={category.id}
                  onClick={() => navigate("/admin/dashboard/add-adventure", { state: { category: category.id } })}
                  className="overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer"
                >
                  {/* Category Header with Gradient */}
                  <div className={`h-32 bg-gradient-to-br ${category.color} relative flex items-center justify-center`}>
                    <Icon className="w-16 h-16 text-white opacity-90" />
                  </div>

                  {/* Category Content */}
                  <CardContent className="p-6">
                    <h3 className="font-bold text-xl text-gray-900 mb-2">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {category.description}
                    </p>

                    {/* Action Button */}
                    <Button
                      variant="outline"
                      className="w-full group-hover:bg-purple-50 group-hover:border-purple-500 group-hover:text-purple-600"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate("/admin/dashboard/add-adventure", { state: { category: category.id } });
                      }}
                    >
                      Create {category.name}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Back Button */}
          <div className="mt-8 text-center">
            <Button
              variant="outline"
              onClick={() => navigate("/admin/dashboard/adventures")}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default CreateAdventure;
