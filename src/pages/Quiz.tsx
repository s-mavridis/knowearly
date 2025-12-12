import { useState, useCallback, useMemo, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import QuizProgress from "@/components/quiz/QuizProgress";
import QuizQuestion from "@/components/quiz/QuizQuestion";
import QuizNavigation from "@/components/quiz/QuizNavigation";
import QuizVisual from "@/components/quiz/QuizVisual";
import ConditionalSubQuestions from "@/components/quiz/ConditionalSubQuestions";
import { quizQuestions } from "@/data/quizQuestions";
import { initSession, track, trackPageView, saveQuizSnapshot } from "@/lib/analytics";

const Quiz = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const startedAtRef = useRef<number | null>(null);

  const currentQuestion = quizQuestions[currentIndex];
  const selectedAnswer = currentQuestion ? answers[currentQuestion.id] || null : null;
  const isLastQuestion = currentIndex === quizQuestions.length - 1;
  const totalQuestions = quizQuestions.length;

  // Check if family history question has a "yes" answer
  const hasFamilyHistory = answers["family-cancer"] === "yes-one" || answers["family-cancer"] === "yes-multiple";
  const showFamilySubQuestions = currentQuestion?.id === "family-cancer" && hasFamilyHistory;

  // Clear sub-question answers when switching away from "yes"
  useEffect(() => {
    if (currentQuestion?.id === "family-cancer" && !hasFamilyHistory) {
      setAnswers((prev) => {
        const newAnswers = { ...prev };
        delete newAnswers["cancer-type"];
        delete newAnswers["cancer-age"];
        return newAnswers;
      });
    }
  }, [hasFamilyHistory, currentQuestion?.id]);

  // Init analytics and mark quiz_start
  useEffect(() => {
    initSession();
    trackPageView("quiz");
    if (!startedAtRef.current) {
      startedAtRef.current = Date.now();
      track("quiz_start");
    }
  }, []);

  // Determine if user can proceed
  const canProceed = useMemo(() => {
    if (!selectedAnswer) return false;
    
    // For family history question with "yes" answers, require sub-questions
    if (currentQuestion?.id === "family-cancer" && hasFamilyHistory) {
      return !!answers["cancer-type"] && !!answers["cancer-age"];
    }
    
    return true;
  }, [selectedAnswer, currentQuestion?.id, hasFamilyHistory, answers]);

  const handleSelectAnswer = useCallback((answerId: string) => {
    if (!currentQuestion) return;
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: answerId,
    }));
  }, [currentQuestion]);

  const handleSelectSubAnswer = useCallback((questionId: string, answerId: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answerId,
    }));
  }, []);

  const handleNext = useCallback(() => {
    if (isLastQuestion) {
      const completedAt = Date.now();
      const startedAt = startedAtRef.current || completedAt;
      // Persist snapshot locally (no backend yet)
      saveQuizSnapshot({ answers, startedAt, completedAt });
      track("quiz_complete", {
        duration_ms: completedAt - startedAt,
        num_answers: Object.keys(answers).length,
      });
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
        totalQuestions={totalQuestions}
        isDark={false}
      />

      {/* Header with question counter and back button */}
      <header className="relative z-10 px-6 pt-8 pb-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Question counter - top left - terracotta color like reference */}
          <span className="text-sm tracking-wide font-semibold text-primary">
            Question {currentIndex + 1} of {totalQuestions}
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
      <main className="flex-1 px-6 py-8 pb-40 relative z-10 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-8 lg:gap-12">
            {/* Left column - Quiz content */}
            <div className="relative w-full min-h-[520px]">
              {quizQuestions.map((question, index) => (
                <div key={question.id}>
                  <QuizQuestion
                    question={question}
                    selectedAnswer={answers[question.id] || null}
                    onSelectAnswer={handleSelectAnswer}
                    isVisible={index === currentIndex}
                    isDark={false}
                  />
                  {/* Conditional sub-questions for family history */}
                  {question.id === "family-cancer" && index === currentIndex && (
                    <ConditionalSubQuestions
                      isExpanded={showFamilySubQuestions}
                      answers={answers}
                      onSelectAnswer={handleSelectSubAnswer}
                      isDark={false}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Right column - Premium visual (hidden on mobile) */}
            <div className="hidden lg:block w-full min-h-[520px]">
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
        canGoNext={canProceed}
        isLastQuestion={isLastQuestion}
        isDark={false}
      />
    </div>
  );
};

export default Quiz;
