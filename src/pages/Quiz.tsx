import { useState, useCallback, useMemo, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import QuizProgress from "@/components/quiz/QuizProgress";
import QuizQuestion from "@/components/quiz/QuizQuestion";
import QuizNavigation from "@/components/quiz/QuizNavigation";
import QuizVisual from "@/components/quiz/QuizVisual";
import { quizQuestions, familyHistorySubQuestions } from "@/data/quizQuestions";
import { initSession, track, trackPageView, saveQuizSnapshot } from "@/lib/analytics";

const Quiz = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const startedAtRef = useRef<number | null>(null);

  // Build dynamic question list based on answers
  const allQuestions = useMemo(() => {
    const hasFamilyHistory = answers["family-cancer"] === "yes-one" || answers["family-cancer"] === "yes-multiple";
    
    // Insert sub-questions after family-cancer question if user answered yes
    const familyCancerIndex = quizQuestions.findIndex(q => q.id === "family-cancer");
    
    if (hasFamilyHistory) {
      return [
        ...quizQuestions.slice(0, familyCancerIndex + 1),
        ...familyHistorySubQuestions,
        ...quizQuestions.slice(familyCancerIndex + 1),
      ];
    }
    
    return quizQuestions;
  }, [answers]);

  const currentQuestion = allQuestions[currentIndex];
  const selectedAnswer = currentQuestion ? answers[currentQuestion.id] || null : null;
  const isLastQuestion = currentIndex === allQuestions.length - 1;
  const totalQuestions = allQuestions.length;

  // Clear sub-question answers when switching away from "yes"
  useEffect(() => {
    const hasFamilyHistory = answers["family-cancer"] === "yes-one" || answers["family-cancer"] === "yes-multiple";
    if (!hasFamilyHistory) {
      setAnswers((prev) => {
        const newAnswers = { ...prev };
        delete newAnswers["cancer-type"];
        delete newAnswers["cancer-age"];
        return newAnswers;
      });
    }
  }, [answers["family-cancer"]]);

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
    return !!selectedAnswer;
  }, [selectedAnswer]);

  const handleSelectAnswer = useCallback((answerId: string) => {
    if (!currentQuestion) return;
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: answerId,
    }));
  }, [currentQuestion]);

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
      // Navigate to email capture before results
      navigate("/email-capture", { state: { answers } });
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  }, [isLastQuestion, navigate, answers]);

  const handleBack = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  }, [currentIndex]);

  // Get visual index - for sub-questions, show same visual as family-cancer question
  const getVisualIndex = useCallback(() => {
    const isSubQuestion = familyHistorySubQuestions.some(q => q.id === currentQuestion?.id);
    if (isSubQuestion) {
      return quizQuestions.findIndex(q => q.id === "family-cancer");
    }
    // Map current question to its position in base questions
    const baseIndex = quizQuestions.findIndex(q => q.id === currentQuestion?.id);
    return baseIndex >= 0 ? baseIndex : 0;
  }, [currentQuestion]);

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
              {allQuestions.map((question, index) => (
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

            {/* Right column - Premium visual (hidden on mobile) */}
            <div className="hidden lg:block w-full min-h-[520px]">
              <QuizVisual
                questionIndex={getVisualIndex()}
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
