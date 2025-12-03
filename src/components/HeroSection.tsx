import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 pt-32 pb-24 bg-white">
      {/* Hero Card with DNA Background */}
      <div 
        className="relative w-full max-w-6xl mx-auto rounded-3xl overflow-hidden min-h-[600px] flex items-center justify-center bg-[#0B2B40]"
        style={{
          backgroundImage: `url('/images/dna-bg.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Content */}
        <div className="relative z-10 px-8 py-16 md:px-16 md:py-24 text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight mb-8">
            What's Your Cancer Risk?
          </h1>
          
          <p className="text-lg md:text-xl text-white/85 font-medium max-w-2xl mx-auto mb-10 leading-relaxed">
            If cancer runs in your family, you might need screening that standard guidelines don't cover. Find out in 2 minutes.
          </p>

          <Button 
            variant="cta" 
            size="xl"
            className="group"
            asChild
          >
            <Link to="/quiz">
              Check Your Risk
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>

          {/* Disclaimer */}
          <p className="mt-8 text-sm text-white/60 max-w-md mx-auto">
            For research and educational purposes only. Not intended for clinical diagnosis or treatment.
          </p>

          {/* Trust indicator */}
          <div className="mt-6 flex items-center justify-center gap-2 text-white/80">
            <CheckCircle className="w-4 h-4 text-mint" />
            <span className="text-sm font-medium">Confidential & Secure</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
