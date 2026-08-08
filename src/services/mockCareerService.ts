import { CareerAnalysisResult, CareerRecommendation, RoadmapStep } from "@/types/career";

// Helper to format salary strings into Indian Rupees (LPA) if they are in USD or unformatted
export function formatSalaryInINR(salaryStr: string): string {
  if (!salaryStr) return "₹6.0 - ₹15.0 LPA (Est. Range)";

  // If already in INR or ₹ or LPA
  if (salaryStr.includes("₹") || salaryStr.toLowerCase().includes("lpa") || salaryStr.toLowerCase().includes("inr")) {
    return salaryStr;
  }

  // Parse dollar amounts e.g., "$90,000 - $145,000 (Est. Range)" or "$80k - $120k"
  const numbers = salaryStr.match(/\d+[\d,]*/g);
  if (numbers && numbers.length >= 2) {
    let num1 = parseInt(numbers[0].replace(/,/g, ""), 10);
    let num2 = parseInt(numbers[1].replace(/,/g, ""), 10);

    // If values are given in thousands (e.g. 80, 120 from 80k-120k)
    if (num1 < 1000) num1 *= 1000;
    if (num2 < 1000) num2 *= 1000;

    // Convert USD to INR LPA (taking into account PPP for Indian IT salaries)
    let lpa1 = Math.round(((num1 * 83) / 100000) * 0.12 * 10) / 10;
    let lpa2 = Math.round(((num2 * 83) / 100000) * 0.12 * 10) / 10;

    const minLpa = Math.max(5, lpa1);
    const maxLpa = Math.max(minLpa + 3, lpa2);

    return `₹${minLpa}.0 - ₹${maxLpa}.0 LPA (Est. Range)`;
  }

  return "₹7.0 - ₹18.0 LPA (Est. Range)";
}

// Helper to normalize and extract skill tokens from user input
function extractUserSkillTokens(skillsText: string): string[] {
  if (!skillsText) return [];
  const text = skillsText.toLowerCase();
  
  const knownSkillKeywords = [
    "javascript", "js", "typescript", "ts", "react", "react.js", "vue", "angular", "html", "css",
    "node", "node.js", "express", "express.js", "python", "java", "c++", "c#", "go", "golang",
    "sql", "postgresql", "postgres", "mysql", "mongodb", "database", "databases", "rest", "api",
    "git", "github", "docker", "kubernetes", "k8s", "aws", "cloud", "azure", "gcp",
    "figma", "ui", "ux", "wireframing", "prototyping", "user research", "design",
    "pandas", "numpy", "statistics", "stats", "excel", "data analysis", "tableau", "power bi",
    "machine learning", "ml", "deep learning", "pytorch", "tensorflow", "ai",
    "agile", "scrum", "product management", "prd", "jira", "leadership", "communication",
    "networking", "linux", "security", "cybersecurity", "ethical hacking", "siem"
  ];

  return knownSkillKeywords.filter(keyword => text.includes(keyword));
}

function userHasSkill(userSkills: string[], skillToTest: string): boolean {
  const lowerTest = skillToTest.toLowerCase();
  return userSkills.some(userSkill => {
    if (userSkill === lowerTest) return true;
    if (lowerTest.includes(userSkill) || userSkill.includes(lowerTest)) return true;
    if (userSkill === "js" && lowerTest.includes("javascript")) return true;
    if (userSkill === "javascript" && lowerTest.includes("js")) return true;
    if (userSkill === "ts" && lowerTest.includes("typescript")) return true;
    if (userSkill === "ml" && lowerTest.includes("machine learning")) return true;
    return false;
  });
}

// Full template pool for major career tracks
interface CareerTemplate {
  title: string;
  description: string;
  keywords: string[];
  growthRate: number;
  salary: string; // Indian Rupees (LPA)
  impact: string;
  requiredSkills: string[];
  fullPhases: Array<{
    title: string;
    description: string;
    duration: string;
    skills: string[];
    difficulty: "Beginner" | "Intermediate" | "Advanced";
    prerequisites: string[];
    project?: string;
    resources?: Array<{ title: string; type: string; url?: string }>;
    outcome: string;
  }>;
}

const CAREER_TEMPLATES: CareerTemplate[] = [
  // 1. PRODUCT MANAGER
  {
    title: "Product Manager",
    description: "Guide product development from user discovery to release by aligning strategy, design, engineering, and business metrics.",
    keywords: ["product", "management", "strategy", "business", "leadership", "planning", "coordination", "user research", "roadmap", "prd", "agile"],
    growthRate: 19,
    salary: "₹12.0 - ₹25.0 LPA (Est. Range)",
    impact: "High",
    requiredSkills: [
      "Product Strategy", "User Research", "Product Analytics", "Roadmapping",
      "Agile & Scrum", "Prioritization Frameworks (RICE/OKRs)", "UX Fundamentals", "Stakeholder Management"
    ],
    fullPhases: [
      {
        title: "Product Management Fundamentals",
        description: "Master the end-to-end product lifecycle, product-market fit principles, and MVP definition.",
        duration: "3-4 weeks",
        skills: ["Product Lifecycle", "Product Discovery", "MVP Definition", "Product-Market Fit"],
        difficulty: "Beginner",
        prerequisites: ["Problem Solving"],
        project: "Deconstruct a tech product (e.g. Spotify) and map its value proposition and MVP feature set.",
        resources: [
          { title: "Inspired by Marty Cagan", type: "Book / Guide" },
          { title: "Product School Free Resources", type: "Documentation" }
        ],
        outcome: "Understand how modern tech products are conceived, validated, and launched."
      },
      {
        title: "User Research & Customer Discovery",
        description: "Conduct user interviews, map customer pain points, and define Jobs-to-be-Done (JTBD).",
        duration: "3-4 weeks",
        skills: ["User Interviews", "Customer Pain Points", "Jobs-to-be-Done", "User Journey Mapping"],
        difficulty: "Beginner",
        prerequisites: ["Product Management Fundamentals"],
        project: "Conduct 5 structured user interviews for a problem space and create user personas and journey maps.",
        resources: [
          { title: "The Mom Test by Rob Fitzpatrick", type: "Book / Guide" }
        ],
        outcome: "Ability to extract unbiased customer insights to validate product hypotheses."
      },
      {
        title: "Product Strategy & Feature Prioritization",
        description: "Formulate product visions, establish OKRs, and apply RICE/MoSCoW frameworks for roadmap decisions.",
        duration: "4 weeks",
        skills: ["Product Strategy", "Product Roadmapping", "OKRs", "RICE Framework", "MoSCoW Prioritization"],
        difficulty: "Intermediate",
        prerequisites: ["User Research"],
        project: "Build a 6-month product roadmap for a SaaS tool using RICE scoring and OKR alignment.",
        resources: [
          { title: "Reforge Product Strategy Highlights", type: "Article / Guide" }
        ],
        outcome: "Skill to make data-backed trade-offs and communicate product vision to executive stakeholders."
      },
      {
        title: "Product Analytics & Metrics",
        description: "Define product KPIs, analyze retention funnels, and design A/B experiments.",
        duration: "4 weeks",
        skills: ["Product KPIs", "Funnel Analysis", "Retention & Churn", "A/B Testing", "Mixpanel / Amplitude"],
        difficulty: "Intermediate",
        prerequisites: ["Product Strategy"],
        project: "Analyze mock app analytics data to identify drop-off funnels and propose a hypothesis for A/B testing.",
        resources: [
          { title: "Mixpanel Product Analytics Guide", type: "Documentation" }
        ],
        outcome: "Data fluency to measure feature success and optimize user engagement."
      },
      {
        title: "UX Design & Technical Acumen for PMs",
        description: "Collaborate effectively with designers and engineers by understanding Figma, APIs, and tech stack trade-offs.",
        duration: "3-4 weeks",
        skills: ["UX Fundamentals", "Wireframing", "Figma Basics", "APIs & System Architecture"],
        difficulty: "Intermediate",
        prerequisites: ["Product Analytics"],
        project: "Create low-fidelity wireframes in Figma for a new feature and write API requirement specs.",
        resources: [
          { title: "Figma for Product Managers", type: "Video Tutorial" }
        ],
        outcome: "Seamless cross-functional communication with design and software development teams."
      },
      {
        title: "Agile Execution & Specification (PRDs)",
        description: "Write comprehensive Product Requirement Documents (PRDs), user stories, and acceptance criteria.",
        duration: "3 weeks",
        skills: ["PRD Writing", "User Stories", "Acceptance Criteria", "Backlog Grooming", "Scrum Ceremonies"],
        difficulty: "Intermediate",
        prerequisites: ["UX Design & Tech Acumen"],
        project: "Write an end-to-end PRD for a new mobile application feature complete with edge cases.",
        resources: [
          { title: "Atlassian Agile & PRD Templates", type: "Documentation" }
        ],
        outcome: "Execution clarity to lead sprint planning and unblock engineering teams."
      },
      {
        title: "Capstone Project: Build & Launch a Product",
        description: "Execute a complete product management cycle from problem identification to interactive prototype and feedback.",
        duration: "5-6 weeks",
        skills: ["End-to-End Product Management", "Prototype Testing", "Launch Strategy", "Stakeholder Pitching"],
        difficulty: "Advanced",
        prerequisites: ["Agile Execution"],
        project: "Identify a real-world problem, conduct user research, produce a PRD, build a prototype, and pitch to reviewers.",
        outcome: "A battle-tested product portfolio piece demonstrating end-to-end product leadership."
      },
      {
        title: "PM Portfolio & Interview Mastery",
        description: "Prepare product teardowns, practice product sense & execution cases, and polish your portfolio.",
        duration: "3-4 weeks",
        skills: ["Product Teardowns", "Product Sense Cases", "Metrics & Execution Cases", "Interview Practice"],
        difficulty: "Advanced",
        prerequisites: ["Capstone Project"],
        project: "Publish 2 detailed product teardowns on Medium/Substack and mock interview 5 PM case studies.",
        outcome: "Interview readiness for Product Manager roles at tech companies."
      }
    ]
  },

  // 2. FULL STACK DEVELOPER
  {
    title: "Full Stack Developer",
    description: "Build scalable web applications end-to-end, spanning modern frontend interfaces, backend APIs, and databases.",
    keywords: ["fullstack", "full stack", "web", "react", "javascript", "node", "express", "sql", "postgresql", "api", "database", "css", "html", "developer", "coding"],
    growthRate: 24,
    salary: "₹8.0 - ₹18.0 LPA (Est. Range)",
    impact: "High",
    requiredSkills: [
      "JavaScript / TypeScript", "React", "Node.js & Express", "RESTful & GraphQL APIs",
      "PostgreSQL / MongoDB", "Authentication & Security", "Docker & Deployment", "Git & CI/CD"
    ],
    fullPhases: [
      {
        title: "Frontend Foundations (JS & CSS)",
        description: "Master modern ES6+ JavaScript, DOM manipulation, responsive layouts with CSS/Tailwind.",
        duration: "3-4 weeks",
        skills: ["ES6+ JavaScript", "DOM Manipulation", "HTML5 & Modern CSS", "Tailwind CSS"],
        difficulty: "Beginner",
        prerequisites: ["Computer Basics"],
        project: "Build a responsive dynamic web application fetching live third-party API data.",
        resources: [
          { title: "javascript.info", type: "Documentation" }
        ],
        outcome: "Solid proficiency in frontend client-side scripting and UI styling."
      },
      {
        title: "Modern React Development",
        description: "Build interactive component-driven user interfaces using React Hooks, State Management, and TypeScript.",
        duration: "4 weeks",
        skills: ["React JSX", "React Hooks (useState, useEffect)", "TypeScript with React", "State Management"],
        difficulty: "Intermediate",
        prerequisites: ["Frontend Foundations"],
        project: "Build a multi-page interactive dashboard with state persistence and filter search.",
        resources: [
          { title: "React Official Docs", type: "Documentation" }
        ],
        outcome: "Ability to construct complex, reusable frontend architectures."
      },
      {
        title: "Backend Development with Node.js & Express",
        description: "Construct scalable server-side applications, route handlers, and middleware.",
        duration: "4 weeks",
        skills: ["Node.js Core", "Express.js Framework", "HTTP Protocols & Status Codes", "RESTful API Architecture"],
        difficulty: "Intermediate",
        prerequisites: ["JavaScript"],
        project: "Develop a REST API with CRUD endpoints, input validation, and structured error handling.",
        resources: [
          { title: "Express.js Documentation", type: "Documentation" }
        ],
        outcome: "Confidence in building robust server-side Web APIs."
      },
      {
        title: "Relational Databases & ORMs (PostgreSQL)",
        description: "Design relational database schemas, execute complex SQL queries, and integrate ORMs like Prisma or Drizzle.",
        duration: "3-4 weeks",
        skills: ["SQL Queries & JOINs", "PostgreSQL", "Database Schema Design", "Prisma / Drizzle ORM"],
        difficulty: "Intermediate",
        prerequisites: ["Backend Development"],
        project: "Model a multi-table database schema (Users, Products, Orders) and implement data migrations.",
        resources: [
          { title: "PostgreSQL Tutorial", type: "Documentation" }
        ],
        outcome: "Data modeling and query optimization skills for persistent storage."
      },
      {
        title: "Authentication, Security & State Management",
        description: "Implement JWT, OAuth2, password hashing, CORS, rate-limiting, and protected routes.",
        duration: "3-4 weeks",
        skills: ["JWT Authentication", "Bcrypt Hashing", "Role-Based Access Control", "Web Security Practices"],
        difficulty: "Intermediate",
        prerequisites: ["Node.js & Databases"],
        project: "Add full user registration, login, JWT refresh tokens, and RBAC authorization to your API.",
        outcome: "Secure full-stack applications against common vulnerabilities (OWASP)."
      },
      {
        title: "DevOps, Docker & Cloud Deployment",
        description: "Containerize web services with Docker and deploy applications to Vercel, Render, or AWS.",
        duration: "3-4 weeks",
        skills: ["Docker Containers", "Docker Compose", "Environment Configuration", "CI/CD Pipelines"],
        difficulty: "Advanced",
        prerequisites: ["Full Stack API Development"],
        project: "Create a Docker Compose configuration bundling React frontend, Node backend, and Postgres DB for automated deployment.",
        outcome: "Production deployment and containerization expertise."
      },
      {
        title: "Full Stack Capstone Project",
        description: "Architect and deploy a real-world SaaS application with real-time features, database persistence, and payment integration.",
        duration: "5-6 weeks",
        skills: ["End-to-End System Design", "WebSockets / Realtime", "Stripe / Payment Gateway", "Full Stack Deployment"],
        difficulty: "Advanced",
        prerequisites: ["Docker & Cloud Deployment"],
        project: "Build a complete SaaS platform (e.g. Task Collaboration Tool) with live updates and production hosting.",
        outcome: "A production-grade project ready for client showcase or job application portfolios."
      }
    ]
  },

  // 3. DATA SCIENTIST
  {
    title: "Data Scientist",
    description: "Derive strategic insights and build predictive machine learning models using statistical modeling, Python, and data pipelines.",
    keywords: ["data", "science", "scientist", "python", "statistics", "machine learning", "pandas", "numpy", "sql", "ai", "modeling", "math"],
    growthRate: 35,
    salary: "₹10.0 - ₹24.0 LPA (Est. Range)",
    impact: "High",
    requiredSkills: [
      "Python & Data Libraries (Pandas, NumPy)", "SQL Data Extraction", "Applied Statistics & Probability",
      "Exploratory Data Analysis (EDA)", "Supervised & Unsupervised Machine Learning", "Model Evaluation & Hyperparameter Tuning", "Data Storytelling"
    ],
    fullPhases: [
      {
        title: "Python for Data Analysis & SQL",
        description: "Master Python data structures, Pandas DataFrames, NumPy array manipulation, and SQL data queries.",
        duration: "4 weeks",
        skills: ["Python Core", "Pandas", "NumPy", "SQL Queries & Aggregations"],
        difficulty: "Beginner",
        prerequisites: ["Basic Math"],
        project: "Clean and transform a messy 100k-row Kaggle dataset using Pandas and export analytical summaries.",
        resources: [{ title: "Pandas User Guide", type: "Documentation" }],
        outcome: "Fluency in data wrangling and database extraction."
      },
      {
        title: "Applied Statistics & Exploratory Data Analysis",
        description: "Understand hypothesis testing, statistical distributions, correlation, and data visualization.",
        duration: "4 weeks",
        skills: ["Descriptive Statistics", "Hypothesis Testing", "Correlation Analysis", "Matplotlib & Seaborn"],
        difficulty: "Intermediate",
        prerequisites: ["Python & SQL"],
        project: "Perform comprehensive EDA on housing or customer churn data, producing visual charts and statistical significance tests.",
        outcome: "Ability to extract meaningful statistical patterns from raw datasets."
      },
      {
        title: "Supervised Machine Learning",
        description: "Train regression models, decision trees, random forests, and gradient boosting (XGBoost) with Scikit-Learn.",
        duration: "5 weeks",
        skills: ["Linear & Logistic Regression", "Decision Trees & Random Forests", "XGBoost", "Scikit-Learn"],
        difficulty: "Intermediate",
        prerequisites: ["Applied Statistics"],
        project: "Build a predictive machine learning pipeline for customer churn with feature scaling and cross-validation.",
        outcome: "Proficiency in constructing accurate predictive models."
      },
      {
        title: "Unsupervised Learning & Feature Engineering",
        description: "Implement clustering algorithms (K-Means, DBSCAN), dimensionality reduction (PCA), and feature selection.",
        duration: "4 weeks",
        skills: ["K-Means Clustering", "PCA Dimensionality Reduction", "Feature Engineering", "Handling Missing Data"],
        difficulty: "Intermediate",
        prerequisites: ["Supervised ML"],
        project: "Segment e-commerce customer datasets into distinct behavioral clusters for targeted marketing.",
        outcome: "Skill to uncover hidden groupings and optimize feature representations."
      },
      {
        title: "Model Evaluation, Tuning & MLOps Basics",
        description: "Master precision/recall, ROC-AUC, grid search hyperparameter tuning, and model deployment via Streamlit/FastAPI.",
        duration: "4 weeks",
        skills: ["ROC-AUC & F1-Score", "GridSearchCV", "FastAPI Model Serving", "Streamlit UI"],
        difficulty: "Advanced",
        prerequisites: ["Unsupervised Learning"],
        project: "Deploy an interactive machine learning model Web app using Streamlit hosted on Cloud.",
        outcome: "Production deployment capability for machine learning models."
      },
      {
        title: "Data Science Capstone & Portfolio",
        description: "End-to-end data science project solving a business problem with full documentation and reproducible notebooks.",
        duration: "5 weeks",
        skills: ["Business Problem Formulation", "End-to-End Pipeline", "Executive Presentation", "GitHub Portfolio"],
        difficulty: "Advanced",
        prerequisites: ["Model Evaluation"],
        project: "Create a complete, published Data Science project on GitHub with interactive charts and clean code.",
        outcome: "Job-ready portfolio piece showcasing analytical rigour and technical mastery."
      }
    ]
  },

  // 4. CYBERSECURITY ANALYST
  {
    title: "Cybersecurity Analyst",
    description: "Protect systems and networks against security breaches by implementing vulnerability management, SIEM, and incident response.",
    keywords: ["security", "cyber", "cybersecurity", "network", "hacking", "ethical hacking", "siem", "linux", "firewall", "vulnerability", "risk"],
    growthRate: 33,
    salary: "₹8.0 - ₹16.0 LPA (Est. Range)",
    impact: "High",
    requiredSkills: [
      "Networking Protocols (TCP/IP, DNS, OSI)", "Linux Administration", "Web Security (OWASP Top 10)",
      "SIEM Tools (Splunk / Wireshark)", "Vulnerability Assessment", "Incident Response & Threat Hunting"
    ],
    fullPhases: [
      {
        title: "Networking & Linux Security Fundamentals",
        description: "Master TCP/IP networking, packet analysis with Wireshark, and Linux command-line administration.",
        duration: "4 weeks",
        skills: ["TCP/IP & OSI Model", "Linux Command Line", "Wireshark Packet Analysis", "DNS & Routing"],
        difficulty: "Beginner",
        prerequisites: ["Computer Fundamentals"],
        project: "Capture and analyze network traffic logs using Wireshark to identify unauthorized protocols.",
        resources: [{ title: "OverTheWire Bandit (Linux Labs)", type: "Interactive" }],
        outcome: "Foundational understanding of network architecture and operating system internals."
      },
      {
        title: "Web Application Security & OWASP Top 10",
        description: "Understand SQL injection, Cross-Site Scripting (XSS), CSRF, and authentication flaws.",
        duration: "4 weeks",
        skills: ["OWASP Top 10", "Burp Suite", "SQL Injection Mitigation", "XSS & CSRF Prevention"],
        difficulty: "Intermediate",
        prerequisites: ["Networking & Linux"],
        project: "Audit a vulnerable web application (e.g. OWASP Juice Shop) using Burp Suite and document remediation steps.",
        outcome: "Practical skill to audit and secure web applications."
      },
      {
        title: "Vulnerability Management & Penetration Testing",
        description: "Perform vulnerability scans with Nmap/Nessus and execute ethical penetration testing methodologies.",
        duration: "4 weeks",
        skills: ["Nmap Scanning", "Nessus Vulnerability Assessment", "Metasploit Basics", "Risk Assessment"],
        difficulty: "Intermediate",
        prerequisites: ["Web Security"],
        project: "Execute a vulnerability assessment report on a target lab environment highlighting high-risk CVEs.",
        outcome: "Ability to detect and prioritize system security vulnerabilities."
      },
      {
        title: "SIEM, Log Analysis & Incident Response",
        description: "Configure Splunk/Elastic SIEM to monitor security events, write detection rules, and respond to breaches.",
        duration: "4 weeks",
        skills: ["Splunk SIEM", "Log Parsing & Correlation", "Threat Detection", "Incident Response Protocols"],
        difficulty: "Advanced",
        prerequisites: ["Vulnerability Assessment"],
        project: "Simulate a malware infection scenario in a SIEM sandbox and write an incident triage report.",
        outcome: "Security Operations Center (SOC) incident response readiness."
      },
      {
        title: "Cybersecurity Capstone & Defensive Strategy",
        description: "Architect a hardened enterprise security strategy incorporating firewalls, zero-trust, and continuous monitoring.",
        duration: "4 weeks",
        skills: ["Zero-Trust Architecture", "Hardening Benchmarks (CIS)", "Security Automation", "Defense-in-Depth"],
        difficulty: "Advanced",
        prerequisites: ["SIEM & Incident Response"],
        project: "Design a complete enterprise security blueprint with threat matrix and mitigation policies.",
        outcome: "Demonstrated capacity for enterprise security analysis and defense."
      }
    ]
  },

  // 5. UI/UX DESIGNER
  {
    title: "UI/UX Designer",
    description: "Craft intuitive, accessible digital experiences through user research, wireframing, interactive prototyping, and design systems.",
    keywords: ["design", "ui", "ux", "figma", "user research", "wireframing", "prototyping", "creative", "interface", "visual"],
    growthRate: 16,
    salary: "₹6.5 - ₹14.0 LPA (Est. Range)",
    impact: "Medium",
    requiredSkills: [
      "Design Thinking", "Figma Mastery", "User Research & Usability Testing",
      "Wireframing & Prototyping", "Design Systems & Component Libraries", "Accessibility (WCAG)"
    ],
    fullPhases: [
      {
        title: "Design Principles & Figma Mastery",
        description: "Learn typography, color theory, grid systems, auto-layout, and interactive components in Figma.",
        duration: "3-4 weeks",
        skills: ["Figma Auto-Layout", "Visual Hierarchy", "Typography & Color", "Figma Components"],
        difficulty: "Beginner",
        prerequisites: ["Visual Aptitude"],
        project: "Redesign 3 mobile app screens in Figma applying auto-layout and cohesive color variables.",
        resources: [{ title: "Figma Official Academy", type: "Video Tutorial" }],
        outcome: "Speed and technical dexterity in Figma design creation."
      },
      {
        title: "User Research, Empathy & Journey Mapping",
        description: "Conduct usability tests, build customer personas, and map user flows.",
        duration: "3-4 weeks",
        skills: ["User Interviews", "Usability Testing", "User Personas", "User Journey Mapping"],
        difficulty: "Intermediate",
        prerequisites: ["Design Principles"],
        project: "Conduct usability testing on an existing app, document friction points, and build user flow diagrams.",
        outcome: "User-centered design approach grounded in empirical feedback."
      },
      {
        title: "Wireframing & High-Fidelity Prototyping",
        description: "Transform low-fidelity sketches into interactive micro-animated prototypes.",
        duration: "4 weeks",
        skills: ["Wireframing", "Interactive Prototyping", "Micro-interactions", "Information Architecture"],
        difficulty: "Intermediate",
        prerequisites: ["User Research"],
        project: "Create an end-to-end interactive mobile app prototype with realistic screen transitions.",
        outcome: "Ability to present testable interactive design concepts."
      },
      {
        title: "Design Systems & Accessibility (WCAG)",
        description: "Construct scalable design tokens, component libraries, and ensure high contrast and accessibility standards.",
        duration: "4 weeks",
        skills: ["Design Systems", "Component Variants", "Design Tokens", "WCAG 2.1 Accessibility"],
        difficulty: "Advanced",
        prerequisites: ["High-Fidelity Prototyping"],
        project: "Build a multi-component design system in Figma with dark/light mode variants and accessibility compliance.",
        outcome: "Industry-standard design system management skills."
      },
      {
        title: "UX Case Study Portfolio Building",
        description: "Package your research, wireframes, iterations, and final prototypes into compelling UX case studies.",
        duration: "4-5 weeks",
        skills: ["UX Writing", "Case Study Storytelling", "Design Portfolio", "Developer Handoff"],
        difficulty: "Advanced",
        prerequisites: ["Design Systems"],
        project: "Publish 2 detailed, polished UX case studies on a personal website or Notion portfolio.",
        outcome: "A compelling design portfolio ready for UX job applications."
      }
    ]
  },

  // 6. AI / MACHINE LEARNING ENGINEER
  {
    title: "AI / Machine Learning Engineer",
    description: "Architect, fine-tune, and deploy deep learning models, LLMs, and intelligent AI automation systems into production.",
    keywords: ["ai", "machine learning", "deep learning", "pytorch", "tensorflow", "llm", "rag", "neural network", "python", "nlp", "computer vision"],
    growthRate: 40,
    salary: "₹12.0 - ₹28.0 LPA (Est. Range)",
    impact: "High",
    requiredSkills: [
      "Python & PyTorch", "Deep Learning Foundations", "Transformers & LLMs",
      "Retrieval-Augmented Generation (RAG)", "Model Quantization & Fine-Tuning", "Vector Databases", "ML API Deployment"
    ],
    fullPhases: [
      {
        title: "Deep Learning Foundations with PyTorch",
        description: "Understand neural network mathematics, backpropagation, tensors, and PyTorch model building.",
        duration: "4 weeks",
        skills: ["PyTorch", "Neural Networks", "Backpropagation", "Tensor Manipulation"],
        difficulty: "Intermediate",
        prerequisites: ["Python & Math"],
        project: "Build and train a multi-layer neural network from scratch in PyTorch to classify images.",
        resources: [{ title: "Deep Learning with PyTorch Book", type: "Documentation" }],
        outcome: "Solid grasp of deep neural network mechanics."
      },
      {
        title: "Natural Language Processing & Transformers",
        description: "Master tokenization, word embeddings, attention mechanisms, and Hugging Face Transformers.",
        duration: "4 weeks",
        skills: ["Hugging Face", "Attention Mechanism", "Transformer Architecture", "Tokenization"],
        difficulty: "Intermediate",
        prerequisites: ["Deep Learning Foundations"],
        project: "Fine-tune a Hugging Face Transformer model for text classification or sentiment analysis.",
        outcome: "Ability to leverage modern open-source NLP models."
      },
      {
        title: "LLM Engineering & RAG Architectures",
        description: "Build RAG pipelines using LangChain / LlamaIndex, vector databases (Qdrant / Pinecone), and prompt engineering.",
        duration: "4 weeks",
        skills: ["LangChain / LlamaIndex", "Vector Databases (Pinecone/Qdrant)", "Embeddings", "RAG Optimization"],
        difficulty: "Advanced",
        prerequisites: ["NLP & Transformers"],
        project: "Build a Chat-with-your-PDF RAG application with vector search and conversational memory.",
        outcome: "Production RAG implementation skills for enterprise AI applications."
      },
      {
        title: "AI Model Serving & Inference Optimization",
        description: "Optimize inference using vLLM, TensorRT, model quantization (GGUF/AWQ), and deploy FastAPI endpoints.",
        duration: "4 weeks",
        skills: ["Model Quantization", "vLLM / Ollama", "FastAPI AI Serving", "GPU Optimization"],
        difficulty: "Advanced",
        prerequisites: ["LLM Engineering"],
        project: "Deploy an optimized quantized LLM endpoint handling low-latency API requests.",
        outcome: "Skill to serve large AI models efficiently at production scale."
      },
      {
        title: "AI Engineer Capstone Project",
        description: "Architect a full-stack AI system combining multimodal models, vector retrieval, and custom frontend interface.",
        duration: "5 weeks",
        skills: ["Full Stack AI Integration", "System Evaluation", "Production Monitoring", "GitHub Showcase"],
        difficulty: "Advanced",
        prerequisites: ["AI Model Serving"],
        project: "Build and host an autonomous AI agent system capable of tool execution and web research.",
        outcome: "A cutting-edge AI portfolio project showcasing production AI engineering skills."
      }
    ]
  }
];

function findBestCareerTemplates(allText: string): CareerTemplate[] {
  const scored = CAREER_TEMPLATES.map(tpl => {
    let score = 0;
    tpl.keywords.forEach(kw => {
      if (allText.includes(kw)) score += 15;
    });
    return { tpl, score };
  });

  scored.sort((a, b) => b.score - a.score);

  const top3 = scored.slice(0, 3).map(s => s.tpl);
  while (top3.length < 3) {
    for (const tpl of CAREER_TEMPLATES) {
      if (!top3.includes(tpl)) {
        top3.push(tpl);
        if (top3.length === 3) break;
      }
    }
  }
  return top3;
}

export const analyzeCareer = async (answers: Record<string, string>): Promise<CareerAnalysisResult> => {
  await new Promise(resolve => setTimeout(resolve, 1200));

  const userSkillsText = answers.skills || "";
  const userInterestsText = answers.interests || "";
  const userGoalsText = answers.goals || "";
  const userExpText = answers.experience || "";

  const combinedText = `${userInterestsText} ${userSkillsText} ${userGoalsText} ${userExpText}`.toLowerCase();
  const userSkillTokens = extractUserSkillTokens(userSkillsText + " " + userExpText);

  const matchedTemplates = findBestCareerTemplates(combinedText);

  const personalizedCareers: CareerRecommendation[] = matchedTemplates.map((template, idx) => {
    const possessedSkills = template.requiredSkills.filter(reqSkill => userHasSkill(userSkillTokens, reqSkill));
    const missingSkills = template.requiredSkills.filter(reqSkill => !userHasSkill(userSkillTokens, reqSkill));

    const personalizedPhases: RoadmapStep[] = [];
    let currentPhaseNum = 1;

    template.fullPhases.forEach((phaseTemplate) => {
      const phaseSkillsPossessed = phaseTemplate.skills.filter(s => userHasSkill(userSkillTokens, s));
      const phaseSkillsMissing = phaseTemplate.skills.filter(s => !userHasSkill(userSkillTokens, s));

      const isFullyKnown = phaseSkillsPossessed.length > 0 && phaseSkillsMissing.length === 0;

      if (isFullyKnown) {
        return;
      }

      let customReason = "";
      if (possessedSkills.length > 0 && phaseSkillsMissing.length > 0) {
        const topMissingInStep = phaseSkillsMissing.slice(0, 2).join(", ");
        const topPossessed = possessedSkills.slice(0, 2).join(", ");
        customReason = `Building on your existing background in ${topPossessed}, this step focuses directly on bridging your key skill gap in ${topMissingInStep}.`;
      } else {
        customReason = `Essential core step to acquire ${phaseTemplate.skills.slice(0, 2).join(" & ")} for a competitive ${template.title} profile.`;
      }

      personalizedPhases.push({
        phase: currentPhaseNum++,
        title: phaseTemplate.title,
        description: phaseTemplate.description,
        duration: phaseTemplate.duration,
        skills: phaseTemplate.skills,
        difficulty: phaseTemplate.difficulty,
        reason: customReason,
        prerequisites: phaseTemplate.prerequisites,
        project: phaseTemplate.project,
        resources: phaseTemplate.resources || [
          { title: `${phaseTemplate.title} Official Documentation`, type: "Documentation" },
          { title: `${phaseTemplate.title} Video Guide`, type: "Video Tutorial" }
        ],
        outcome: phaseTemplate.outcome
      });
    });

    if (personalizedPhases.length < 4) {
      template.fullPhases.slice(-4).forEach((phaseTemplate) => {
        if (!personalizedPhases.some(p => p.title === phaseTemplate.title)) {
          personalizedPhases.push({
            phase: currentPhaseNum++,
            title: phaseTemplate.title,
            description: phaseTemplate.description,
            duration: phaseTemplate.duration,
            skills: phaseTemplate.skills,
            difficulty: phaseTemplate.difficulty,
            reason: `Advanced mastery phase tailored to elevate your existing experience level to senior standards.`,
            prerequisites: phaseTemplate.prerequisites,
            project: phaseTemplate.project,
            resources: phaseTemplate.resources || [{ title: "Advanced Guide", type: "Documentation" }],
            outcome: phaseTemplate.outcome
          });
        }
      });
    }

    personalizedPhases.forEach((p, index) => {
      p.phase = index + 1;
    });

    const baseMatch = 94 - (idx * 6);
    const skillOverlapBonus = Math.min(10, possessedSkills.length * 3);
    const finalMatchScore = Math.min(99, Math.max(70, baseMatch + skillOverlapBonus));

    return {
      title: template.title,
      description: template.description,
      growthRate: template.growthRate,
      matchScore: finalMatchScore,
      salary: formatSalaryInINR(template.salary),
      salaryLabel: "Estimated Indian Market Range (LPA)",
      impact: template.impact,
      skills: template.requiredSkills,
      possessedSkills: possessedSkills.length > 0 ? possessedSkills : ["Foundational Aptitude"],
      missingSkills: missingSkills.length > 0 ? missingSkills : template.requiredSkills.slice(0, 3),
      learningPath: personalizedPhases
    };
  });

  const allMissingGapsSet = new Set<string>();
  personalizedCareers.forEach(c => {
    (c.missingSkills || []).forEach(s => allMissingGapsSet.add(s));
  });

  const overallGaps = Array.from(allMissingGapsSet).slice(0, 5);

  const topCareerTitle = personalizedCareers[0].title;
  const topPossessedStr = personalizedCareers[0].possessedSkills?.slice(0, 2).join(" and ") || "your current skills";

  const overallRecommendation = `Based on your profile, leveraging ${topPossessedStr} gives you a strong launchpad for ${topCareerTitle}. We've customized your learning roadmaps to prioritize your exact missing skill gaps while skipping redundant topics.`;

  return {
    careers: personalizedCareers,
    skillGaps: overallGaps.length > 0 ? overallGaps : ["Advanced System Architecture", "Production Metrics"],
    recommendations: overallRecommendation
  };
};

export const mockCareerAnalysis = {
  careers: [],
  skillGaps: [],
  recommendations: ""
};