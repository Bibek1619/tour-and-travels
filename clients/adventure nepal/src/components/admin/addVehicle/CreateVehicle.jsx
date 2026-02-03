import React from 'react'
import { useState } from 'react'

import {  Card,CardContent } from '@/components/ui/card';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';



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

    const handleSubmit =(e)=>{
      e.preventDefault();
      const payload = {
      ...formData,
      dailyRate: Number(formData.dailyRate),
      capacity: Number(formData.capacity),
      features: formData.features
        .split(",")
        .map((f) => f.trim()),
    };

    }
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
          <div>
            <Label>Image URL</Label>
            <Input
              name="image"
              placeholder="https://..."
              value={formData.image}
              onChange={handleChange}
              required
            />
          </div>

          {/* Rate & Capacity */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Daily Rate (₹)</Label>
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
          <Button className="w-full bg-green-600 hover:bg-green-700">
            Create Vehicle
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default CreateVehicle