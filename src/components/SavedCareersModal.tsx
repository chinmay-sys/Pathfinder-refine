import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Bookmark,
  Trash2,
  TrendingUp,
  IndianRupee,
  BookOpen,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import { LearningStepItem } from "./LearningStepItem";
import { SkillBadgeItem } from "./SkillBadgeItem";

interface SavedCareersModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onNavigateHome?: () => void;
}

export const SavedCareersModal = ({
  isOpen,
  onOpenChange,
  onNavigateHome,
}: SavedCareersModalProps) => {
  const [savedCareers, setSavedCareers] = useState<any[]>([]);
  const [selectedCareer, setSelectedCareer] = useState<any>(null);
  const [isRoadmapOpen, setIsRoadmapOpen] = useState(false);

  const loadSavedCareers = () => {
    try {
      const data = JSON.parse(localStorage.getItem("savedCareers") || "[]");
      setSavedCareers(data);
    } catch (e) {
      console.error("Failed to load saved careers:", e);
      setSavedCareers([]);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadSavedCareers();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleStorageChange = () => {
      loadSavedCareers();
    };
    window.addEventListener("savedCareersUpdated", handleStorageChange);
    return () => {
      window.removeEventListener("savedCareersUpdated", handleStorageChange);
    };
  }, []);

  const handleRemove = (title: string) => {
    try {
      const updated = savedCareers.filter((c) => c.title !== title);
      localStorage.setItem("savedCareers", JSON.stringify(updated));
      setSavedCareers(updated);
      window.dispatchEvent(new Event("savedCareersUpdated"));
      toast.success(`Removed ${title} from saved careers.`);
    } catch (e) {
      toast.error("Failed to remove career.");
    }
  };

  const handleClearAll = () => {
    try {
      localStorage.setItem("savedCareers", JSON.stringify([]));
      setSavedCareers([]);
      window.dispatchEvent(new Event("savedCareersUpdated"));
      toast.success("All saved careers cleared.");
    } catch (e) {
      toast.error("Failed to clear saved careers.");
    }
  };

  const handleViewRoadmap = (career: any) => {
    setSelectedCareer(career);
    setIsRoadmapOpen(true);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto glass-card border-border/50">
          <DialogHeader className="flex flex-row items-center justify-between border-b border-border/30 pb-4">
            <div>
              <DialogTitle className="font-heading text-2xl flex items-center gap-2">
                <Bookmark className="w-6 h-6 text-primary" />
                Saved Career Paths
              </DialogTitle>
              <DialogDescription className="text-muted-foreground text-sm">
                Your bookmarked career recommendations and learning roadmaps
              </DialogDescription>
            </div>
            {savedCareers.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearAll}
                className="text-destructive hover:bg-destructive/10 text-xs mr-6"
              >
                <Trash2 className="w-3.5 h-3.5 mr-1" />
                Clear All
              </Button>
            )}
          </DialogHeader>

          <div className="py-4 space-y-4">
            {savedCareers.length === 0 ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Bookmark className="w-8 h-8 opacity-60" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-heading font-semibold text-lg">No Saved Careers Yet</h3>
                  <p className="text-muted-foreground text-sm max-w-sm mx-auto">
                    Take the career assessment and save recommendations to track your path here!
                  </p>
                </div>
                {onNavigateHome && (
                  <Button
                    onClick={() => {
                      onOpenChange(false);
                      onNavigateHome();
                    }}
                    className="bg-primary hover:bg-primary/90 mt-2"
                  >
                    Start Assessment
                  </Button>
                )}
              </div>
            ) : (
              <div className="grid gap-4">
                {savedCareers.map((career, index) => (
                  <Card
                    key={index}
                    className="p-5 glass-card border-border/50 hover:border-primary/40 transition-colors space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/20 pb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-heading font-bold text-xl text-foreground">
                            {career.title}
                          </h3>
                          <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">
                            {career.matchScore}% Match
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                          {career.description}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-auto">
                        <Button
                          size="sm"
                          onClick={() => handleViewRoadmap(career)}
                          className="bg-primary/90 hover:bg-primary text-xs"
                        >
                          <ExternalLink className="w-3.5 h-3.5 mr-1" />
                          Roadmap
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleRemove(career.title)}
                          className="text-destructive hover:bg-destructive/10 border-destructive/30 text-xs"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </div>

                    {/* Quick Metrics */}
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div className="p-2 bg-secondary/30 rounded flex items-center gap-1.5">
                        <TrendingUp className="w-3.5 h-3.5 text-accent" />
                        <span>Growth: <strong>{career.growthRate}%</strong></span>
                      </div>
                      <div className="p-2 bg-secondary/30 rounded flex items-center gap-1.5">
                        <IndianRupee className="w-3.5 h-3.5 text-mint-green" />
                        <span>Salary: <strong>{career.salary}</strong></span>
                      </div>
                        <div className="p-2 bg-secondary/30 rounded flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-neon-coral" />
                        <span>Impact: <strong>{career.impact}</strong></span>
                      </div>
                    </div>

                    {/* Skills */}
                    {career.skills && career.skills.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {career.skills.map((skill: string, sIdx: number) => (
                          <SkillBadgeItem key={sIdx} skill={skill} variant="outline" />
                        ))}
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Roadmap Detail Dialog */}
      <Dialog open={isRoadmapOpen} onOpenChange={setIsRoadmapOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto glass-card border-border/50">
          <DialogHeader>
            <DialogTitle className="font-heading text-2xl gradient-text">
              {selectedCareer?.title}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Complete learning roadmap & details
            </DialogDescription>
          </DialogHeader>

          {selectedCareer && (
            <div className="space-y-6 pt-4">
              <div className="space-y-2">
                <h4 className="font-heading font-semibold text-base">Description</h4>
                <p className="text-sm text-muted-foreground">{selectedCareer.description}</p>
              </div>

              {/* Detailed Learning Path */}
              {selectedCareer.learningPath && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-heading font-semibold text-base flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-accent" />
                      Learning Roadmap
                    </h4>
                    <span className="text-xs text-muted-foreground">(Click any step for tutorials)</span>
                  </div>
                  <div className="space-y-2">
                    {selectedCareer.learningPath.map((step: any, index: number) => (
                      <LearningStepItem
                        key={index}
                        step={step}
                        index={index}
                        careerTitle={selectedCareer.title}
                      />
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-end pt-2">
                <Button variant="outline" onClick={() => setIsRoadmapOpen(false)}>
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
