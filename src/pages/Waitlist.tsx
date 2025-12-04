import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const tierLabels: Record<string, string> = {
  basic: "Basic Report",
  guided: "Guided Analysis",
  expert: "Expert Consultation",
};

const willingnessOptions = [
  { value: "yes_definitely", label: "Yes, definitely" },
  { value: "yes_probably", label: "Yes, probably" },
  { value: "maybe", label: "Maybe, depends on details" },
  { value: "probably_not", label: "Probably not" },
];

const subscriptionOptions = [
  { value: "one_time_better", label: "No, one-time payment is better" },
  { value: "monthly", label: "Yes, monthly subscription (~$15-29/month)" },
  { value: "annual", label: "Yes, annual subscription (~$149-249/year)" },
  { value: "not_sure", label: "Not sure, tell me more about both options" },
];

const Waitlist = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { tier = "guided", price = 149 } = location.state || {};
  
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [willingnessToPay, setWillingnessToPay] = useState("");
  const [subscriptionPreference, setSubscriptionPreference] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isFormValid = firstName.trim() && email.trim() && willingnessToPay && subscriptionPreference;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isFormValid) {
      toast({
        title: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Get UTM parameters from URL
    const urlParams = new URLSearchParams(window.location.search);
    const utmSource = urlParams.get('utm_source');
    const utmCampaign = urlParams.get('utm_campaign');

    const { error } = await supabase
      .from('waitlist_signups')
      .insert({
        first_name: firstName.trim(),
        email: email.trim().toLowerCase(),
        selected_tier: tier,
        selected_price: price,
        willingness_to_pay: willingnessToPay,
        subscription_preference: subscriptionPreference,
        utm_source: utmSource,
        utm_campaign: utmCampaign,
      });

    setIsSubmitting(false);

    if (error) {
      if (error.code === '23505') {
        toast({
          title: "You're already on the waitlist!",
          description: "Check your email for confirmation.",
        });
      } else {
        toast({
          title: "Something went wrong",
          description: "Please try again.",
          variant: "destructive",
        });
      }
      return;
    }
    
    navigate('/thank-you', { state: { firstName } });
  };

  return (
    <div className="min-h-screen bg-background py-8 md:py-16 px-4 md:px-6">
      <div className="max-w-[600px] mx-auto">
        {/* Back link */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to results
        </button>

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 border border-muted-foreground/30 text-muted-foreground px-4 py-2 rounded-full text-sm font-medium tracking-wide uppercase mb-6">
            Early Access
          </div>
          <h1 className="font-display text-3xl md:text-[42px] text-foreground mb-6 leading-tight">
            Join the Waitlist
          </h1>
          <p className="text-lg md:text-xl text-foreground/80 font-medium mb-4">
            You selected: {tierLabels[tier]} - ${price}
          </p>
          <p className="text-base text-muted-foreground">
            Launching Q1 2026 - Reserve your spot for early access pricing
          </p>
        </div>

        {/* Form Card */}
        <form onSubmit={handleSubmit} className="bg-card rounded-[20px] shadow-lg p-8 md:p-12">
          {/* First Name */}
          <div className="mb-6">
            <label htmlFor="firstName" className="block text-sm font-semibold text-foreground mb-2">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Enter your first name"
              className="w-full h-12 px-4 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-terracotta transition-all"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@example.com"
              className="w-full h-12 px-4 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-terracotta transition-all"
              required
            />
          </div>

          {/* Selected Plan (Read-only) */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-foreground mb-2">
              Selected Plan
            </label>
            <div className="w-full px-4 py-4 rounded-xl border border-border/50 bg-muted/50 text-foreground/80">
              {tierLabels[tier]} - ${price} one-time
            </div>
          </div>

          {/* Question 1: Willingness to Pay */}
          <div className="mb-8">
            <label className="block text-base font-semibold text-foreground mb-3">
              Would you pay ${price} for this service when we launch?
            </label>
            <div className="space-y-3">
              {willingnessOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setWillingnessToPay(option.value)}
                  className={cn(
                    "w-full px-4 py-4 rounded-xl border text-left transition-all duration-200",
                    "hover:bg-muted/50 hover:-translate-y-0.5",
                    willingnessToPay === option.value
                      ? "border-terracotta border-2 bg-terracotta/5"
                      : "border-border bg-card"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors",
                      willingnessToPay === option.value
                        ? "border-terracotta bg-terracotta"
                        : "border-muted-foreground/40"
                    )}>
                      {willingnessToPay === option.value && (
                        <div className="w-2 h-2 rounded-full bg-white" />
                      )}
                    </div>
                    <span className="text-foreground">{option.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Question 2: Subscription Preference */}
          <div className="mb-10">
            <label className="block text-base font-semibold text-foreground mb-1">
              Would you prefer a subscription option instead?
            </label>
            <p className="text-sm text-muted-foreground italic mb-3">
              Annual monitoring with ongoing risk updates
            </p>
            <div className="space-y-3">
              {subscriptionOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setSubscriptionPreference(option.value)}
                  className={cn(
                    "w-full px-4 py-4 rounded-xl border text-left transition-all duration-200",
                    "hover:bg-muted/50 hover:-translate-y-0.5",
                    subscriptionPreference === option.value
                      ? "border-terracotta border-2 bg-terracotta/5"
                      : "border-border bg-card"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors",
                      subscriptionPreference === option.value
                        ? "border-terracotta bg-terracotta"
                        : "border-muted-foreground/40"
                    )}>
                      {subscriptionPreference === option.value && (
                        <div className="w-2 h-2 rounded-full bg-white" />
                      )}
                    </div>
                    <span className="text-foreground">{option.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!isFormValid || isSubmitting}
            className={cn(
              "w-full h-14 rounded-full font-semibold text-lg transition-all duration-250",
              isFormValid && !isSubmitting
                ? "bg-terracotta text-white hover:bg-terracotta-light hover:-translate-y-1 hover:shadow-lg"
                : "bg-muted text-muted-foreground cursor-not-allowed"
            )}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                Reserving...
              </span>
            ) : (
              "Reserve My Spot"
            )}
          </button>

          {/* Fine print */}
          <p className="text-center text-[13px] text-muted-foreground mt-4">
            By joining, you agree to our{" "}
            <Link to="/privacy" className="underline hover:text-foreground transition-colors">
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link to="/terms" className="underline hover:text-foreground transition-colors">
              Terms of Service
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Waitlist;
