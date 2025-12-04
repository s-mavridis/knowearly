import { useLocation, Link } from "react-router-dom";
import { CheckCircle, ArrowRight } from "lucide-react";

const ThankYou = () => {
  const location = useLocation();
  const { firstName = "there" } = location.state || {};

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 md:px-6">
      <div className="max-w-[540px] w-full text-center">
        {/* Success Icon */}
        <div className="w-20 h-20 rounded-full bg-terracotta/10 flex items-center justify-center mx-auto mb-8">
          <CheckCircle className="w-10 h-10 text-terracotta" />
        </div>

        {/* Heading */}
        <h1 className="font-display text-3xl md:text-4xl text-foreground mb-4">
          You're on the list!
        </h1>

        {/* Body Text */}
        <div className="text-muted-foreground space-y-4 mb-10">
          <p className="text-lg">
            Thanks for joining the ArtemisAI waitlist, <span className="text-foreground font-medium">{firstName}</span>!
          </p>
          <p>
            We're launching in Q1 2026, and you'll be among the first to know.
          </p>
          <p>
            Check your email for confirmation and next steps.
          </p>
        </div>

        {/* Survey CTA */}
        <div className="bg-card rounded-2xl border border-border p-6 md:p-8 mb-8">
          <p className="text-foreground font-medium mb-4">
            Help us build the right solution
          </p>
          <a
            href="https://forms.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 w-full h-12 rounded-full bg-terracotta text-white font-semibold hover:bg-terracotta-light hover:-translate-y-0.5 hover:shadow-lg transition-all duration-250"
          >
            Take 3-Minute Survey
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Contact Info */}
        <p className="text-sm text-muted-foreground">
          Questions? Reply to the welcome email or contact us at{" "}
          <a 
            href="mailto:hello@artemisai.com" 
            className="text-terracotta hover:underline"
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
