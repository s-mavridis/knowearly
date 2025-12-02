import { Shield, Lock, GraduationCap } from "lucide-react";

const TrustSection = () => {
  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="glass rounded-2xl p-8 md:p-10">
          {/* Main trust indicator */}
          <div className="flex flex-col items-center justify-center gap-2 mb-8">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-electric-blue" />
              <p className="text-sm md:text-base text-muted-foreground font-medium">
                Developed with{" "}
                <span className="text-primary font-semibold">Stanford Medicine</span>
                {" "}physicians
              </p>
            </div>
            <p className="text-xs text-muted-foreground/60">
              Evidence-based risk assessment methodology
            </p>
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center p-5 rounded-xl border border-border/60 bg-background/50">
              <div className="w-12 h-12 rounded-xl bg-electric-blue/10 flex items-center justify-center mb-3">
                <Shield className="w-6 h-6 text-electric-blue" />
              </div>
              <h3 className="font-semibold text-primary text-sm mb-1">Evidence-Based</h3>
              <p className="text-xs text-muted-foreground">
                Built on peer-reviewed clinical guidelines
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-5 rounded-xl border border-border/60 bg-background/50">
              <div className="w-12 h-12 rounded-xl bg-electric-blue/10 flex items-center justify-center mb-3">
                <Lock className="w-6 h-6 text-electric-blue" />
              </div>
              <h3 className="font-semibold text-primary text-sm mb-1">HIPAA Compliant</h3>
              <p className="text-xs text-muted-foreground">
                Your health information stays private
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-5 rounded-xl border border-border/60 bg-background/50">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              <h3 className="font-semibold text-primary text-sm mb-1">AI-Powered</h3>
              <p className="text-xs text-muted-foreground">
                Personalized risk analysis in minutes
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
