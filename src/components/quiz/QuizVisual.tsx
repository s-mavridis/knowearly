import { cn } from "@/lib/utils";
import quizVisual1 from "@/assets/quiz-visual-1.png";
import quizVisual2 from "@/assets/quiz-visual-2.png";
import quizVisual3 from "@/assets/quiz-visual-3.png";

const visuals = [quizVisual1, quizVisual2, quizVisual3];

interface QuizVisualProps {
  questionIndex: number;
  isVisible: boolean;
}

const QuizVisual = ({ questionIndex, isVisible }: QuizVisualProps) => {
  const visualIndex = questionIndex % visuals.length;
  const visual = visuals[visualIndex];

  return (
    <div
      className={cn(
        "relative w-full h-full rounded-3xl overflow-hidden transition-all duration-700",
        isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
      )}
    >
      {/* Premium image with animation */}
      <div className="absolute inset-0">
        <img
          src={visual}
          alt=""
          className="w-full h-full object-cover animate-slow-zoom"
        />
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
      </div>

      {/* Floating glass card - top right */}
      <div 
        className={cn(
          "absolute top-6 right-6 transition-all duration-1000 delay-300",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        )}
      >
        <div className="w-3 h-3 rounded-full bg-white/80 border-2 border-white/40 shadow-lg animate-pulse" />
      </div>

      {/* Floating glass card - center */}
      <div 
        className={cn(
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 delay-500",
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
        )}
      >
        <div className="px-8 py-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl">
          <div className="text-center">
            <span className="text-5xl md:text-6xl font-light text-white tracking-tight">
              {questionIndex + 1}
            </span>
            <span className="text-2xl md:text-3xl text-white/60 ml-1">/5</span>
          </div>
          <p className="text-white/70 text-sm mt-2 text-center">Questions</p>
        </div>
      </div>

      {/* Decorative curved line with dots */}
      <svg
        className={cn(
          "absolute inset-0 w-full h-full pointer-events-none transition-all duration-1000 delay-700",
          isVisible ? "opacity-100" : "opacity-0"
        )}
        viewBox="0 0 400 300"
        preserveAspectRatio="none"
      >
        <path
          d="M50,200 Q150,100 250,180 T380,120"
          fill="none"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="2"
          className="animate-draw-line"
        />
        {/* Dots along the path */}
        <circle cx="50" cy="200" r="6" fill="white" fillOpacity="0.6" className="animate-pulse" />
        <circle cx="380" cy="120" r="6" fill="white" fillOpacity="0.6" className="animate-pulse delay-200" />
      </svg>

      {/* Bottom floating element */}
      <div 
        className={cn(
          "absolute bottom-6 left-1/2 -translate-x-1/2 transition-all duration-1000 delay-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}
      >
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
          <div className="w-2 h-2 rounded-full bg-sage animate-pulse" />
          <span className="text-white/70 text-xs font-medium">Personalized Assessment</span>
        </div>
      </div>

      {/* Timeline markers at bottom */}
      <div 
        className={cn(
          "absolute bottom-0 left-0 right-0 flex justify-center gap-1.5 pb-16 transition-all duration-1000 delay-500",
          isVisible ? "opacity-100" : "opacity-0"
        )}
      >
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className={cn(
              "w-0.5 transition-all duration-300",
              i < (questionIndex + 1) * 2 ? "h-4 bg-white/60" : "h-2 bg-white/30"
            )}
            style={{ animationDelay: `${i * 50}ms` }}
          />
        ))}
      </div>
    </div>
  );
};

export default QuizVisual;
