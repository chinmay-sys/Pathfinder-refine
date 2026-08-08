import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sparkles,
  TrendingUp,
  IndianRupee,
  Clock,
  Target,
  BookOpen,
  RotateCcw,
  ExternalLink,
  Save,
  Bookmark,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { toast } from "sonner";
import { SavedCareersModal } from "./SavedCareersModal";
import { LearningStepItem } from "./LearningStepItem";
import { SkillBadgeItem } from "./SkillBadgeItem";
import { CareerAnalysisResult, CareerRecommendation } from "@/types/career";

interface CareerResultsProps {
  results: CareerAnalysisResult;
  onStartOver: () => void;
}

const CareerResults = ({ results, onStartOver }: CareerResultsProps) => {
  const [selectedCareer, setSelectedCareer] = useState<CareerRecommendation | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSavedModalOpen, setIsSavedModalOpen] = useState(false);

  const handleViewRoadmap = (career: CareerRecommendation) => {
    setSelectedCareer(career);
    setIsDialogOpen(true);
  };

  const handleSaveCareer = (career: CareerRecommendation) => {
    try {
      const savedCareers = JSON.parse(localStorage.getItem("savedCareers") || "[]");
      const careerWithTimestamp = {
        ...career,
        savedAt: new Date().toISOString(),
      };
      
      const alreadySaved = savedCareers.some((c: any) => c.title === career.title);
      
      if (alreadySaved) {
        toast.info("This career path is already saved!");
        return;
      }

      savedCareers.push(careerWithTimestamp);
      localStorage.setItem("savedCareers", JSON.stringify(savedCareers));
      window.dispatchEvent(new Event("savedCareersUpdated"));
      toast.success(`${career.title} saved successfully!`);
    } catch (error) {
      console.error("Error saving career:", error);
      toast.error("Failed to save career path. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="container mx-auto max-w-6xl space-y-8 animate-fade-in">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 glass-card rounded-full">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="font-heading font-semibold">Your Personalized Career Pathways</span>
          </div>
          <h1 className="font-heading font-bold text-4xl md:text-5xl">
            Personalized <span className="gradient-text">Career Recommendations</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {results.recommendations}
          </p>
        </div>

        {/* Career Cards */}
        <div className="grid gap-6">
          {results.careers.map((career, index) => (
            <Card
              key={index}
              className="glass-card p-6 md:p-8 hover-lift border-border/50"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="space-y-6">
                {/* Career Header */}
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-3">
                      <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground">
                        {career.title}
                      </h2>
                      <Badge variant="outline" className="bg-primary/10 border-primary/30 text-primary">
                        {career.learningPath?.length || 6} Phase Roadmap
                      </Badge>
                    </div>
                    <p className="text-muted-foreground">{career.description}</p>
                  </div>

                  <div className="flex flex-col items-start md:items-end gap-2">
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4 text-primary" />
                      <span className="text-sm font-semibold text-primary">
                        {career.matchScore}% Match
                      </span>
                    </div>
                    <Progress value={career.matchScore} className="w-32 h-2" />
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-accent">
                      <TrendingUp className="w-4 h-4" />
                      <span className="text-xs font-medium uppercase">Growth</span>
                    </div>
                    <p className="font-semibold text-foreground">{career.growthRate}% Job Growth</p>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-mint-green">
                      <IndianRupee className="w-4 h-4" />
                      <span className="text-xs font-medium uppercase">Salary</span>
                    </div>
                    <p className="font-semibold text-foreground">{career.salary}</p>
                    <span className="text-[10px] text-muted-foreground block">
                      {career.salaryLabel || "Est. Indian Market Range"}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-neon-coral">
                      <Sparkles className="w-4 h-4" />
                      <span className="text-xs font-medium uppercase">Impact</span>
                    </div>
                    <p className="font-semibold text-foreground">{career.impact}</p>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-primary">
                      <Clock className="w-4 h-4" />
                      <span className="text-xs font-medium uppercase">Est. Duration</span>
                    </div>
                    <p className="font-semibold text-foreground">
                      {career.learningPath?.length ? `${career.learningPath.length * 3 - 2}-${career.learningPath.length * 4} weeks` : "6-8 months"}
                    </p>
                  </div>
                </div>

                {/* Skill Match Breakdown (Possessed vs Gaps) */}
                <div className="grid md:grid-cols-2 gap-4 p-4 bg-secondary/20 rounded-xl border border-border/30">
                  {/* Possessed Skills */}
                  {career.possessedSkills && career.possessedSkills.length > 0 && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-1.5 text-emerald-400 font-semibold text-xs uppercase tracking-wide">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Your Existing Strengths ({career.possessedSkills.length}):</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {career.possessedSkills.map((ps, psIdx) => (
                          <Badge key={psIdx} variant="outline" className="bg-emerald-500/10 border-emerald-500/30 text-emerald-400 text-xs">
                            ✓ {ps}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Skills to Develop */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-1.5 text-accent font-semibold text-xs uppercase tracking-wide">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>Target Skill Gaps to Bridge:</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {(career.missingSkills || career.skills).map((ms, msIdx) => (
                        <SkillBadgeItem key={msIdx} skill={ms} />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Learning Roadmap Overview */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-foreground">
                      <BookOpen className="w-4 h-4 text-accent" />
                      <span className="font-heading font-semibold">Personalized Learning Roadmap</span>
                    </div>
                    <span className="text-xs text-muted-foreground hidden sm:inline">(Prioritized by your skill gaps)</span>
                  </div>
                  <div className="grid gap-2.5">
                    {career.learningPath.map((step, stepIndex) => (
                      <LearningStepItem
                        key={stepIndex}
                        step={step}
                        index={stepIndex}
                        careerTitle={career.title}
                      />
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <Button 
                    onClick={() => handleViewRoadmap(career)}
                    className="flex-1 bg-primary hover:bg-primary/90 group"
                  >
                    View Detailed Roadmap & Details
                    <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => handleSaveCareer(career)}
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save Career Path
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Overall Skill Gaps Summary */}
        {results.skillGaps && results.skillGaps.length > 0 && (
          <Card className="glass-card p-6 md:p-8 border-border/50">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-neon-coral">
                <Target className="w-5 h-5" />
                <h3 className="font-heading font-semibold text-xl">Key Priority Skills to Master</h3>
              </div>
              <p className="text-muted-foreground text-sm">
                Focus on these core competencies to rapidly increase your market readiness for your top recommended careers:
              </p>
              <div className="grid md:grid-cols-2 gap-3">
                {results.skillGaps.map((gap, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-secondary/30 rounded-lg border border-border/30"
                  >
                    <div className="w-2.5 h-2.5 bg-neon-coral rounded-full"></div>
                    <span className="text-sm font-medium text-foreground">{gap}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
          <Button
            onClick={onStartOver}
            variant="outline"
            size="lg"
            className="group"
          >
            <RotateCcw className="w-4 h-4 mr-2 group-hover:rotate-180 transition-transform duration-500" />
            Take Another Assessment
          </Button>
          <Button
            onClick={() => setIsSavedModalOpen(true)}
            size="lg"
            className="bg-primary hover:bg-primary/90"
          >
            <Bookmark className="w-4 h-4 mr-2" />
            View Saved Careers
          </Button>
        </div>
      </div>

      {/* Detailed Roadmap Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto glass-card border-border/50">
          <DialogHeader>
            <DialogTitle className="font-heading text-2xl gradient-text flex items-center justify-between pr-6">
              <span>{selectedCareer?.title}</span>
              {selectedCareer && (
                <Badge variant="outline" className="bg-primary/20 text-primary border-primary/30 text-xs">
                  {selectedCareer.matchScore}% Profile Match
                </Badge>
              )}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Personalized learning roadmap and skill gap bridge strategy
            </DialogDescription>
          </DialogHeader>

          {selectedCareer && (
            <div className="space-y-6 pt-4">
              {/* Overview */}
              <div className="space-y-2">
                <h3 className="font-heading font-semibold text-lg">Role Overview</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{selectedCareer.description}</p>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="space-y-1 p-3 bg-secondary/30 rounded-lg">
                  <div className="flex items-center gap-1.5 text-primary">
                    <Target className="w-3.5 h-3.5" />
                    <span className="text-[11px] font-medium uppercase">Match</span>
                  </div>
                  <p className="text-base font-bold">{selectedCareer.matchScore}%</p>
                </div>
                <div className="space-y-1 p-3 bg-secondary/30 rounded-lg">
                  <div className="flex items-center gap-1.5 text-accent">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span className="text-[11px] font-medium uppercase">Growth</span>
                  </div>
                  <p className="text-base font-bold">{selectedCareer.growthRate}%</p>
                </div>
                <div className="space-y-1 p-3 bg-secondary/30 rounded-lg">
                  <div className="flex items-center gap-1.5 text-mint-green">
                    <IndianRupee className="w-3.5 h-3.5" />
                    <span className="text-[11px] font-medium uppercase">Salary</span>
                  </div>
                  <p className="text-xs font-bold">{selectedCareer.salary}</p>
                </div>
                <div className="space-y-1 p-3 bg-secondary/30 rounded-lg">
                  <div className="flex items-center gap-1.5 text-neon-coral">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span className="text-[11px] font-medium uppercase">Impact</span>
                  </div>
                  <p className="text-base font-bold">{selectedCareer.impact}</p>
                </div>
              </div>

              {/* Detailed Roadmap */}
              <div className="space-y-3">
                <h3 className="font-heading font-semibold text-lg flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-accent" />
                  Structured Learning Phases ({selectedCareer.learningPath?.length || 0} Phases)
                </h3>
                <div className="space-y-3">
                  {selectedCareer.learningPath.map((step, index) => (
                    <LearningStepItem
                      key={index}
                      step={step}
                      index={index}
                      careerTitle={selectedCareer.title}
                    />
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-border/30">
                <Button 
                  onClick={() => handleSaveCareer(selectedCareer)}
                  className="flex-1 bg-primary hover:bg-primary/90"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save This Career Path
                </Button>
                <Button 
                  onClick={() => setIsDialogOpen(false)}
                  variant="outline"
                  className="flex-1"
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <SavedCareersModal
        isOpen={isSavedModalOpen}
        onOpenChange={setIsSavedModalOpen}
        onNavigateHome={onStartOver}
      />
    </div>
  );
};

export default CareerResults;
