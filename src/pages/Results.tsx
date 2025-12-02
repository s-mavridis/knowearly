import { useLocation, useNavigate } from "react-router-dom";
import { AlertTriangle, CheckCircle, ArrowRight, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const answers = location.state?.answers || {};

  // Simple risk calculation based on answers
  const calculateRisk = () => {
    let riskScore = 0;
    
    if (answers["family-cancer"] === "yes-multiple") riskScore += 3;
    else if (answers["family-cancer"] === "yes-one") riskScore += 2;
    
    if (answers["cancer-age"] === "under-50") riskScore += 3;
    else if (answers["cancer-age"] === "50-60") riskScore += 1;
    
    if (answers["genetic-testing"] === "yes-positive") riskScore += 4;
    
    if (answers["cancer-type"] === "breast-ovarian" || answers["cancer-type"] === "multiple") {
      riskScore += 2;
    }

    if (riskScore >= 6) return "elevated";
    if (riskScore >= 3) return "moderate";
    return "standard";
  };

  const risk = calculateRisk();

  const riskContent = {
    elevated: {
      icon: AlertTriangle,
      iconColor: "text-amber-500",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-200",
      title: "Elevated Risk Detected",
      description: "Based on your family history, you may benefit from enhanced screening protocols beyond standard guidelines.",
      recommendation: "We recommend discussing genetic counseling and personalized screening options with your healthcare provider.",
    },
    moderate: {
      icon: AlertTriangle,
      iconColor: "text-teal",
      bgColor: "bg-teal/5",
      borderColor: "border-teal/20",
      title: "Moderate Risk Factors",
      description: "Your family history suggests some factors that may warrant additional attention.",
      recommendation: "Consider discussing your family history with your doctor to determine if enhanced screening is appropriate.",
    },
    standard: {
      icon: CheckCircle,
      iconColor: "text-emerald-500",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200",
      title: "Standard Risk Profile",
      description: "Based on your responses, your risk appears to align with general population guidelines.",
      recommendation: "Continue following standard screening recommendations for your age group.",
    },
  };

  const content = riskContent[risk];
  const Icon = content.icon;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border/50 px-4 py-4">
        <div className="max-w-2xl mx-auto flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-teal flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-xs">A</span>
          </div>
          <span className="text-lg font-semibold text-primary">ArtemisAI</span>
        </div>
      </header>

      {/* Main content */}
      <main className="px-4 py-12 pb-32">
        <div className="max-w-2xl mx-auto">
          {/* Result card */}
          <div className={`rounded-2xl border-2 ${content.borderColor} ${content.bgColor} p-8 mb-8`}>
            <div className="flex flex-col items-center text-center">
              <div className={`w-16 h-16 rounded-full ${content.bgColor} flex items-center justify-center mb-4`}>
                <Icon className={`w-8 h-8 ${content.iconColor}`} />
              </div>
              
              <h1 className="text-2xl md:text-3xl font-bold text-primary mb-3">
                {content.title}
              </h1>
              
              <p className="text-muted-foreground mb-6 max-w-md">
                {content.description}
              </p>

              <div className="w-full p-4 bg-background rounded-xl">
                <p className="text-sm font-medium text-primary">
                  {content.recommendation}
                </p>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="glass rounded-xl p-5 mb-8">
            <p className="text-xs text-muted-foreground text-center leading-relaxed">
              <strong className="text-primary/80">Important:</strong> This assessment provides general educational information only. 
              It is not a medical diagnosis. Please consult with a qualified healthcare provider 
              to discuss your individual risk factors and appropriate screening options.
            </p>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <Button
              variant="cta"
              size="lg"
              className="w-full"
              onClick={() => window.print()}
            >
              Save or Print Results
              <ArrowRight className="w-5 h-5 ml-1" />
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              className="w-full"
              onClick={() => navigate("/quiz")}
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Retake Assessment
            </Button>
            
            <Button
              variant="ghost"
              className="w-full text-muted-foreground"
              onClick={() => navigate("/")}
            >
              Return Home
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Results;
