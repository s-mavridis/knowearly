import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroBg from "@/assets/hero-bg.png";
const HeroSection = () => {
  return <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image - flipped horizontally */}
      <div className="absolute inset-0" style={{
      backgroundImage: `url(${heroBg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      transform: 'scaleX(-1)'
    }} />
      {/* Warm overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-earth/70 via-earth/40 to-earth/20" />
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 pt-32 pb-24">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm font-medium mb-8">
            Evidence-Based Assessment
          </div>

          {/* Headline with serif font */}
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-white leading-[1.1] tracking-tight mb-6">
            Know your Cancer Risk
          </h1>
          
          <p className="text-lg md:text-xl text-white/80 max-w-xl mb-10 leading-relaxed">
            If cancer runs in your family, you might need screening that standard guidelines don't cover. Find out in 2 minutes.
          </p>

          <Button variant="cta" size="lg" className="group bg-terracotta hover:bg-terracotta-light" asChild>
            <Link to="/quiz">
              Start assessment
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>

          {/* Disclaimer */}
          <p className="mt-10 text-sm text-white/50 max-w-md">
            For research and educational purposes only. Not intended for clinical diagnosis or treatment.
          </p>
        </div>

        {/* Stats at bottom */}
        <div className="absolute bottom-12 right-0 hidden lg:flex items-center gap-8 text-white">
          <div className="text-center border-r border-white/20 pr-8">
            <div className="text-2xl font-semibold">2 min</div>
            <div className="text-sm text-white/60">Assessment</div>
          </div>
          <div className="text-center border-r border-white/20 pr-8">
            <div className="text-2xl font-semibold">Free</div>
            <div className="text-sm text-white/60">No account needed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-semibold">Private</div>
            <div className="text-sm text-white/60">Confidential results</div>
          </div>
        </div>
      </div>
    </section>;
};
export default HeroSection;