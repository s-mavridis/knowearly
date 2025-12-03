import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuizOptionProps {
  label: string;
  description?: string;
  selected: boolean;
  onClick: () => void;
  isDark?: boolean;
  isYesNo?: boolean;
}

const QuizOption = ({ 
  label, 
  description, 
  selected, 
  onClick, 
  isDark = true,
  isYesNo = false 
}: QuizOptionProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        "w-full px-6 py-5 rounded-2xl text-left transition-all duration-200",
        "flex items-center justify-between gap-4",
        "focus:outline-none focus:ring-3 focus:ring-terracotta/50 focus:ring-offset-2",
        isYesNo ? "min-h-[56px] md:min-h-[70px]" : "min-h-[70px] md:min-h-[70px]",
        // Dark background styles
        isDark && !selected && [
          "bg-white/[0.08] border border-gray-600",
          "hover:bg-white/[0.12] hover:-translate-y-0.5 hover:shadow-lg"
        ],
        isDark && selected && [
          "bg-terracotta/15 border-[3px] border-terracotta",
          "shadow-[0_0_20px_rgba(255,107,53,0.2)]"
        ],
        // Light background styles
        !isDark && !selected && [
          "bg-white border border-gray-300",
          "hover:bg-gray-50 hover:-translate-y-0.5 hover:shadow-md"
        ],
        !isDark && selected && [
          "bg-orange-50 border-[3px] border-terracotta"
        ]
      )}
    >
      <div className="flex-1">
        <span className={cn(
          "text-base md:text-lg font-medium transition-colors",
          isDark && !selected && "text-gray-200",
          isDark && selected && "text-white",
          !isDark && !selected && "text-gray-700",
          !isDark && selected && "text-orange-900"
        )}>
          {label}
        </span>
        {description && (
          <p className={cn(
            "text-sm mt-1",
            isDark ? "text-gray-400" : "text-gray-500"
          )}>
            {description}
          </p>
        )}
      </div>
      
      {/* Selection indicator */}
      <div className={cn(
        "w-6 h-6 rounded-full flex items-center justify-center transition-all duration-100 shrink-0",
        selected 
          ? "bg-terracotta" 
          : cn(
              "border-2",
              isDark ? "border-gray-500 bg-transparent" : "border-gray-300 bg-white"
            )
      )}>
        {selected && <Check className="w-4 h-4 text-white" strokeWidth={3} />}
      </div>
    </button>
  );
};

export default QuizOption;
