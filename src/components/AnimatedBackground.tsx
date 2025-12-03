import { cn } from "@/lib/utils";

interface AnimatedBackgroundProps {
  className?: string;
}

const AnimatedBackground = ({ className }: AnimatedBackgroundProps) => {
  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      {/* Floating DNA helix strands */}
      <div className="absolute inset-0">
        {/* Strand 1 */}
        <svg
          className="absolute w-[200px] h-[400px] opacity-[0.04] animate-float-slow"
          style={{ top: '10%', left: '5%' }}
          viewBox="0 0 100 200"
          fill="none"
        >
          <path
            d="M50 0 C50 20 30 40 30 60 S50 100 50 120 S30 160 30 180 S50 200 50 200"
            stroke="currentColor"
            strokeWidth="2"
            className="text-white"
          />
          <path
            d="M50 0 C50 20 70 40 70 60 S50 100 50 120 S70 160 70 180 S50 200 50 200"
            stroke="currentColor"
            strokeWidth="2"
            className="text-white"
          />
          {/* Connecting bars */}
          {[20, 60, 100, 140, 180].map((y) => (
            <line
              key={y}
              x1="30"
              y1={y}
              x2="70"
              y2={y}
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-white"
            />
          ))}
        </svg>

        {/* Strand 2 */}
        <svg
          className="absolute w-[150px] h-[300px] opacity-[0.03] animate-float-reverse"
          style={{ top: '30%', right: '10%' }}
          viewBox="0 0 100 200"
          fill="none"
        >
          <path
            d="M50 0 C50 20 30 40 30 60 S50 100 50 120 S30 160 30 180 S50 200 50 200"
            stroke="currentColor"
            strokeWidth="2"
            className="text-white"
          />
          <path
            d="M50 0 C50 20 70 40 70 60 S50 100 50 120 S70 160 70 180 S50 200 50 200"
            stroke="currentColor"
            strokeWidth="2"
            className="text-white"
          />
          {[20, 60, 100, 140, 180].map((y) => (
            <line
              key={y}
              x1="30"
              y1={y}
              x2="70"
              y2={y}
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-white"
            />
          ))}
        </svg>

        {/* Strand 3 */}
        <svg
          className="absolute w-[180px] h-[360px] opacity-[0.025] animate-float-slow"
          style={{ bottom: '5%', left: '20%' }}
          viewBox="0 0 100 200"
          fill="none"
        >
          <path
            d="M50 0 C50 20 30 40 30 60 S50 100 50 120 S30 160 30 180 S50 200 50 200"
            stroke="currentColor"
            strokeWidth="2"
            className="text-white"
          />
          <path
            d="M50 0 C50 20 70 40 70 60 S50 100 50 120 S70 160 70 180 S50 200 50 200"
            stroke="currentColor"
            strokeWidth="2"
            className="text-white"
          />
          {[20, 60, 100, 140, 180].map((y) => (
            <line
              key={y}
              x1="30"
              y1={y}
              x2="70"
              y2={y}
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-white"
            />
          ))}
        </svg>

        {/* Floating particles */}
        <div 
          className="absolute w-2 h-2 rounded-full bg-white/[0.06] animate-particle-1"
          style={{ top: '20%', left: '30%' }}
        />
        <div 
          className="absolute w-3 h-3 rounded-full bg-white/[0.04] animate-particle-2"
          style={{ top: '60%', right: '25%' }}
        />
        <div 
          className="absolute w-2 h-2 rounded-full bg-white/[0.05] animate-particle-3"
          style={{ top: '40%', left: '60%' }}
        />
        <div 
          className="absolute w-1.5 h-1.5 rounded-full bg-white/[0.06] animate-particle-1"
          style={{ bottom: '30%', left: '15%' }}
        />
        <div 
          className="absolute w-2.5 h-2.5 rounded-full bg-white/[0.04] animate-particle-2"
          style={{ bottom: '20%', right: '40%' }}
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
      </div>
    </div>
  );
};

export default AnimatedBackground;
