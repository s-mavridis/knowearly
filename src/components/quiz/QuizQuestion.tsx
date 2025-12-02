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
}

interface QuizQuestionProps {
  question: Question;
  selectedAnswer: string | null;
  onSelectAnswer: (answerId: string) => void;
  isVisible: boolean;
}

const QuizQuestion = ({ 
  question, 
  selectedAnswer, 
  onSelectAnswer, 
  isVisible 
}: QuizQuestionProps) => {
  return (
    <div
      className={cn(
        "w-full transition-all duration-300 ease-out",
        isVisible 
          ? "opacity-100 translate-y-0" 
          : "opacity-0 translate-y-4 pointer-events-none absolute"
      )}
    >
      {/* Question text */}
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-[32px] font-semibold text-primary leading-tight mb-3">
          {question.text}
        </h2>
        {question.subtext && (
          <p className="text-base text-muted-foreground">{question.subtext}</p>
        )}
      </div>

      {/* Options */}
      <div className="space-y-3 max-w-lg mx-auto">
        {question.options.map((option) => (
          <QuizOption
            key={option.id}
            label={option.label}
            description={option.description}
            selected={selectedAnswer === option.id}
            onClick={() => onSelectAnswer(option.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default QuizQuestion;
