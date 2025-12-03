import { cn } from "@/lib/utils";

interface AnimatedBackgroundProps {
  className?: string;
}

const AnimatedBackground = ({ className }: AnimatedBackgroundProps) => {
  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none z-0", className)}>
      {/* Floating circles - no blur, higher opacity */}
      <div 
        className="absolute w-16 h-16 rounded-full bg-white/25 animate-particle-1"
        style={{ top: '10%', left: '10%' }}
      />
      <div 
        className="absolute w-20 h-20 rounded-full bg-white/20 animate-particle-2"
        style={{ top: '45%', right: '8%' }}
      />
      <div 
        className="absolute w-14 h-14 rounded-full bg-white/20 animate-particle-3"
        style={{ top: '25%', left: '80%' }}
      />
      <div 
        className="absolute w-12 h-12 rounded-full bg-white/25 animate-particle-1"
        style={{ bottom: '15%', left: '5%' }}
      />
      <div 
        className="absolute w-16 h-16 rounded-full bg-white/20 animate-particle-2"
        style={{ bottom: '20%', right: '15%' }}
      />
      <div 
        className="absolute w-10 h-10 rounded-full bg-white/20 animate-particle-3"
        style={{ top: '60%', left: '35%' }}
      />
      <div 
        className="absolute w-12 h-12 rounded-full bg-white/25 animate-particle-1"
        style={{ top: '15%', right: '30%' }}
      />
      <div 
        className="absolute w-14 h-14 rounded-full bg-white/20 animate-particle-2"
        style={{ top: '70%', left: '15%' }}
      />

      {/* Larger gradient orbs for atmosphere */}
      <div 
        className="absolute w-[500px] h-[500px] rounded-full bg-terracotta/15 blur-[100px] animate-pulse-slow"
        style={{ top: '-20%', right: '-15%' }}
      />
      <div 
        className="absolute w-[400px] h-[400px] rounded-full bg-white/10 blur-[80px] animate-pulse-slower"
        style={{ bottom: '-15%', left: '-15%' }}
      />
    </div>
  );
};

export default AnimatedBackground;
