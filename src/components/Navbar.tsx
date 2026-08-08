import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Bookmark } from "lucide-react";
import { SavedCareersModal } from "./SavedCareersModal";

interface NavbarProps {
  onNavigateHome?: () => void;
}

export const Navbar = ({ onNavigateHome }: NavbarProps) => {
  const [isSavedModalOpen, setIsSavedModalOpen] = useState(false);
  const [savedCount, setSavedCount] = useState(0);

  const updateCount = () => {
    try {
      const saved = JSON.parse(localStorage.getItem("savedCareers") || "[]");
      setSavedCount(saved.length);
    } catch (e) {
      setSavedCount(0);
    }
  };

  useEffect(() => {
    updateCount();
    window.addEventListener("savedCareersUpdated", updateCount);
    return () => {
      window.removeEventListener("savedCareersUpdated", updateCount);
    };
  }, []);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <button
            onClick={onNavigateHome}
            className="flex items-center gap-2 font-heading font-bold text-xl text-foreground hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
              <Sparkles className="w-5 h-5" />
            </div>
            <span>PathFinder</span>
          </button>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsSavedModalOpen(true)}
              className="relative gap-2 border-border/50 bg-secondary/30 hover:bg-secondary/60"
            >
              <Bookmark className="w-4 h-4 text-primary" />
              <span className="hidden sm:inline font-medium">Saved Careers</span>
              {savedCount > 0 && (
                <Badge
                  variant="secondary"
                  className="bg-primary text-primary-foreground px-1.5 py-0.2 text-xs rounded-full font-bold ml-0.5"
                >
                  {savedCount}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </header>

      <SavedCareersModal
        isOpen={isSavedModalOpen}
        onOpenChange={setIsSavedModalOpen}
        onNavigateHome={onNavigateHome}
      />
    </>
  );
};
