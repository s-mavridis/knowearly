import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuizOptionProps {
  label: string;
  description?: string;
  selected: boolean;
  onClick: () => void;
}

const QuizOption = ({ label, description, selected, onClick }: QuizOptionProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "w-full min-h-[56px] px-5 py-4 rounded-xl border-2 text-left transition-all duration-200",
        "flex items-center justify-between gap-4",
        "hover:border-teal/50 hover:bg-teal/5",
        "focus:outline-none focus:ring-2 focus:ring-teal/30 focus:ring-offset-2",
        selected
          ? "border-teal bg-teal/10 shadow-sm"
          : "border-border bg-card"
      )}
    >
      <div className="flex-1">
        <span className={cn(
          "text-base font-medium transition-colors",
          selected ? "text-primary" : "text-foreground"
        )}>
          {label}
        </span>
        {description && (
          <p className="text-sm text-muted-foreground mt-0.5">{description}</p>
        )}
      </div>
      
      {/* Selection indicator */}
      <div className={cn(
        "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 shrink-0",
        selected
          ? "border-teal bg-teal"
          : "border-border bg-background"
      )}>
        {selected && <Check className="w-4 h-4 text-accent-foreground" />}
      </div>
    </button>
  );
};

export default QuizOption;
