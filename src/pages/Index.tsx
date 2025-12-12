import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TrustSection from "@/components/TrustSection";
import Footer from "@/components/Footer";
import { useEffect } from "react";
import { initSession, trackPageView } from "@/lib/analytics";

const Index = () => {
  useEffect(() => {
    initSession();
    trackPageView("landing");
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <HeroSection />
        <TrustSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
