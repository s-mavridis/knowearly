import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowRight, Loader2, Shield } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { initSession, track, trackPageView } from "@/lib/analytics";

const EmailCapture = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const answers = location.state?.answers || {};
  
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    initSession();
    trackPageView("email_capture");
    
    // Redirect to quiz if no answers
    if (Object.keys(answers).length === 0) {
      navigate("/quiz");
    }
  }, [answers, navigate]);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailBlur = () => {
    if (email && !validateEmail(email)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const urlParams = new URLSearchParams(window.location.search);
      const utmSource = urlParams.get("utm_source");
      const utmCampaign = urlParams.get("utm_campaign");

      track("email_capture_submit", {
        email_present: !!email,
        first_name_present: !!firstName,
      });

      // Insert into waitlist_signups with default tier (will be updated when they select a plan)
      const { error } = await supabase
        .from("waitlist_signups")
        .insert({
          email: email.trim().toLowerCase(),
          first_name: firstName.trim() || null,
          selected_tier: "pending",
          selected_price: 0,
          utm_source: utmSource,
          utm_campaign: utmCampaign,
        });

      if (error) {
        // If duplicate email, that's fine - just proceed
        if (error.code === "23505") {
          track("email_capture_existing_user");
        } else {
          track("email_capture_error", { code: error.code });
          setSubmitError("Something went wrong. Please try again.");
          return;
        }
      }

      track("email_capture_success");
      
      // Navigate to results with answers and email
      navigate("/results", { 
        state: { 
          answers, 
          email: email.trim().toLowerCase(),
          firstName: firstName.trim()
        } 
      });
    } catch (err) {
      track("email_capture_exception");
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = email && validateEmail(email);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-cream">
      {/* Main content */}
      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-[480px]">
          {/* Card */}
          <div className="bg-card rounded-3xl shadow-xl border border-border p-8 md:p-10">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-terracotta/10 mb-6">
                <Shield className="w-8 h-8 text-terracotta" />
              </div>
              
              <h1 className="font-display text-2xl md:text-3xl text-foreground mb-3">
                Your Results Are Ready
              </h1>
              
              <p className="text-muted-foreground leading-relaxed">
                Enter your email to view your personalized risk assessment and save your results.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email field */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2">
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailError("");
                  }}
                  onBlur={handleEmailBlur}
                  placeholder="your.email@example.com"
                  className={`w-full h-[52px] px-4 text-base rounded-xl border transition-colors focus:outline-none bg-background ${
                    emailError 
                      ? "border-red-500 focus:border-red-500" 
                      : "border-border focus:border-terracotta focus:ring-2 focus:ring-terracotta/20"
                  }`}
                  autoFocus
                />
                {emailError && (
                  <p className="mt-2 text-sm text-red-500">{emailError}</p>
                )}
              </div>

              {/* First name field */}
              <div>
                <label htmlFor="firstName" className="block text-sm font-semibold text-foreground mb-2">
                  First name <span className="font-normal text-muted-foreground">(optional)</span>
                </label>
                <input
                  type="text"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Enter your first name"
                  className="w-full h-[52px] px-4 text-base rounded-xl border border-border transition-colors focus:outline-none bg-background focus:border-terracotta focus:ring-2 focus:ring-terracotta/20"
                />
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
                    Loading Results...
                  </>
                ) : (
                  <>
                    View My Results
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>

              {/* Privacy note */}
              <p className="text-center text-[13px] text-muted-foreground leading-relaxed pt-2">
                Your information is encrypted and secure.
                <br />
                We'll never share your data.{" "}
                <a href="/privacy" className="text-foreground hover:underline">Privacy Policy</a>
              </p>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EmailCapture;
