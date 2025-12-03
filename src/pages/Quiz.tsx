import { useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import QuizProgress from "@/components/quiz/QuizProgress";
import QuizQuestion from "@/components/quiz/QuizQuestion";
import QuizNavigation from "@/components/quiz/QuizNavigation";
import QuizVisual from "@/components/quiz/QuizVisual";
import { quizQuestions } from "@/data/quizQuestions";

// Questions that should be skipped if user has no family cancer history
const FAMILY_CANCER_FOLLOWUP_QUESTIONS = ["cancer-age", "cancer-type"];

const Quiz = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  // Filter questions based on answers - skip follow-up questions if no family history
  const activeQuestions = useMemo(() => {
    const familyCancerAnswer = answers["family-cancer"];
    const hasNoFamilyCancer = familyCancerAnswer === "no" || familyCancerAnswer === "unsure";
    
    if (hasNoFamilyCancer) {
      return quizQuestions.filter(q => !FAMILY_CANCER_FOLLOWUP_QUESTIONS.includes(q.id));
    }
    return quizQuestions;
  }, [answers]);

  const currentQuestion = activeQuestions[currentIndex];
  const selectedAnswer = currentQuestion ? answers[currentQuestion.id] || null : null;
  const isLastQuestion = currentIndex === activeQuestions.length - 1;

  const handleSelectAnswer = useCallback((answerId: string) => {
    if (!currentQuestion) return;
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: answerId,
    }));
  }, [currentQuestion]);

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
        totalQuestions={activeQuestions.length}
        isDark={false}
      />

      {/* Header with question counter and back button */}
      <header className="relative z-10 px-6 pt-8 pb-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Question counter - top left - terracotta color like reference */}
          <span className="text-sm tracking-wide font-semibold text-primary">
            Question {currentIndex + 1} of {activeQuestions.length}
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
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-8 lg:gap-12">
            {/* Left column - Quiz content - fixed height */}
            <div className="relative w-full h-[520px]">
              {activeQuestions.map((question, index) => (
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

            {/* Right column - Premium visual (hidden on mobile) - fixed height */}
            <div className="hidden lg:block w-full h-[520px]">
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
