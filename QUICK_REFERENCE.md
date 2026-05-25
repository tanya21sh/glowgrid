# 🗂️ PrepPilot - File Structure & Quick Reference

## Quick File Navigation

### 📄 Documentation Files
| File | Purpose |
|------|---------|
| `README.md` | Project overview & quick start |
| `SETUP_GUIDE.md` | Detailed setup instructions |
| `PROJECT_STATUS.md` | Complete project deliverables |
| `.env.example` | Environment variables template |

### 🏠 Landing & Main Pages
| File | Route | Purpose |
|------|-------|---------|
| `app/page.tsx` | `/` | Landing page with features & CTA |
| `app/layout.tsx` | - | Root layout with Clerk & Toaster |
| `app/globals.css` | - | Global styles & CSS variables |

### 📊 Feature Pages
| File | Route | Purpose |
|------|-------|---------|
| `app/dashboard/page.tsx` | `/dashboard` | User dashboard & overview |
| `app/roadmap-generator/page.tsx` | `/roadmap-generator` | AI roadmap creation form |
| `app/tracker/page.tsx` | `/tracker` | Progress tracking & daily tasks |
| `app/analytics/page.tsx` | `/analytics` | Performance analytics dashboard |

### 🔌 API Routes
| File | Endpoint | Method | Purpose |
|------|----------|--------|---------|
| `app/api/roadmaps/generate/route.ts` | `/api/roadmaps/generate` | POST | Generate AI roadmap |
| `app/api/tasks/route.ts` | `/api/tasks` | GET/POST/PUT | Task CRUD operations |
| `app/api/progress/[userId]/route.ts` | `/api/progress/[userId]` | GET/POST | Progress tracking |
| `app/api/analytics/[userId]/route.ts` | `/api/analytics/[userId]` | GET | Analytics data |

### 🎨 UI Components
| File | Component | Purpose |
|------|-----------|---------|
| `components/ui/button.tsx` | `Button` | Reusable button component |
| `components/ui/card.tsx` | `Card`, `CardHeader`, etc. | Card container components |
| `components/ui/badge.tsx` | `Badge` | Badge/tag component |
| `components/ui/input.tsx` | `Input` | Text input component |
| `components/ui/label.tsx` | `Label` | Form label component |
| `components/ui/textarea.tsx` | `Textarea` | Multi-line text component |

### 📚 Core Libraries
| File | Purpose |
|------|---------|
| `lib/types.ts` | TypeScript type definitions |
| `lib/hooks.ts` | Custom React hooks |
| `lib/ai-service.ts` | OpenAI integration |
| `lib/prisma.ts` | Prisma client singleton |
| `lib/utils/helpers.ts` | Utility functions |

### 🗄️ Database
| File | Purpose |
|------|---------|
| `prisma/schema.prisma` | Database schema definitions |
| `prisma/` | Prisma migration files (auto-generated) |

### ⚙️ Configuration
| File | Purpose |
|------|---------|
| `package.json` | Dependencies & scripts |
| `tsconfig.json` | TypeScript configuration |
| `tailwind.config.ts` | Tailwind CSS configuration |
| `next.config.ts` | Next.js configuration |
| `.env.example` | Environment variables template |
| `.env.local` | Environment variables (local, not in git) |

---

## 🚀 Common Commands

```bash
# Development
npm run dev                  # Start dev server
npm run build               # Build for production
npm start                   # Start production server
npm run lint                # Run ESLint

# Database
npx prisma db push         # Push schema to database
npx prisma db pull         # Pull schema from database
npx prisma generate        # Generate Prisma client
npx prisma studio          # Open Prisma Studio

# Utilities
npx prisma format          # Format schema.prisma
npm install                # Install dependencies
npm update                 # Update dependencies
```

---

## 🔗 API Quick Reference

### Generate Roadmap
```javascript
// POST /api/roadmaps/generate
const response = await fetch('/api/roadmaps/generate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    userId: 'user_123',
    company: 'Google',
    role: 'Senior Engineer',
    timeline: '60',
    level: 'intermediate',
    jdSummary: 'optional JD'
  })
});
```

### Get Tasks
```javascript
// GET /api/tasks?userId=user_123
const tasks = await fetch('/api/tasks?userId=user_123').then(r => r.json());
```

### Update Task
```javascript
// PUT /api/tasks
const response = await fetch('/api/tasks', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ id: 'task_123', completed: true })
});
```

### Log Progress
```javascript
// POST /api/progress/user_123
const progress = await fetch('/api/progress/user_123', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ studyHours: 2.5, problemsSolved: 5 })
});
```

### Get Analytics
```javascript
// GET /api/analytics/user_123
const analytics = await fetch('/api/analytics/user_123').then(r => r.json());
```

---

## 📦 Key Dependencies

| Package | Purpose | Version |
|---------|---------|---------|
| next | React framework | 14.1.0 |
| react | UI library | 18.2.0 |
| typescript | Type safety | ^5 |
| tailwindcss | CSS framework | 3.4.1 |
| @clerk/nextjs | Authentication | ^5.0.0 |
| @prisma/client | Database ORM | ^5.8.0 |
| openai | AI API | ^4.50.0 |
| framer-motion | Animations | 10.16.16 |
| react-hook-form | Form management | ^7.51.0 |
| react-hot-toast | Notifications | ^2.4.1 |
| lucide-react | Icons | 0.363.0 |

---

## 🎯 Environment Variables Setup

Copy `.env.example` to `.env.local` and fill in:

```env
# Required
DATABASE_URL=postgresql://...
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
OPENAI_API_KEY=sk-...

# Optional/defaults
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

---

## 🔍 Key Features at a Glance

| Feature | Location | Status |
|---------|----------|--------|
| Landing Page | `app/page.tsx` | ✅ |
| User Dashboard | `app/dashboard/page.tsx` | ✅ |
| Roadmap Generator | `app/roadmap-generator/page.tsx` | ✅ |
| AI Integration | `lib/ai-service.ts` | ✅ |
| Task Management | `app/api/tasks/route.ts` | ✅ |
| Progress Tracking | `app/api/progress/` | ✅ |
| Analytics | `app/analytics/page.tsx` | ✅ |
| Authentication | `app/layout.tsx` | ✅ (Clerk) |
| Database | `prisma/schema.prisma` | ✅ |
| UI Components | `components/ui/` | ✅ |

---

## 📱 Responsive Breakpoints

- **Mobile**: 375px+
- **Tablet**: 768px+
- **Desktop**: 1024px+
- **Large**: 1440px+

All components use responsive Tailwind classes.

---

## 🎨 Color Scheme

```css
/* Dark Theme (Default) */
--background: #0f0f0f;
--foreground: #fafafa;
--card: #1a1a1a;
--accent: #ff4444;
--muted: #666666;
--border: #333333;
```

Customizable in `app/globals.css` and `tailwind.config.ts`

---

## 🔐 Security Checklist

- ✅ Clerk handles authentication
- ✅ API routes validate userId
- ✅ Sensitive keys in environment
- ✅ Input validation with React Hook Form
- ✅ TypeScript prevents type errors
- ✅ Prisma prevents SQL injection
- ✅ HTTPS ready for production

---

## 🚀 Deployment Checklist

Before deploying:

- [ ] Fill all environment variables
- [ ] Test all API endpoints
- [ ] Configure Clerk URLs
- [ ] Set up PostgreSQL database
- [ ] Configure OpenAI billing
- [ ] Run `npm run build` locally
- [ ] Test on staging environment
- [ ] Set up error monitoring
- [ ] Configure CDN/caching
- [ ] Set up analytics

Deploy with: `vercel --prod`

---

## 📞 Need Help?

1. **Setup Issues** → See `SETUP_GUIDE.md`
2. **Feature Questions** → Check `README.md`
3. **Project Overview** → See `PROJECT_STATUS.md`
4. **API Usage** → Check `app/api/*/route.ts` files
5. **Component Usage** → Check `components/ui/` files

---

## 🎓 Learning Resources

- [Next.js 14 Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs/)
- [Tailwind CSS](https://tailwindcss.com)
- [Clerk Auth](https://clerk.com/docs)
- [OpenAI API](https://platform.openai.com/docs)
- [TypeScript](https://www.typescriptlang.org/docs)

---

**PrepPilot is ready to use!** 🚀

See README.md for getting started instructions.
