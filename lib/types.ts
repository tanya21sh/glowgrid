// Type definitions for PrepPilot

export type UserLevel = 'beginner' | 'intermediate' | 'advanced';

export type Timeline = '15' | '30' | '60' | string;

export type Category = 'DSA' | 'SystemDesign' | 'Fundamentals' | 'Behavioral' | 'MockInterview';

export type Difficulty = 'easy' | 'medium' | 'hard';

export type ResourceType = 'leetcode' | 'youtube' | 'article' | 'blog' | 'pdf';

export type Mood = 'happy' | 'neutral' | 'stressed';

// User
export interface IUser {
  id: string;
  clerkId: string;
  email: string;
  name?: string;
  image?: string;
  bio?: string;
  currentLevel: UserLevel;
  createdAt: Date;
  updatedAt: Date;
}

// Roadmap
export interface IRoadmap {
  id: string;
  userId: string;
  company: string;
  role: string;
  timeline: string;
  level: UserLevel;
  jdSummary?: string;
  dsaRoadmap?: string;
  systemDesignRoadmap?: string;
  fundamentalsRoadmap?: string;
  behavioralRoadmap?: string;
  dailyPlan?: string;
  generatedContent?: string;
  isActive: boolean;
  isArchived: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Task
export interface IRoadmapTask {
  id: string;
  roadmapId: string;
  title: string;
  description?: string;
  category: Category;
  subcategory?: string;
  difficulty: Difficulty;
  estimatedTime?: number;
  completed: boolean;
  completedAt?: Date;
  notes?: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

// Progress
export interface IDailyProgress {
  id: string;
  userId: string;
  date: Date;
  studyHours: number;
  problemsSolved: number;
  mockInterviews: number;
  revisionSessions: number;
  tasksCompleted: number;
  currentStreak: number;
  notes?: string;
  mood?: Mood;
  createdAt: Date;
  updatedAt: Date;
}

// Achievement
export interface IAchievement {
  id: string;
  userId: string;
  title: string;
  description?: string;
  icon?: string;
  badge?: string;
  unlockedAt: Date;
  createdAt: Date;
}

// Analytics
export interface IAnalytics {
  id: string;
  userId: string;
  totalStudyHours: number;
  totalProblems: number;
  completionRate: number;
  consistencyScore: number;
  mostPracticedTopic?: string;
  weakestTopic?: string;
  createdAt: Date;
  updatedAt: Date;
}

// API Request/Response types
export interface RoadmapGeneratorInput {
  company: string;
  role: string;
  timeline: string;
  level: UserLevel;
  jdSummary?: string;
}

export interface RoadmapGeneratorResponse {
  success: boolean;
  roadmap?: IRoadmap;
  error?: string;
}

export interface AIGeneratedContent {
  dsaRoadmap: string;
  systemDesignRoadmap: string;
  fundamentalsRoadmap: string;
  behavioralRoadmap: string;
  dailyPlan: string;
  mockInterviewTopics: string[];
  studySchedule: {
    week: number;
    focus: string;
    tasks: string[];
  }[];
}
