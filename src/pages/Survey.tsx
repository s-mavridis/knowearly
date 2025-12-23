import { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { ArrowRight, Loader2, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { initSession, track, trackPageView } from "@/lib/analytics";

const Survey = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Try to get email from state first, then fallback to sessionStorage
  const userEmail = location.state?.email || sessionStorage.getItem("waitlist_email") || "";
  const firstName = location.state?.firstName || sessionStorage.getItem("waitlist_firstName") || "";

  const [willingnessToPay, setWillingnessToPay] = useState("");
  const [screeningBarrier, setScreeningBarrier] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    initSession();
    trackPageView("survey");
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!willingnessToPay || !screeningBarrier) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      track("survey_submit", {
        willingness_to_pay: willingnessToPay,
        screening_barrier: screeningBarrier,
      });

      // Only update database if we have an email
      if (userEmail) {
        const { error } = await supabase
          .from("waitlist_signups")
          .update({
            willingness_to_pay: willingnessToPay,
            subscription_preference: screeningBarrier,
          } as any)
          .eq("email", userEmail);

        if (error) {
          track("survey_error", { code: error.code });
          console.warn("Survey update error:", error);
        }
      }

      track("survey_success");
      setIsComplete(true);
    } catch (err) {
      track("survey_exception");
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const wtpOptions = [
    { id: "yes-definitely", label: "Yes, definitely" },
    { id: "yes-probably", label: "Yes, probably" },
    { id: "not-sure", label: "Not sure" },
    { id: "no", label: "No" },
  ];

  const barrierOptions = [
    { id: "cost", label: "Cost" },
    { id: "time-scheduling", label: "Time / scheduling" },
    { id: "access-providers", label: "Access to providers" },
    { id: "unsure-what-to-do", label: "Unsure what to do" },
  ];

  const isFormValid = willingnessToPay && screeningBarrier;

  // Success state
  if (isComplete) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center px-6">
        <div className="max-w-[500px] text-center">
          <div className="mb-6">
            <CheckCircle className="w-20 h-20 text-sage mx-auto" strokeWidth={1.5} />
          </div>
          
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Thank you for your feedback!
          </h1>
          
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            Your responses help us build a better cancer screening experience for everyone.
          </p>

          <Link
            to="/"
            className="inline-block bg-terracotta text-white text-base font-semibold px-8 py-3.5 rounded-full hover:-translate-y-1 hover:shadow-lg transition-all duration-250"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-[600px]">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
            Quick Survey
          </h1>
          <p className="text-lg text-muted-foreground">
            Help us understand your needs better
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Question 1: Willingness to Pay */}
          <div className="bg-card rounded-2xl shadow-lg border border-border p-6 md:p-8">
            <h2 className="text-xl font-semibold text-foreground mb-5">
              Would you pay out of pocket for this service?
            </h2>
            
            <div className="space-y-3">
              {wtpOptions.map((option) => (
                <label
                  key={option.id}
                  className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${
                    willingnessToPay === option.id
                      ? "border-terracotta bg-terracotta/5"
                      : "border-border hover:border-terracotta/50 bg-background"
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    willingnessToPay === option.id
                      ? "border-terracotta"
                      : "border-muted-foreground/40"
                  }`}>
                    {willingnessToPay === option.id && (
                      <div className="w-2.5 h-2.5 rounded-full bg-terracotta" />
                    )}
                  </div>
                  <input
                    type="radio"
                    name="willingnessToPay"
                    value={option.id}
                    checked={willingnessToPay === option.id}
                    onChange={(e) => setWillingnessToPay(e.target.value)}
                    className="sr-only"
                  />
                  <span className="text-foreground font-medium">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Question 2: Biggest Barrier */}
          <div className="bg-card rounded-2xl shadow-lg border border-border p-6 md:p-8">
            <h2 className="text-xl font-semibold text-foreground mb-5">
              Biggest barrier to getting screened?
            </h2>
            
            <div className="space-y-3">
              {barrierOptions.map((option) => (
                <label
                  key={option.id}
                  className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${
                    screeningBarrier === option.id
                      ? "border-terracotta bg-terracotta/5"
                      : "border-border hover:border-terracotta/50 bg-background"
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    screeningBarrier === option.id
                      ? "border-terracotta"
                      : "border-muted-foreground/40"
                  }`}>
                    {screeningBarrier === option.id && (
                      <div className="w-2.5 h-2.5 rounded-full bg-terracotta" />
                    )}
                  </div>
                  <input
                    type="radio"
                    name="screeningBarrier"
                    value={option.id}
                    checked={screeningBarrier === option.id}
                    onChange={(e) => setScreeningBarrier(e.target.value)}
                    className="sr-only"
                  />
                  <span className="text-foreground font-medium">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Submit error */}
          {submitError && (
            <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700">
              {submitError}
            </div>
          )}

          {/* Submit button */}
          <button
            type="submit"
            disabled={!isFormValid || isSubmitting}
            className={`w-full h-14 rounded-full text-lg font-semibold transition-all flex items-center justify-center gap-2 ${
              isFormValid && !isSubmitting
                ? "bg-terracotta text-white hover:-translate-y-1 hover:shadow-xl"
                : "bg-muted text-muted-foreground cursor-not-allowed"
            }`}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                Submit
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Survey;
