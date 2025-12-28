import React from "react"
import { Navbar } from "@/components/front/Navbar"
import { Footer } from "@/components/front/Footer"

const MainLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {children}
      </main>
      <Footer />
    </>
  )
}

export default MainLayout
