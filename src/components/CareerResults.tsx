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
  DollarSign,
  Clock,
  Target,
  BookOpen,
  RotateCcw,
  ExternalLink,
  Save,
} from "lucide-react";
import { toast } from "sonner";

interface CareerResultsProps {
  results: {
    careers: Array<{
      title: string;
      description: string;
      growthRate: number;
      matchScore: number;
      salary: string;
      impact: string;
      skills: string[];
      learningPath: string[];
    }>;
    skillGaps: string[];
    recommendations: string;
  };
  onStartOver: () => void;
}

const CareerResults = ({ results, onStartOver }: CareerResultsProps) => {
  const [selectedCareer, setSelectedCareer] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleViewRoadmap = (career: any) => {
    setSelectedCareer(career);
    setIsDialogOpen(true);
  };

  const handleSaveCareer = (career: any) => {
    try {
      const savedCareers = JSON.parse(localStorage.getItem("savedCareers") || "[]");
      const careerWithTimestamp = {
        ...career,
        savedAt: new Date().toISOString(),
      };
      
      // Check if career is already saved
      const alreadySaved = savedCareers.some((c: any) => c.title === career.title);
      
      if (alreadySaved) {
        toast.info("This career path is already saved!");
        return;
      }

      savedCareers.push(careerWithTimestamp);
      localStorage.setItem("savedCareers", JSON.stringify(savedCareers));
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
            <span className="font-heading font-semibold">Your Career Pathways</span>
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
                    <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground">
                      {career.title}
                    </h2>
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
                    <p className="font-semibold text-foreground">{career.growthRate}%</p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-mint-green">
                      <DollarSign className="w-4 h-4" />
                      <span className="text-xs font-medium uppercase">Salary</span>
                    </div>
                    <p className="font-semibold text-foreground">{career.salary}</p>
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
                      <span className="text-xs font-medium uppercase">Timeline</span>
                    </div>
                    <p className="font-semibold text-foreground">2-3 years</p>
                  </div>
                </div>

                {/* Skills Required */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-foreground">
                    <Target className="w-4 h-4" />
                    <span className="font-heading font-semibold">Skills Required</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {career.skills.map((skill, skillIndex) => (
                      <Badge
                        key={skillIndex}
                        variant="secondary"
                        className="bg-secondary/50 text-foreground border-border/50"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Learning Path */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-foreground">
                    <BookOpen className="w-4 h-4" />
                    <span className="font-heading font-semibold">Learning Roadmap</span>
                  </div>
                  <div className="grid gap-2">
                    {career.learningPath.map((step, stepIndex) => (
                      <div
                        key={stepIndex}
                        className="flex items-start gap-3 p-3 bg-secondary/30 rounded-lg"
                      >
                        <div className="flex-shrink-0 w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center text-xs font-semibold text-primary">
                          {stepIndex + 1}
                        </div>
                        <p className="text-sm text-muted-foreground flex-1">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <Button 
                    onClick={() => handleViewRoadmap(career)}
                    className="flex-1 bg-primary hover:bg-primary/90 group"
                  >
                    View Detailed Roadmap
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

        {/* Skill Gaps */}
        {results.skillGaps && results.skillGaps.length > 0 && (
          <Card className="glass-card p-6 md:p-8 border-border/50">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-neon-coral">
                <Target className="w-5 h-5" />
                <h3 className="font-heading font-semibold text-xl">Skills to Develop</h3>
              </div>
              <p className="text-muted-foreground">
                Focus on these areas to strengthen your profile for your chosen paths:
              </p>
              <div className="grid md:grid-cols-2 gap-3">
                {results.skillGaps.map((gap, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-secondary/30 rounded-lg"
                  >
                    <div className="w-2 h-2 bg-neon-coral rounded-full"></div>
                    <span className="text-sm text-foreground">{gap}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        )}

        {/* Action Button */}
        <div className="flex justify-center pt-4">
          <Button
            onClick={onStartOver}
            variant="outline"
            size="lg"
            className="group"
          >
            <RotateCcw className="w-4 h-4 mr-2 group-hover:rotate-180 transition-transform duration-500" />
            Take Another Assessment
          </Button>
        </div>
      </div>

      {/* Detailed Roadmap Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto glass-card border-border/50">
          <DialogHeader>
            <DialogTitle className="font-heading text-2xl gradient-text">
              {selectedCareer?.title}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Complete learning roadmap and career guidance
            </DialogDescription>
          </DialogHeader>

          {selectedCareer && (
            <div className="space-y-6 pt-4">
              {/* Career Overview */}
              <div className="space-y-3">
                <h3 className="font-heading font-semibold text-lg">Overview</h3>
                <p className="text-muted-foreground">{selectedCareer.description}</p>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-2 p-3 bg-secondary/30 rounded-lg">
                  <div className="flex items-center gap-2 text-primary">
                    <Target className="w-4 h-4" />
                    <span className="text-xs font-medium">Match</span>
                  </div>
                  <p className="text-lg font-bold">{selectedCareer.matchScore}%</p>
                </div>
                <div className="space-y-2 p-3 bg-secondary/30 rounded-lg">
                  <div className="flex items-center gap-2 text-accent">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-xs font-medium">Growth</span>
                  </div>
                  <p className="text-lg font-bold">{selectedCareer.growthRate}%</p>
                </div>
                <div className="space-y-2 p-3 bg-secondary/30 rounded-lg">
                  <div className="flex items-center gap-2 text-mint-green">
                    <DollarSign className="w-4 h-4" />
                    <span className="text-xs font-medium">Salary</span>
                  </div>
                  <p className="text-sm font-bold">{selectedCareer.salary}</p>
                </div>
                <div className="space-y-2 p-3 bg-secondary/30 rounded-lg">
                  <div className="flex items-center gap-2 text-neon-coral">
                    <Sparkles className="w-4 h-4" />
                    <span className="text-xs font-medium">Impact</span>
                  </div>
                  <p className="text-lg font-bold">{selectedCareer.impact}</p>
                </div>
              </div>

              {/* Required Skills */}
              <div className="space-y-3">
                <h3 className="font-heading font-semibold text-lg flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  Required Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedCareer.skills.map((skill: string, index: number) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-primary/20 text-primary border-primary/30"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Detailed Learning Path */}
              <div className="space-y-3">
                <h3 className="font-heading font-semibold text-lg flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-accent" />
                  Detailed Learning Roadmap
                </h3>
                <div className="space-y-3">
                  {selectedCareer.learningPath.map((step: string, index: number) => (
                    <div
                      key={index}
                      className="flex gap-4 p-4 bg-secondary/50 rounded-lg border border-border/30"
                    >
                      <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-primary-foreground font-bold">
                        {index + 1}
                      </div>
                      <div className="flex-1 space-y-2">
                        <p className="text-foreground font-medium">{step}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          <span>Estimated: {2 + index * 2}-{4 + index * 2} months</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button 
                  onClick={() => handleSaveCareer(selectedCareer)}
                  className="flex-1 bg-primary hover:bg-primary/90"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save This Path
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
    </div>
  );
};

export default CareerResults;
