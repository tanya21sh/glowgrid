# PrepPilot - AI-Powered Interview Preparation Platform

Your Personalized Placement Preparation OS

PrepPilot is a modern, full-stack web application that helps job seekers prepare for interviews with AI-generated personalized roadmaps, progress tracking, and comprehensive learning resources.

## 🚀 Features

- **AI-Powered Roadmaps**: Generate personalized preparation plans based on your target company, role, and timeline
- **Progress Tracking**: Track your learning journey with detailed analytics and performance metrics
- **Comprehensive Coverage**: DSA, System Design, CS Fundamentals, and Behavioral interview preparation
- **Daily Tasks**: Organized daily tasks with difficulty levels and estimated time
- **Mock Interviews**: Practice with AI-generated interview questions
- **Analytics Dashboard**: Visualize your progress with detailed charts and insights
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Dark Mode**: Premium dark theme for comfortable studying

## 🛠 Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful UI components
- **Framer Motion** - Smooth animations
- **React Hook Form** - Form management

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **Prisma** - ORM for database management
- **PostgreSQL** - Relational database

### Authentication & AI
- **Clerk** - User authentication
- **OpenAI API** - AI-powered content generation

## 📋 Prerequisites

- Node.js 16+ and npm/yarn
- PostgreSQL database (local or cloud like Supabase)
- Clerk account for authentication
- OpenAI API key

## 🔧 Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd preppilot
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create a `.env.local` file:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/preppilot"
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
CLERK_SECRET_KEY=your_clerk_secret
OPENAI_API_KEY=your_openai_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

4. **Set up the database**

```bash
npx prisma db push
npx prisma generate
```

5. **Run the development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
preppilot/
├── app/
│   ├── api/              # API routes
│   ├── dashboard/        # Dashboard page
│   ├── roadmap-generator/ # Roadmap generator
│   ├── tracker/          # Progress tracker
│   ├── analytics/        # Analytics page
│   ├── layout.tsx        # Root layout
│   ├── globals.css       # Global styles
│   └── page.tsx          # Landing page
├── components/
│   ├── ui/              # UI components
│   └── ...              # Feature components
├── lib/
│   ├── types.ts         # TypeScript definitions
│   ├── hooks.ts         # Custom hooks
│   ├── ai-service.ts    # OpenAI integration
│   ├── prisma.ts        # Prisma client
│   └── utils/
├── prisma/
│   └── schema.prisma    # Database schema
└── public/              # Static assets
```

## 🎯 Key Pages

- **Landing Page** - Hero section with CTA
- **Dashboard** - Overview and quick actions
- **Roadmap Generator** - AI roadmap creation
- **Progress Tracker** - Daily task management
- **Analytics** - Performance insights

## 🚀 Deployment

Deploy to Vercel with a single click. Ensure all environment variables are configured.

```bash
vercel --prod
```

## 📄 License

MIT License

---

Built with ❤️ by the PrepPilot team
