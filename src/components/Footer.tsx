import { Shield } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-20 px-6 border-t border-border/50">
      <div className="max-w-4xl mx-auto">
        {/* Logo and description */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-terracotta flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xs">A</span>
            </div>
            <span className="text-lg font-semibold text-primary">ArtemisAI</span>
          </div>
          <p className="text-sm text-muted-foreground max-w-md mb-4">
            Empowering individuals with personalized cancer risk insights through AI-driven assessment.
          </p>
          
          {/* HIPAA Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-terracotta/20 bg-terracotta/5">
            <Shield className="w-3.5 h-3.5 text-terracotta" />
            <span className="text-xs font-medium text-terracotta">HIPAA Compliant</span>
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 mb-8">
          <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            Privacy Policy
          </a>
          <span className="text-border">•</span>
          <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            Terms of Service
          </a>
          <span className="text-border">•</span>
          <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            Contact
          </a>
        </div>

        {/* Disclaimer */}
        <div className="glass rounded-xl p-6 mb-8">
          <p className="text-xs text-muted-foreground leading-relaxed text-center">
            <strong className="text-primary/80">Medical Disclaimer:</strong> ArtemisAI provides educational information only and is not a substitute for professional medical advice, diagnosis, or treatment. Always consult with a qualified healthcare provider about your specific health concerns. Results from this assessment should be discussed with your doctor.
          </p>
        </div>

        {/* Copyright */}
        <p className="text-xs text-muted-foreground/70 text-center">
          © {new Date().getFullYear()} ArtemisAI. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
