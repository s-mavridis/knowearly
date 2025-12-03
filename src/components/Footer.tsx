import { Shield } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-earth text-white/80 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Main footer content */}
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-terracotta flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                </svg>
              </div>
              <span className="text-xl font-semibold text-white">ArtemisAI</span>
            </div>
            <p className="text-white/60 text-sm max-w-md leading-relaxed mb-4">
              Personalized cancer risk assessment powered by evidence-based medical guidelines 
              and developed in collaboration with Stanford Medicine physicians.
            </p>
            <div className="flex items-center gap-2 text-white/60">
              <Shield className="w-4 h-4" />
              <span className="text-xs">HIPAA Compliant</span>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="hover:text-white transition-colors">How it works</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="border-t border-white/10 pt-8">
          <p className="text-xs text-white/40 max-w-4xl leading-relaxed mb-6">
            <strong className="text-white/60">Medical Disclaimer:</strong> This tool is for informational 
            and educational purposes only. It is not intended to diagnose, treat, cure, or prevent any disease. 
            Always consult with a qualified healthcare professional for medical advice, diagnosis, or treatment.
          </p>
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} ArtemisAI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
