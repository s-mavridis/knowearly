import { cn } from "@/lib/utils";

interface QuizProgressProps {
  currentQuestion: number;
  totalQuestions: number;
  isDark?: boolean;
}

const QuizProgress = ({ currentQuestion, totalQuestions, isDark = true }: QuizProgressProps) => {
  const progress = (currentQuestion / totalQuestions) * 100;

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      {/* Progress bar track */}
      <div className="w-full h-1.5 bg-border">
        {/* Progress bar fill with glow */}
        <div
          className={cn(
            "h-full bg-terracotta transition-all duration-500 ease-out relative",
            "shadow-[0_0_10px_rgba(255,107,53,0.5),0_0_20px_rgba(255,107,53,0.3)]"
          )}
          style={{ width: `${progress}%` }}
        >
          {/* Glow pulse at the end */}
          <div 
            className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-terracotta animate-pulse"
            style={{
              boxShadow: '0 0 12px 4px rgba(255, 107, 53, 0.6)',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default QuizProgress;
