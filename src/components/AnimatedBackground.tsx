import { cn } from "@/lib/utils";

interface AnimatedBackgroundProps {
  className?: string;
}

const AnimatedBackground = ({ className }: AnimatedBackgroundProps) => {
  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      {/* Floating particles */}
      <div 
        className="absolute w-2 h-2 rounded-full bg-white/[0.06] animate-particle-1"
        style={{ top: '15%', left: '20%' }}
      />
      <div 
        className="absolute w-3 h-3 rounded-full bg-white/[0.04] animate-particle-2"
        style={{ top: '55%', right: '15%' }}
      />
      <div 
        className="absolute w-2 h-2 rounded-full bg-white/[0.05] animate-particle-3"
        style={{ top: '35%', left: '70%' }}
      />
      <div 
        className="absolute w-1.5 h-1.5 rounded-full bg-white/[0.06] animate-particle-1"
        style={{ bottom: '25%', left: '10%' }}
      />
      <div 
        className="absolute w-2.5 h-2.5 rounded-full bg-white/[0.04] animate-particle-2"
        style={{ bottom: '15%', right: '30%' }}
      />
      <div 
        className="absolute w-1.5 h-1.5 rounded-full bg-white/[0.05] animate-particle-3"
        style={{ top: '70%', left: '45%' }}
      />
      <div 
        className="absolute w-2 h-2 rounded-full bg-white/[0.04] animate-particle-1"
        style={{ top: '25%', right: '40%' }}
      />

      {/* Subtle gradient orbs */}
      <div 
        className="absolute w-[300px] h-[300px] rounded-full bg-terracotta/[0.03] blur-3xl animate-pulse-slow"
        style={{ top: '-10%', right: '-5%' }}
      />
      <div 
        className="absolute w-[250px] h-[250px] rounded-full bg-white/[0.02] blur-3xl animate-pulse-slower"
        style={{ bottom: '-5%', left: '-5%' }}
      />
      <div 
        className="absolute w-[200px] h-[200px] rounded-full bg-terracotta/[0.02] blur-3xl animate-pulse-slower"
        style={{ top: '40%', left: '30%' }}
      />
    </div>
  );
};

export default AnimatedBackground;
