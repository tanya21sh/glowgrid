import { useState, useEffect, useCallback } from "react";

// Types
export interface IAnalytics {
  id: string;
  userId: string;
  totalStudyHours: number;
  totalProblems: number;
  completionRate: number;
  consistencyScore: number;
  mostPracticedTopic: string | null;
  weakestTopic: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface IDailyProgress {
  id: string;
  userId: string;
  date: string;
  studyHours: number;
  problemsSolved: number;
  mockInterviews: number;
  revisionSessions: number;
  tasksCompleted: number;
  currentStreak: number;
  notes: string | null;
  mood: string | null;
  createdAt: string;
  updatedAt: string;
}

// Hook for fetching user analytics
export function useAnalytics(userId: string) {
  const [analytics, setAnalytics] = useState<IAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await fetch(`/api/analytics/${userId}`);
        if (!response.ok) throw new Error("Failed to fetch analytics");
        const data = await response.json();
        setAnalytics(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchAnalytics();
    }
  }, [userId]);

  return { analytics, loading, error };
}

// Hook for fetching daily progress
export function useDailyProgress(userId: string) {
  const [progress, setProgress] = useState<IDailyProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const response = await fetch(`/api/progress/${userId}`);
        if (!response.ok) throw new Error("Failed to fetch progress");
        const data = await response.json();
        setProgress(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchProgress();
    }
  }, [userId]);

  return { progress, loading, error };
}

// Hook for updating daily progress
export function useUpdateProgress(userId: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateProgress = useCallback(
    async (data: Partial<IDailyProgress>) => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/progress/${userId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) throw new Error("Failed to update progress");
        const updatedData = await response.json();
        return updatedData;
      } catch (err) {
        const message = err instanceof Error ? err.message : "An error occurred";
        setError(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [userId]
  );

  return { updateProgress, loading, error };
}

// Hook for managing current roadmap
export function useCurrentRoadmap(userId: string) {
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRoadmap = async () => {
      try {
        const response = await fetch(`/api/roadmaps/${userId}/active`);
        if (!response.ok) throw new Error("Failed to fetch roadmap");
        const data = await response.json();
        setRoadmap(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchRoadmap();
    }
  }, [userId]);

  return { roadmap, loading, error };
}

// Hook for streak calculation
export function useStreak(progressData: IDailyProgress[]) {
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    if (!progressData || progressData.length === 0) {
      setStreak(0);
      return;
    }

    let currentStreak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < 365; i++) {
      const currentDate = new Date(today);
      currentDate.setDate(currentDate.getDate() - i);

      const found = progressData.find((p) => {
        const pDate = new Date(p.date);
        pDate.setHours(0, 0, 0, 0);
        return pDate.getTime() === currentDate.getTime() && p.studyHours > 0;
      });

      if (found) {
        currentStreak++;
      } else if (i > 0) {
        break;
      }
    }

    setStreak(currentStreak);
  }, [progressData]);

  return streak;
}

// Hook for completion percentage
export function useCompletionPercentage(
  completed: number,
  total: number
) {
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    if (total === 0) {
      setPercentage(0);
    } else {
      setPercentage(Math.round((completed / total) * 100));
    }
  }, [completed, total]);

  return percentage;
}

// Hook for debounced value
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

// Hook for local storage
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        if (typeof window !== "undefined") {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        }
      } catch (error) {
        console.error(error);
      }
    },
    [key, storedValue]
  );

  return [storedValue, setValue] as const;
}
