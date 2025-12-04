import { cn } from "@/lib/utils";
import quizVisual1 from "@/assets/quiz-visual-1.jpg";
import quizVisual2 from "@/assets/quiz-visual-2.jpg";
import quizVisual3 from "@/assets/quiz-visual-3.jpg";
import quizVisual4 from "@/assets/quiz-visual-4.jpg";
import quizVisual5 from "@/assets/quiz-visual-5.jpg";

// Cycle through visuals for 7 questions
const visuals = [quizVisual1, quizVisual2, quizVisual3, quizVisual4, quizVisual5, quizVisual1, quizVisual2];

// Explanations for why we ask each question (7 questions total)
const questionExplanations = [
  {
    title: "Age and Cancer Risk",
    description: "Cancer risk increases with age. Your age helps determine which screenings are most appropriate and when they should begin based on established guidelines."
  },
  {
    title: "Family History Matters",
    description: "Hereditary factors account for 5-10% of all cancers. Understanding your family history helps identify inherited genetic mutations that may increase your risk."
  },
  {
    title: "Age at Diagnosis",
    description: "Cancer diagnosed before age 50 often indicates a stronger genetic component. Earlier onset in family members may suggest inherited cancer syndromes."
  },
  {
    title: "Cancer Type Patterns",
    description: "Certain cancers cluster in families due to shared genetic mutations. BRCA genes affect breast and ovarian cancer, while Lynch syndrome affects colorectal cancer."
  },
  {
    title: "Genetic Testing Insights",
    description: "Known genetic mutations in your family can directly inform your screening plan. If a mutation has been identified, targeted testing becomes more precise."
  },
  {
    title: "Smoking and Lung Cancer",
    description: "Smoking is the leading cause of lung cancer. Your smoking history directly affects lung cancer screening recommendations and may qualify you for annual low-dose CT scans."
  },
  {
    title: "Your Screening History",
    description: "Regular screenings can detect cancer early when it's most treatable. Your current screening habits help us recommend an appropriate prevention strategy."
  }
];

interface QuizVisualProps {
  questionIndex: number;
  isVisible: boolean;
}

const QuizVisual = ({ questionIndex, isVisible }: QuizVisualProps) => {
  const visual = visuals[questionIndex] || visuals[0];
  const explanation = questionExplanations[questionIndex] || questionExplanations[0];

  return (
    <div
      className={cn(
        "relative w-full h-full rounded-3xl overflow-hidden transition-all duration-700",
        isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
      )}
    >
      {/* Premium image with slow zoom animation */}
      <div className="absolute inset-0">
        <img
          src={visual}
          alt=""
          className="w-full h-full object-cover animate-slow-zoom"
        />
        {/* Gradient overlay for depth and text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/30" />
      </div>

      {/* Moving particles for premium feel */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-1.5 h-1.5 rounded-full bg-white/40 animate-drift-1" />
        <div className="absolute top-1/3 left-1/2 w-1 h-1 rounded-full bg-white/30 animate-drift-2" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/3 w-2 h-2 rounded-full bg-white/20 animate-drift-3" style={{ animationDelay: '4s' }} />
        <div className="absolute top-2/3 left-2/3 w-1.5 h-1.5 rounded-full bg-white/35 animate-drift-1" style={{ animationDelay: '3s' }} />
        <div className="absolute top-3/4 left-1/4 w-1 h-1 rounded-full bg-white/25 animate-drift-2" style={{ animationDelay: '5s' }} />
        <div className="absolute top-1/2 right-1/4 w-1.5 h-1.5 rounded-full bg-sage/40 animate-drift-3" style={{ animationDelay: '1s' }} />
      </div>

      {/* Decorative dot - top right */}
      <div 
        className={cn(
          "absolute top-6 right-6 transition-all duration-1000 delay-300",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        )}
      >
        <div className="w-3 h-3 rounded-full bg-white/80 border-2 border-white/40 shadow-lg animate-pulse" />
      </div>

      {/* Glass card with explanation */}
      <div 
        className={cn(
          "absolute bottom-8 left-6 right-6 transition-all duration-700 delay-200",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}
      >
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-5 shadow-2xl">
          {/* Accent dot */}
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full bg-sage animate-pulse" />
            <span className="text-white/60 text-xs font-medium tracking-wide">Why we ask</span>
          </div>
          
          {/* Title */}
          <h3 className="text-white font-semibold text-lg mb-2 leading-tight">
            {explanation.title}
          </h3>
          
          {/* Description */}
          <p className="text-white/70 text-sm leading-relaxed">
            {explanation.description}
          </p>
        </div>
      </div>

      {/* Subtle curved line decoration */}
      <svg
        className={cn(
          "absolute top-0 left-0 w-full h-32 pointer-events-none transition-all duration-1000 delay-500",
          isVisible ? "opacity-100" : "opacity-0"
        )}
        viewBox="0 0 400 100"
        preserveAspectRatio="none"
      >
        <path
          d="M0,80 Q100,20 200,60 T400,40"
          fill="none"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="1"
          className="animate-draw-line"
        />
      </svg>
    </div>
  );
};

export default QuizVisual;
