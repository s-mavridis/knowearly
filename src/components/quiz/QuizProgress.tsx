interface QuizProgressProps {
  currentQuestion: number;
  totalQuestions: number;
}

const QuizProgress = ({ currentQuestion, totalQuestions }: QuizProgressProps) => {
  const progress = ((currentQuestion) / totalQuestions) * 100;

  return (
    <div className="w-full">
      {/* Progress bar */}
      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-electric-blue rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      
      {/* Question indicator */}
      <p className="text-sm text-muted-foreground mt-3 text-center">
        Question {currentQuestion} of {totalQuestions}
      </p>
    </div>
  );
};

export default QuizProgress;
