import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import QuizProgress from "@/components/quiz/QuizProgress";
import QuizQuestion from "@/components/quiz/QuizQuestion";
import QuizNavigation from "@/components/quiz/QuizNavigation";
import { quizQuestions } from "@/data/quizQuestions";
import { cn } from "@/lib/utils";

const Quiz = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const currentQuestion = quizQuestions[currentIndex];
  const selectedAnswer = answers[currentQuestion.id] || null;
  const isLastQuestion = currentIndex === quizQuestions.length - 1;
  
  // Determine if current question should have dark or light background
  // Odd indices (0, 2, 4) = dark, Even indices (1, 3) = light
  const isDarkBackground = currentIndex % 2 === 0;

  const handleSelectAnswer = useCallback((answerId: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: answerId,
    }));
  }, [currentQuestion.id]);

  const handleNext = useCallback(() => {
    if (isLastQuestion) {
      navigate("/results", { state: { answers } });
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  }, [isLastQuestion, navigate, answers]);

  const handleBack = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  }, [currentIndex]);

  return (
    <div 
      className={cn(
        "min-h-screen flex flex-col transition-colors duration-500 relative overflow-hidden",
        isDarkBackground ? "bg-earth" : "bg-background"
      )}
    >

      {/* Fixed Progress Bar at very top */}
      <QuizProgress
        currentQuestion={currentIndex + 1}
        totalQuestions={quizQuestions.length}
        isDark={isDarkBackground}
      />

      {/* Header with question counter and back button */}
      <header className="relative z-10 px-6 pt-8 pb-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          {/* Question counter - top left */}
          <span className={cn(
            "text-sm uppercase tracking-widest font-medium",
            isDarkBackground ? "text-white/60" : "text-muted-foreground"
          )}>
            Question {currentIndex + 1} of {quizQuestions.length}
          </span>
          
          {/* Back button - top right */}
          {currentIndex > 0 && (
            <button
              onClick={handleBack}
              className={cn(
                "flex items-center gap-1 text-base font-medium transition-colors duration-200",
                isDarkBackground 
                  ? "text-white/60 hover:text-white" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
          )}
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 px-6 py-8 pb-40 relative z-10">
        <div className="max-w-3xl mx-auto relative">
          {quizQuestions.map((question, index) => (
            <QuizQuestion
              key={question.id}
              question={question}
              selectedAnswer={answers[question.id] || null}
              onSelectAnswer={handleSelectAnswer}
              isVisible={index === currentIndex}
              isDark={index % 2 === 0}
            />
          ))}
        </div>
      </main>

      {/* Navigation */}
      <QuizNavigation
        onNext={handleNext}
        canGoNext={!!selectedAnswer}
        isLastQuestion={isLastQuestion}
        isDark={isDarkBackground}
      />
    </div>
  );
};

export default Quiz;
