# PathFinder Setup Instructions

## Quick Start (5 minutes)

### 1. Install Dependencies
```bash
cd pathfinder-refine-main
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Open Browser
Go to: http://localhost:8080

## That's it! The app is now fully functional.

## What Works:
- ✅ Landing page with animations
- ✅ Skill assessment form (4 questions)
- ✅ Career analysis with personalized results
- ✅ Career roadmaps and recommendations
- ✅ Save career paths to local storage
- ✅ Responsive design

## Features:
- Interactive career assessment
- 3 career recommendations with match scores
- Detailed learning roadmaps
- Skill gap analysis
- Save/view career paths
- Modern UI with animations

## Troubleshooting:
If you get errors:
1. Delete `node_modules` and run `npm install` again
2. Make sure you're in the correct directory
3. Try `npm run build` to check for build errors

## Optional: Enable Real AI Analysis
To use real AI instead of mock data:
1. Set up Supabase project
2. Deploy the analyze-career function
3. Add LOVABLE_API_KEY to Supabase secrets
4. Uncomment Supabase code in SkillAssessment.tsx