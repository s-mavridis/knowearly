import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface QuizNavigationProps {
  onBack: () => void;
  onNext: () => void;
  canGoBack: boolean;
  canGoNext: boolean;
  isLastQuestion: boolean;
}

const QuizNavigation = ({
  onBack,
  onNext,
  canGoBack,
  canGoNext,
  isLastQuestion,
}: QuizNavigationProps) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background via-background to-transparent pt-8">
      <div className="max-w-lg mx-auto flex flex-col gap-3">
        <Button
          variant="cta"
          size="lg"
          onClick={onNext}
          disabled={!canGoNext}
          className="w-full"
        >
          {isLastQuestion ? "See My Results" : "Next"}
          <ArrowRight className="w-5 h-5 ml-1" />
        </Button>
        
        {canGoBack && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="text-muted-foreground hover:text-primary mx-auto"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back
          </Button>
        )}
      </div>
    </div>
  );
};

export default QuizNavigation;
