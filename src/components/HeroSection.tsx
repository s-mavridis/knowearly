import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 pt-32 pb-24 overflow-hidden">
      {/* Abstract Background */}
      <div className="absolute inset-0 -z-10">
        {/* Gradient base */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted" />
        
        {/* Abstract shapes */}
        <div className="absolute top-20 right-10 w-96 h-96 bg-terracotta/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-forest/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-terracotta/3 to-forest/3 rounded-full blur-3xl" />
        
        {/* DNA helix pattern - left side */}
        <svg 
          className="absolute left-0 top-0 w-full h-full opacity-[0.04] pointer-events-none" 
          viewBox="0 0 1200 800" 
          fill="none"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* Left DNA strand */}
          <path 
            d="M-50 0 Q50 80 -50 160 Q50 240 -50 320 Q50 400 -50 480 Q50 560 -50 640 Q50 720 -50 800" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            className="text-primary"
          />
          <path 
            d="M50 0 Q-50 80 50 160 Q-50 240 50 320 Q-50 400 50 480 Q-50 560 50 640 Q-50 720 50 800" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            className="text-terracotta"
          />
          {/* Horizontal connectors */}
          {[0, 80, 160, 240, 320, 400, 480, 560, 640, 720].map((y, i) => (
            <line key={i} x1="-50" y1={y} x2="50" y2={y} stroke="currentColor" strokeWidth="0.5" className="text-muted-foreground" />
          ))}
          
          {/* Right DNA strand */}
          <path 
            d="M1150 0 Q1250 80 1150 160 Q1250 240 1150 320 Q1250 400 1150 480 Q1250 560 1150 640 Q1250 720 1150 800" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            className="text-primary"
          />
          <path 
            d="M1250 0 Q1150 80 1250 160 Q1150 240 1250 320 Q1150 400 1250 480 Q1150 560 1250 640 Q1150 720 1250 800" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            className="text-terracotta"
          />
          {/* Right connectors */}
          {[0, 80, 160, 240, 320, 400, 480, 560, 640, 720].map((y, i) => (
            <line key={`r-${i}`} x1="1150" y1={y} x2="1250" y2={y} stroke="currentColor" strokeWidth="0.5" className="text-muted-foreground" />
          ))}
        </svg>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto text-center">
        {/* Glass card for hero content */}
        <div className="glass rounded-3xl p-10 md:p-16 animate-fade-in">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-primary leading-[1.1] tracking-tight mb-8">
            What's Your Cancer Risk?
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground font-medium max-w-2xl mx-auto mb-10 leading-relaxed">
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

          {/* Subtle trust indicator */}
          <p className="mt-8 text-sm text-muted-foreground/70">
            Free • Private • No account required
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
