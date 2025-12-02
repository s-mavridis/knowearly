import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="max-w-6xl mx-auto">
        <div className="glass-strong rounded-2xl px-6 py-3 flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-terracotta flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">A</span>
            </div>
            <span className="text-xl font-semibold text-primary">ArtemisAI</span>
          </a>

          {/* Navigation */}
          <Button variant="nav" size="sm">
            About
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
