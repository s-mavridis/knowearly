import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuizNavigationProps {
  onNext: () => void;
  canGoNext: boolean;
  isLastQuestion: boolean;
  isDark?: boolean;
}

const QuizNavigation = ({
  onNext,
  canGoNext,
  isLastQuestion,
  isDark = true,
}: QuizNavigationProps) => {
  return (
    <div className={cn(
      "fixed bottom-0 left-0 right-0 p-6 pb-8",
      "bg-gradient-to-t",
      isDark 
        ? "from-quiz-dark via-quiz-dark/90 to-transparent" 
        : "from-quiz-light via-quiz-light/90 to-transparent"
    )}>
      <div className="max-w-xl mx-auto flex justify-center">
        <button
          onClick={onNext}
          disabled={!canGoNext}
          className={cn(
            "w-full md:w-[200px] h-14 md:h-[60px] rounded-full font-semibold text-lg",
            "flex items-center justify-center gap-2",
            "transition-all duration-200",
            "focus:outline-none focus:ring-3 focus:ring-terracotta/50 focus:ring-offset-2",
            canGoNext && [
              "bg-terracotta text-white",
              "hover:bg-terracotta-light hover:-translate-y-1 hover:scale-[1.02]",
              "hover:shadow-[0_8px_30px_rgba(255,107,53,0.4)]",
              "active:translate-y-0 active:scale-100"
            ],
            !canGoNext && [
              "bg-gray-400 text-gray-600 cursor-not-allowed",
              "opacity-60"
            ]
          )}
        >
          {isLastQuestion ? "See My Results" : "Continue"}
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default QuizNavigation;
