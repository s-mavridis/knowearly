import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import resultsBanner1 from "@/assets/results-banner-1.png";
import resultsBanner2 from "@/assets/results-banner-2.png";

const banners = {
  teal: resultsBanner1,
  copper: resultsBanner2,
};

interface GlassCard {
  title: string;
  description?: string;
  status?: "positive" | "negative" | "neutral";
  position: "left" | "center" | "right";
}

interface PremiumBannerProps {
  variant?: "teal" | "copper";
  headline: string;
  headlineAccent?: string;
  glassCards?: GlassCard[];
  className?: string;
}

const PremiumBanner = ({
  variant = "copper",
  headline,
  headlineAccent,
  glassCards = [],
  className,
}: PremiumBannerProps) => {
  return (
    <div
      className={cn(
        "relative w-full rounded-3xl overflow-hidden",
        className
      )}
    >
      {/* Background image with slow zoom animation */}
      <div className="absolute inset-0">
        <img
          src={banners[variant]}
          alt=""
          className="w-full h-full object-cover animate-slow-zoom"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 px-8 md:px-16 py-16 md:py-24 min-h-[400px] flex flex-col justify-center">
        {/* Main headline */}
        <h2 className="font-display text-3xl md:text-5xl lg:text-6xl text-white text-center max-w-4xl mx-auto leading-tight">
          {headline}
          {headlineAccent && (
            <>
              {" "}
              <span className="italic text-white/80">{headlineAccent}</span>
            </>
          )}
        </h2>

        {/* Glass cards row */}
        {glassCards.length > 0 && (
          <div className="flex flex-wrap justify-center gap-4 mt-12">
            {glassCards.map((card, index) => (
              <div
                key={index}
                className={cn(
                  "px-6 py-4 rounded-xl backdrop-blur-md border border-white/20 transition-all duration-500",
                  "bg-white/10 hover:bg-white/15",
                  "animate-fade-in"
                )}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="flex items-center gap-3">
                  {card.status && (
                    <div
                      className={cn(
                        "px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5",
                        card.status === "positive" && "bg-sage/20 text-sage-light",
                        card.status === "negative" && "bg-terracotta/20 text-terracotta-light",
                        card.status === "neutral" && "bg-white/20 text-white/80"
                      )}
                    >
                      <span className={cn(
                        "w-1.5 h-1.5 rounded-full",
                        card.status === "positive" && "bg-sage",
                        card.status === "negative" && "bg-terracotta",
                        card.status === "neutral" && "bg-white/60"
                      )} />
                      {card.status === "positive" ? "Included" : card.status === "negative" ? "Attention" : "Info"}
                    </div>
                  )}
                </div>
                <h3 className="text-white font-semibold text-lg mt-2">{card.title}</h3>
                {card.description && (
                  <p className="text-white/60 text-sm mt-1 max-w-[200px]">
                    {card.description}
                  </p>
                )}
                {card.status === "positive" && (
                  <div className="flex items-center gap-2 mt-3 text-white/50 text-xs">
                    <Check className="w-3.5 h-3.5" />
                    <span>Included</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Decorative floating elements */}
      <div className="absolute top-6 right-6 w-3 h-3 rounded-full bg-white/30 animate-pulse" />
      <div className="absolute bottom-6 left-6 w-2 h-2 rounded-full bg-white/20 animate-pulse delay-300" />
      
      {/* Decorative line with dots */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
        viewBox="0 0 800 400"
        preserveAspectRatio="xMidYMid slice"
      >
        <path
          d="M50,350 Q200,200 400,280 T700,150"
          fill="none"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="1.5"
          className="animate-draw-line"
        />
        <circle cx="50" cy="350" r="5" fill="white" fillOpacity="0.5" className="animate-pulse" />
        <circle cx="700" cy="150" r="5" fill="white" fillOpacity="0.5" className="animate-pulse" />
      </svg>

      {/* Bottom timeline markers */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className={cn(
              "w-0.5 bg-white/40 transition-all",
              i % 3 === 0 ? "h-3" : "h-1.5"
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default PremiumBanner;
