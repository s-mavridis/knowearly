import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-3rem)] max-w-7xl px-6">
      <div className="flex items-center justify-between px-4 md:px-6 py-2.5 md:py-3 rounded-full bg-earth/60 backdrop-blur-md border border-white/10">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-terracotta flex items-center justify-center shrink-0">
            <svg viewBox="0 0 24 24" className="w-4 h-4 text-white" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
            </svg>
          </div>
          <span className="text-base md:text-lg font-semibold text-white">artemis</span>
        </Link>

        {/* Navigation - hidden on mobile */}
        <div className="hidden md:flex items-center gap-4">
          <Button variant="ghost" size="sm" className="text-white/80 hover:text-white hover:bg-white/10 text-sm">
            About
          </Button>
          <Button variant="ghost" size="sm" className="text-white/80 hover:text-white hover:bg-white/10 text-sm">
            How it works
          </Button>
        </div>

        {/* CTA Button - always visible */}
        <Button variant="cta" size="sm" className="bg-terracotta hover:bg-terracotta-light text-sm" asChild>
          <Link to="/quiz">Start testing</Link>
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;