import { useState } from "react";
import {
  ExternalLink,
  Youtube,
  Search,
  BookOpen,
  ChevronDown,
  ChevronUp,
  FolderGit2,
  CheckCircle2,
  Sparkles,
  Clock,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export interface DetailedStep {
  title: string;
  duration?: string;
  description?: string;
  topics?: string[];
  projectIdea?: string;
  checkpoint?: string;
}

interface LearningStepItemProps {
  step: string | DetailedStep;
  index: number;
  careerTitle?: string;
  estimatedTime?: string;
}

export function enrichStep(stepInput: string | DetailedStep, careerTitle?: string): DetailedStep {
  if (typeof stepInput === "object" && stepInput !== null && stepInput.title) {
    return stepInput;
  }

  const text = typeof stepInput === "string" ? stepInput : String(stepInput || "");

  let duration = "";
  let title = text;

  const durationMatch = text.match(/^(month[s]?\s*\d+(?:-\d+)?|week[s]?\s*\d+(?:-\d+)?|phase\s*\d+):?\s*(.*)/i);
  if (durationMatch) {
    duration = durationMatch[1];
    title = durationMatch[2];
  }

  const topics: string[] = [];
  const lower = title.toLowerCase();

  if (lower.includes("javascript") || lower.includes("js")) {
    topics.push("ES6+ Syntax", "DOM Manipulation", "Promises & Async/Await", "Fetch API");
  }
  if (lower.includes("react") || lower.includes("frontend")) {
    topics.push("JSX Components", "React Hooks (useState, useEffect)", "State Management", "Tailwind CSS");
  }
  if (lower.includes("python") || lower.includes("data analysis")) {
    topics.push("Python Core", "Pandas & NumPy", "Data Cleaning", "Data Visualization");
  }
  if (lower.includes("sql") || lower.includes("database")) {
    topics.push("SELECT & WHERE Queries", "JOIN Operations", "Aggregations", "Database Indexing");
  }
  if (lower.includes("figma") || lower.includes("ux") || lower.includes("design")) {
    topics.push("Wireframing", "User Personas", "Figma Auto-Layout", "Interactive Prototyping");
  }
  if (lower.includes("algorithm") || lower.includes("data structure")) {
    topics.push("Arrays & Strings", "Sorting & Searching", "Recursion", "Big O Notation");
  }
  if (lower.includes("project") || lower.includes("portfolio")) {
    topics.push("Git & GitHub Workflow", "Deployment (Vercel/Netlify)", "Code Documentation", "Responsive Design");
  }
  if (lower.includes("job") || lower.includes("apply") || lower.includes("networking")) {
    topics.push("Resume Optimization", "LinkedIn Branding", "Technical Mock Interviews", "System Design Q&A");
  }

  if (topics.length === 0) {
    topics.push("Core Foundations", "Hands-on Practice", "Key Concepts", "Real-world Applications");
  }

  let projectIdea = `Build a real-world project focused on ${title.toLowerCase()}`;
  if (lower.includes("javascript")) projectIdea = "Build an Interactive Dynamic Web App using Fetch API & LocalStorage";
  else if (lower.includes("react")) projectIdea = "Create a Multi-page E-Commerce Dashboard with React Hooks & Tailwind";
  else if (lower.includes("python") || lower.includes("data")) projectIdea = "Perform exploratory data analysis on a Kaggle dataset & visualize insights";
  else if (lower.includes("figma") || lower.includes("design")) projectIdea = "Design a complete Mobile App prototype with interactive micro-interactions";
  else if (lower.includes("portfolio")) projectIdea = "Publish 3 completed projects with live demo links and source code on GitHub";

  return {
    title: title || text,
    duration: duration || `Phase ${1}`,
    description: `Focus on mastering ${title.toLowerCase()} through hands-on coding exercises, reading documentation, and building real-world projects.`,
    topics,
    projectIdea,
    checkpoint: `Complete phase exercises and commit your progress to GitHub.`,
  };
}

export const LearningStepItem = ({
  step,
  index,
  careerTitle,
  estimatedTime,
}: LearningStepItemProps) => {
  const [isExpanded, setIsExpanded] = useState(index === 0); // Expand 1st step by default
  const detailed = enrichStep(step, careerTitle);

  const youtubeUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent("learn " + detailed.title + (careerTitle ? " " + careerTitle : ""))}`;
  const googleUrl = `https://www.google.com/search?q=${encodeURIComponent("learn " + detailed.title + " tutorial documentation")}`;
  const freeCodeCampUrl = `https://www.google.com/search?q=${encodeURIComponent("freecodecamp " + detailed.title)}`;
  const roadmapUrl = `https://roadmap.sh`;

  const handleStepClick = () => {
    window.open(youtubeUrl, "_blank", "noopener,noreferrer");
  };

  const handleTopicClick = (e: React.MouseEvent, topic: string) => {
    e.stopPropagation();
    const topicUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent("learn " + topic + " tutorial")}`;
    window.open(topicUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="group relative flex flex-col bg-secondary/30 hover:bg-secondary/50 rounded-xl border border-border/40 hover:border-primary/50 transition-all duration-200 overflow-hidden">
      {/* Header Row */}
      <div className="p-4 flex items-start justify-between gap-3">
        <div
          onClick={handleStepClick}
          className="flex items-start gap-3 flex-1 cursor-pointer"
        >
          <div className="flex-shrink-0 w-8 h-8 bg-primary/20 group-hover:bg-primary group-hover:text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold text-primary transition-colors mt-0.5">
            {index + 1}
          </div>
          <div className="flex-1 space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h4 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors flex items-center gap-1.5">
                <span>{detailed.title}</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
              </h4>
              {(detailed.duration || estimatedTime) && (
                <Badge variant="outline" className="text-[11px] bg-primary/10 border-primary/30 text-primary">
                  <Clock className="w-3 h-3 mr-1" />
                  {detailed.duration || estimatedTime}
                </Badge>
              )}
            </div>
            <p className="text-xs text-muted-foreground line-clamp-1">
              {detailed.description}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Quick External Links */}
          <div className="hidden sm:flex items-center gap-1.5">
            <a
              href={youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
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
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-md border border-blue-500/20 transition-colors"
              title="Search Google Tutorials & Docs"
            >
              <Search className="w-3.5 h-3.5 text-blue-400" />
              <span>Docs</span>
            </a>
          </div>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
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
        <div className="px-4 pb-4 pt-1 border-t border-border/20 space-y-3 bg-background/40 animate-fade-in text-xs">
          {/* Detailed Summary */}
          <p className="text-muted-foreground leading-relaxed">
            {detailed.description}
          </p>

          {/* Sub-topics / Modules */}
          {detailed.topics && detailed.topics.length > 0 && (
            <div className="space-y-1.5">
              <span className="font-semibold text-foreground flex items-center gap-1 text-xs">
                <Sparkles className="w-3.5 h-3.5 text-accent" />
                Key Modules & Concepts to Master:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {detailed.topics.map((topic, tIdx) => (
                  <Badge
                    key={tIdx}
                    onClick={(e) => handleTopicClick(e, topic)}
                    variant="secondary"
                    className="cursor-pointer hover:bg-primary/20 hover:text-primary border border-border/40 text-[11px] py-0.5 px-2 transition-colors flex items-center gap-1"
                    title={`Click to search tutorials for ${topic}`}
                  >
                    <span>{topic}</span>
                    <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Hands-on Project Idea */}
          {detailed.projectIdea && (
            <div className="p-2.5 bg-primary/10 rounded-lg border border-primary/20 flex items-start gap-2">
              <FolderGit2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <span className="font-semibold text-primary block">Hands-on Project Deliverable:</span>
                <span className="text-muted-foreground">{detailed.projectIdea}</span>
              </div>
            </div>
          )}

          {/* Milestone Checkpoint */}
          {detailed.checkpoint && (
            <div className="p-2.5 bg-accent/10 rounded-lg border border-accent/20 flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
              <div>
                <span className="font-semibold text-accent block">Phase Checkpoint:</span>
                <span className="text-muted-foreground">{detailed.checkpoint}</span>
              </div>
            </div>
          )}

          {/* Mobile External Buttons */}
          <div className="flex sm:hidden items-center gap-2 pt-1">
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
              <span>Google Docs</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
