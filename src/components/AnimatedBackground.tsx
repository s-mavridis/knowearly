import { cn } from "@/lib/utils";

interface AnimatedBackgroundProps {
  className?: string;
}

const AnimatedBackground = ({ className }: AnimatedBackgroundProps) => {
  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none z-0", className)}>
      {/* Base gradient - warm brown/charcoal like landing page */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #1c1917 0%, #292524 30%, #1c1917 60%, #171412 100%)',
        }}
      />
      
      {/* Teal/greenish gradient orbs - matching the DNA helix color */}
      <div 
        className="absolute w-[600px] h-[600px] rounded-full blur-[120px] animate-pulse-slow"
        style={{ 
          top: '-15%', 
          right: '-10%',
          background: 'radial-gradient(circle, rgba(45, 160, 155, 0.2) 0%, rgba(56, 178, 172, 0.1) 40%, transparent 70%)',
        }}
      />
      <div 
        className="absolute w-[500px] h-[500px] rounded-full blur-[100px] animate-pulse-slower"
        style={{ 
          bottom: '5%', 
          left: '-15%',
          background: 'radial-gradient(circle, rgba(45, 160, 155, 0.12) 0%, transparent 70%)',
        }}
      />
      <div 
        className="absolute w-[300px] h-[300px] rounded-full blur-[80px] animate-pulse-slow"
        style={{ 
          top: '50%', 
          right: '30%',
          background: 'radial-gradient(circle, rgba(56, 178, 172, 0.08) 0%, transparent 70%)',
        }}
      />
      
      {/* Orange/terracotta glow accents */}
      <div 
        className="absolute w-[350px] h-[350px] rounded-full blur-[80px] animate-pulse-slow"
        style={{ 
          top: '15%', 
          left: '5%',
          background: 'radial-gradient(circle, rgba(207, 92, 54, 0.2) 0%, transparent 70%)',
        }}
      />
      <div 
        className="absolute w-[280px] h-[280px] rounded-full blur-[70px] animate-pulse-slower"
        style={{ 
          bottom: '25%', 
          right: '10%',
          background: 'radial-gradient(circle, rgba(234, 115, 50, 0.15) 0%, transparent 70%)',
        }}
      />

      {/* Floating particles - orange/terracotta like the landing page */}
      <div 
        className="absolute w-3 h-3 rounded-full bg-orange-500/70 animate-particle-1"
        style={{ top: '12%', left: '18%' }}
      />
      <div 
        className="absolute w-2 h-2 rounded-full bg-orange-400/60 animate-particle-2"
        style={{ top: '28%', right: '22%' }}
      />
      <div 
        className="absolute w-4 h-4 rounded-full bg-orange-500/50 animate-particle-3"
        style={{ top: '42%', left: '6%' }}
      />
      <div 
        className="absolute w-2 h-2 rounded-full bg-orange-400/50 animate-particle-1"
        style={{ top: '55%', right: '8%' }}
      />
      <div 
        className="absolute w-3 h-3 rounded-full bg-orange-500/60 animate-particle-2"
        style={{ bottom: '30%', left: '25%' }}
      />
      <div 
        className="absolute w-2 h-2 rounded-full bg-orange-400/40 animate-particle-3"
        style={{ bottom: '40%', right: '30%' }}
      />
      <div 
        className="absolute w-3 h-3 rounded-full bg-orange-500/50 animate-particle-1"
        style={{ top: '38%', right: '12%' }}
      />
      <div 
        className="absolute w-2 h-2 rounded-full bg-orange-400/60 animate-particle-2"
        style={{ bottom: '18%', left: '12%' }}
      />
    </div>
  );
};

export default AnimatedBackground;
