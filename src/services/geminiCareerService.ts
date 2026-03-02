const GEMINI_API_KEY = "AIzaSyDQIWY_tB6fdlZ6whCDWMTpjdvmrxdcB4E";
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

export const analyzeCareer = async (answers: Record<string, string>) => {
  console.log('Using Gemini API key:', GEMINI_API_KEY.substring(0, 20) + '...');
  console.log('User answers:', answers);
  
  try {
    const prompt = `You are an expert career counselor AI. Analyze this user's profile and provide 3 personalized career recommendations.

User Profile:
Interests: "${answers.interests}"
Skills: "${answers.skills}"
Goals: "${answers.goals}"
Experience: "${answers.experience}"

Based on their specific profile, analyze what careers would truly match their interests and skills. Provide detailed learning paths for each career.

Respond with ONLY valid JSON in this exact format:
{
  "careers": [
    {
      "title": "Career name that best matches their interests",
      "description": "Detailed explanation of why this career fits their specific profile",
      "growthRate": realistic_number,
      "matchScore": realistic_score_70_to_95,
      "salary": "$realistic_salary_range",
      "impact": "High/Medium/Low",
      "skills": ["specific skill 1", "specific skill 2", "specific skill 3", "specific skill 4", "specific skill 5"],
      "learningPath": [
        "Month 1-2: Specific foundational steps for this career",
        "Month 3-4: Intermediate skill development",
        "Month 5-6: Advanced skills and portfolio building",
        "Specific certification to obtain",
        "Job search and networking strategy"
      ]
    },
    {
      "title": "Second career recommendation",
      "description": "Why this career also suits their profile",
      "growthRate": realistic_number,
      "matchScore": realistic_score,
      "salary": "$realistic_range",
      "impact": "High/Medium/Low",
      "skills": ["skill 1", "skill 2", "skill 3", "skill 4", "skill 5"],
      "learningPath": [
        "Month 1-2: Foundation",
        "Month 3-4: Skill building",
        "Month 5-6: Advanced practice",
        "Certification",
        "Career entry"
      ]
    },
    {
      "title": "Third career option",
      "description": "Alternative path based on their goals",
      "growthRate": realistic_number,
      "matchScore": realistic_score,
      "salary": "$realistic_range",
      "impact": "High/Medium/Low",
      "skills": ["skill 1", "skill 2", "skill 3", "skill 4", "skill 5"],
      "learningPath": [
        "Month 1-2: Basics",
        "Month 3-4: Development",
        "Month 5-6: Portfolio",
        "Certification",
        "Job search"
      ]
    }
  ],
  "skillGaps": ["specific skill gap 1", "specific skill gap 2", "specific skill gap 3", "specific skill gap 4"],
  "recommendations": "Personalized advice based on their exact interests, skills, goals, and experience"
}`;

    console.log('Making Gemini API request to:', GEMINI_API_URL);
    console.log('Request prompt:', prompt.substring(0, 200) + '...');
    
    const response = await fetch(GEMINI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      })
    });
    
    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API Error Response:', errorText);
      console.error('Full response:', response);
      throw new Error(`Gemini API Error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('Full Gemini API response:', data);
    
    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
      console.error('Invalid response structure:', data);
      throw new Error('Invalid Gemini API response structure');
    }
    
    const aiResponse = data.candidates[0].content.parts[0].text;
    
    // Clean up response
    let cleanedResponse = aiResponse.trim();
    if (cleanedResponse.startsWith('```json')) {
      cleanedResponse = cleanedResponse.replace(/```json\n?/g, '').replace(/```\n?/g, '');
    } else if (cleanedResponse.startsWith('```')) {
      cleanedResponse = cleanedResponse.replace(/```\n?/g, '');
    }
    
    const result = JSON.parse(cleanedResponse);
    return result;
    
  } catch (error) {
    console.error('Gemini AI Error Details:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    throw new Error(`AI analysis failed: ${error.message}`);
  }
};