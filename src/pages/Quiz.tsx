import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import QuizProgress from "@/components/quiz/QuizProgress";
import QuizQuestion from "@/components/quiz/QuizQuestion";
import QuizNavigation from "@/components/quiz/QuizNavigation";
import QuizVisual from "@/components/quiz/QuizVisual";
import { quizQuestions } from "@/data/quizQuestions";

const Quiz = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const currentQuestion = quizQuestions[currentIndex];
  const selectedAnswer = answers[currentQuestion.id] || null;
  const isLastQuestion = currentIndex === quizQuestions.length - 1;

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
    <div className="min-h-screen flex flex-col bg-background relative overflow-hidden">
      {/* Fixed Progress Bar at very top */}
      <QuizProgress
        currentQuestion={currentIndex + 1}
        totalQuestions={quizQuestions.length}
        isDark={false}
      />

      {/* Header with question counter and back button */}
      <header className="relative z-10 px-6 pt-8 pb-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Question counter - top left - terracotta color like reference */}
          <span className="text-sm uppercase tracking-widest font-semibold text-primary">
            Question {currentIndex + 1} · of {quizQuestions.length}
          </span>
          
          {/* Back button - top right */}
          {currentIndex > 0 && (
            <button
              onClick={handleBack}
              className="flex items-center gap-1 text-base font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
          )}
        </div>
      </header>

      {/* Main content - Two column layout */}
      <main className="flex-1 px-6 py-8 pb-40 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-8 lg:gap-12 items-stretch">
            {/* Left column - Quiz content */}
            <div className="relative w-full">
              {quizQuestions.map((question, index) => (
                <QuizQuestion
                  key={question.id}
                  question={question}
                  selectedAnswer={answers[question.id] || null}
                  onSelectAnswer={handleSelectAnswer}
                  isVisible={index === currentIndex}
                  isDark={false}
                />
              ))}
            </div>

            {/* Right column - Premium visual (hidden on mobile) - stretches to match left */}
            <div className="hidden lg:block w-full">
              <QuizVisual
                questionIndex={currentIndex}
                isVisible={true}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Navigation */}
      <QuizNavigation
        onNext={handleNext}
        canGoNext={!!selectedAnswer}
        isLastQuestion={isLastQuestion}
        isDark={false}
      />
    </div>
  );
};

export default Quiz;
