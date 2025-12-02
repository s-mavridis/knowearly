import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import QuizProgress from "@/components/quiz/QuizProgress";
import QuizQuestion from "@/components/quiz/QuizQuestion";
import QuizNavigation from "@/components/quiz/QuizNavigation";
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
      // Navigate to results with answers
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

  const handleClose = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border/50 px-4 py-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-terracotta flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xs">A</span>
              </div>
              <span className="text-lg font-semibold text-primary">ArtemisAI</span>
            </div>
            
            {/* Close button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
              className="text-muted-foreground hover:text-primary"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Progress */}
          <QuizProgress
            currentQuestion={currentIndex + 1}
            totalQuestions={quizQuestions.length}
          />
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 px-4 py-8 pb-40">
        <div className="max-w-2xl mx-auto relative">
          {quizQuestions.map((question, index) => (
            <QuizQuestion
              key={question.id}
              question={question}
              selectedAnswer={answers[question.id] || null}
              onSelectAnswer={handleSelectAnswer}
              isVisible={index === currentIndex}
            />
          ))}
        </div>
      </main>

      {/* Navigation */}
      <QuizNavigation
        onBack={handleBack}
        onNext={handleNext}
        canGoBack={currentIndex > 0}
        canGoNext={!!selectedAnswer}
        isLastQuestion={isLastQuestion}
      />
    </div>
  );
};

export default Quiz;
