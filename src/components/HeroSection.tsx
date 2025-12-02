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
        <div className="absolute top-20 right-10 w-96 h-96 bg-teal/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-teal/3 to-primary/3 rounded-full blur-3xl" />
        
        {/* DNA helix abstract representation */}
        <svg 
          className="absolute right-0 top-1/4 w-1/3 h-1/2 opacity-[0.03]" 
          viewBox="0 0 200 400" 
          fill="none"
        >
          <path 
            d="M50 0 Q100 50 150 0 Q100 100 50 100 Q100 150 150 100 Q100 200 50 200 Q100 250 150 200 Q100 300 50 300 Q100 350 150 300 Q100 400 50 400" 
            stroke="currentColor" 
            strokeWidth="2" 
            className="text-primary"
          />
          <path 
            d="M150 0 Q100 50 50 0 Q100 100 150 100 Q100 150 50 100 Q100 200 150 200 Q100 250 50 200 Q100 300 150 300 Q100 350 50 300 Q100 400 150 400" 
            stroke="currentColor" 
            strokeWidth="2" 
            className="text-teal"
          />
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
          >
            Check Your Risk
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
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
