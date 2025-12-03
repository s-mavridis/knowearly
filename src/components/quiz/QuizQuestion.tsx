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
        "w-full h-[520px] flex flex-col transition-all duration-300 ease-out",
        isVisible 
          ? "opacity-100 translate-y-0" 
          : "opacity-0 translate-y-4 pointer-events-none absolute"
      )}
    >
      {/* Question text - fixed height area */}
      <div className="h-[180px] flex flex-col justify-start">
        <h2 className={cn(
          "font-display text-[28px] md:text-[36px] leading-tight mb-4",
          isDark ? "text-white" : "text-foreground"
        )}>
          {question.text}
        </h2>
        <p className={cn(
          "text-base md:text-lg italic leading-relaxed min-h-[28px]",
          isDark ? "text-white/60" : "text-muted-foreground"
        )}>
          {question.subtext || ""}
        </p>
      </div>

      {/* Options - fixed height area for up to 5 options */}
      <div className={cn(
        "flex-1",
        isYesNo 
          ? "grid grid-cols-1 md:grid-cols-2 gap-4 content-start" 
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
