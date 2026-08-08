import { analyzeCareer as mockAnalyzeCareer } from "./mockCareerService";

const getApiKey = () => {
  return import.meta.env.VITE_GEMINI_API_KEY || "";
};

// Valid models in Google Gemini API
const MODELS = ["gemini-1.5-flash", "gemini-2.0-flash", "gemini-1.5-pro"];

export const analyzeCareer = async (answers: Record<string, string>) => {
  const apiKey = getApiKey();
  console.log("Analyzing career profile with user answers:", answers);

  const prompt = `You are an expert career counselor AI. Analyze this user's profile and provide 3 personalized career recommendations.

User Profile:
Interests: "${answers.interests || ""}"
Skills: "${answers.skills || ""}"
Goals: "${answers.goals || ""}"
Experience: "${answers.experience || ""}"

Based on their specific profile, analyze what careers would truly match their interests and skills. Provide detailed learning paths for each career.

Respond with ONLY valid JSON matching this exact structure (no commentary):
{
  "careers": [
    {
      "title": "Career title",
      "description": "Why this career fits their profile",
      "growthRate": 20,
      "matchScore": 90,
      "salary": "$80k - $120k",
      "impact": "High",
      "skills": ["Skill 1", "Skill 2", "Skill 3", "Skill 4", "Skill 5"],
      "learningPath": [
        "Month 1-2: Foundations",
        "Month 3-4: Intermediate skills",
        "Month 5-6: Advanced practice",
        "Certifications",
        "Job search strategy"
      ]
    }
  ],
  "skillGaps": ["Skill gap 1", "Skill gap 2"],
  "recommendations": "Overall advice summary"
}`;

  // Try calling Gemini models
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
        continue; // Try next model
      }

      const data = await response.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!text) {
        console.warn(`Empty response from model ${model}`);
        continue;
      }

      // Extract JSON string cleanly
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        if (parsed && Array.isArray(parsed.careers)) {
          console.log("Successfully analyzed career using Gemini AI:", model);
          return parsed;
        }
      }
    } catch (err) {
      console.warn(`Error during Gemini API call for ${model}:`, err);
    }
  }

  // Fallback to local intelligent career analysis
  console.warn("Falling back to local intelligent career analyzer service");
  return await mockAnalyzeCareer(answers);
};