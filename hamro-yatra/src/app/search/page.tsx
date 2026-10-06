import { Suspense } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import SearchClient from "./search-client";

export const metadata = {
  title: "Search - Hamro Yatra Adventure",
  description: "Search for tours, treks, adventures, and vehicle rentals in Nepal",
};

export default function SearchPage() {
  return (
    <>
      <Navbar />
      <Suspense fallback={<div className="min-h-screen" />}>
        <SearchClient />
      </Suspense>
      <Footer />
    </>
  );
}
