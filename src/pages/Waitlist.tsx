import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Check, Mail, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

const tierLabels: Record<string, string> = {
  basic: "Basic Report",
  guided: "Guided Analysis",
  expert: "Expert Consultation",
};

const Waitlist = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { tier = "guided", price = 149 } = location.state || {};
  
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !name) {
      toast({
        title: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    toast({
      title: "You're on the list!",
      description: "We'll notify you when we launch.",
    });
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 rounded-full bg-sage/20 flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-sage" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl text-foreground mb-4">
            You're on the list!
          </h1>
          <p className="text-muted-foreground mb-8">
            We've reserved your spot for the <span className="text-foreground font-semibold">{tierLabels[tier]}</span> tier at <span className="text-foreground font-semibold">${price}</span>. We'll email you when we launch in Q1 2026.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-terracotta hover:text-terracotta-light transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12 md:py-20 px-6">
      <div className="max-w-lg mx-auto">
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
          <div className="inline-flex items-center gap-2 bg-terracotta/10 text-terracotta px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Early Access
          </div>
          <h1 className="font-display text-3xl md:text-4xl text-foreground mb-3">
            Join the Waitlist
          </h1>
          <p className="text-muted-foreground">
            Be first to access personalized cancer screening guidance.
          </p>
        </div>

        {/* Selected tier card */}
        <div className="bg-card rounded-2xl border border-border p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Selected Plan</p>
              <p className="text-xl font-semibold text-foreground">{tierLabels[tier]}</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-foreground">${price}</p>
              <p className="text-sm text-muted-foreground">/one-time</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full h-12 px-4 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-terracotta/50 focus:border-terracotta transition-all"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full h-12 pl-12 pr-4 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-terracotta/50 focus:border-terracotta transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={cn(
              "w-full h-14 rounded-full font-semibold text-base transition-all duration-250",
              "bg-terracotta text-white hover:bg-terracotta-light",
              "hover:-translate-y-1 hover:shadow-lg",
              isSubmitting && "opacity-70 cursor-not-allowed"
            )}
          >
            {isSubmitting ? "Joining..." : "Reserve My Spot"}
          </button>
        </form>

        {/* Fine print */}
        <p className="text-center text-sm text-muted-foreground mt-6">
          No payment required now. We'll notify you when we launch.
        </p>

        {/* Benefits */}
        <div className="mt-10 pt-8 border-t border-border">
          <p className="text-sm font-medium text-foreground mb-4">Early access benefits:</p>
          <ul className="space-y-3">
            {[
              "Lock in early access pricing",
              "Priority onboarding",
              "Shape the product with your feedback",
            ].map((benefit, i) => (
              <li key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                <Check className="w-4 h-4 text-terracotta shrink-0" />
                {benefit}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Waitlist;
