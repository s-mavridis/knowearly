import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import dnaHeroBg from "@/assets/dna-hero-bg.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 pt-32 pb-24 overflow-hidden">
      {/* DNA Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={dnaHeroBg} 
          alt="" 
          className="w-full h-full object-cover"
        />
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-[#0B2B40]/90" />
        
        {/* Subtle accent glows */}
        <div className="absolute top-20 right-10 w-96 h-96 bg-mint/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-teal/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="rounded-3xl p-10 md:p-16 animate-fade-in">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight mb-8">
            What's Your Cancer Risk?
          </h1>
          
          <p className="text-lg md:text-xl text-white/80 font-medium max-w-2xl mx-auto mb-10 leading-relaxed">
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

          {/* Trust indicators */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-white/70">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-mint" />
              <span className="text-sm">Free</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-mint" />
              <span className="text-sm">Private</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-mint" />
              <span className="text-sm">No account required</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
