import { cn } from "@/lib/utils";
import QuizOption from "./QuizOption";

export interface QuestionOption {
  id: string;
  label: string;
  description?: string;
}

export interface Question {
  id: string;
  text: string;
  subtext?: string;
  options: QuestionOption[];
  isYesNo?: boolean;
}

interface QuizQuestionProps {
  question: Question;
  selectedAnswer: string | null;
  onSelectAnswer: (answerId: string) => void;
  isVisible: boolean;
  isDark?: boolean;
}

const QuizQuestion = ({ 
  question, 
  selectedAnswer, 
  onSelectAnswer, 
  isVisible,
  isDark = true
}: QuizQuestionProps) => {
  // Detect if this is a yes/no question (2 options with yes/no type answers)
  const isYesNo = question.isYesNo || (
    question.options.length === 2 && 
    question.options.some(o => o.id.toLowerCase().includes('yes') || o.label.toLowerCase().includes('yes'))
  );

  return (
    <div
      className={cn(
        "w-full transition-all duration-300 ease-out",
        isVisible 
          ? "opacity-100 translate-y-0" 
          : "opacity-0 translate-y-4 pointer-events-none absolute"
      )}
    >
      {/* Question text - positioned in upper third */}
      <div className="text-center mb-12 md:mb-16">
        <h2 className={cn(
          "font-display text-[28px] md:text-[42px] leading-tight mb-4 max-w-[700px] mx-auto",
          isDark ? "text-white" : "text-foreground"
        )}>
          {question.text}
        </h2>
        {question.subtext && (
          <p className={cn(
            "text-base md:text-lg italic leading-relaxed max-w-[600px] mx-auto",
            isDark ? "text-white/60" : "text-muted-foreground"
          )}>
            {question.subtext}
          </p>
        )}
      </div>

      {/* Options */}
      <div className={cn(
        "max-w-xl mx-auto",
        isYesNo 
          ? "grid grid-cols-1 md:grid-cols-2 gap-4" 
          : "space-y-4"
      )}>
        {question.options.map((option) => (
          <QuizOption
            key={option.id}
            label={option.label}
            description={option.description}
            selected={selectedAnswer === option.id}
            onClick={() => onSelectAnswer(option.id)}
            isDark={isDark}
            isYesNo={isYesNo}
          />
        ))}
      </div>
    </div>
  );
};

export default QuizQuestion;
