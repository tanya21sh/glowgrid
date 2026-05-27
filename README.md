# GlowGrid - Interview Preparation Platform

**Status: ✅ PRODUCTION READY**

GlowGrid is a modern, full-stack web application that helps job seekers prepare for interviews with personalized roadmaps, progress tracking, and comprehensive learning resources.

## ✨ What's Working

✅ **Dynamic Landing Page** - Beautiful hero with pricing, features, and smooth animations  
✅ **Dashboard** - Real-time stats, active roadmap display, quick actions  
✅ **Roadmap Generator** - Create personalized preparation plans  
✅ **Progress Tracker** - Track tasks with working checkbox toggle  
✅ **Roadmap Details** - View complete roadmaps with progress bars  
✅ **Task Management** - Create, update, and complete tasks with database persistence  
✅ **Analytics** - Performance insights and statistics  
✅ **Responsive Design** - Works perfectly on desktop, tablet, mobile  
✅ **Theme System** - 6 beautiful theme options  
✅ **All Navigation** - All tabs and links fully functional  

## 🎯 Live Features

### Authentication & Pages
- `/` - Landing page with dynamic UI
- `/dashboard` - User dashboard with real data
- `/roadmap-generator` - AI-powered roadmap creation
- `/roadmap/[id]` - Detailed roadmap view
- `/tracker` - Task tracker with working toggles ✅
- `/analytics` - Performance analytics
- `/sign-in` - Login page (demo mode)
- `/sign-up` - Registration page (demo mode)

### Core Functionality
- **Task Toggle**: Click any task checkbox to mark complete/incomplete
- **Real Database Updates**: Changes persist in SQLite database
- **Live Stats**: Completion rates calculated in real-time
- **Progress Bars**: Visual progress tracking
- **Notifications**: Toast feedback on all actions
- **Loading States**: Beautiful loading indicators
- **Error Handling**: Graceful error messages

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
