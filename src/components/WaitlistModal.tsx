import { useState, useEffect, useRef } from "react";
import { X, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { track } from "@/lib/analytics";

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  tierName: string;
  tierPrice: number;
}

const WaitlistModal = ({ isOpen, onClose, tierName, tierPrice }: WaitlistModalProps) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [isAlreadyRegistered, setIsAlreadyRegistered] = useState(false);
  const emailInputRef = useRef<HTMLInputElement>(null);

  // Focus email input when modal opens
  useEffect(() => {
    if (isOpen && emailInputRef.current) {
      setTimeout(() => emailInputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

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
    setIsAlreadyRegistered(false);

    try {
      // Get UTM parameters from URL
      const urlParams = new URLSearchParams(window.location.search);
      const utmSource = urlParams.get("utm_source");
      const utmCampaign = urlParams.get("utm_campaign");

      track("waitlist_submit_attempt", {
        email_present: !!email,
        first_name_present: !!firstName,
        selected_tier: tierName,
        selected_price: tierPrice,
      });

      const { error } = await supabase
        .from("waitlist_signups")
        .insert({
          email: email.trim().toLowerCase(),
          first_name: firstName.trim() || null,
          selected_tier: tierName,
          selected_price: tierPrice,
          utm_source: utmSource,
          utm_campaign: utmCampaign,
        });

      if (error) {
        track("waitlist_submit_error", { code: error.code, message: error.message });
        if (error.code === "23505") {
          setIsAlreadyRegistered(true);
        } else {
          setSubmitError("Something went wrong. Please try again.");
        }
        return;
      }

      track("waitlist_submit", {
        selected_tier: tierName,
        selected_price: tierPrice,
      });

      // Success - close modal and navigate to thank you
      onClose();
      navigate("/thank-you", { state: { firstName: firstName.trim() } });
    } catch (err) {
      track("waitlist_submit_exception");
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setEmail("");
    setFirstName("");
    setEmailError("");
    setSubmitError("");
    setIsAlreadyRegistered(false);
    onClose();
  };

  const isFormValid = email && validateEmail(email) && !isAlreadyRegistered;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
        onClick={handleClose}
        style={{ animationDuration: "200ms" }}
      />
      
      {/* Modal */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div 
          className="relative bg-white rounded-3xl shadow-2xl w-full max-w-[520px] max-h-[90vh] overflow-y-auto animate-scale-in"
          style={{ animationDuration: "300ms" }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:scale-110 transition-all z-10"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Content */}
          <div className="p-8 md:p-12">
            {/* Header */}
            <div className="text-center mb-8">
              <span className="inline-block px-4 py-1.5 text-[11px] tracking-[0.15em] uppercase text-gray-600 border border-gray-300 rounded-full mb-4">
                Early Access
              </span>
              
              <h2 id="modal-title" className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                Join the Waitlist
              </h2>
              
              <p className="text-lg text-muted-foreground mb-2">
                You selected: <span className="font-medium text-foreground">{tierName} - ${tierPrice}</span>
              </p>
              
              <p className="text-sm text-muted-foreground">
                Launching Q1 2026 — Early access pricing
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
                  ref={emailInputRef}
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailError("");
                    setIsAlreadyRegistered(false);
                  }}
                  onBlur={handleEmailBlur}
                  placeholder="your.email@example.com"
                  className={`w-full h-[52px] px-4 text-base rounded-xl border transition-colors focus:outline-none ${
                    emailError 
                      ? "border-red-500 focus:border-red-500" 
                      : "border-gray-300 focus:border-terracotta focus:ring-2 focus:ring-terracotta/20"
                  }`}
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
                  className="w-full h-[52px] px-4 text-base rounded-xl border border-gray-300 transition-colors focus:outline-none focus:border-terracotta focus:ring-2 focus:ring-terracotta/20"
                />
              </div>

              {/* Already registered message */}
              {isAlreadyRegistered && (
                <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 text-sm text-blue-700">
                  You're already on the waitlist! Check your email for details.
                </div>
              )}

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
                className={`w-full h-14 rounded-full text-lg font-semibold transition-all ${
                  isFormValid && !isSubmitting
                    ? "bg-terracotta text-white hover:-translate-y-1 hover:shadow-xl"
                    : "bg-gray-300 text-gray-600 cursor-not-allowed"
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Reserving...
                  </span>
                ) : isAlreadyRegistered ? (
                  "Already Registered"
                ) : (
                  "Reserve My Spot"
                )}
              </button>

              {/* Footer text */}
              <p className="text-center text-[13px] text-muted-foreground leading-relaxed pt-2">
                Launching Q1 2026. Early access pricing.
                <br />
                By joining, you agree to our{" "}
                <a href="/privacy" className="text-gray-700 hover:underline">Privacy Policy</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitlistModal;
