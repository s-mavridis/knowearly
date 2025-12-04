import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const tierLabels: Record<string, string> = {
  basic: "Basic Report",
  guided: "Guided Analysis",
  expert: "Expert Consultation",
};

const Waitlist = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // Get tier info from URL params
  const tier = searchParams.get("tier") || "guided";
  const price = parseInt(searchParams.get("price") || "149", 10);
  const utmSource = searchParams.get("utm_source") || null;
  const utmCampaign = searchParams.get("utm_campaign") || null;
  
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [alreadyRegistered, setAlreadyRegistered] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const validateEmail = (email: string) => {
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
    setAlreadyRegistered(false);

    try {
      const { error } = await supabase
        .from("waitlist_signups")
        .insert({
          email: email.trim().toLowerCase(),
          first_name: firstName.trim() || null,
          selected_tier: tierLabels[tier] || tier,
          selected_price: price,
          utm_source: utmSource,
          utm_campaign: utmCampaign,
        });

      if (error) {
        if (error.code === "23505") {
          setAlreadyRegistered(true);
        } else {
          console.error("Error submitting to waitlist:", error);
          setSubmitError("Something went wrong. Please try again.");
        }
        setIsSubmitting(false);
        return;
      }

      navigate(`/thank-you?name=${encodeURIComponent(firstName.trim())}`);
    } catch (error) {
      console.error("Error:", error);
      setSubmitError("Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  };

  const isFormValid = email && validateEmail(email) && !alreadyRegistered;

  return (
    <div className="min-h-screen bg-cream">
      <div className="max-w-[500px] mx-auto px-5 py-16 md:py-24">
        {/* Header Section */}
        <div className="text-center mb-10">
          {/* Early Access Badge */}
          <span className="inline-block px-4 py-2 text-xs font-medium tracking-widest uppercase text-muted-foreground border border-muted-foreground/30 rounded-full mb-5">
            Early Access
          </span>
          
          {/* Main Heading */}
          <h1 className="font-display text-4xl md:text-[42px] font-bold text-navy mb-4">
            Join the Waitlist
          </h1>
          
          {/* Selected Plan */}
          <p className="text-lg md:text-xl font-medium text-foreground/80 mb-3">
            You selected: {tierLabels[tier] || tier} - ${price}
          </p>
          
          {/* Subheading */}
          <p className="text-base text-muted-foreground">
            Launching Q1 2026 — Reserve your spot for early access pricing
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-[20px] shadow-lg p-8 md:p-12 max-w-[450px] mx-auto">
          <form onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="mb-5">
              <label htmlFor="email" className="block text-sm font-semibold text-navy mb-2">
                Email address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError("");
                  setAlreadyRegistered(false);
                }}
                onBlur={handleEmailBlur}
                placeholder="your.email@example.com"
                className={`w-full h-[52px] px-4 text-base rounded-xl border transition-all duration-200 outline-none bg-background ${
                  emailError 
                    ? "border-red-500 focus:border-red-500" 
                    : "border-border focus:border-terracotta focus:border-2"
                }`}
              />
              {emailError && (
                <p className="text-red-500 text-sm mt-2">{emailError}</p>
              )}
            </div>

            {/* First Name Field (Optional) */}
            <div className="mb-8">
              <label htmlFor="firstName" className="block text-sm font-semibold text-navy mb-2">
                First name (optional)
              </label>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter your first name"
                className="w-full h-[52px] px-4 text-base rounded-xl border border-border bg-background focus:border-terracotta focus:border-2 transition-all duration-200 outline-none"
              />
            </div>

            {/* Already Registered Message */}
            {alreadyRegistered && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 text-center">
                <p className="text-blue-700 text-sm">
                  You're already on the waitlist! Check your email for details.
                </p>
              </div>
            )}

            {/* Submit Error */}
            {submitError && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 text-center">
                <p className="text-red-700 text-sm">{submitError}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!isFormValid || isSubmitting}
              className={`w-full h-14 rounded-full text-lg font-semibold transition-all duration-250 ${
                isFormValid && !isSubmitting
                  ? "bg-terracotta text-white hover:-translate-y-1 hover:shadow-xl hover:brightness-105 cursor-pointer"
                  : alreadyRegistered
                  ? "bg-blue-100 text-blue-600 cursor-not-allowed"
                  : "bg-muted text-muted-foreground cursor-not-allowed"
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Reserving...
                </span>
              ) : alreadyRegistered ? (
                "Already Registered"
              ) : (
                "Reserve My Spot"
              )}
            </button>
          </form>

          {/* Footer Text */}
          <p className="text-center text-[13px] text-muted-foreground mt-6 leading-relaxed">
            Launching Q1 2026. Early access pricing for first members.
            <br />
            By joining, you agree to our{" "}
            <a href="#" className="text-foreground/80 hover:underline">
              Privacy Policy
            </a>{" "}
            and{" "}
            <a href="#" className="text-foreground/80 hover:underline">
              Terms of Service
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Waitlist;