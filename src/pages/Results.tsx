import { useLocation, useNavigate, Link } from "react-router-dom";
import { 
  AlertCircle, 
  Check,
  Shield,
  Award,
  Brain,
  Stethoscope,
  ClipboardCheck,
  Activity,
  HeartPulse,
  RotateCcw
} from "lucide-react";
import { cn } from "@/lib/utils";

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const answers = location.state?.answers || {};

  // Determine risk factors based on answers
  const getRiskFactors = () => {
    const highPriority: string[] = [];
    const additional: string[] = [];
    
    if (answers["family-cancer"] === "yes-multiple") {
      highPriority.push("2+ immediate family members with cancer history");
    } else if (answers["family-cancer"] === "yes-one") {
      additional.push("Family member with cancer history");
    }
    
    if (answers["cancer-age"] === "under-50") {
      highPriority.push("Family diagnosis before age 50 (early-onset indicator)");
    } else if (answers["cancer-age"] === "50-60") {
      additional.push("Family diagnosis between ages 50-60");
    }
    
    if (answers["cancer-type"] === "breast-ovarian") {
      highPriority.push("Family history of breast or ovarian cancer (BRCA-associated)");
    } else if (answers["cancer-type"] === "colorectal") {
      additional.push("Family history of colorectal cancer");
    } else if (answers["cancer-type"] === "multiple") {
      highPriority.push("Multiple cancer types in family (hereditary syndrome indicator)");
    }
    
    if (answers["genetic-testing"] === "yes-positive") {
      highPriority.push("Known genetic mutation identified in family");
    }
    
    if (answers["personal-history"] === "no") {
      additional.push("No prior cancer screenings completed");
    }

    return { highPriority, additional };
  };

  const { highPriority, additional } = getRiskFactors();
  const totalFactors = highPriority.length + additional.length;
  
  // Determine risk level
  const getRiskLevel = () => {
    if (highPriority.length >= 2) return "HIGH PRIORITY";
    if (highPriority.length >= 1 || additional.length >= 2) return "ELEVATED NEED";
    return "STANDARD";
  };
  
  const riskLevel = getRiskLevel();
  const hasElevatedRisk = riskLevel !== "STANDARD";

  const pricingTiers = [
    {
      name: "Basic Report",
      price: 0,
      description: "General risk overview",
      features: [
        { text: "Personalized risk summary", bold: true },
        { text: "General screening guidelines", bold: true },
        { text: "Educational resources", bold: false },
        { text: "Shareable PDF report", bold: false },
      ],
      cta: "Download Free",
      popular: false,
    },
    {
      name: "Guided Analysis",
      price: 49,
      description: "Personalized action plan",
      features: [
        { text: "Everything in Basic", bold: true },
        { text: "Personalized screening timeline", bold: true },
        { text: "Genetic counseling guide", bold: true },
        { text: "Doctor discussion checklist", bold: false },
        { text: "Priority email support", bold: false },
        { text: "Risk updates for 1 year", bold: false },
      ],
      cta: "Join Waitlist",
      popular: true,
    },
    {
      name: "Expert Consultation",
      price: 149,
      description: "1-on-1 genetic counselor call",
      features: [
        { text: "Everything in Guided", bold: true },
        { text: "30-min video consultation", bold: true },
        { text: "Family history deep-dive", bold: true },
        { text: "Personalized action plan", bold: false },
        { text: "Follow-up support (90 days)", bold: false },
        { text: "Direct counselor access", bold: false },
      ],
      cta: "Join Waitlist",
      popular: false,
    },
  ];

  const screenings = [
    {
      icon: Activity,
      name: "Low-dose CT screening",
      type: "Lung cancer",
      description: "Most never-smokers with family history don't qualify under current USPSTF guidelines but may benefit based on emerging research on hereditary lung cancer risk."
    },
    {
      icon: HeartPulse,
      name: "Enhanced breast MRI",
      type: "Breast cancer",
      description: "Standard mammograms may miss early cancers in high-risk individuals. MRI screening catches up to 30% more early-stage cancers."
    },
    {
      icon: Stethoscope,
      name: "Early colonoscopy",
      type: "Colorectal cancer",
      description: "Guidelines recommend starting at 45, but family history may warrant beginning 10 years before your relative's diagnosis age."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* SECTION 1: Hero / Status (Dark) */}
      <section className="bg-quiz-dark py-16 md:py-24 px-6 md:px-10 relative overflow-hidden">
        {/* Subtle DNA pattern */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0c0 10-10 20-10 30s10 20 10 30M30 0c0 10 10 20 10 30s-10 20-10 30' fill='none' stroke='%23ffffff' stroke-width='1'/%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px',
          }}
        />
        
        <div className="max-w-[900px] mx-auto text-center relative z-10">
          {/* Top badge */}
          <div className="inline-block mb-8">
            <span className="text-xs uppercase tracking-[0.2em] text-gray-400 font-medium px-4 py-2 border border-gray-600 rounded-full">
              Your Risk Assessment
            </span>
          </div>

          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div 
              className="w-20 h-20 rounded-full bg-terracotta/20 flex items-center justify-center"
              style={{ boxShadow: '0 0 40px rgba(255, 107, 53, 0.3)' }}
            >
              <AlertCircle className="w-10 h-10 text-terracotta" />
            </div>
          </div>

          {/* Main headline */}
          <h1 className="mb-6">
            <span className="block text-2xl md:text-[28px] text-white font-normal mb-2">
              Your Risk Factor Profile:
            </span>
            <span 
              className={cn(
                "block text-4xl md:text-[48px] font-bold",
                riskLevel === "STANDARD" ? "text-green-400" : "text-terracotta"
              )}
              style={{ 
                textShadow: riskLevel !== "STANDARD" 
                  ? '0 0 30px rgba(255, 107, 53, 0.5), 0 0 60px rgba(255, 107, 53, 0.3)' 
                  : '0 0 30px rgba(74, 222, 128, 0.5)'
              }}
            >
              {riskLevel}
            </span>
          </h1>

          {/* Summary text */}
          <p className="text-lg md:text-xl text-gray-300 max-w-[600px] mx-auto leading-relaxed">
            {hasElevatedRisk 
              ? `Based on your responses, you have ${totalFactors} risk factor${totalFactors > 1 ? 's' : ''} that may require enhanced screening beyond standard guidelines.`
              : "Based on your responses, your risk profile aligns with general population guidelines."
            }
          </p>

          {/* Retake link */}
          <button 
            onClick={() => navigate("/quiz")}
            className="mt-8 inline-flex items-center gap-2 text-gray-400 hover:text-gray-200 transition-colors text-sm"
          >
            <RotateCcw className="w-4 h-4" />
            Retake Assessment
          </button>
        </div>
      </section>

      {/* SECTION 2: Risk Factors Card (Light) */}
      <section className="bg-quiz-light py-16 md:py-20 px-6">
        <div className="max-w-[800px] mx-auto">
          {/* Main Risk Factors Card */}
          <div className="bg-white rounded-[20px] shadow-xl p-8 md:p-12 mb-10">
            {/* Card header */}
            <h2 className="text-2xl md:text-[30px] font-semibold text-quiz-navy mb-4">
              Identified Risk Factors
            </h2>
            <div className="w-20 h-1 bg-terracotta rounded-full mb-8" />

            {/* High Priority Factors */}
            {highPriority.length > 0 && (
              <div className="mb-10">
                <h3 className="text-xs uppercase tracking-[0.15em] text-terracotta font-semibold mb-5">
                  High Priority
                </h3>
                <div className="space-y-5">
                  {highPriority.map((factor, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div 
                        className="w-6 h-6 rounded-full bg-terracotta flex items-center justify-center shrink-0 mt-0.5"
                        style={{ boxShadow: '0 0 12px rgba(255, 107, 53, 0.4)' }}
                      >
                        <Check className="w-4 h-4 text-white" strokeWidth={3} />
                      </div>
                      <span className="text-lg md:text-xl font-semibold text-quiz-navy leading-relaxed">
                        {factor}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Additional Factors */}
            {additional.length > 0 && (
              <div className="mb-10">
                <h3 className="text-xs uppercase tracking-[0.15em] text-gray-500 font-semibold mb-5">
                  Additional Factors
                </h3>
                <div className="space-y-4">
                  {additional.map((factor, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-4 h-4 text-white" strokeWidth={3} />
                      </div>
                      <span className="text-base md:text-lg text-gray-700 leading-relaxed">
                        {factor}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* No factors */}
            {highPriority.length === 0 && additional.length === 0 && (
              <p className="text-lg text-gray-600 mb-8">
                No elevated risk factors were identified based on your responses.
              </p>
            )}

            {/* Citations footer */}
            <div className="bg-orange-50 rounded-b-[20px] -mx-8 md:-mx-12 -mb-8 md:-mb-12 mt-8 px-8 md:px-12 py-8">
              <p className="text-sm text-gray-600 leading-relaxed">
                Based on established risk factors from{" "}
                <a href="https://www.cancer.gov" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:underline">
                  National Cancer Institute
                </a>
                {" "}and{" "}
                <a href="https://www.cancer.org" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:underline">
                  American Cancer Society
                </a>
                {" "}guidelines.
              </p>
            </div>
          </div>

          {/* What This Means Card */}
          <div className="bg-white rounded-[20px] shadow-xl p-8 md:p-12">
            <h2 className="text-2xl md:text-[30px] font-semibold text-quiz-navy mb-4">
              What This Means for You
            </h2>
            <div className="w-20 h-1 bg-terracotta rounded-full mb-8" />

            <div className="space-y-6 text-gray-700 text-base md:text-lg leading-relaxed max-w-[650px]">
              {hasElevatedRisk ? (
                <>
                  <p>
                    Current cancer screening guidelines are designed for the general population with average risk. However, your responses indicate you{" "}
                    <span className="bg-orange-100 text-orange-900 px-2 py-0.5 rounded">
                      may fall outside standard screening guidelines
                    </span>
                    .
                  </p>
                  <p>
                    This means the screenings your doctor typically recommends based on age alone may not be sufficient for someone with your{" "}
                    <span className="bg-orange-100 text-orange-900 px-2 py-0.5 rounded">
                      elevated risk
                    </span>
                    {" "}profile.
                  </p>
                  <p>
                    Studies show that individuals with similar risk profiles who receive enhanced screening have significantly better outcomes through earlier detection.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    Good news — your responses suggest your cancer risk aligns with the general population. This means standard age-appropriate screening guidelines are likely appropriate for you.
                  </p>
                  <p>
                    However, we recommend discussing your complete family history with your healthcare provider, as new information may change your risk profile.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: Recommended Screenings (Dark) */}
      {hasElevatedRisk && (
        <section className="bg-quiz-dark py-16 md:py-20 px-6 relative overflow-hidden">
          {/* DNA pattern */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0c0 10-10 20-10 30s10 20 10 30M30 0c0 10 10 20 10 30s-10 20-10 30' fill='none' stroke='%23ffffff' stroke-width='1'/%3E%3C/svg%3E")`,
              backgroundSize: '60px 60px',
            }}
          />
          
          <div className="max-w-[900px] mx-auto relative z-10">
            {/* Header */}
            <div className="flex items-center gap-3 mb-10">
              <ClipboardCheck className="w-8 h-8 text-terracotta" />
              <h2 className="text-2xl md:text-[32px] font-semibold text-white">
                You May Benefit From:
              </h2>
            </div>

            {/* Screening cards */}
            <div className="space-y-6">
              {screenings.map((screening, index) => (
                <div 
                  key={index}
                  className="bg-white/[0.08] border border-gray-600 rounded-2xl p-6 md:p-8 hover:bg-white/[0.12] transition-all duration-200"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-terracotta/20 flex items-center justify-center shrink-0">
                      <screening.icon className="w-6 h-6 text-terracotta" />
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-semibold text-white mb-1">
                        {screening.name}
                      </h3>
                      <p className="text-sm text-terracotta font-medium mb-3">
                        {screening.type}
                      </p>
                      <p className="text-gray-300 leading-relaxed">
                        {screening.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Divider */}
      <div className="bg-quiz-light py-8 px-6">
        <div className="max-w-[900px] mx-auto relative">
          <div className="border-t border-gray-300" />
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-quiz-light px-6 text-gray-400 text-sm">
            How We Can Help
          </span>
        </div>
      </div>

      {/* SECTION 4: Service Tiers (Light) */}
      <section className="bg-quiz-light py-16 md:py-20 px-6">
        <div className="max-w-[1100px] mx-auto">
          {/* Section header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-[36px] font-semibold text-quiz-navy mb-3">
              Choose Your Path Forward
            </h2>
            <p className="text-lg text-gray-600">
              Early access pricing for Q1 2026 launch
            </p>
          </div>

          {/* Pricing cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingTiers.map((tier, index) => (
              <div
                key={index}
                className={cn(
                  "relative bg-white rounded-[20px] p-8 md:p-10 flex flex-col transition-all duration-250",
                  "hover:-translate-y-2 hover:scale-[1.02]",
                  tier.popular 
                    ? "border-[3px] border-terracotta shadow-2xl md:-mt-4 md:mb-4" 
                    : "border border-gray-200 shadow-lg hover:shadow-xl"
                )}
              >
                {/* Popular badge */}
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-terracotta text-white text-xs font-semibold px-4 py-1.5 rounded-full whitespace-nowrap">
                      MOST POPULAR
                    </span>
                  </div>
                )}

                {/* Tier name */}
                <h3 className="text-xl md:text-2xl font-semibold text-quiz-navy mb-2">
                  {tier.name}
                </h3>
                
                {/* Price */}
                <div className="mb-1">
                  <span className="text-5xl md:text-[56px] font-bold text-quiz-navy">
                    {tier.price === 0 ? "Free" : `$${tier.price}`}
                  </span>
                </div>
                {tier.price > 0 && (
                  <p className="text-sm text-gray-500 mb-6">/one-time</p>
                )}
                {tier.price === 0 && <div className="mb-6" />}

                {/* Divider */}
                <div className="border-t border-gray-200 my-6" />

                {/* Features */}
                <ul className="space-y-3.5 flex-1">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-terracotta shrink-0 mt-0.5" strokeWidth={2.5} />
                      <span className={cn(
                        "text-gray-700 leading-relaxed",
                        feature.bold ? "font-semibold" : ""
                      )}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button
                  className={cn(
                    "w-full h-[52px] rounded-full font-semibold text-base mt-8 transition-all duration-200",
                    "hover:-translate-y-1 hover:shadow-lg",
                    tier.popular
                      ? "bg-terracotta text-white hover:bg-terracotta-light"
                      : "bg-white text-terracotta border-2 border-terracotta hover:bg-terracotta/5"
                  )}
                >
                  {tier.cta}
                </button>
              </div>
            ))}
          </div>

          {/* Below cards text */}
          <div className="text-center mt-10 space-y-2">
            <p className="text-gray-600">
              Launching Q1 2026. Reserve your spot for early access pricing.
            </p>
            <p className="text-gray-500 text-sm flex items-center justify-center gap-2">
              <Check className="w-4 h-4 text-terracotta" />
              30-day money-back guarantee
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 5: Trust & Disclaimers (Dark) */}
      <section className="bg-quiz-dark py-12 md:py-16 px-6">
        <div className="max-w-[1000px] mx-auto">
          {/* Trust badges */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 mb-8">
            <div className="flex items-center gap-2 text-gray-400">
              <Shield className="w-5 h-5 text-gray-500" />
              <span className="text-sm">HIPAA Compliant</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <Award className="w-5 h-5 text-gray-500" />
              <span className="text-sm">Evidence-Based</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <Brain className="w-5 h-5 text-gray-500" />
              <span className="text-sm">AI-Powered Analysis</span>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-600 mb-8" />

          {/* Disclaimers - two columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Important Information */}
            <div>
              <h4 className="text-xs uppercase tracking-[0.1em] text-gray-400 font-semibold mb-3">
                Important Information
              </h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                This assessment provides educational information only and is not a substitute for professional medical advice, diagnosis, or treatment. The risk factors identified are based on your self-reported responses and established medical guidelines. Always consult with a qualified healthcare provider before making decisions about cancer screening.
              </p>
            </div>

            {/* Privacy & Data */}
            <div>
              <h4 className="text-xs uppercase tracking-[0.1em] text-gray-400 font-semibold mb-3">
                Privacy & Data
              </h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                Your responses are encrypted and stored securely. We never sell your personal health information. All data processing follows HIPAA guidelines and industry best practices for health data security.{" "}
                <a href="#" className="text-terracotta hover:underline">
                  Privacy Policy
                </a>
              </p>
            </div>
          </div>

          {/* Logo / Footer */}
          <div className="mt-12 pt-8 border-t border-gray-700 flex justify-center">
            <Link to="/" className="flex items-center gap-2 text-gray-400 hover:text-gray-300 transition-colors">
              <div className="w-8 h-8 rounded-full bg-terracotta/20 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-4 h-4 text-terracotta" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                </svg>
              </div>
              <span className="text-sm font-medium">ArtemisAI</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Results;
