import React from "react";
import '../index.css'

const LandingPage = () => {
  return (
    <main className="flex flex-col gap-10 sm:gap-20 py-10 sm:py-20">
      <section className="text-center">
        <h1
        className="flex flex-col items-center justify-center bg-gradient-to-br from-gray-500 via-gray-200 to-white text-transparent bg-clip-text text-4xl font-extrabold"
        >Find Your Dream Job{" "}<span>and get{" "}<img src="/logo (1).png" className="h-14 sm:h-24 lg:h-32" alt="logo" /></span></h1>
      </section>
    </main>
  )
};

export default LandingPage;
