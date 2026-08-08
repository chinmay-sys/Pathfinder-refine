export interface RoadmapResource {
  title: string;
  type: string; // e.g., "Documentation", "Video Tutorial", "Course", "Article"
  url?: string;
}

export interface RoadmapStep {
  phase: number;
  title: string;
  description: string;
  duration: string;
  skills: string[];
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  reason: string; // Why this step is included based on missing skills/user profile
  prerequisites: string[];
  project?: string; // Practical hands-on project task
  resources?: RoadmapResource[];
  outcome: string; // Expected outcome/milestone
}

export interface CareerRecommendation {
  title: string;
  description: string;
  growthRate: number;
  matchScore: number;
  salary: string;
  salaryLabel?: string; // e.g., "Estimated Market Reference Range"
  impact: string;
  skills: string[];
  possessedSkills?: string[];
  missingSkills?: string[];
  learningPath: RoadmapStep[];
}

export interface CareerAnalysisResult {
  careers: CareerRecommendation[];
  skillGaps: string[];
  recommendations: string;
}
