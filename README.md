# 🚀 PathFinder AI — Smart Career Discovery & Roadmap Platform

> **Discover your ideal career path with AI-driven skill mapping, Indian market insights (INR / LPA), and step-by-step personalized learning roadmaps.**

![PathFinder AI Banner](https://img.shields.io/badge/PathFinder-AI--Powered%20Career%20Guidance-6E59A5?style=for-the-badge&logo=sparkles)
![React](https://img.shields.io/badge/React-18.3-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=flat-square&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=flat-square&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38BDF8?style=flat-square&logo=tailwindcss)
![Google Gemini](https://img.shields.io/badge/Google%20Gemini-AI-4285F4?style=flat-square&logo=google)
![Supabase](https://img.shields.io/badge/Supabase-Backend-3FCF8E?style=flat-square&logo=supabase)

---

## 📌 Overview

**PathFinder AI** is a state-of-the-art career guidance application built to help job seekers, students, and career switchers navigate the modern job market. By analyzing your individual interests, existing skills, career aspirations, and experience level, PathFinder AI generates tailored career recommendations complete with match scores, Indian Rupee salary estimates (LPA), industry growth metrics, and structured step-by-step skill roadmaps.

Whether connected live to **Google Gemini AI** or operating via the built-in **Intelligent Offline Analysis Engine**, PathFinder delivers actionable insights to future-proof your career trajectory.

---

## ✨ Key Features

- **🎯 Interactive 4-Step Career Assessment**: Quick guided questionnaire capturing interests, current skill set, career goals, and experience levels.
- **🤖 Google Gemini AI Integration**: Live AI analysis leveraging Google Gemini models (`gemini-1.5-flash`, `gemini-2.0-flash`, `gemini-1.5-pro`) to provide custom career strategies.
- **⚡ Intelligent Offline Engine**: Smart fallback mechanism ensuring seamless operation and detailed recommendations even without an API key.
- **🗺️ Personalized Learning Roadmaps**: 6 to 10 phase structured learning progressions that skip skills you already master, prioritize missing skill gaps, and provide step reasons, prerequisites, practical project deliverables, and expected outcomes.
- **🇮🇳 Indian Rupee (LPA) Salary Ranges**: Realistic Indian market salary estimates formatted in Lakhs Per Annum (e.g., `₹8.0 - ₹18.0 LPA`).
- **📊 Skill Gap Analysis & Metrics**: Visual breakdown of market demand growth, skill match scores, existing strengths vs target skill gaps.
- **🔖 Bookmark & Saved Careers**: Save top recommendations to local storage for quick access and comparison.
- **💎 Glassmorphic Dark UI**: Modern dark aesthetic with smooth glassmorphism effects, floating background blurs, micro-animations, and responsive layouts powered by shadcn/ui and Tailwind CSS.

---

## 🛠️ Tech Stack

### **Frontend & Framework**
- **React 18** — Component-driven UI development
- **Vite 5** — Fast build tooling and HMR dev server
- **TypeScript** — Strongly typed code quality
- **React Router v6** — Client-side navigation

### **UI Components & Styling**
- **Tailwind CSS** — Utility-first styling system
- **Radix UI / shadcn/ui** — Accessible design primitives (Accordions, Dialogs, Tooltips, Tabs, Badges)
- **Lucide React** — Crisp modern icon suite (with `IndianRupee` support)
- **Sonner & Toast** — Interactive toast notifications
- **Recharts** — Data visualization and progress charting

### **State & Data Management**
- **TanStack React Query** — Async state management & caching
- **Google Gemini API** — Multi-model generative AI integration
- **Supabase JS** — Cloud backend and real-time database capabilities

---

## 📁 Project Structure

```
pathfinder-refine-main/
├── public/                 # Static assets & icons
├── src/
│   ├── components/         # React components
│   │   ├── ui/             # shadcn UI primitive library
│   │   ├── CareerResults.tsx       # Detailed career analysis & roadmap renderer
│   │   ├── LearningStepItem.tsx    # Interactive roadmap step viewer
│   │   ├── Navbar.tsx              # Top navigation bar & actions
│   │   ├── SavedCareersModal.tsx   # Modal for viewing bookmarked careers
│   │   ├── SkillAssessment.tsx     # 4-step wizard assessment form
│   │   └── SkillBadgeItem.tsx      # Interactive skill tags
│   ├── hooks/              # Custom React hooks (toast, mobile detection)
│   ├── integrations/       # Supabase client & auto-generated DB types
│   ├── lib/                # Utility helper functions (clsx, tailwind-merge)
│   ├── pages/              # Route views (Index.tsx, NotFound.tsx)
│   ├── services/           # AI services & mock data generators
│   │   ├── geminiCareerService.ts  # Gemini API service with model retry logic
│   │   └── mockCareerService.ts    # Intelligent offline analysis fallback
│   ├── types/              # TypeScript interface definitions
│   │   └── career.ts       # RoadmapStep & CareerRecommendation interfaces
│   ├── App.tsx             # Root component with providers & routing
│   ├── main.tsx            # Application entry point
│   └── index.css           # Global Tailwind & glassmorphism theme variables
├── .env.example            # Template for environment configuration
├── components.json         # shadcn UI setup config
├── package.json            # Dependencies & scripts
├── tailwind.config.ts      # Custom Tailwind theme & color tokens
└── vite.config.ts          # Vite build configuration
```

---

## 🚦 Getting Started

### Prerequisites

Ensure you have the following installed on your machine:
- **Node.js**: `v18.0.0` or higher
- **npm** (v9+) or **bun** / **pnpm**

---

### Installation

1. **Clone the repository** (or navigate to the workspace):
   ```bash
   cd pathfinder-refine-main
   ```

2. **Install project dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root directory by copying `.env.example`:
   ```bash
   cp .env.example .env
   ```

4. **Add your configuration parameters to `.env`**:
   ```env
   # Optional: Google Gemini API key for live AI generation
   VITE_GEMINI_API_KEY=your_gemini_api_key_here

   # Optional: Supabase backend configuration
   VITE_SUPABASE_PROJECT_ID=your_project_id
   VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
   VITE_SUPABASE_URL=https://your_project_id.supabase.co
   ```

   > 💡 **Note**: Setting `VITE_GEMINI_API_KEY` is **optional**. If left empty, PathFinder automatically switches to the built-in Intelligent Offline Analysis Engine.

---

### Running Locally

Start the Vite development server:

```bash
npm run dev
```

Open your browser and navigate to **`http://localhost:8080`** (or the port specified in your terminal).

---

## 📜 NPM Scripts Reference

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the Vite local development server |
| `npm run build` | Compiles production assets into the `dist/` folder |
| `npm run build:dev` | Compiles development mode build |
| `npm run preview` | Serves the production build locally for verification |
| `npm run lint` | Runs ESLint to check for code quality and style issues |

---

## ⚙️ AI Engine & Fallback Mechanism

PathFinder AI utilizes a robust fallback architecture defined in [`geminiCareerService.ts`](file:///c:/Users/chinmay/OneDrive/Desktop/projects/pathfinder-refine-main/pathfinder-refine-main/src/services/geminiCareerService.ts):

1. **Primary**: Attempts to connect to Google Gemini API using model fallback (`gemini-1.5-flash` → `gemini-2.0-flash` → `gemini-1.5-pro`).
2. **Secondary**: If no API key is provided or network requests fail, seamlessly invokes [`mockCareerService.ts`](file:///c:/Users/chinmay/OneDrive/Desktop/projects/pathfinder-refine-main/pathfinder-refine-main/src/services/mockCareerService.ts) to compute contextual career options, personalized learning roadmaps, Indian Rupee salary projections (LPA), and skill gap recommendations locally.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the repository issues page.

---

## 📄 License

This project is open-source and available under the **MIT License**.
