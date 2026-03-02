import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Loader2, Sparkles } from "lucide-react";
import { analyzeCareer } from "@/services/geminiCareerService";
import { toast } from "sonner";

interface SkillAssessmentProps {
  onComplete: (results: any) => void;
}

const questions = [
  {
    id: "interests",
    label: "What are your main interests and passions?",
    placeholder: "e.g., Technology, creativity, helping people, problem-solving...",
  },
  {
    id: "skills",
    label: "What skills do you currently have?",
    placeholder: "e.g., Programming, design, communication, data analysis...",
  },
  {
    id: "goals",
    label: "What are your career goals and aspirations?",
    placeholder: "e.g., Lead a team, work remotely, make social impact...",
  },
  {
    id: "experience",
    label: "Describe your relevant experience (education, projects, work)",
    placeholder: "e.g., Computer Science degree, freelance projects, internships...",
  },
];

const SkillAssessment = ({ onComplete }: SkillAssessmentProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const data = await analyzeCareer(answers);
      toast.success("Analysis complete!");
      onComplete(data);
    } catch (error) {
      console.error("Error analyzing career:", error);
      toast.error("Failed to analyze your profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-8 animate-fade-in">
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Question {currentStep + 1} of {questions.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <Card className="glass-card p-8 space-y-6 border-border/50">
          <div className="flex items-center gap-2 text-primary">
            <Sparkles className="w-5 h-5" />
            <span className="font-heading font-semibold">Career Assessment</span>
          </div>

          <div className="space-y-4">
            <Label className="text-lg font-heading font-medium">
              {currentQuestion.label}
            </Label>
            <Textarea
              value={answers[currentQuestion.id] || ""}
              onChange={(e) =>
                setAnswers({ ...answers, [currentQuestion.id]: e.target.value })
              }
              placeholder={currentQuestion.placeholder}
              className="min-h-[150px] bg-background/50 border-border/50 focus:border-primary resize-none"
            />
          </div>

          <div className="flex gap-4">
            {currentStep > 0 && (
              <Button
                variant="outline"
                onClick={() => setCurrentStep(currentStep - 1)}
                disabled={isLoading}
                className="flex-1"
              >
                Previous
              </Button>
            )}
            <Button
              onClick={handleNext}
              disabled={!answers[currentQuestion.id] || isLoading}
              className="flex-1 bg-primary hover:bg-primary/90 group"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  {currentStep === questions.length - 1 ? "Complete Assessment" : "Next"}
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SkillAssessment;
