import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function getInitials(name?: string): string {
  if (!name) return "?";
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function calculateStreak(progressData: any[]): number {
  if (!progressData || progressData.length === 0) return 0;

  let streak = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 0; i < 365; i++) {
    const currentDate = new Date(today);
    currentDate.setDate(currentDate.getDate() - i);

    const found = progressData.find((p) => {
      const pDate = new Date(p.date);
      pDate.setHours(0, 0, 0, 0);
      return pDate.getTime() === currentDate.getTime();
    });

    if (found && found.studyHours > 0) {
      streak++;
    } else if (i > 0) {
      break;
    }
  }

  return streak;
}

export function calculateCompletionPercentage(
  completed: number,
  total: number
): number {
  if (total === 0) return 0;
  return Math.round((completed / total) * 100);
}

export function calculateConsistencyScore(progressData: any[]): number {
  if (!progressData || progressData.length === 0) return 0;

  const lastThirtyDays = progressData.slice(-30);
  const daysWithStudy = lastThirtyDays.filter((p) => p.studyHours > 0).length;

  return Math.round((daysWithStudy / 30) * 100);
}

export function getTimeRemaining(endDate: Date): {
  days: number;
  hours: number;
  minutes: number;
} {
  const now = new Date();
  const diff = new Date(endDate).getTime() - now.getTime();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0 };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / 1000 / 60) % 60);

  return { days, hours, minutes };
}

export function generateMockInterviewQuestions(
  category: string,
  difficulty: string
): string[] {
  const questions: Record<string, Record<string, string[]>> = {
    DSA: {
      easy: [
        "Explain the difference between array and linked list",
        "What is time complexity?",
        "Explain binary search",
        "What is a hash map?",
        "Explain stack and queue",
      ],
      medium: [
        "Explain the Two Pointer technique",
        "What is dynamic programming?",
        "Explain backtracking with an example",
        "What is a binary search tree?",
        "Explain merge sort",
      ],
      hard: [
        "Explain the Longest Palindromic Subsequence problem",
        "What is a segment tree and when to use it?",
        "Explain the Sliding Window Median problem",
        "What is topological sorting?",
        "Explain the Travelling Salesman Problem",
      ],
    },
    SystemDesign: {
      easy: [
        "Design a URL shortener",
        "Design a parking lot system",
        "Explain the CAP theorem",
        "What is horizontal vs vertical scaling?",
        "Explain REST API principles",
      ],
      medium: [
        "Design Twitter",
        "Design an online multiplayer game",
        "Design a rate limiter",
        "Design a cache system",
        "Explain database sharding",
      ],
      hard: [
        "Design YouTube",
        "Design a distributed payment system",
        "Design a real-time analytics system",
        "Explain consensus algorithms",
        "Design a blockchain-based system",
      ],
    },
    Behavioral: {
      easy: [
        "Tell me about yourself",
        "Why do you want to join our company?",
        "What are your strengths?",
        "What are your weaknesses?",
        "Describe a challenging project you worked on",
      ],
      medium: [
        "Tell me about a time you led a team",
        "Describe a conflict with a colleague",
        "How do you handle failure?",
        "Tell me about your proudest achievement",
        "How do you stay updated with technology?",
      ],
      hard: [
        "Tell me about a time you made a difficult decision",
        "How do you handle high-pressure situations?",
        "Tell me about a time you pushed back on a requirement",
        "How do you mentor junior developers?",
        "Tell me about a time you had to learn something quickly",
      ],
    },
  };

  return (
    questions[category]?.[difficulty] ||
    questions.DSA.medium
  );
}

export function generateBadgeMessage(achievement: string): string {
  const messages: Record<string, string> = {
    first_problem: "🎉 Solved your first problem!",
    ten_problems: "🚀 10 problems solved!",
    first_mock: "🎤 First mock interview completed!",
    seven_day_streak: "🔥 7-day study streak!",
    month_completed: "📚 A month of consistent learning!",
  };

  return messages[achievement] || "🏆 Achievement unlocked!";
}
