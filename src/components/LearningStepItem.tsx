import { useState } from "react";
import {
  ExternalLink,
  Youtube,
  Search,
  ChevronDown,
  ChevronUp,
  FolderGit2,
  CheckCircle2,
  Sparkles,
  Clock,
  Target,
  Layers,
  BookOpen,
  Award
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { RoadmapStep, RoadmapResource } from "@/types/career";

interface LearningStepItemProps {
  step: string | RoadmapStep;
  index: number;
  careerTitle?: string;
  estimatedTime?: string;
}

export function enrichStep(stepInput: string | RoadmapStep, index: number, careerTitle?: string): RoadmapStep {
  if (typeof stepInput === "object" && stepInput !== null && stepInput.title) {
    return {
      phase: stepInput.phase || index + 1,
      title: stepInput.title,
      description: stepInput.description || "Focus on mastering core skills in this phase through practical exercises.",
      duration: stepInput.duration || "3-4 weeks",
      skills: Array.isArray(stepInput.skills) ? stepInput.skills : [],
      difficulty: stepInput.difficulty || (index === 0 ? "Beginner" : index < 3 ? "Intermediate" : "Advanced"),
      reason: stepInput.reason || `Essential step to build job-ready competence for ${careerTitle || "your target role"}.`,
      prerequisites: Array.isArray(stepInput.prerequisites) ? stepInput.prerequisites : [],
      project: stepInput.project || `Build a practical hands-on project demonstrating ${stepInput.title}.`,
      resources: Array.isArray(stepInput.resources) && stepInput.resources.length > 0 ? stepInput.resources : [
        { title: `${stepInput.title} Guide`, type: "Documentation" },
        { title: `${stepInput.title} Tutorials`, type: "Video Tutorial" }
      ],
      outcome: stepInput.outcome || `Demonstrable proficiency in ${stepInput.title}.`
    };
  }

  const text = typeof stepInput === "string" ? stepInput : String(stepInput || "");
  let duration = "3-4 weeks";
  let title = text;

  const durationMatch = text.match(/^(month[s]?\s*\d+(?:-\d+)?|week[s]?\s*\d+(?:-\d+)?|phase\s*\d+):?\s*(.*)/i);
  if (durationMatch) {
    duration = durationMatch[1];
    title = durationMatch[2];
  }

  const lower = title.toLowerCase();
  const skills: string[] = [];
  if (lower.includes("react")) skills.push("React JSX", "React Hooks", "TypeScript");
  else if (lower.includes("node") || lower.includes("backend")) skills.push("Node.js", "Express.js", "REST APIs");
  else if (lower.includes("sql") || lower.includes("database")) skills.push("SQL", "PostgreSQL", "Data Modeling");
  else if (lower.includes("product strategy")) skills.push("Product Strategy", "OKRs", "RICE Prioritization");
  else if (lower.includes("analytics")) skills.push("Product Metrics", "A/B Testing", "Funnels");
  else skills.push("Core Concepts", "Best Practices");

  return {
    phase: index + 1,
    title: title || text,
    description: `Master ${title.toLowerCase()} through structured lessons, documentation, and real-world project application.`,
    duration: duration,
    skills: skills,
    difficulty: index === 0 ? "Beginner" : index < 4 ? "Intermediate" : "Advanced",
    reason: `Prioritized to fill your identified skill gap in ${title}.`,
    prerequisites: index > 0 ? ["Previous phase concepts"] : ["Basic problem solving"],
    project: `Build a real-world deliverable focused on ${title.toLowerCase()}`,
    resources: [
      { title: `${title} Official Documentation`, type: "Documentation" },
      { title: `${title} Crash Course`, type: "Video Tutorial" }
    ],
    outcome: `Complete practical project and document your progress on GitHub / Portfolio.`
  };
}

export const LearningStepItem = ({
  step,
  index,
  careerTitle,
  estimatedTime,
}: LearningStepItemProps) => {
  const [isExpanded, setIsExpanded] = useState(index === 0); // Expand 1st step by default
  const detailedStep = enrichStep(step, index, careerTitle);

  const youtubeUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent("learn " + detailedStep.title + (careerTitle ? " " + careerTitle : ""))}`;
  const googleUrl = `https://www.google.com/search?q=${encodeURIComponent("learn " + detailedStep.title + " tutorial documentation")}`;

  const handleStepHeaderClick = () => {
    setIsExpanded(!isExpanded);
  };

  const handleTopicClick = (e: React.MouseEvent, topic: string) => {
    e.stopPropagation();
    const topicUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent("learn " + topic + " tutorial")}`;
    window.open(topicUrl, "_blank", "noopener,noreferrer");
  };

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case "Beginner":
        return "bg-emerald-500/10 border-emerald-500/30 text-emerald-400";
      case "Intermediate":
        return "bg-sky-500/10 border-sky-500/30 text-sky-400";
      case "Advanced":
        return "bg-amber-500/10 border-amber-500/30 text-amber-400";
      default:
        return "bg-primary/10 border-primary/30 text-primary";
    }
  };

  return (
    <div className="group relative flex flex-col bg-secondary/30 hover:bg-secondary/50 rounded-xl border border-border/40 hover:border-primary/50 transition-all duration-200 overflow-hidden">
      {/* Header Row */}
      <div 
        onClick={handleStepHeaderClick}
        className="p-4 flex items-start justify-between gap-3 cursor-pointer select-none"
      >
        <div className="flex items-start gap-3 flex-1">
          {/* Phase Badge */}
          <div className="flex-shrink-0 w-8 h-8 bg-primary/20 group-hover:bg-primary group-hover:text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold text-primary transition-colors mt-0.5">
            {detailedStep.phase}
          </div>

          <div className="flex-1 space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <h4 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors flex items-center gap-1.5">
                <span>Phase {detailedStep.phase}: {detailedStep.title}</span>
              </h4>
              
              {/* Difficulty Badge */}
              <Badge variant="outline" className={`text-[10px] px-2 py-0.5 rounded-md font-medium border ${getDifficultyColor(detailedStep.difficulty)}`}>
                {detailedStep.difficulty}
              </Badge>

              {/* Duration Badge */}
              {(detailedStep.duration || estimatedTime) && (
                <Badge variant="outline" className="text-[11px] bg-primary/10 border-primary/30 text-primary">
                  <Clock className="w-3 h-3 mr-1" />
                  {detailedStep.duration || estimatedTime}
                </Badge>
              )}
            </div>

            <p className="text-xs text-muted-foreground line-clamp-1">
              {detailedStep.description}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* External Quick Links */}
          <div className="hidden sm:flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
            <a
              href={youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-md border border-red-500/20 transition-colors"
              title="Watch YouTube Video Tutorials"
            >
              <Youtube className="w-3.5 h-3.5 text-red-500" />
              <span>YouTube</span>
            </a>
            <a
              href={googleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-md border border-blue-500/20 transition-colors"
              title="Search Documentation & Specs"
            >
              <Search className="w-3.5 h-3.5 text-blue-400" />
              <span>Docs</span>
            </a>
          </div>

          <button
            className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-secondary/60 rounded-md transition-colors"
            title={isExpanded ? "Collapse Details" : "Expand Details"}
          >
            {isExpanded ? (
              <ChevronUp className="w-4 h-4 text-primary" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Expanded Details Section */}
      {isExpanded && (
        <div className="px-4 pb-4 pt-2 border-t border-border/20 space-y-3.5 bg-background/40 animate-fade-in text-xs">
          
          {/* Why this step is included (Reason / Personalization) */}
          {detailedStep.reason && (
            <div className="p-2.5 bg-primary/10 rounded-lg border border-primary/20 flex items-start gap-2 text-foreground">
              <Target className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <span className="font-semibold text-primary block">Why This Step is in Your Personalized Roadmap:</span>
                <span className="text-muted-foreground text-xs">{detailedStep.reason}</span>
              </div>
            </div>
          )}

          {/* Description */}
          <div className="space-y-1">
            <span className="font-semibold text-foreground flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5 text-accent" />
              Phase Description:
            </span>
            <p className="text-muted-foreground leading-relaxed">
              {detailedStep.description}
            </p>
          </div>

          {/* Skills Covered in this Phase */}
          {detailedStep.skills && detailedStep.skills.length > 0 && (
            <div className="space-y-1.5">
              <span className="font-semibold text-foreground flex items-center gap-1 text-xs">
                <Sparkles className="w-3.5 h-3.5 text-accent" />
                Target Competencies & Tools:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {detailedStep.skills.map((skillItem, tIdx) => (
                  <Badge
                    key={tIdx}
                    onClick={(e) => handleTopicClick(e, skillItem)}
                    variant="secondary"
                    className="cursor-pointer hover:bg-primary/20 hover:text-primary border border-border/40 text-[11px] py-0.5 px-2 transition-colors flex items-center gap-1"
                    title={`Click to search tutorials for ${skillItem}`}
                  >
                    <span>{skillItem}</span>
                    <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Prerequisites */}
          {detailedStep.prerequisites && detailedStep.prerequisites.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="font-semibold text-muted-foreground flex items-center gap-1">
                <Layers className="w-3.5 h-3.5 text-muted-foreground" />
                Prerequisites:
              </span>
              <div className="flex flex-wrap gap-1">
                {detailedStep.prerequisites.map((prereq, pIdx) => (
                  <span key={pIdx} className="text-xs text-muted-foreground bg-secondary/50 px-2 py-0.5 rounded border border-border/30">
                    {prereq}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Hands-on Practical Project */}
          {detailedStep.project && (
            <div className="p-2.5 bg-accent/10 rounded-lg border border-accent/20 flex items-start gap-2">
              <FolderGit2 className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
              <div>
                <span className="font-semibold text-accent block">Practical Project Deliverable:</span>
                <span className="text-muted-foreground">{detailedStep.project}</span>
              </div>
            </div>
          )}

          {/* Milestone Outcome */}
          {detailedStep.outcome && (
            <div className="p-2.5 bg-emerald-500/10 rounded-lg border border-emerald-500/20 flex items-start gap-2">
              <Award className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
              <div>
                <span className="font-semibold text-emerald-400 block">Expected Outcome / Milestone:</span>
                <span className="text-muted-foreground">{detailedStep.outcome}</span>
              </div>
            </div>
          )}

          {/* Resources */}
          {detailedStep.resources && detailedStep.resources.length > 0 && (
            <div className="space-y-1.5 pt-1">
              <span className="font-semibold text-foreground flex items-center gap-1">
                <ExternalLink className="w-3.5 h-3.5 text-primary" />
                Recommended Learning Resources:
              </span>
              <div className="flex flex-wrap gap-2">
                {detailedStep.resources.map((res: RoadmapResource, rIdx: number) => {
                  const resSearchUrl = res.url || `https://www.google.com/search?q=${encodeURIComponent(res.title + " " + (careerTitle || ""))}`;
                  return (
                    <a
                      key={rIdx}
                      href={resSearchUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[11px] px-2.5 py-1 bg-secondary/60 hover:bg-secondary text-foreground rounded border border-border/40 transition-colors"
                    >
                      <span className="font-medium">{res.title}</span>
                      <span className="text-[10px] opacity-60">({res.type})</span>
                      <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                    </a>
                  );
                })}
              </div>
            </div>
          )}

          {/* Mobile External Buttons */}
          <div className="flex sm:hidden items-center gap-2 pt-1" onClick={(e) => e.stopPropagation()}>
            <a
              href={youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-1 text-xs font-medium py-1.5 bg-red-500/10 text-red-400 rounded-md border border-red-500/20"
            >
              <Youtube className="w-3.5 h-3.5 text-red-500" />
              <span>YouTube Tutorials</span>
            </a>
            <a
              href={googleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-1 text-xs font-medium py-1.5 bg-blue-500/10 text-blue-400 rounded-md border border-blue-500/20"
            >
              <Search className="w-3.5 h-3.5 text-blue-400" />
              <span>Google Specs</span>
            </a>
          </div>

        </div>
      )}
    </div>
  );
};
