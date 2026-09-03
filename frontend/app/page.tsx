import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StatsSection from "@/components/StatsSection";
import FeatureCards from "@/components/FeatureCards";
import HowItWorks from "@/components/HowItWorks";
import PredictiveMaintenance from "@/components/PredictiveMaintenance";
import InteractiveDemo from "@/components/InteractiveDemo";
import CtaBanner from "@/components/CtaBanner";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#070b14] text-slate-100 antialiased selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* 1. Navbar */}
      <Navbar />

      {/* Main Page Sections */}
      <main className="flex-grow">
        {/* 2. Hero Section: "Predict Roads. Prevent Failures." + Dual CTAs + Telemetry HUD */}
        <Hero />

        {/* 3. Key Statistics & Gov Scale Impact */}
        <StatsSection />

        {/* 4. Infrastructure Intelligence Feature Cards */}
        <FeatureCards />

        {/* 5. How It Works Pipeline */}
        <HowItWorks />

        {/* 6. Predictive Maintenance & Pavement Deterioration Curve */}
        <PredictiveMaintenance />

        {/* 7. Live Interactive Command Center & Maintenance Console */}
        <InteractiveDemo />

        {/* 8. Agency CTA Banner */}
        <CtaBanner />
      </main>

      {/* 9. Enterprise Government Compliance Footer */}
      <Footer />
    </div>
  );
}
