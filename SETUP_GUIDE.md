# PrepPilot - Complete Setup & Deployment Guide

## Overview

PrepPilot is a full-stack AI-powered interview preparation platform built with modern web technologies. It helps job seekers prepare for placements with personalized roadmaps, progress tracking, and comprehensive learning resources.

## Project Summary

### What PrepPilot Includes

1. **Landing Page** - Beautiful hero section with features, testimonials, and CTAs
2. **Authentication** - Clerk-based user authentication (sign up, sign in, profile)
3. **Dashboard** - Overview of progress, active roadmaps, quick stats
4. **Roadmap Generator** - AI-powered form to create personalized preparation roadmaps
5. **Progress Tracker** - Daily task management, completion tracking, study hours logging
6. **Analytics** - Comprehensive performance insights, weak area detection
7. **API Backend** - RESTful APIs for all operations
8. **Database** - PostgreSQL with Prisma ORM

### Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS, Framer Motion, shadcn/ui
- **Backend**: Next.js API Routes, Prisma ORM, PostgreSQL
- **Authentication**: Clerk
- **AI**: OpenAI API (GPT-4)
- **State Management**: Zustand (hooks for now)
- **Forms**: React Hook Form

## Prerequisites

Before starting, ensure you have:

1. **Node.js** 16+ and npm/yarn
2. **PostgreSQL** database (local or cloud)
3. **Clerk** account (free tier available)
4. **OpenAI** API key
5. **Git** for version control
6. **VS Code** or any code editor

## Step-by-Step Setup

### Step 1: Database Setup

#### Option A: Local PostgreSQL

```bash
# Install PostgreSQL
# macOS: brew install postgresql
# Ubuntu: sudo apt-get install postgresql
# Windows: Download from https://www.postgresql.org/download/windows/

# Start PostgreSQL service
# macOS: brew services start postgresql
# Ubuntu: sudo service postgresql start

# Create database
createdb preppilot

# Note the connection string:
# postgresql://postgres:password@localhost:5432/preppilot
```

#### Option B: Supabase (Recommended for cloud)

1. Go to https://supabase.com
2. Create a new project
3. Copy the PostgreSQL connection string
4. Note: It looks like `postgresql://[user]:[password]@[host].supabase.co:5432/[database]`

### Step 2: Clerk Setup

1. Visit https://dashboard.clerk.com
2. Create a new application
3. Go to API Keys section
4. Copy your:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`
5. Configure allowed redirect URIs:
   - `http://localhost:3000/*` (development)
   - `https://yourdomain.com/*` (production)

### Step 3: OpenAI Setup

1. Visit https://platform.openai.com/account/api-keys
2. Click "Create new secret key"
3. Copy the API key
4. **Important**: Save it securely (you can't view it again)
5. Note: You need credits in your OpenAI account

### Step 4: Environment Variables

1. Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

2. Fill in the values:
```env
# Database URL
DATABASE_URL="postgresql://user:password@localhost:5432/preppilot"

# Clerk keys
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxx
CLERK_SECRET_KEY=sk_test_xxx

# OpenAI key
OPENAI_API_KEY=sk-xxx

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

### Step 5: Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### Step 6: Database Migration

```bash
# Push the Prisma schema to your database
npx prisma db push

# Generate Prisma client
npx prisma generate

# (Optional) Open Prisma Studio to view data
npx prisma studio
```

### Step 7: Run Development Server

```bash
npm run dev
# or
yarn dev
```

Visit `http://localhost:3000` in your browser.

## Changelog

- 2026-05-29: Minor clarifications and quick commands added. Pushed to remote repository.

## Usage

### 1. Landing Page
- View at: http://localhost:3000
- Sign up or sign in with Clerk
- Explore features

### 2. Generate Roadmap
- Navigate to: http://localhost:3000/roadmap-generator
- Fill form with:
  - Target Company (e.g., Google)
  - Target Role (e.g., Software Engineer)
  - Timeline (15, 30, 60 days)
  - Current Level (Beginner, Intermediate, Advanced)
  - Optional: Job Description
- Click "Generate Roadmap"
- AI generates personalized roadmap

### 3. Track Progress
- Navigate to: http://localhost:3000/tracker
- View daily tasks
- Mark tasks as completed
- Log study hours

### 4. View Analytics
- Navigate to: http://localhost:3000/analytics
- See study statistics
- Track performance trends
- Identify weak areas

### 5. Dashboard
- Navigate to: http://localhost:3000/dashboard
- Get overview of progress
- See quick statistics
- Access quick actions

## Project Structure

```
preppilot/
├── app/
│   ├── api/
│   │   ├── roadmaps/
│   │   │   └── generate/route.ts        # AI roadmap generation
│   │   ├── tasks/route.ts               # Task CRUD operations
│   │   ├── progress/[userId]/route.ts   # Progress tracking
│   │   └── analytics/[userId]/route.ts  # Analytics data
│   ├── dashboard/page.tsx               # Dashboard page
│   ├── roadmap-generator/page.tsx       # Roadmap generator
│   ├── tracker/page.tsx                 # Progress tracker
│   ├── analytics/page.tsx               # Analytics dashboard
│   ├── layout.tsx                       # Root layout with Clerk
│   ├── page.tsx                         # Landing page
│   └── globals.css                      # Global styles
├── components/
│   └── ui/                              # UI components (Button, Card, Input, etc.)
├── lib/
│   ├── types.ts                         # TypeScript types
│   ├── hooks.ts                         # Custom React hooks
│   ├── ai-service.ts                    # OpenAI integration
│   ├── prisma.ts                        # Prisma client singleton
│   └── utils/
│       └── helpers.ts                   # Utility functions
├── prisma/
│   └── schema.prisma                    # Database schema
├── public/                              # Static files
├── .env.example                         # Environment variables template
├── package.json                         # Dependencies
├── tailwind.config.ts                   # Tailwind configuration
├── tsconfig.json                        # TypeScript configuration
└── README.md                            # Project documentation
```

## Database Schema

### User
- Managed by Clerk (no custom User table)
- Stores authentication data

### Roadmap
```prisma
- id: String (primary key)
- userId: String (Clerk user ID)
- company: String
- role: String
- timeline: String
- level: UserLevel
- jdSummary: String (optional)
- dsaRoadmap, systemDesignRoadmap, etc.
- generatedContent: JSON
- isActive: Boolean
- isArchived: Boolean
- tasks: RoadmapTask[]
- milestones: Milestone[]
- createdAt: DateTime
- updatedAt: DateTime
```

### RoadmapTask
```prisma
- id: String (primary key)
- roadmapId: String (foreign key)
- title: String
- description: String
- category: Category (DSA, SystemDesign, etc.)
- subcategory: String
- difficulty: Difficulty (easy, medium, hard)
- estimatedTime: Int (minutes)
- completed: Boolean
- completedAt: DateTime
- notes: String
- order: Int
```

### DailyProgress
```prisma
- id: String (primary key)
- userId: String
- date: DateTime
- studyHours: Float
- problemsSolved: Int
- mockInterviews: Int
- revisionSessions: Int
- tasksCompleted: Int
- currentStreak: Int
- notes: String
- mood: String
```

### Other Models
- Milestone: Weekly milestones
- Achievement: Badges and unlocked achievements
- WeakTopic: Topics with low performance
- MockInterview: Mock interview history
- StudyNote: User's personal notes
- Resource: Learning resources
- Analytics: User analytics summary

## API Reference

### Roadmaps

```bash
# Generate new roadmap
POST /api/roadmaps/generate
Content-Type: application/json

{
  "userId": "user_123",
  "company": "Google",
  "role": "Senior Engineer",
  "timeline": "60",
  "level": "intermediate",
  "jdSummary": "optional JD text"
}
```

### Tasks

```bash
# Get tasks for roadmap
GET /api/tasks?userId=user_123&roadmapId=roadmap_123

# Create task
POST /api/tasks
{
  "roadmapId": "roadmap_123",
  "title": "Array Problems",
  "category": "DSA",
  "difficulty": "medium"
}

# Update task completion
PUT /api/tasks
{
  "id": "task_123",
  "completed": true
}
```

### Progress

```bash
# Get user's progress
GET /api/progress/user_123

# Log daily progress
POST /api/progress/user_123
{
  "studyHours": 2.5,
  "problemsSolved": 5,
  "mood": "happy"
}
```

### Analytics

```bash
# Get user analytics
GET /api/analytics/user_123
```

## Deployment

### Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Connect repo to Vercel dashboard
3. Add environment variables:
   - DATABASE_URL
   - NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
   - CLERK_SECRET_KEY
   - OPENAI_API_KEY
   - NEXT_PUBLIC_APP_URL (your domain)

4. Deploy!

```bash
vercel --prod
```

### Alternative: Railway, Render, Fly.io

All support Node.js and PostgreSQL. Follow their documentation.

## Troubleshooting

### Database Connection Error
```
Error: connect ECONNREFUSED
```
- Ensure PostgreSQL is running
- Check DATABASE_URL is correct
- Run: `npx prisma db push`

### Clerk Not Working
- Verify CLERK_PUBLISHABLE_KEY and SECRET_KEY
- Check Clerk dashboard for API key expiration
- Ensure redirect URLs are configured

### OpenAI API Error
- Verify API key is correct
- Check if you have credits in OpenAI account
- Verify account is not rate limited

### Build Errors
```bash
# Clear cache and rebuild
rm -rf .next
npm run build
```

## Performance Optimization

1. **Database Indexes**: Prisma creates indexes automatically
2. **Caching**: Implement Redis for session caching
3. **Images**: Use Next.js Image component
4. **Code Splitting**: Next.js does this automatically
5. **Monitoring**: Use Vercel Analytics

## Security Best Practices

1. Never commit `.env.local` file
2. Use environment variables for secrets
3. Validate input on backend
4. Use Clerk for auth (handles security)
5. Keep dependencies updated
6. Use HTTPS in production
7. Implement rate limiting for APIs

## Next Steps

1. Customize branding and colors
2. Add more resources
3. Implement email notifications
4. Add payment system (Stripe)
5. Mobile app version
6. More AI features
7. Community features

## Support

For issues or questions:
1. Check GitHub issues
2. Review documentation
3. Create a new issue with details

---

**Happy Coding! 🚀**

PrepPilot - Your Path to Success
