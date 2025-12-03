import { useState, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
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
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-terracotta flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-4 h-4 text-white" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                </svg>
              </div>
              <span className="text-lg font-semibold text-foreground">ArtemisAI</span>
            </Link>
            
            {/* Close button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
              className="text-muted-foreground hover:text-foreground"
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
