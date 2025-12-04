import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuizOptionProps {
  label: string;
  description?: string;
  selected: boolean;
  onClick: () => void;
  isDark?: boolean;
  isYesNo?: boolean;
  isCompact?: boolean;
}

const QuizOption = ({ 
  label, 
  description, 
  selected, 
  onClick, 
  isDark = true,
  isYesNo = false,
  isCompact = false
}: QuizOptionProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        "w-full rounded-2xl text-left transition-all duration-200",
        "flex items-center justify-between gap-4",
        "focus:outline-none focus:ring-2 focus:ring-terracotta/50 focus:ring-offset-2",
        isCompact ? "px-5 py-4 min-h-[52px]" : "px-6 py-5",
        isYesNo ? "min-h-[56px] md:min-h-[70px]" : !isCompact && "min-h-[70px] md:min-h-[70px]",
        // Dark background styles (earth tone)
        isDark && !selected && [
          "bg-white/[0.08] border border-white/20",
          "hover:bg-white/[0.12] hover:-translate-y-0.5 hover:shadow-lg"
        ],
        isDark && selected && [
          "bg-terracotta/20 border-2 border-terracotta",
          "shadow-[0_0_20px_rgba(207,92,54,0.2)]"
        ],
        // Light background styles (cream)
        !isDark && !selected && [
          "bg-white border border-border",
          "hover:bg-sand-light hover:-translate-y-0.5 hover:shadow-md"
        ],
        !isDark && selected && [
          "bg-terracotta/10 border-2 border-terracotta"
        ]
      )}
    >
      <div className="flex-1">
        <span className={cn(
          "transition-colors",
          isCompact ? "text-base font-medium" : "text-base md:text-lg font-medium",
          isDark && !selected && "text-white/90",
          isDark && selected && "text-white",
          !isDark && !selected && "text-foreground",
          !isDark && selected && "text-foreground"
        )}>
          {label}
        </span>
        {description && (
          <p className={cn(
            "text-sm mt-1",
            isDark ? "text-white/50" : "text-muted-foreground"
          )}>
            {description}
          </p>
        )}
      </div>
      
      {/* Selection indicator */}
      <div className={cn(
        "rounded-full flex items-center justify-center transition-all duration-100 shrink-0",
        isCompact ? "w-5 h-5" : "w-6 h-6",
        selected 
          ? "bg-terracotta" 
          : cn(
              "border-2",
              isDark ? "border-white/30 bg-transparent" : "border-border bg-white"
            )
      )}>
        {selected && <Check className={cn(isCompact ? "w-3 h-3" : "w-4 h-4", "text-white")} strokeWidth={3} />}
      </div>
    </button>
  );
};

export default QuizOption;
