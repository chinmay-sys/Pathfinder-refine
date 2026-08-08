import { analyzeCareer as mockAnalyzeCareer, formatSalaryInINR } from "./mockCareerService";
import { CareerAnalysisResult, RoadmapStep } from "@/types/career";

const getApiKey = () => {
  return import.meta.env.VITE_GEMINI_API_KEY || "";
};

// Valid models in Google Gemini API
const MODELS = ["gemini-1.5-flash", "gemini-2.0-flash", "gemini-1.5-pro"];

export const analyzeCareer = async (answers: Record<string, string>): Promise<CareerAnalysisResult> => {
  const apiKey = getApiKey();

  if (!apiKey) {
    console.log("No VITE_GEMINI_API_KEY provided. Using upgraded offline personalized career engine.");
    return await mockAnalyzeCareer(answers);
  }

  console.log("Analyzing career profile with user answers:", answers);

  const prompt = `You are an expert career counselor AI specializing in personalized career roadmaps and skill gap analysis for the Indian tech and modern job market.

User Profile:
- Interests & Passions: "${answers.interests || "Not specified"}"
- Current Skills & Competencies: "${answers.skills || "Not specified"}"
- Career Goals & Aspirations: "${answers.goals || "Not specified"}"
- Relevant Experience & Background: "${answers.experience || "Not specified"}"

INSTRUCTIONS:
1. Recommend 3 distinct career paths best suited to this user's profile.
2. For each career, analyze:
   - possessedSkills: Skills the user ALREADY possesses based on their input.
   - missingSkills: Crucial skills required for the target career that the user is currently missing.
3. Construct a genuinely PERSONALIZED learning roadmap (6 to 10 phases) for each career:
   - CRITICAL: Do NOT generate generic foundational phases for skills the user ALREADY possesses (e.g. if the user knows React/JS, do NOT create a phase teaching JS basics).
   - Prioritize missing, high-impact skills first.
   - Include a clear 'reason' field for each step explaining why this phase is included based on their specific skill gap.
   - NEVER make an MBA or PM certification a mandatory roadmap phase.
   - Include practical hands-on projects and measurable outcomes for every phase.
   - IMPORTANT: Format salaries strictly in Indian Rupees (INR) in Lakhs Per Annum (LPA), clearly labeled as estimated ranges (e.g., "₹8.0 - ₹18.0 LPA (Est. Range)").

Respond with ONLY valid JSON adhering strictly to this JSON structure (no markdown wrapper, no extra commentary):
{
  "careers": [
    {
      "title": "Career Title",
      "description": "Why this career fits their profile and goals",
      "growthRate": 22,
      "matchScore": 92,
      "salary": "₹8.0 - ₹18.0 LPA (Est. Range)",
      "impact": "High",
      "skills": ["Skill 1", "Skill 2", "Skill 3", "Skill 4", "Skill 5"],
      "possessedSkills": ["Skill user already has 1", "Skill user already has 2"],
      "missingSkills": ["Skill gap 1", "Skill gap 2", "Skill gap 3"],
      "learningPath": [
        {
          "phase": 1,
          "title": "Phase Title",
          "description": "Detailed phase description",
          "duration": "3-4 weeks",
          "skills": ["Skill A", "Skill B"],
          "difficulty": "Intermediate",
          "reason": "Why this step is needed based on missing skills/gap analysis",
          "prerequisites": ["Prerequisite 1"],
          "project": "Practical hands-on project task or deliverable",
          "resources": [
            { "title": "Resource Name", "type": "Documentation", "url": "https://..." }
          ],
          "outcome": "Measurable outcome or milestone"
        }
      ]
    }
  ],
  "skillGaps": ["Overall Skill Gap 1", "Overall Skill Gap 2"],
  "recommendations": "Overall personalized advice summary explaining why these careers fit their unique background"
}`;

  for (const model of MODELS) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
    try {
      console.log(`Attempting Gemini request with model: ${model}`);
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      });

      if (!response.ok) {
        console.warn(`Gemini API model ${model} failed with status ${response.status}`);
        continue;
      }

      const data = await response.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!text) {
        console.warn(`Empty response from model ${model}`);
        continue;
      }

      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        if (parsed && Array.isArray(parsed.careers) && parsed.careers.length > 0) {
          parsed.careers.forEach((career: any) => {
            career.salary = formatSalaryInINR(career.salary);
            career.salaryLabel = "Estimated Indian Market Range (LPA)";
            
            if (Array.isArray(career.learningPath)) {
              career.learningPath = career.learningPath.map((step: any, sIdx: number) => {
                if (typeof step === "string") {
                  return {
                    phase: sIdx + 1,
                    title: step,
                    description: `Focus on mastering ${step} through hands-on practice.`,
                    duration: "3-4 weeks",
                    skills: [step],
                    difficulty: sIdx === 0 ? "Beginner" : sIdx < 3 ? "Intermediate" : "Advanced",
                    reason: `Essential step to build required competence in ${step}.`,
                    prerequisites: sIdx > 0 ? ["Previous phase concepts"] : ["Basic problem solving"],
                    project: `Build a practical hands-on project demonstrating ${step}.`,
                    outcome: `Demonstrable proficiency in ${step}.`
                  } as RoadmapStep;
                }
                return {
                  phase: step.phase || sIdx + 1,
                  title: step.title || `Phase ${sIdx + 1}`,
                  description: step.description || "Detailed skill acquisition phase.",
                  duration: step.duration || "3-4 weeks",
                  skills: Array.isArray(step.skills) ? step.skills : [],
                  difficulty: step.difficulty || "Intermediate",
                  reason: step.reason || "Addresses identified skill gap for target role.",
                  prerequisites: Array.isArray(step.prerequisites) ? step.prerequisites : [],
                  project: step.project || "Execute hands-on implementation project.",
                  resources: Array.isArray(step.resources) ? step.resources : [],
                  outcome: step.outcome || "Milestone achieved."
                } as RoadmapStep;
              });
            }
          });

          console.log("Successfully analyzed career using Gemini AI model:", model);
          return parsed as CareerAnalysisResult;
        }
      }
    } catch (err) {
      console.warn(`Error during Gemini API call for ${model}:`, err);
    }
  }

  console.warn("Falling back to local intelligent career analyzer service");
  return await mockAnalyzeCareer(answers);
};