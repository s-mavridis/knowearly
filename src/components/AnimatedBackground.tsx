import { cn } from "@/lib/utils";

interface AnimatedBackgroundProps {
  className?: string;
}

const AnimatedBackground = ({ className }: AnimatedBackgroundProps) => {
  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      {/* Floating circles - clearly visible */}
      <div 
        className="absolute w-8 h-8 rounded-full bg-white/20 blur-sm animate-particle-1"
        style={{ top: '15%', left: '15%' }}
      />
      <div 
        className="absolute w-12 h-12 rounded-full bg-white/15 blur-sm animate-particle-2"
        style={{ top: '50%', right: '10%' }}
      />
      <div 
        className="absolute w-10 h-10 rounded-full bg-white/15 blur-sm animate-particle-3"
        style={{ top: '30%', left: '75%' }}
      />
      <div 
        className="absolute w-6 h-6 rounded-full bg-white/20 blur-sm animate-particle-1"
        style={{ bottom: '20%', left: '8%' }}
      />
      <div 
        className="absolute w-10 h-10 rounded-full bg-white/15 blur-sm animate-particle-2"
        style={{ bottom: '25%', right: '20%' }}
      />
      <div 
        className="absolute w-8 h-8 rounded-full bg-white/15 blur-sm animate-particle-3"
        style={{ top: '65%', left: '40%' }}
      />
      <div 
        className="absolute w-6 h-6 rounded-full bg-white/20 blur-sm animate-particle-1"
        style={{ top: '20%', right: '35%' }}
      />
      <div 
        className="absolute w-8 h-8 rounded-full bg-white/15 blur-sm animate-particle-2"
        style={{ top: '75%', left: '20%' }}
      />

      {/* Larger gradient orbs for atmosphere */}
      <div 
        className="absolute w-[500px] h-[500px] rounded-full bg-terracotta/10 blur-[100px] animate-pulse-slow"
        style={{ top: '-20%', right: '-15%' }}
      />
      <div 
        className="absolute w-[400px] h-[400px] rounded-full bg-white/[0.08] blur-[80px] animate-pulse-slower"
        style={{ bottom: '-15%', left: '-15%' }}
      />
    </div>
  );
};

export default AnimatedBackground;
