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
  RotateCcw,
  Dna,
  Hospital
} from "lucide-react";
import { cn } from "@/lib/utils";
import resultsBanner1 from "@/assets/results-banner-1.png";
import heroBg from "@/assets/hero-bg.png";

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const answers = location.state?.answers || {};

  // Determine risk factors based on answers
  const getRiskFactors = () => {
    const highPriority: string[] = [];
    const additional: string[] = [];
    
    // HIGH PRIORITY: Multiple family members AND early diagnosis
    if (answers["family-cancer"] === "yes-multiple" && answers["cancer-age"] === "under-50") {
      highPriority.push("Multiple immediate family members with cancer diagnosed before age 55");
    }
    
    // HIGH PRIORITY: Known genetic mutation
    if (answers["genetic-testing"] === "yes-positive") {
      highPriority.push("Known genetic mutation (BRCA, Lynch syndrome, or similar)");
    }
    
    // HIGH PRIORITY: Pancreatic cancer family history
    if ((answers["family-cancer"] === "yes-one" || answers["family-cancer"] === "yes-multiple") && 
        answers["cancer-type"] === "pancreatic") {
      highPriority.push("Family history of pancreatic cancer (no standard screening guidelines exist)");
    }
    
    // HIGH PRIORITY: Multiple cancer types in family
    if ((answers["family-cancer"] === "yes-one" || answers["family-cancer"] === "yes-multiple") && 
        answers["cancer-type"] === "multiple") {
      highPriority.push("Family history of multiple cancer types");
    }
    
    // ADDITIONAL: Age 45-64
    if (answers["age"] === "45-54" || answers["age"] === "55-64") {
      additional.push("Age 45-64 (cancer risk increases with age)");
    }
    
    // ADDITIONAL: One family member with cancer
    if (answers["family-cancer"] === "yes-one" && 
        !highPriority.some(f => f.includes("pancreatic")) && 
        answers["cancer-type"] !== "multiple") {
      additional.push("1 immediate family member with cancer history");
    }
    
    // ADDITIONAL: No prior screenings
    if (answers["personal-history"] === "no") {
      additional.push("No prior cancer screening completed");
    }

    return { highPriority, additional };
  };

  const { highPriority, additional } = getRiskFactors();
  const totalFactors = highPriority.length + additional.length;
  
  // Determine risk level
  const getRiskLevel = () => {
    if (highPriority.length >= 2) return "High Priority";
    if (highPriority.length >= 1 || additional.length >= 2) return "Elevated Need";
    return "Standard";
  };
  
  const riskLevel = getRiskLevel();
  const hasElevatedRisk = riskLevel !== "Standard";

  // Get recommended screenings based on answers
  const getRecommendedScreenings = () => {
    const screeningsList: Array<{
      icon: typeof Activity;
      name: string;
      description: string;
    }> = [];

    const cancerType = answers["cancer-type"];
    const hasFamilyHistory = answers["family-cancer"] === "yes-one" || answers["family-cancer"] === "yes-multiple";
    const hasGeneticMutation = answers["genetic-testing"] === "yes-positive";
    const geneticUnsure = answers["genetic-testing"] === "unsure";
    const noScreenings = answers["personal-history"] === "no";

    // Breast or ovarian cancer family history
    if (cancerType === "breast-ovarian") {
      screeningsList.push({
        icon: HeartPulse,
        name: "Enhanced breast imaging",
        description: "High-risk individuals may benefit from breast MRI in addition to mammography, often starting before age 40."
      });
    }

    // Colorectal cancer family history
    if (cancerType === "colorectal") {
      screeningsList.push({
        icon: Stethoscope,
        name: "Earlier colonoscopy",
        description: "Guidelines recommend screening at age 45, but family history may warrant starting at 40 or 10 years before the youngest diagnosis in your family."
      });
    }

    // Pancreatic cancer family history
    if (cancerType === "pancreatic") {
      screeningsList.push({
        icon: Activity,
        name: "High-risk pancreatic surveillance",
        description: "While there's no routine screening, specialized protocols exist for individuals with family history or genetic mutations."
      });
    }

    // Genetic mutation found or unsure
    if (hasGeneticMutation || geneticUnsure) {
      screeningsList.push({
        icon: Dna,
        name: "Genetic counseling",
        description: "Helps identify hereditary cancer syndromes and determine appropriate screening protocols for you and your family."
      });
    }

    // Multiple cancer types or no screening history
    if (cancerType === "multiple" || (hasFamilyHistory && noScreenings)) {
      screeningsList.push({
        icon: Hospital,
        name: "Multi-cancer screening consultation",
        description: "Comprehensive evaluation to determine which screenings are appropriate based on your specific risk factors."
      });
    }

    // Always show personalized plan as last item
    screeningsList.push({
      icon: ClipboardCheck,
      name: "Personalized screening plan",
      description: "A detailed roadmap of which tests to get, when, and how to access them through insurance or self-pay."
    });

    return screeningsList;
  };

  const screenings = getRecommendedScreenings();

  const scrollToPricing = () => {
    const pricingSection = document.getElementById('pricing-section');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

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

  return (
    <div className="min-h-screen">
      {/* SECTION 1: Hero / Status with Premium Image */}
      <section className="relative py-16 md:py-24 px-6 md:px-10 overflow-hidden">
        {/* Premium background image with dark center for text contrast */}
        <div className="absolute inset-0">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `url(${heroBg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              transform: 'scaleX(-1)'
            }}
          />
          {/* Same overlay as main page */}
          <div className="absolute inset-0 bg-gradient-to-r from-earth/70 via-earth/40 to-earth/20" />
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-8 right-8 w-3 h-3 rounded-full bg-white/30 animate-pulse" />
        <div className="absolute bottom-8 left-8 w-2 h-2 rounded-full bg-white/20 animate-pulse delay-300" />
        
        {/* Moving particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-1.5 h-1.5 rounded-full bg-white/40 animate-drift-1" />
          <div className="absolute top-1/3 left-1/2 w-1 h-1 rounded-full bg-white/30 animate-drift-2" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/3 w-2 h-2 rounded-full bg-white/20 animate-drift-3" style={{ animationDelay: '4s' }} />
          <div className="absolute top-2/3 left-2/3 w-1.5 h-1.5 rounded-full bg-white/35 animate-drift-1" style={{ animationDelay: '3s' }} />
          <div className="absolute top-3/4 left-1/4 w-1 h-1 rounded-full bg-white/25 animate-drift-2" style={{ animationDelay: '5s' }} />
          <div className="absolute top-1/2 right-1/4 w-1.5 h-1.5 rounded-full bg-sage/40 animate-drift-3" style={{ animationDelay: '1s' }} />
        </div>
        
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30" viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice">
          <path d="M50,350 Q200,200 400,280 T700,150" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" className="animate-draw-line" />
          <circle cx="50" cy="350" r="4" fill="white" fillOpacity="0.4" />
          <circle cx="700" cy="150" r="4" fill="white" fillOpacity="0.4" />
        </svg>
        
        <div className="max-w-[900px] mx-auto text-center relative z-10">
          {/* Glass card container */}
          <div className="bg-earth/40 backdrop-blur-xl border border-white/20 rounded-3xl p-8 md:p-12 max-w-[500px] mx-auto shadow-2xl">
            {/* Top badge */}
            <div className="inline-block mb-6">
              <span className="text-xs tracking-[0.15em] text-white/80 font-medium">
                Your Risk Assessment
              </span>
            </div>

            {/* Icon - changes based on risk level */}
            <div className="flex justify-center mb-6">
              <div 
                className={cn(
                  "w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center",
                )}
                style={{ 
                  boxShadow: riskLevel === "Standard" 
                    ? '0 0 40px rgba(107, 142, 107, 0.4)' 
                    : '0 0 40px rgba(207, 92, 54, 0.3)' 
                }}
              >
                {riskLevel === "Standard" ? (
                  <Check className="w-10 h-10 text-sage" />
                ) : riskLevel === "High Priority" ? (
                  <AlertCircle className="w-10 h-10 text-terracotta" />
                ) : (
                  <Activity className="w-10 h-10 text-terracotta" />
                )}
              </div>
            </div>

            {/* Main headline */}
            <h1 className="mb-6">
              <span className="block font-display text-xl md:text-2xl text-white font-normal mb-4">
                Your Risk Factor Profile
              </span>
              <span 
                className={cn(
                  "inline-block text-2xl md:text-3xl font-bold px-6 py-3 rounded-full text-white",
                  riskLevel === "Standard" ? "bg-sage" : "bg-terracotta"
                )}
              >
                {riskLevel}
              </span>
            </h1>

            {/* Summary text */}
            <p className="text-base md:text-lg text-white/80 leading-relaxed">
              {hasElevatedRisk 
                ? `${totalFactors} risk factor${totalFactors > 1 ? 's' : ''} identified that may require enhanced screening.`
                : "Your risk profile aligns with general population guidelines."
              }
            </p>

            {/* Retake link */}
            <button 
              onClick={() => navigate("/quiz")}
              className="mt-6 inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm"
            >
              <RotateCcw className="w-4 h-4" />
              Retake Assessment
            </button>
          </div>
        </div>
        
        {/* Bottom timeline markers */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
          {[...Array(12)].map((_, i) => (
            <div key={i} className={cn("w-0.5 bg-white/40", i % 3 === 0 ? "h-3" : "h-1.5")} />
          ))}
        </div>
      </section>

      {/* SECTION 2: Risk Factors Card (Light - Cream background) */}
      <section className="bg-background py-16 md:py-20 px-6">
        <div className="max-w-[800px] mx-auto">
          {/* Main Risk Factors Card */}
          <div className="bg-card rounded-[20px] shadow-xl p-8 md:p-12 mb-10 border border-border">
            {/* Card header */}
            <h2 className="font-display text-2xl md:text-[30px] text-foreground mb-4">
              Identified Risk Factors
            </h2>
            <div className="w-20 h-1 bg-terracotta rounded-full mb-8" />

            {/* High Priority Factors */}
            {highPriority.length > 0 && (
              <div className="mb-10">
                <h3 className="text-sm tracking-wide text-terracotta font-semibold mb-5">
                  High Priority
                </h3>
                <div className="space-y-5">
                  {highPriority.map((factor, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div 
                        className="w-6 h-6 rounded-full bg-terracotta flex items-center justify-center shrink-0 mt-0.5"
                        style={{ boxShadow: '0 0 12px rgba(207, 92, 54, 0.4)' }}
                      >
                        <Check className="w-4 h-4 text-white" strokeWidth={3} />
                      </div>
                      <span className="text-lg md:text-xl font-semibold text-foreground leading-relaxed">
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
                <h3 className="text-sm tracking-wide text-muted-foreground font-semibold mb-5">
                  Additional Factors
                </h3>
                <div className="space-y-4">
                  {additional.map((factor, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-4 h-4 text-muted-foreground" strokeWidth={3} />
                      </div>
                      <span className="text-base md:text-lg text-muted-foreground leading-relaxed">
                        {factor}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* No factors */}
            {highPriority.length === 0 && additional.length === 0 && (
              <p className="text-lg text-muted-foreground mb-8">
                No elevated risk factors were identified based on your responses.
              </p>
            )}

            {/* Citations footer */}
            <div className="bg-sand rounded-b-[20px] -mx-8 md:-mx-12 -mb-8 md:-mb-12 mt-8 px-8 md:px-12 py-8">
              <p className="text-sm text-muted-foreground leading-relaxed">
                Based on established risk factors from{" "}
                <span className="text-foreground">
                  National Cancer Institute
                </span>
                {" "}and{" "}
                <span className="text-foreground">
                  American Cancer Society
                </span>
                {" "}guidelines.
              </p>
            </div>
          </div>

          {/* What This Means Card */}
          <div className="bg-card rounded-[20px] shadow-xl p-8 md:p-12 border border-border">
            <h2 className="font-display text-2xl md:text-[30px] text-foreground mb-4">
              What This Means for You
            </h2>
            <div className="w-20 h-1 bg-terracotta rounded-full mb-8" />

            <div className="space-y-6 text-muted-foreground text-base md:text-lg leading-relaxed max-w-[650px]">
              <p>
                Based on established risk factors from the National Cancer Institute and American Cancer Society, you have multiple indicators that suggest you may benefit from enhanced or earlier cancer screening.
              </p>
              <p>
                Current screening guidelines are primarily age-based and don't fully account for family history, genetic risk, or cancer types without established screening protocols.
              </p>
              <p>
                This creates gaps where high-risk individuals may not receive appropriate screening until symptoms appear.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: Recommended Screenings with Premium Image */}
      {screenings.length > 0 && (
        <section className="relative py-16 md:py-20 px-6 overflow-hidden">
          {/* Premium background image */}
          <div className="absolute inset-0">
            <img src={resultsBanner1} alt="" className="w-full h-full object-cover animate-slow-pan" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-6 right-6 w-3 h-3 rounded-full bg-white/30 animate-pulse" />
          
          {/* Moving particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/5 w-1.5 h-1.5 rounded-full bg-white/40 animate-drift-1" />
            <div className="absolute top-1/3 left-1/2 w-1 h-1 rounded-full bg-white/30 animate-drift-2" style={{ animationDelay: '1s' }} />
            <div className="absolute top-1/2 left-1/4 w-2 h-2 rounded-full bg-white/20 animate-drift-3" style={{ animationDelay: '3s' }} />
            <div className="absolute top-2/3 right-1/3 w-1.5 h-1.5 rounded-full bg-terracotta/30 animate-drift-1" style={{ animationDelay: '2s' }} />
          </div>
          
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30" viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice">
            <path d="M100,300 Q300,150 500,250 T750,100" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
          </svg>
          
          <div className="max-w-[900px] mx-auto relative z-10">
            {/* Header */}
            <div className="flex items-center gap-3 mb-10">
              <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                <ClipboardCheck className="w-6 h-6 text-white" />
              </div>
              <h2 className="font-display text-2xl md:text-[32px] text-white">
                You May Benefit From:
              </h2>
            </div>

            {/* Screening cards - glass style */}
            <div className="space-y-6">
              {screenings.map((screening, index) => (
                <div 
                  key={index}
                  className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 md:p-8"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0">
                      <screening.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-semibold text-white mb-3">
                        {screening.name}
                      </h3>
                      <p className="text-white/70 leading-relaxed">
                        {screening.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Disclaimer text */}
            <p className="text-white/60 text-sm mt-8 leading-relaxed">
              These are general categories based on your responses. Your personalized plan will include specific tests, timing, providers, and cost information.
            </p>

            {/* CTA Button */}
            <div className="mt-10 text-center">
              <button
                onClick={scrollToPricing}
                className="bg-terracotta hover:bg-terracotta-light text-white font-semibold px-8 py-4 rounded-full transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
              >
                Get Your Personalized Plan
              </button>
            </div>
          </div>
          
          {/* Bottom timeline markers */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
            {[...Array(10)].map((_, i) => (
              <div key={i} className={cn("w-0.5 bg-white/40", i % 3 === 0 ? "h-3" : "h-1.5")} />
            ))}
          </div>
        </section>
      )}

      {/* Divider */}
      <div className="bg-background py-8 px-6">
        <div className="max-w-[900px] mx-auto relative">
          <div className="border-t border-border" />
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-6 text-muted-foreground text-sm">
            How We Can Help
          </span>
        </div>
      </div>

      {/* SECTION 4: Service Tiers (Light - Cream background) */}
      <section id="pricing-section" className="bg-background py-16 md:py-20 px-6">
        <div className="max-w-[1100px] mx-auto">
          {/* Section header */}
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-[36px] text-foreground mb-3">
              Choose Your Path Forward
            </h2>
            <p className="text-lg text-muted-foreground">
              Early access pricing for Q1 2026 launch
            </p>
          </div>

          {/* Pricing cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingTiers.map((tier, index) => (
              <div
                key={index}
                className={cn(
                  "relative bg-card rounded-[20px] p-8 md:p-10 flex flex-col transition-all duration-250 border",
                  "hover:-translate-y-2 hover:scale-[1.02]",
                  tier.popular 
                    ? "border-2 border-terracotta shadow-2xl md:-mt-4 md:mb-4" 
                    : "border-border shadow-lg hover:shadow-xl"
                )}
              >
                {/* Popular badge */}
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-terracotta text-white text-xs font-semibold px-4 py-1.5 rounded-full whitespace-nowrap">
                      Most Popular
                    </span>
                  </div>
                )}

                {/* Tier name */}
                <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-2">
                  {tier.name}
                </h3>
                
                {/* Price */}
                <div className="mb-1">
                  <span className="text-5xl md:text-[56px] font-bold text-foreground">
                    {tier.price === 0 ? "Free" : `$${tier.price}`}
                  </span>
                </div>
                {tier.price > 0 && (
                  <p className="text-sm text-muted-foreground mb-6">/one-time</p>
                )}
                {tier.price === 0 && <div className="mb-6" />}

                {/* Divider */}
                <div className="border-t border-border my-6" />

                {/* Features */}
                <ul className="space-y-3.5 flex-1">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-terracotta shrink-0 mt-0.5" strokeWidth={2.5} />
                      <span className={cn(
                        "text-muted-foreground leading-relaxed",
                        feature.bold ? "font-semibold text-foreground" : ""
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
                      : "bg-card text-terracotta border-2 border-terracotta hover:bg-terracotta/5"
                  )}
                >
                  {tier.cta}
                </button>
              </div>
            ))}
          </div>

          {/* Below cards text */}
          <div className="text-center mt-10 space-y-2">
            <p className="text-muted-foreground">
              Launching Q1 2026. Reserve your spot for early access pricing.
            </p>
            <p className="text-muted-foreground text-sm flex items-center justify-center gap-2">
              <Check className="w-4 h-4 text-terracotta" />
              30-day money-back guarantee
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 5: Trust & Disclaimers with subtle background */}
      <section className="bg-[#1c1917] py-12 md:py-16 px-6 relative overflow-hidden">
        {/* Subtle gradient background instead of animated */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1c1917] via-[#292524] to-[#1c1917]" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full blur-[120px] bg-terracotta/5" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full blur-[100px] bg-sage/5" />
        
        <div className="max-w-[1000px] mx-auto relative z-10">
          {/* Trust badges */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 mb-8">
            <div className="flex items-center gap-2 text-white/60">
              <Shield className="w-5 h-5 text-white/40" />
              <span className="text-sm">HIPAA Compliant</span>
            </div>
            <div className="flex items-center gap-2 text-white/60">
              <Award className="w-5 h-5 text-white/40" />
              <span className="text-sm">Evidence-Based</span>
            </div>
            <div className="flex items-center gap-2 text-white/60">
              <Brain className="w-5 h-5 text-white/40" />
              <span className="text-sm">AI-Powered Analysis</span>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-white/20 mb-8" />

          {/* Disclaimers - two columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Important Information */}
            <div>
              <h4 className="text-sm tracking-wide text-white/50 font-semibold mb-3">
                Important Information
              </h4>
              <p className="text-sm text-white/40 leading-relaxed">
                This assessment provides educational information only and is not a substitute for professional medical advice, diagnosis, or treatment. The risk factors identified are based on your self-reported responses and established medical guidelines. Always consult with a qualified healthcare provider before making decisions about cancer screening.
              </p>
            </div>

            {/* Privacy & Data */}
            <div>
              <h4 className="text-sm tracking-wide text-white/50 font-semibold mb-3">
                Privacy & Data
              </h4>
              <p className="text-sm text-white/40 leading-relaxed">
                Your responses are encrypted and stored securely. We never sell your personal health information. All data processing follows HIPAA guidelines and industry best practices for health data security.{" "}
                <span className="text-terracotta hover:underline cursor-pointer">
                  Privacy Policy
                </span>
              </p>
            </div>
          </div>

          {/* Logo / Footer */}
          <div className="mt-12 pt-8 border-t border-white/10 flex justify-center">
            <Link to="/" className="flex items-center gap-2 text-white/50 hover:text-white/70 transition-colors">
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
