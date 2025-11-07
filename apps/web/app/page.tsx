"use client";

import { Suspense } from "react";
import { Header } from "../components/navigation/Header";
import { Footer } from "../components/navigation/Footer";
import { HeroSection } from "../components/sections/HeroSection";
import { FeaturesSection } from "../components/sections/FeatureSection";
import { CapabilitiesSection } from "../components/sections/CapabilitiesSection";
import { TestimonialSection } from "../components/sections/TestimonialSection";
import { CTASection } from "../components/sections/CTASection";
import { LoadingSpinner } from "../components/loading/LoadingSpinner";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Suspense
        fallback={
          <div className="fixed inset-0 flex items-center justify-center bg-white">
            <LoadingSpinner size="lg" />
          </div>
        }
      >
        <Header />
        
        <main>
          <HeroSection />
          <FeaturesSection />
          <CapabilitiesSection />
          <TestimonialSection />
          <CTASection />
        </main>
        
        <Footer />
      </Suspense>
    </div>
  );
}
