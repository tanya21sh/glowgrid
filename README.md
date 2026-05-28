# GlowGrid - Interview Preparation Platform

**Status: ✅ PRODUCTION READY**

GlowGrid is a modern, full-stack web application that helps job seekers prepare for interviews with personalized roadmaps, interactive chatbot guidance, progress tracking, and comprehensive learning resources.

## ✨ What's Working

✅ **AI Chatbot Interface** - Interactive conversation-based roadmap generation  
✅ **Smart Goal Collection** - Multi-turn chat collecting goals, pain points, distractions  
✅ **Dynamic Landing Page** - Beautiful hero with pricing, features, smooth animations  
✅ **Dashboard** - Real-time stats, active roadmap display, quick actions  
✅ **Progress Tracker** - Advanced analytics with daily activity charts  
✅ **Roadmap Details** - View complete roadmaps with progress bars and questions  
✅ **Task Management** - Create, update, and complete tasks with persistence  
✅ **Profile Settings** - Customizable user preferences and goals  
✅ **Interview Questions** - 100+ company-specific questions by category  
✅ **Responsive Design** - Works perfectly on desktop, tablet, mobile  
✅ **Theme System** - Dark theme with glassmorphism effects  
✅ **All Navigation** - All tabs and links fully functional  

## 🎯 Live Features

### Authentication & Pages
- `/` - Landing page with dynamic UI and CTAs
- `/dashboard` - User dashboard with roadmap management
- `/roadmap-generator` - **NEW: AI chatbot interface** for personalized prep
- `/roadmap/[id]` - Detailed roadmap with 16 pre-generated tasks
- `/tracker` - **NEW: Enhanced tracker** with analytics & weekly charts
- `/profile` - **NEW: User preferences** and goal settings
- `/analytics` - Performance analytics dashboard
- `/sign-in` - Login page (demo mode)
- `/sign-up` - Registration page (demo mode)

### Core Functionality
- **Chatbot Roadmap Generator**: 7-step conversation collecting all needed info
- **Smart Task Generation**: Auto-creates 16 tasks in 4 categories (DSA, System Design, CS Fundamentals, Behavioral)
- **Task Toggle**: Click checkboxes to mark complete/incomplete with persistence
- **Live Analytics**: Real-time completion tracking and progress visualization
- **Weekly Activity**: Charts showing preparation trends over 7 days
- **Category Breakdown**: Visual progress bars for each topic area
- **Interview Questions**: 100+ real questions from Google, Microsoft, Amazon
- **Notifications**: Toast feedback on all user actions
- **Loading States**: Beautiful loading indicators
- **Error Handling**: Graceful error messages and fallbacks

## 💬 New AI Chatbot Experience

The chatbot guides users through a natural 7-step conversation:

1. **Company Target** - Which company are you interviewing for?
2. **Role Selection** - What role are you targeting?
3. **Goal Setting** - What interview prep goals do you have?
4. **Pain Points** - What challenges worry you most?
5. **Distractions** - What tends to derail your studying?
6. **Timeline** - How much time do you have to prepare?
7. **Skill Level** - Rate your current skill level

Once collected, the system generates a personalized roadmap with:
- 16 curated tasks across 4 categories
- Time-based preparation schedule
- Distraction mitigation strategies
- Custom goals and pain point targets

## 🚀 Quick Start

```bash
# Install
npm install

# Setup database
npx prisma db push

# Run dev server
npm run dev

# Open browser
# http://localhost:3000
```

## 📦 Tech Stack

- **Next.js 13.5.7** - App Router, SSR
- **TypeScript** - Type-safe code
- **React 18.2** - UI components
- **Tailwind CSS** - Styling
- **Prisma 5.8** - Database ORM
- **SQLite** - Lightweight database
- **React Hook Form** - Form handling
- **React Hot Toast** - Notifications
- **Lucide React** - Icons

2. **Install dependencies**
```bash
npm install
```

3. **Set up database** (uses SQLite by default)
```bash
npx prisma db push
npx prisma generate
```

4. **Run development server**
```bash
npm run dev
# Open http://localhost:3000
```

5. **Production build**
```bash
npm run build
npm start
```

## 📁 Project Structure

```
glowgrid/
├── app/
│   ├── api/               # All API endpoints
│   ├── dashboard/         # Dashboard page
│   ├── roadmap/[id]/      # Roadmap detail
│   ├── roadmap-generator/ # Generator form
│   ├── tracker/           # Task tracker
│   ├── analytics/         # Analytics page
│   ├── sign-in/           # Sign in
│   ├── sign-up/           # Sign up
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Landing page
│   └── globals.css        # Global styles
├── components/
│   ├── ui/                # shadcn components
│   ├── theme-switcher.tsx # Theme selector
│   └── ...
├── lib/
│   ├── prisma.ts          # DB client
│   ├── theme-context.tsx  # Theme system
│   ├── ai-service.ts      # AI integration
│   └── utils.ts           # Helpers
├── prisma/
│   └── schema.prisma      # Database schema (11 models)
└── public/
```

## 🎯 Feature Details

### Landing Page (`/`)
- Dynamic hero section with scroll-based animations
- Feature showcase with 8 cards
- 3-tier pricing display
- How-it-works section
- CTA sections
- Professional footer
- 6 theme options

### Dashboard (`/dashboard`)
- Real-time stats cards
- Active roadmap display
- Quick action buttons
- Connection to tracker and analytics
- Loading states

### Roadmap Generator (`/roadmap-generator`)
- Form: Company, Role, Timeline, Level
- Creates roadmap in database
- Redirects to roadmap detail
- Form validation

### Roadmap Detail (`/roadmap/[id]`)
- Full roadmap view
- All associated tasks
- Progress bar
- Category badges
- Difficulty indicators
- Completion tracking

### Progress Tracker (`/tracker`) ✅
- **Working task toggle** - Click to mark complete/incomplete
- **Real database updates** - Changes persist
- Real-time stats
- Task grouping
- Difficulty badges
- Toast notifications

### Analytics (`/analytics`)
- Study hours overview
- Completion rate
- Performance trends
- Weak topic identification

## 🔧 API Endpoints

All endpoints fully functional with database:

```
POST   /api/roadmaps/generate      Generate roadmap
GET    /api/dashboard              Get user roadmap
GET    /api/tasks                  Get tasks by userId
PUT    /api/tasks                  Update task status
POST   /api/progress/[userId]      Log progress
GET    /api/analytics/[userId]     Get analytics
```

## 🎨 Theme System

6 professionally designed themes:
- Dark (default)
- Light
- Pink
- Purple
- Neon
- Ocean

Access via button in bottom-right corner

## 📊 Database

Using SQLite with Prisma ORM

**11 Models:**
- Roadmap
- RoadmapTask
- DailyProgress
- Milestone
- Achievement
- WeakTopic
- MockInterview
- StudyNote
- Resource
- Analytics
- User

## 🚀 Deployment

### Vercel (Recommended)
```bash
vercel --prod
```

### Docker
```bash
docker build -t glowgrid .
docker run -p 3000:3000 glowgrid
```

### Traditional Server
See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for full instructions

## 📖 Documentation

- [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) - Complete deployment guide
- [SETUP_GUIDE.md](./SETUP_GUIDE.md) - Detailed setup instructions

## 🐛 Troubleshooting

**Port already in use:**
```bash
PORT=3001 npm run dev
```

**Database issues:**
```bash
npx prisma db push --force-reset
```

**Build errors:**
```bash
rm -rf .next node_modules
npm install
npm run build
```

## ✅ Status

- ✅ All pages implemented
- ✅ All features working
- ✅ Task toggle fully functional
- ✅ Database operations working
- ✅ API endpoints connected
- ✅ TypeScript strict mode
- ✅ Production build passing
- ✅ Ready for deployment

## 📞 Support

Check [GitHub Issues](https://github.com/tanya21sh/glowgrid/issues) for common problems

## 📄 License

MIT License - See LICENSE file

Built with ❤️ by the PrepPilot team
