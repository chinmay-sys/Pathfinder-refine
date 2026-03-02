export const mockCareerAnalysis = {
  careers: [
    {
      title: "Software Developer",
      description: "Design and build software applications using various programming languages and frameworks.",
      growthRate: 22,
      matchScore: 92,
      salary: "$70k - $130k",
      impact: "High",
      skills: ["JavaScript", "React", "Node.js", "Problem Solving", "Git"],
      learningPath: [
        "Master JavaScript fundamentals and ES6+ features",
        "Learn React and modern frontend development",
        "Build 3-5 portfolio projects",
        "Practice data structures and algorithms",
        "Apply for junior developer positions"
      ]
    },
    {
      title: "Data Analyst",
      description: "Analyze data to help organizations make informed business decisions.",
      growthRate: 25,
      matchScore: 85,
      salary: "$60k - $95k",
      impact: "High",
      skills: ["Python", "SQL", "Excel", "Data Visualization", "Statistics"],
      learningPath: [
        "Learn SQL for database querying",
        "Master Python for data analysis (Pandas, NumPy)",
        "Study statistics and data visualization",
        "Complete data analysis projects",
        "Get certified in relevant tools"
      ]
    },
    {
      title: "UX Designer",
      description: "Create user-centered designs for digital products and services.",
      growthRate: 13,
      matchScore: 78,
      salary: "$65k - $110k",
      impact: "Medium",
      skills: ["Design Thinking", "Figma", "User Research", "Prototyping", "Psychology"],
      learningPath: [
        "Learn design principles and user psychology",
        "Master design tools like Figma or Sketch",
        "Conduct user research and testing",
        "Build a strong design portfolio",
        "Network with other designers"
      ]
    }
  ],
  skillGaps: [
    "Advanced programming concepts",
    "System design principles",
    "Professional communication",
    "Project management basics"
  ],
  recommendations: "Based on your interests and skills, you show strong potential in technology roles. Focus on building practical projects and developing both technical and soft skills."
};

const careerDatabase = {
  "Software Developer": {
    keywords: ['programming', 'coding', 'software', 'development', 'tech', 'computer', 'javascript', 'python', 'web'],
    career: {
      title: "Software Developer",
      description: "Design and build software applications using various programming languages and frameworks.",
      growthRate: 22,
      salary: "$70k - $130k",
      impact: "High",
      skills: ["JavaScript", "React", "Node.js", "Problem Solving", "Git"],
      learningPath: [
        "Master JavaScript fundamentals and ES6+ features",
        "Learn React and modern frontend development",
        "Build 3-5 portfolio projects",
        "Practice data structures and algorithms",
        "Apply for junior developer positions"
      ]
    }
  },
  "Data Scientist": {
    keywords: ['data', 'analysis', 'statistics', 'math', 'analytics', 'research', 'python', 'machine learning', 'ai'],
    career: {
      title: "Data Scientist",
      description: "Extract insights from data to drive business decisions using statistical analysis and machine learning.",
      growthRate: 35,
      salary: "$95k - $165k",
      impact: "High",
      skills: ["Python", "SQL", "Machine Learning", "Statistics", "Data Visualization"],
      learningPath: [
        "Master Python and SQL for data manipulation",
        "Learn statistics and probability theory",
        "Study machine learning algorithms",
        "Complete real-world data projects",
        "Get certified in cloud platforms (AWS/GCP)"
      ]
    }
  },
  "UX Designer": {
    keywords: ['design', 'user', 'creative', 'visual', 'interface', 'experience', 'ui', 'ux', 'figma', 'art'],
    career: {
      title: "UX Designer",
      description: "Create user-centered designs for digital products and services.",
      growthRate: 13,
      salary: "$65k - $110k",
      impact: "Medium",
      skills: ["Design Thinking", "Figma", "User Research", "Prototyping", "Psychology"],
      learningPath: [
        "Learn design principles and user psychology",
        "Master design tools like Figma or Sketch",
        "Conduct user research and testing",
        "Build a strong design portfolio",
        "Network with other designers"
      ]
    }
  },
  "Digital Marketing Manager": {
    keywords: ['marketing', 'social media', 'advertising', 'content', 'brand', 'communication', 'sales', 'digital'],
    career: {
      title: "Digital Marketing Manager",
      description: "Develop and execute digital marketing strategies to promote products and services online.",
      growthRate: 10,
      salary: "$55k - $95k",
      impact: "High",
      skills: ["SEO/SEM", "Social Media", "Content Strategy", "Analytics", "Communication"],
      learningPath: [
        "Learn digital marketing fundamentals",
        "Master Google Analytics and Ads",
        "Develop content creation skills",
        "Build marketing campaigns portfolio",
        "Get certified in marketing platforms"
      ]
    }
  },
  "Product Manager": {
    keywords: ['product', 'management', 'strategy', 'business', 'leadership', 'planning', 'coordination'],
    career: {
      title: "Product Manager",
      description: "Guide product development from conception to launch, working with cross-functional teams.",
      growthRate: 19,
      salary: "$85k - $140k",
      impact: "High",
      skills: ["Strategic Thinking", "Communication", "Data Analysis", "Leadership", "Agile"],
      learningPath: [
        "Learn product management frameworks",
        "Develop business and technical acumen",
        "Practice data-driven decision making",
        "Build leadership and communication skills",
        "Get PM certification or MBA"
      ]
    }
  },
  "Cybersecurity Analyst": {
    keywords: ['security', 'cyber', 'protection', 'hacking', 'network', 'safety', 'risk', 'compliance'],
    career: {
      title: "Cybersecurity Analyst",
      description: "Protect organizations from cyber threats by monitoring, detecting, and responding to security incidents.",
      growthRate: 33,
      salary: "$75k - $125k",
      impact: "High",
      skills: ["Network Security", "Risk Assessment", "Incident Response", "Compliance", "Ethical Hacking"],
      learningPath: [
        "Learn networking and security fundamentals",
        "Get security certifications (Security+, CISSP)",
        "Practice with security tools and platforms",
        "Develop incident response skills",
        "Stay updated on latest threats"
      ]
    }
  }
};

function calculateMatchScore(userText: string, keywords: string[]): number {
  const text = userText.toLowerCase();
  let score = 0;
  let matches = 0;
  
  keywords.forEach(keyword => {
    if (text.includes(keyword)) {
      matches++;
      // Give higher weight to exact matches
      if (text.includes(` ${keyword} `) || text.startsWith(keyword) || text.endsWith(keyword)) {
        score += 15;
      } else {
        score += 10;
      }
    }
  });
  
  // Bonus for multiple keyword matches
  if (matches > 1) {
    score += matches * 5;
  }
  
  return Math.min(100, score);
}

function generateSkillGaps(topCareers: any[], userSkills: string): string[] {
  const gaps = new Set<string>();
  const userSkillsLower = userSkills.toLowerCase();
  
  topCareers.forEach(career => {
    career.skills.forEach((skill: string) => {
      if (!userSkillsLower.includes(skill.toLowerCase())) {
        gaps.add(skill);
      }
    });
  });
  
  return Array.from(gaps).slice(0, 4);
}

function generateRecommendations(topCareer: any, userAnswers: Record<string, string>): string {
  const interests = userAnswers.interests || '';
  const goals = userAnswers.goals || '';
  
  let recommendation = `Based on your interests in ${interests.toLowerCase()} and goals of ${goals.toLowerCase()}, `;
  recommendation += `${topCareer.title} is an excellent match with ${topCareer.growthRate}% job growth. `;
  recommendation += `Focus on building the key skills and following the learning roadmap to achieve your career objectives.`;
  
  return recommendation;
}



function getComplementaryCareers(topCareer: string, allText: string): string[] {
  // Get all careers except the top one
  const allCareers = Object.keys(careerDatabase).filter(career => career !== topCareer);
  
  // Score all remaining careers based on user input
  const scoredCareers = allCareers.map(career => ({
    name: career,
    score: calculateMatchScore(allText, careerDatabase[career].keywords),
    // Add randomness to prevent same results
    adjustedScore: calculateMatchScore(allText, careerDatabase[career].keywords) + Math.random() * 20
  }));
  
  // Sort by adjusted score and return top 2
  return scoredCareers
    .sort((a, b) => b.adjustedScore - a.adjustedScore)
    .slice(0, 2)
    .map(item => item.name);
}

export const analyzeCareer = async (answers: Record<string, string>) => {
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  const allText = Object.values(answers).join(' ').toLowerCase();
  
  // Calculate scores for ALL careers
  const allCareerScores = Object.entries(careerDatabase).map(([name, data]) => ({
    name,
    data,
    score: calculateMatchScore(allText, data.keywords),
    // Add variety factor based on text analysis
    varietyBonus: getVarietyBonus(allText, name)
  }));
  
  // Sort by combined score
  allCareerScores.forEach(career => {
    career.score += career.varietyBonus;
  });
  
  allCareerScores.sort((a, b) => b.score - a.score);
  
  // Take top 3 with minimum score requirements
  const selectedCareers = [];
  
  for (let i = 0; i < Math.min(3, allCareerScores.length); i++) {
    const career = allCareerScores[i];
    selectedCareers.push({
      ...career.data.career,
      matchScore: Math.max(career.score, 90 - (i * 15))
    });
  }
  
  return {
    careers: selectedCareers,
    skillGaps: generateSkillGaps(selectedCareers, answers.skills || ''),
    recommendations: generateRecommendations(selectedCareers[0], answers)
  };
};

function getVarietyBonus(text: string, careerName: string): number {
  const bonusMap: { [key: string]: string[] } = {
    "UX Designer": ['creative', 'design', 'art', 'visual', 'user', 'interface'],
    "Digital Marketing Manager": ['marketing', 'social', 'content', 'brand', 'advertising', 'communication'],
    "Product Manager": ['management', 'strategy', 'business', 'leadership', 'planning', 'team'],
    "Cybersecurity Analyst": ['security', 'protection', 'safety', 'risk', 'cyber', 'network'],
    "Data Scientist": ['data', 'analysis', 'statistics', 'research', 'math', 'analytics'],
    "Software Developer": ['programming', 'coding', 'development', 'software', 'tech', 'computer']
  };
  
  const keywords = bonusMap[careerName] || [];
  let bonus = 0;
  
  keywords.forEach(keyword => {
    if (text.includes(keyword)) {
      bonus += 25; // Higher bonus for specific matches
    }
  });
  
  return bonus;
}