import React from "react";

import MainLayout from "@/layouts/MainLayout";
import { useEffect } from "react";
import { tours } from "../data/toursData";
import TourHeader from "@/components/tour/TourDetails/TourHeader";
import TourGallery from "@/components/tour/TourDetails/TourGallery";
import TourTabs from "@/components/tour/TourDetails/TourTabs";
import TourSidebar from "@/components/tour/TourDetails/TourSidebar";
import { useParams } from "react-router-dom";
import TourFacts from "@/components/tour/TourDetails/TourFacts";

const PakagesDetailsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { slug } = useParams();
  const tour = tours.find((t) => t.slug === slug);
 
  if (!tour) {
    return (
      <div className="min-h-screen flex items-Center justify-Center text-muted-foreground"></div>
    );
  }

  return (
    <MainLayout>
      <main className="bg-linear-to-br from-slate-50 via-white to slate-50 min-h-screen py-6 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/*breadcrumbs */}
        <div className="text-sm text-muted-foreground mb-4 md:mb-6 flex flex-wrap gap-1">
          <span className="hover:text-foreground cursor-pointer">Home</span> /
          <span className="hover:text-foreground cursor-pointer">Packages</span>{" "}
          /<span className="text-foreground">{tour.title}</span>
        </div>

     <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* LEFT COLUMN */}
          <div className="md:col-span-2 space-y-2">
            <TourHeader tour={tour} />
            <TourGallery images={tour.images} />
        

          {tour && <TourFacts facts={tour.facts} />}

          
            <TourTabs tour={tour} />
          </div>
          {/* RIGHT SIDEBAR */}
          <TourSidebar tour={tour} />
        </div>
        </div>
      </main>
    </MainLayout>
  );
};

export default PakagesDetailsPage;
