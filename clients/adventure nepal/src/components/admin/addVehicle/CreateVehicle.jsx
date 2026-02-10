import React from 'react'
import { useState } from 'react'

import {  Card,CardContent } from '@/components/ui/card';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createVehicleApi } from '@/api/VehicleApi';

import { useNavigate } from 'react-router-dom';




const CreateVehicle = () => {
    const [formData,setFormData]=useState({
          category: "",
    fuelType: "",
    brand: "",
    model: "",
    name: "",
    image: "",
    dailyRate: "",
    capacity: "",
    luggage: "",
    features: "",
    bestFor: "",
    isAvailable: true,

    });
    const handleChange=(e)=>{
        const {name,value,type,checked}=e.target;

        setFormData({
          ...formData,
          [name]:type==="checkbox"?checked:value,
        });
        
    };

 const handleSubmit = (e) => {
  e.preventDefault();
  console.log('formdara',formData)

  const form = new FormData();
  form.append("category", formData.category);
  form.append("fuelType", formData.fuelType);
  form.append("brand", formData.brand);
  form.append("model", formData.model);
  form.append("name", formData.name);
  form.append("dailyRate", formData.dailyRate);
  form.append("capacity", formData.capacity);
  form.append("luggage", formData.luggage);
  form.append("bestFor", formData.bestFor);
  form.append("availableCount", formData.availableCount);
  form.append("isAvailable", formData.isAvailable);
  
  // Features as comma-separated
  formData.features
    .split(",")
    .map((f) => f.trim())
    .forEach((f) => form.append("features", f));

  // Append image file
  form.append("images", formData.image);

  createVehicleMutation.mutate(form);
};


    const createVehicleMutation = useMutation({
  mutationFn: createVehicleApi,
  onSuccess: () => {
    
   toast.success("Vehicle created successfully");

   
      navigate("/admin/dashboard")
   
 
  },
  onError: (error) => {
    toast.error(
      error?.response?.data?.message || "Failed to create vehicle"
    );
  },
});
const navigate=useNavigate();


  return (
  <Card>
      <CardContent className="p-6 space-y-6">
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Category & Fuel */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Category</Label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full border rounded-md h-10 px-3"
                required
              >
                <option value="">Select category</option>
                <option value="car">Car</option>
                <option value="bike">Bike</option>
                <option value="jeep">Jeep</option>
                <option value="van">Van</option>
                <option value="bus">Bus</option>
              </select>
            </div>

            <div>
              <Label>Fuel Type</Label>
              <select
                name="fuelType"
                value={formData.fuelType}
                onChange={handleChange}
                className="w-full border rounded-md h-10 px-3"
                required
              >
                <option value="">Select fuel</option>
                <option value="petrol">Petrol</option>
                <option value="diesel">Diesel</option>
                <option value="electric">Electric</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>
          </div>

          {/* Brand & Model */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Brand</Label>
              <Input
                name="brand"
                placeholder="Honda, Bajaj..."
                value={formData.brand}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label>Model</Label>
              <Input
                name="model"
                placeholder="Bullet 350"
                value={formData.model}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Display Name */}
          <div>
            <Label>Vehicle Name</Label>
            <Input
              name="name"
              placeholder="Royal Enfield Bullet 350"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Image */}
       {/* Image Upload */}
<div>
  <Label>Upload Image</Label>
  <Input
    type="file"
    name="image"
    accept="image/*"
    onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
    required
  />
</div>


          {/* Rate & Capacity */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Daily Rate (Rs)</Label>
              <Input
                type="number"
                name="dailyRate"
                value={formData.dailyRate}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label>Passenger Capacity</Label>
              <Input
                type="number"
                name="capacity"
                value={formData.capacity}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Luggage & Best For */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Luggage</Label>
              <Input
                name="luggage"
                placeholder="3 bags"
                value={formData.luggage}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label>Best For</Label>
              <Input
                name="bestFor"
                placeholder="Family travel"
                value={formData.bestFor}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Features */}
          <div>
            <Label>Features (comma separated)</Label>
            <Input
              name="features"
              placeholder="AC, GPS, Airbags"
              value={formData.features}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label>Available Count</Label>
            <Input
  type="number"
  name="availableCount"
  placeholder="Available vehicles"
  onChange={handleChange}
  required
/>

          </div>

          {/* Availability */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isAvailable"
              checked={formData.isAvailable}
              onChange={handleChange}
            />
            <Label>Available for booking</Label>
          </div>

          {/* Submit */}
        <Button
        type="submit"
  className="w-full bg-green-600 hover:bg-green-700"
  disabled={createVehicleMutation.isPending}
>
  {createVehicleMutation.isPending ? "Creating..." : "Create Vehicle"}
</Button>

        </form>
      </CardContent>
    </Card>
  )
}

export default CreateVehicle