import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, Target, TrendingUp, Rocket } from "lucide-react";
import SkillAssessment from "@/components/SkillAssessment";
import CareerResults from "@/components/CareerResults";

const Index = () => {
  const [showAssessment, setShowAssessment] = useState(false);
  const [careerResults, setCareerResults] = useState<any>(null);

  const handleStartAssessment = () => {
    setShowAssessment(true);
    setCareerResults(null);
  };

  const handleAssessmentComplete = (results: any) => {
    setCareerResults(results);
    setShowAssessment(false);
  };

  const handleStartOver = () => {
    setShowAssessment(false);
    setCareerResults(null);
  };

  if (showAssessment) {
    return <SkillAssessment onComplete={handleAssessmentComplete} />;
  }

  if (careerResults) {
    return <CareerResults results={careerResults} onStartOver={handleStartOver} />;
  }

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-neon-coral/10 rounded-full blur-3xl animate-pulse-glow"></div>
      </div>

      {/* Hero Section */}
      <div className="relative z-10 container mx-auto px-4 pt-20 pb-16">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
          {/* Logo/Brand */}
          <div className="inline-flex items-center gap-2 px-4 py-2 glass-card rounded-full">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="font-heading font-semibold text-foreground">PathFinder</span>
          </div>

          {/* Main Heading */}
          <h1 className="font-heading font-bold text-5xl md:text-7xl leading-tight">
            Discover Your{" "}
            <span className="gradient-text">Perfect Career</span>
            <br />Path with AI
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Map your skills, explore personalized career paths, and prepare for the future job market with intelligent guidance.
          </p>

          {/* CTA Button */}
          <div className="pt-4">
            <Button
              onClick={handleStartAssessment}
              size="lg"
              className="group relative px-8 py-6 text-lg font-heading font-semibold bg-primary hover:bg-primary/90 glow-effect hover-lift"
            >
              <Rocket className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
              Start Your Journey
            </Button>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-20 animate-slide-up">
          <div className="glass-card p-6 rounded-2xl hover-lift">
            <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mb-4">
              <Target className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-heading font-semibold text-xl mb-2">Skill Mapping</h3>
            <p className="text-muted-foreground">
              AI-powered analysis of your strengths, interests, and potential with visual insights.
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl hover-lift" style={{ animationDelay: '0.1s' }}>
            <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6 text-accent" />
            </div>
            <h3 className="font-heading font-semibold text-xl mb-2">Smart Recommendations</h3>
            <p className="text-muted-foreground">
              Personalized career paths based on emerging roles and market demand.
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl hover-lift" style={{ animationDelay: '0.2s' }}>
            <div className="w-12 h-12 bg-neon-coral/20 rounded-xl flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-neon-coral" />
            </div>
            <h3 className="font-heading font-semibold text-xl mb-2">Future-Ready</h3>
            <p className="text-muted-foreground">
              Real-time market insights and preparation toolkit for your chosen path.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
