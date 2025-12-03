import { useLocation, useNavigate, Link } from "react-router-dom";
import { 
  AlertCircle, 
  CheckCircle, 
  Check, 
  ArrowRight, 
  RotateCcw,
  Shield,
  FileText,
  Users
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const answers = location.state?.answers || {};

  // Determine risk factors based on answers
  const getRiskFactors = () => {
    const factors: string[] = [];
    
    if (answers["family-cancer"] === "yes-multiple") {
      factors.push("Multiple family members with cancer history");
    } else if (answers["family-cancer"] === "yes-one") {
      factors.push("Family member with cancer history");
    }
    
    if (answers["cancer-age"] === "under-50") {
      factors.push("Family diagnosis before age 50");
    }
    
    if (answers["cancer-type"] === "breast-ovarian") {
      factors.push("Family history of breast or ovarian cancer");
    } else if (answers["cancer-type"] === "colorectal") {
      factors.push("Family history of colorectal cancer");
    } else if (answers["cancer-type"] === "multiple") {
      factors.push("Multiple cancer types in family");
    }
    
    if (answers["genetic-testing"] === "yes-positive") {
      factors.push("Known genetic mutation in family");
    }
    
    if (answers["personal-history"] === "no") {
      factors.push("No prior cancer screenings");
    }

    return factors.length > 0 ? factors : ["No elevated risk factors identified"];
  };

  const riskFactors = getRiskFactors();
  const hasElevatedRisk = riskFactors.length > 1 || 
    (riskFactors.length === 1 && riskFactors[0] !== "No elevated risk factors identified");

  const pricingTiers = [
    {
      name: "Basic Report",
      price: "Free",
      description: "General risk overview",
      features: [
        "Risk factor summary",
        "General screening guidelines",
        "Educational resources",
      ],
      cta: "Download Report",
      popular: false,
    },
    {
      name: "Comprehensive Analysis",
      price: "$49",
      description: "Personalized recommendations",
      features: [
        "Everything in Basic",
        "Personalized screening timeline",
        "Genetic counseling guide",
        "Doctor discussion checklist",
        "Email support",
      ],
      cta: "Get Full Analysis",
      popular: true,
    },
    {
      name: "Expert Consultation",
      price: "$149",
      description: "1-on-1 genetic counselor call",
      features: [
        "Everything in Comprehensive",
        "30-min video consultation",
        "Family history review",
        "Personalized action plan",
        "Follow-up support",
      ],
      cta: "Book Consultation",
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border/50 px-4 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-deep-teal to-teal flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xs">A</span>
            </div>
            <span className="text-lg font-semibold text-primary">ArtemisAI</span>
          </Link>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/quiz")}
            className="text-muted-foreground"
          >
            <RotateCcw className="w-4 h-4 mr-1" />
            Retake
          </Button>
        </div>
      </header>

      {/* Main content */}
      <main className="px-4 py-10">
        <div className="max-w-5xl mx-auto">
          {/* Page header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-3">
              Your Risk Assessment Results
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Based on your family history and screening information, here's what we found.
            </p>
          </div>

          {/* Risk Factors Card */}
          <div className="bg-warm-neutral-light/50 rounded-2xl border border-border p-6 md:p-8 mb-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center",
                hasElevatedRisk ? "bg-warning/10" : "bg-teal/10"
              )}>
                <AlertCircle className={cn(
                  "w-5 h-5",
                  hasElevatedRisk ? "text-warning" : "text-teal"
                )} />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-primary">Your Risk Factor Profile</h2>
                <p className="text-sm text-muted-foreground">
                  {hasElevatedRisk ? "Factors that may affect your screening needs" : "Your current risk assessment"}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {riskFactors.map((factor, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-3 p-3 bg-background rounded-lg"
                >
                  <div className={cn(
                    "w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5",
                    hasElevatedRisk ? "bg-warning/10" : "bg-teal/10"
                  )}>
                    <Check className={cn(
                      "w-3 h-3",
                      hasElevatedRisk ? "text-warning" : "text-teal"
                    )} />
                  </div>
                  <span className="text-foreground">{factor}</span>
                </div>
              ))}
            </div>
          </div>

          {/* What This Means Card */}
          <div className="bg-card rounded-2xl border border-border p-6 md:p-8 mb-12 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-xl font-semibold text-primary">What This Means</h2>
            </div>

            <div className="space-y-4 text-muted-foreground">
              {hasElevatedRisk ? (
                <>
                  <p>
                    Your family history suggests you may benefit from <strong className="text-foreground">earlier or more frequent screening</strong> than 
                    what standard guidelines recommend for the general population.
                  </p>
                  <p>
                    The National Comprehensive Cancer Network (NCCN) guidelines indicate that individuals with your 
                    risk profile should discuss <strong className="text-foreground">enhanced screening options</strong> with their healthcare provider.
                  </p>
                  <p>
                    This might include earlier mammograms, more frequent colonoscopies, or genetic testing to 
                    better understand your personal risk.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    Based on your responses, your risk profile appears to <strong className="text-foreground">align with general population guidelines</strong>.
                  </p>
                  <p>
                    This means following standard age-appropriate screening recommendations should be appropriate for you. 
                    However, it's always a good idea to discuss your family history with your doctor.
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Pricing Section */}
          <div className="mb-12">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2">
                Take the Next Step
              </h2>
              <p className="text-muted-foreground">
                Get personalized guidance based on your risk profile
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {pricingTiers.map((tier, index) => (
                <div
                  key={index}
                  className={cn(
                    "relative rounded-2xl border-2 p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg",
                    tier.popular 
                      ? "border-teal bg-teal/5 shadow-md" 
                      : "border-border bg-card hover:border-teal/30"
                  )}
                >
                  {tier.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="bg-teal text-accent-foreground text-xs font-semibold px-3 py-1 rounded-full">
                        Recommended
                      </span>
                    </div>
                  )}

                  <div className="text-center mb-6">
                    <h3 className="text-lg font-semibold text-primary mb-1">{tier.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{tier.description}</p>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-4xl font-bold text-primary">{tier.price}</span>
                      {tier.price !== "Free" && (
                        <span className="text-muted-foreground text-sm">one-time</span>
                      )}
                    </div>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {tier.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-teal shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    variant={tier.popular ? "cta" : "outline"}
                    className="w-full"
                  >
                    {tier.cta}
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-6 mb-10">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Shield className="w-4 h-4 text-teal" />
              <span>HIPAA Compliant</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="w-4 h-4 text-teal" />
              <span>Stanford Medicine Collaboration</span>
            </div>
          </div>

          {/* Disclaimers */}
          <div className="glass rounded-xl p-6 text-center">
            <p className="text-xs text-muted-foreground leading-relaxed mb-3">
              <strong className="text-muted-foreground/80">Medical Disclaimer:</strong> This assessment provides 
              educational information only and is not a substitute for professional medical advice, diagnosis, or treatment. 
              The information presented does not constitute medical advice and should not be relied upon as such.
            </p>
            <p className="text-xs text-muted-foreground">
              By using this service, you agree to our{" "}
              <a href="#" className="text-teal hover:underline">Privacy Policy</a>
              {" "}and{" "}
              <a href="#" className="text-teal hover:underline">Terms of Service</a>.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Results;
