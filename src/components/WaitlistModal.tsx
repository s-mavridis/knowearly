import { useState, useEffect, useRef } from "react";
import { X, Loader2, FileText, Shield } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { track } from "@/lib/analytics";

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  tierName: string;
  tierPrice: number;
  userEmail: string;
  userFirstName?: string;
}

const WaitlistModal = ({ isOpen, onClose, tierName, tierPrice, userEmail, userFirstName }: WaitlistModalProps) => {
  const navigate = useNavigate();
  const [ehrConsent, setEhrConsent] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const ehrCheckboxRef = useRef<HTMLInputElement>(null);

  // Focus first checkbox when modal opens
  useEffect(() => {
    if (isOpen && ehrCheckboxRef.current) {
      setTimeout(() => ehrCheckboxRef.current?.focus(), 100);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!ehrConsent || !termsAccepted) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      track("waitlist_consent_submit", {
        selected_tier: tierName,
        selected_price: tierPrice,
        ehr_consent: ehrConsent,
        terms_accepted: termsAccepted,
      });

      // Update the existing waitlist row with the tier selection and consent
      const { error } = await supabase
        .from("waitlist_signups")
        .update({
          selected_tier: tierName,
          selected_price: tierPrice,
          ehr_consent: ehrConsent,
          ehr_consent_at: new Date().toISOString(),
          terms_accepted: termsAccepted,
          terms_accepted_at: new Date().toISOString(),
        } as any)
        .eq("email", userEmail);

      if (error) {
        track("waitlist_consent_error", { code: error.code, message: error.message });
        setSubmitError("Something went wrong. Please try again.");
        return;
      }

      track("waitlist_consent_success", {
        selected_tier: tierName,
        selected_price: tierPrice,
      });

      // Success - close modal and navigate to thank you
      onClose();
      navigate("/thank-you", { state: { firstName: userFirstName } });
    } catch (err) {
      track("waitlist_consent_exception");
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setEhrConsent(false);
    setTermsAccepted(false);
    setSubmitError("");
    onClose();
  };

  const isFormValid = ehrConsent && termsAccepted;

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
          <div className="p-8 md:p-10">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-terracotta/10 mb-4">
                <Shield className="w-8 h-8 text-terracotta" />
              </div>
              
              <h2 id="modal-title" className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                Complete Your Reservation
              </h2>
              
              <p className="text-lg text-muted-foreground mb-2">
                <span className="font-medium text-foreground">{tierName}</span> — ${tierPrice}
              </p>
              
              <p className="text-sm text-muted-foreground">
                One final step to reserve your spot
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* EHR Consent checkbox */}
              <div className="bg-cream rounded-2xl p-5 border border-border">
                <label className="flex items-start gap-4 cursor-pointer">
                  <input
                    ref={ehrCheckboxRef}
                    type="checkbox"
                    checked={ehrConsent}
                    onChange={(e) => setEhrConsent(e.target.checked)}
                    className="mt-1 w-5 h-5 rounded border-gray-300 text-terracotta focus:ring-terracotta cursor-pointer"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <FileText className="w-4 h-4 text-terracotta" />
                      <span className="font-semibold text-foreground">EHR Data Access Consent</span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      I consent to ArtemisAI accessing my electronic health records (EHR) to provide personalized cancer screening recommendations. This data will be encrypted and handled in accordance with HIPAA guidelines.
                    </p>
                  </div>
                </label>
              </div>

              {/* Terms checkbox */}
              <div className="bg-cream rounded-2xl p-5 border border-border">
                <label className="flex items-start gap-4 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    className="mt-1 w-5 h-5 rounded border-gray-300 text-terracotta focus:ring-terracotta cursor-pointer"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Shield className="w-4 h-4 text-terracotta" />
                      <span className="font-semibold text-foreground">Terms & Conditions</span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      I agree to the{" "}
                      <a href="/terms" className="text-terracotta hover:underline">Terms of Service</a>
                      {" "}and{" "}
                      <a href="/privacy" className="text-terracotta hover:underline">Privacy Policy</a>.
                      I understand that ArtemisAI provides educational guidance and is not a substitute for medical advice.
                    </p>
                  </div>
                </label>
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
                className={`w-full h-14 rounded-full text-lg font-semibold transition-all ${
                  isFormValid && !isSubmitting
                    ? "bg-terracotta text-white hover:-translate-y-1 hover:shadow-xl"
                    : "bg-gray-300 text-gray-600 cursor-not-allowed"
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Confirming...
                  </span>
                ) : (
                  "Confirm & Reserve My Spot"
                )}
              </button>

              {/* Footer text */}
              <p className="text-center text-[13px] text-muted-foreground leading-relaxed">
                Launching Q1 2026. Your data is encrypted and secure.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitlistModal;
