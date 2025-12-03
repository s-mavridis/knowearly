import { cn } from "@/lib/utils";

interface AnimatedBackgroundProps {
  className?: string;
}

const AnimatedBackground = ({ className }: AnimatedBackgroundProps) => {
  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none z-0", className)}>
      {/* Base gradient to mimic landing page colors */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #1a1f2e 0%, #2d3748 40%, #1e2530 70%, #1a1f2e 100%)',
        }}
      />
      
      {/* Teal/cyan gradient orbs */}
      <div 
        className="absolute w-[600px] h-[600px] rounded-full blur-[120px] animate-pulse-slow"
        style={{ 
          top: '-10%', 
          right: '-15%',
          background: 'radial-gradient(circle, rgba(56, 178, 172, 0.15) 0%, transparent 70%)',
        }}
      />
      <div 
        className="absolute w-[400px] h-[400px] rounded-full blur-[100px] animate-pulse-slower"
        style={{ 
          bottom: '10%', 
          left: '-10%',
          background: 'radial-gradient(circle, rgba(56, 178, 172, 0.1) 0%, transparent 70%)',
        }}
      />
      
      {/* Orange/terracotta glow accents */}
      <div 
        className="absolute w-[300px] h-[300px] rounded-full blur-[80px] animate-pulse-slow"
        style={{ 
          top: '20%', 
          left: '10%',
          background: 'radial-gradient(circle, rgba(207, 92, 54, 0.2) 0%, transparent 70%)',
        }}
      />
      <div 
        className="absolute w-[250px] h-[250px] rounded-full blur-[60px] animate-pulse-slower"
        style={{ 
          bottom: '30%', 
          right: '20%',
          background: 'radial-gradient(circle, rgba(207, 92, 54, 0.15) 0%, transparent 70%)',
        }}
      />

      {/* Floating particles - mix of white and orange */}
      <div 
        className="absolute w-3 h-3 rounded-full bg-terracotta/60 animate-particle-1"
        style={{ top: '15%', left: '20%' }}
      />
      <div 
        className="absolute w-2 h-2 rounded-full bg-white/30 animate-particle-2"
        style={{ top: '25%', right: '25%' }}
      />
      <div 
        className="absolute w-4 h-4 rounded-full bg-terracotta/50 animate-particle-3"
        style={{ top: '45%', left: '8%' }}
      />
      <div 
        className="absolute w-2 h-2 rounded-full bg-white/25 animate-particle-1"
        style={{ top: '60%', right: '12%' }}
      />
      <div 
        className="absolute w-3 h-3 rounded-full bg-terracotta/40 animate-particle-2"
        style={{ bottom: '25%', left: '30%' }}
      />
      <div 
        className="absolute w-2 h-2 rounded-full bg-white/20 animate-particle-3"
        style={{ bottom: '35%', right: '35%' }}
      />
      <div 
        className="absolute w-3 h-3 rounded-full bg-terracotta/50 animate-particle-1"
        style={{ top: '35%', right: '8%' }}
      />
      <div 
        className="absolute w-2 h-2 rounded-full bg-white/25 animate-particle-2"
        style={{ bottom: '15%', left: '15%' }}
      />
    </div>
  );
};

export default AnimatedBackground;
