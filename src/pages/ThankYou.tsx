import { useLocation, Link, useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const ThankYou = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const firstName = location.state?.firstName || "";
  const email = location.state?.email || "";

  const handleTakeSurvey = () => {
    navigate("/survey", { state: { email, firstName } });
  };

  return (
    <div className="min-h-screen bg-cream">
      <div className="max-w-[600px] mx-auto px-5 py-16 md:py-24 text-center">
        {/* Success Icon */}
        <div className="mb-6">
          <CheckCircle className="w-20 h-20 text-terracotta mx-auto" strokeWidth={1.5} />
        </div>

        {/* Main Heading */}
        <h1 className="font-display text-4xl md:text-5xl font-bold text-navy mb-4">
          You're on the list! 🎉
        </h1>

        {/* Personalized Message */}
        {firstName && (
          <p className="text-xl md:text-2xl text-foreground/80 mb-4">
            Thanks for joining, {firstName}!
          </p>
        )}

        {/* Body Text */}
        <p className="text-lg text-foreground/80 leading-relaxed max-w-[500px] mx-auto mb-8">
          We're launching in Q1 2026, and you'll be among the first to know.
        </p>

        {/* Divider */}
        <div className="border-t border-border my-10" />

        {/* Survey CTA Card */}
        <div className="bg-white rounded-2xl shadow-md p-8 max-w-[450px] mx-auto">
          <h2 className="text-xl font-semibold text-navy mb-3">
            Help Us Build the Right Solution
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed mb-6">
            Take our 2-minute survey to help us create the best cancer screening experience.
          </p>
          <button
            onClick={handleTakeSurvey}
            className="inline-block bg-terracotta text-white text-base font-semibold px-8 py-3.5 rounded-full hover:-translate-y-1 hover:shadow-lg transition-all duration-250"
          >
            Take Survey
          </button>
        </div>

        {/* Contact Info */}
        <p className="text-sm text-muted-foreground mt-10">
          Questions? Email us at{" "}
          <a
            href="mailto:hello@artemisai.com"
            className="text-foreground/80 hover:underline"
          >
            hello@artemisai.com
          </a>
        </p>

        {/* Back to Home Link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mt-8"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ThankYou;
