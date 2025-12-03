import { Shield, Brain, Award } from "lucide-react";

const TrustSection = () => {
  return (
    <section className="py-24 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
            <span className="italic">Testing is</span> easy
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Developed with Stanford Medicine physicians using evidence-based screening guidelines.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center p-8">
            <div className="text-terracotta text-sm font-semibold mb-4">01</div>
            <div className="w-16 h-16 rounded-full bg-sand flex items-center justify-center mx-auto mb-6">
              <Brain className="w-7 h-7 text-earth" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-3">Answer questions</h3>
            <p className="text-muted-foreground">
              Complete a brief assessment about your family health history
            </p>
          </div>

          <div className="text-center p-8">
            <div className="text-terracotta text-sm font-semibold mb-4">02</div>
            <div className="w-16 h-16 rounded-full bg-sand flex items-center justify-center mx-auto mb-6">
              <Shield className="w-7 h-7 text-earth" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-3">Get your results</h3>
            <p className="text-muted-foreground">
              Receive personalized insights based on established medical criteria
            </p>
          </div>

          <div className="text-center p-8">
            <div className="text-terracotta text-sm font-semibold mb-4">03</div>
            <div className="w-16 h-16 rounded-full bg-sand flex items-center justify-center mx-auto mb-6">
              <Award className="w-7 h-7 text-earth" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-3">Take action</h3>
            <p className="text-muted-foreground">
              Share findings with your healthcare provider for next steps
            </p>
          </div>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-8 pt-8 border-t border-border">
          <div className="flex items-center gap-3 text-muted-foreground">
            <Shield className="w-5 h-5" />
            <span className="text-sm font-medium">HIPAA Compliant</span>
          </div>
          <div className="flex items-center gap-3 text-muted-foreground">
            <Award className="w-5 h-5" />
            <span className="text-sm font-medium">Evidence-Based</span>
          </div>
          <div className="flex items-center gap-3 text-muted-foreground">
            <Brain className="w-5 h-5" />
            <span className="text-sm font-medium">AI-Powered Analysis</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
