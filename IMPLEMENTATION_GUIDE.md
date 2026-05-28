# GlowGrid Implementation Guide

## 🎯 Platform Overview

GlowGrid is a professional interview preparation platform that combines:
- **Conversational AI** - Chat-based roadmap generation
- **Smart Analytics** - Progress tracking with visual insights
- **Database Persistence** - All data persisted to SQLite
- **Professional UI** - Modern glassmorphism design with animations
- **Mobile Responsive** - Works seamlessly on all devices

## 📋 User Journey

### 1. Landing Page
Users arrive at `/` to see:
- Hero section with platform benefits
- 8 feature cards showcasing capabilities
- 3 pricing tiers
- 5-step process visualization
- CTA buttons redirecting to chatbot

### 2. Chatbot Roadmap Generation (`/roadmap-generator`)
**NEW CONVERSATIONAL EXPERIENCE:**

The chatbot guides users through a natural 7-message flow:

```
Message 1: "What company are you interviewing for?"
  └─> User enters: "Google"

Message 2: "What role are you targeting?"
  └─> User enters: "Software Engineer"

Message 3: "Tell me about your interview prep goals"
  └─> User enters: "Master DSA, improve system design"

Message 4: "What are your main pain points?"
  └─> User enters: "Time management, coding speed"

Message 5: "What tends to distract you?"
  └─> User enters: "Social media, overthinking"

Message 6: "How much time do you have to prepare?"
  └─> User enters: "30 days"

Message 7: "Rate your current skill level"
  └─> User enters: "Intermediate"
```

**Output:**
- Creates Roadmap in database
- Auto-generates 16 tasks in 4 categories
- Navigates to roadmap detail page

### 3. Roadmap Detail Page (`/roadmap/[id]`)
Users see:
- 16 pre-generated tasks
- Color-coded by category (DSA, System Design, CS Fundamentals, Behavioral)
- Completion status with toggles
- Progress bar showing overall completion
- Click task to view 5-10 interview questions (mock data)

### 4. Progress Tracker (`/tracker`)
Users see:
- **Overall Progress** - Percentage completion
- **Days Left** - Countdown timer
- **Daily Target** - Tasks per day to stay on track
- **Status Badge** - "On Track" / "Needs Catch Up"
- **Weekly Activity Chart** - 7-day activity visualization
- **Category Breakdown** - Progress bar per category

### 5. Profile/Preferences (`/profile`)
Users customize:
- Name and email (email disabled)
- Current skill level (Beginner/Intermediate/Advanced)
- Target role and companies
- Daily study time
- Preferred topics
- Notification preferences

## 🗄️ Database Schema

### User Model
```prisma
model User {
  id           String  @id @default(cuid())
  clerkId      String  @unique
  email        String  @unique
  name         String?
  currentLevel String  @default("beginner")
  roadmaps     Roadmap[]
}
```

### Roadmap Model
```prisma
model Roadmap {
  id               String  @id @default(cuid())
  userId           String
  company          String
  role             String
  timeline         String  // "15", "30", "60", "90"
  level            String  // "beginner", "intermediate", "advanced"
  jdSummary        String?
  isActive         Boolean @default(true)
  isArchived       Boolean @default(false)
  createdAt        DateTime @default(now())
  tasks            RoadmapTask[]
  user             User @relation(fields: [userId], references: [id])
}
```

### RoadmapTask Model
```prisma
model RoadmapTask {
  id           String  @id @default(cuid())
  roadmapId    String
  title        String
  category     String  // "DSA - Data Structures", "System Design", etc.
  difficulty   String  // "easy", "medium", "hard"
  order        Int
  completed    Boolean @default(false)
  completedAt  DateTime?
  roadmap      Roadmap @relation(fields: [roadmapId], references: [id])
}
```

## 🔌 API Endpoints

### Generate Roadmap
```
POST /api/roadmaps/generate
Content-Type: application/json

{
  "userId": "guest-user",
  "company": "Google",
  "role": "Software Engineer",
  "timeline": "30",
  "level": "intermediate",
  "jdSummary": "Goals: Master DSA\nPain Points: Time management\nDistractions: Social media"
}

Response:
{
  "id": "roadmap_123",
  "company": "Google",
  "role": "Software Engineer",
  "timeline": "30",
  "level": "intermediate",
  "tasks": [
    { "id": "task_1", "title": "Arrays & Strings", "category": "DSA - Data Structures", "difficulty": "medium", "completed": false },
    { "id": "task_2", "title": "Linked Lists", "category": "DSA - Data Structures", "difficulty": "medium", "completed": false },
    ...
  ]
}
```

### Get Dashboard Data
```
GET /api/dashboard?userId=guest-user

Response:
{
  "id": "roadmap_123",
  "company": "Google",
  "role": "Software Engineer",
  "timeline": "30",
  "level": "intermediate",
  "isActive": true,
  "createdAt": "2024-01-15T10:30:00Z"
}
```

### Get Interview Questions
```
POST /api/questions
Content-Type: application/json

{
  "company": "Google",
  "role": "Software Engineer",
  "category": "DSA - Data Structures",
  "taskTitle": "Arrays & Strings"
}

Response:
{
  "questions": [
    { "question": "Find two numbers that add up to target", "difficulty": "medium" },
    { "question": "Longest substring without repeating characters", "difficulty": "medium" },
    ...
  ]
}
```

### Toggle Task Completion
```
PUT /api/tasks
Content-Type: application/json

{
  "id": "task_1",
  "completed": true
}

Response:
{
  "id": "task_1",
  "title": "Arrays & Strings",
  "completed": true,
  "completedAt": "2024-01-15T14:45:00Z"
}
```

## 🎨 UI/UX Details

### Design System
- **Color Scheme**: Dark theme (rgb(3, 7, 18)) with accent colors
- **DSA**: Red (#f43f5e)
- **System Design**: Purple (#a855f7)
- **CS Fundamentals**: Blue (#3b82f6)
- **Behavioral**: Green (#22c55e)

### Glassmorphism Effects
All cards use:
```css
background: rgba(15, 23, 42, 0.8);
border: 1px solid rgba(148, 163, 184, 0.2);
backdrop-filter: blur(10px);
```

### Animations
- **Fade-in**: slideUp animation on mount
- **Hover**: translateY(-4px) with shadow glow
- **Loading**: Spinning emoji or bounce dots
- **Progress**: Smooth width transition on completion

## 🚀 Deployment Checklist

- [x] All pages building without errors
- [x] Database schema migrated
- [x] API endpoints functional
- [x] Task persistence working
- [x] Chatbot conversation flow complete
- [x] Tracker analytics displaying
- [x] Profile settings page ready
- [x] Landing page optimized
- [ ] Environment variables configured
- [ ] Vercel deployment configured
- [ ] Custom domain setup

## 📦 File Structure

```
app/
├── api/
│   ├── roadmaps/
│   │   ├── generate/route.ts
│   │   └── [id]/route.ts
│   ├── tasks/route.ts
│   ├── questions/route.ts
│   ├── dashboard/route.ts
│   └── analytics/[userId]/route.ts
├── page.tsx (Landing)
├── dashboard/page.tsx
├── roadmap-generator/page.tsx (NEW: Chatbot)
├── roadmap/[id]/page.tsx
├── tracker/page.tsx (NEW: Enhanced)
├── profile/page.tsx (NEW)
├── layout.tsx
└── globals.css
```

## 🔐 Security Notes

- Using guest user mode (Clerk disabled for MVP)
- All user data tied to userId="guest-user"
- Data persists in local SQLite
- No sensitive information stored
- API endpoints validate input

## 📝 Testing Instructions

### Test Chatbot Flow
1. Go to `/roadmap-generator`
2. Follow 7-message conversation
3. Submit and verify roadmap created

### Test Task Toggle
1. Go to any roadmap (`/roadmap/[id]`)
2. Click task checkbox
3. Verify completion status persists (page refresh)

### Test Tracker
1. Go to `/tracker`
2. Verify progress percentages match task completion
3. Check category breakdown

### Test Profile
1. Go to `/profile`
2. Update any field
3. Click "Save Changes"
4. Verify toast notification

## 🎯 Future Enhancements

1. **Real AI Integration** - Replace mock data with actual OpenAI API
2. **User Authentication** - Implement Clerk properly
3. **Multiplayer Features** - Study groups, peer review
4. **Mobile App** - React Native version
5. **Advanced Analytics** - Machine learning recommendations
6. **Mock Interviews** - Video recording and AI feedback
7. **Community** - Discussion forums, shared resources
8. **Gamification** - Badges, leaderboards, streaks

## 🆘 Troubleshooting

**Issue**: Task not persisting
- Check database connection: `npx prisma db push`
- Verify userId is "guest-user"

**Issue**: Chatbot not advancing
- Ensure message input is not empty
- Check console for errors
- Restart dev server

**Issue**: Build errors
- Clear `.next` folder: `rm -rf .next`
- Reinstall dependencies: `npm install`
- Run build: `npm run build`

## 📞 Support

For issues or questions:
1. Check this guide first
2. Review code comments in implementation
3. Check git history for recent changes
4. See [README.md](./README.md) for overview
