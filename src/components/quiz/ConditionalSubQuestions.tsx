import { cn } from "@/lib/utils";
import QuizOption from "./QuizOption";
import { familyHistorySubQuestions } from "@/data/quizQuestions";

interface ConditionalSubQuestionsProps {
  isExpanded: boolean;
  answers: Record<string, string>;
  onSelectAnswer: (questionId: string, answerId: string) => void;
  isDark?: boolean;
}

const ConditionalSubQuestions = ({
  isExpanded,
  answers,
  onSelectAnswer,
  isDark = false,
}: ConditionalSubQuestionsProps) => {
  const { cancerType, cancerAge } = familyHistorySubQuestions;

  return (
    <div
      className={cn(
        "overflow-hidden transition-all duration-400 ease-out",
        isExpanded ? "max-h-[800px] opacity-100 mt-8" : "max-h-0 opacity-0 mt-0"
      )}
    >
      <div className="space-y-8">
        {/* Q2A: Cancer Type */}
        <div className="animate-fade-in">
          <h3 className={cn(
            "font-display text-xl md:text-2xl leading-tight mb-2",
            isDark ? "text-white" : "text-foreground"
          )}>
            {cancerType.text}
          </h3>
          <p className={cn(
            "text-sm italic leading-relaxed mb-4",
            isDark ? "text-white/60" : "text-muted-foreground"
          )}>
            {cancerType.subtext}
          </p>
          <div className="space-y-3">
            {cancerType.options.map((option) => (
              <QuizOption
                key={option.id}
                label={option.label}
                selected={answers[cancerType.id] === option.id}
                onClick={() => onSelectAnswer(cancerType.id, option.id)}
                isDark={isDark}
                isCompact
              />
            ))}
          </div>
        </div>

        {/* Q2B: Cancer Age */}
        <div className="animate-fade-in" style={{ animationDelay: "100ms" }}>
          <h3 className={cn(
            "font-display text-xl md:text-2xl leading-tight mb-2",
            isDark ? "text-white" : "text-foreground"
          )}>
            {cancerAge.text}
          </h3>
          <p className={cn(
            "text-sm italic leading-relaxed mb-4",
            isDark ? "text-white/60" : "text-muted-foreground"
          )}>
            {cancerAge.subtext}
          </p>
          <div className="space-y-3">
            {cancerAge.options.map((option) => (
              <QuizOption
                key={option.id}
                label={option.label}
                selected={answers[cancerAge.id] === option.id}
                onClick={() => onSelectAnswer(cancerAge.id, option.id)}
                isDark={isDark}
                isCompact
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConditionalSubQuestions;
