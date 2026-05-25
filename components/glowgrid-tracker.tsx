"use client";

import { useEffect, useMemo, useState } from "react";

import {
  buildWeekTargets,
  makeQuestionId,
  type PromptContext,
} from "@/lib/weekly-targets";

type Milestone = {
  id: string;
  title: string;
  description: string | null;
  weekIndex: number | null;
  dueDate: string | null;
};

type Task = {
  id: string;
  title: string;
  track: string | null;
  weekIndex: number | null;
  completed?: boolean;
};

type Plan = {
  id: string;
  role: string;
  company: string;
  packageTarget: string | null;
  jdSummary: string | null;
  startDate: string;
  endDate: string;
  milestones: Milestone[];
  tasks: Task[];
};

const PLAN_STORAGE_KEY = "glowgrid-plan";
const QUESTIONS_STORAGE_KEY = "glowgrid-questions";

const ROUTINE = [
  {
    title: "Warm start",
    detail: "20 min DSA recall + 10 min notes review",
  },
  {
    title: "Deep work block",
    detail: "90 min focused problem set or project build",
  },
  {
    title: "Mock or review",
    detail: "30 min mock or feedback loop",
  },
  {
    title: "Cooldown",
    detail: "15 min journaling + plan for tomorrow",
  },
];

export default function GlowgridTracker() {
  const [plan, setPlan] = useState<Plan | null>(null);
  const [completedQuestions, setCompletedQuestions] = useState<
    Record<string, boolean>
  >({});
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [selectedDay, setSelectedDay] = useState(1);
  const [selectedFocus, setSelectedFocus] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const storedPlan = window.localStorage.getItem(PLAN_STORAGE_KEY);
    if (storedPlan) {
      try {
        setPlan(JSON.parse(storedPlan) as Plan);
      } catch {
        window.localStorage.removeItem(PLAN_STORAGE_KEY);
      }
    }

    const storedQuestions = window.localStorage.getItem(QUESTIONS_STORAGE_KEY);
    if (storedQuestions) {
      try {
        setCompletedQuestions(JSON.parse(storedQuestions));
      } catch {
        window.localStorage.removeItem(QUESTIONS_STORAGE_KEY);
      }
    }

    const params = new URLSearchParams(window.location.search);
    const focusParam = params.get("focus");
    if (focusParam) {
      setSelectedFocus(focusParam);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(
      QUESTIONS_STORAGE_KEY,
      JSON.stringify(completedQuestions)
    );
  }, [completedQuestions]);

  const focusAreas = useMemo(() => {
    if (!plan) {
      return [] as string[];
    }

    const unique = new Set<string>();
    plan.tasks.forEach((task) => {
      if (task.track) {
        unique.add(task.track);
      }
    });

    return Array.from(unique).slice(0, 6);
  }, [plan]);

  const weekTargets = useMemo(() => {
    if (!plan) {
      return [];
    }

    const weekList = plan.milestones.map((milestone, index) => ({
      week: milestone.weekIndex ?? index + 1,
      title: milestone.title,
      description: milestone.description ?? null,
      dueDate: milestone.dueDate ?? null,
    }));

    const promptContext: PromptContext = {
      role: plan.role,
      company: plan.company,
      jdSummary: plan.jdSummary ?? "",
      packageTarget: plan.packageTarget ?? "",
    };

    return buildWeekTargets(weekList, plan.tasks, focusAreas, promptContext);
  }, [plan, focusAreas]);

  useEffect(() => {
    if (weekTargets.length) {
      setSelectedWeek(weekTargets[0].week);
    }
  }, [weekTargets]);

  useEffect(() => {
    setSelectedDay(1);
  }, [selectedWeek]);

  const activeWeek = useMemo(() => {
    return weekTargets.find((target) => target.week === selectedWeek) ?? null;
  }, [weekTargets, selectedWeek]);

  const activeDay = useMemo(() => {
    if (!activeWeek) {
      return null;
    }
    return activeWeek.days[selectedDay - 1] ?? activeWeek.days[0] ?? null;
  }, [activeWeek, selectedDay]);

  const filteredQuestions = useMemo(() => {
    if (!activeDay || !selectedFocus) {
      return activeDay?.questions ?? [];
    }

    return activeDay.questions.filter((q) =>
      q.toLowerCase().includes(selectedFocus.toLowerCase())
    );
  }, [activeDay, selectedFocus]);

  const questionProgress = useMemo(() => {
    if (!weekTargets.length) {
      return { percent: 0, total: 0, done: 0 };
    }

    const questionIds: string[] = [];
    weekTargets.forEach((week) => {
      week.days.forEach((day, dayIndex) => {
        day.questions.forEach((_, questionIndex) => {
          questionIds.push(
            makeQuestionId(week.week, dayIndex, questionIndex)
          );
        });
      });
    });

    const total = selectedFocus
      ? questionIds.filter((id) => {
          const qText = weekTargets
            .flatMap((w) => w.days.flatMap((d) => d.questions))
            .join(" ");
          return qText.toLowerCase().includes(selectedFocus.toLowerCase());
        }).length
      : questionIds.length;

    const done = questionIds.filter((id) => {
      if (!selectedFocus) {
        return completedQuestions[id];
      }
      const qText = weekTargets
        .flatMap((w) => w.days.flatMap((d) => d.questions))
        .join(" ");
      return (
        completedQuestions[id] &&
        qText.toLowerCase().includes(selectedFocus.toLowerCase())
      );
    }).length;

    const percent = total ? Math.round((done / total) * 100) : 0;
    return { percent, total, done };
  }, [weekTargets, completedQuestions, selectedFocus]);

  const ringStyle = useMemo(() => {
    return {
      background: `conic-gradient(var(--accent) ${
        questionProgress.percent * 3.6
      }deg, rgba(255, 255, 255, 0.08) 0deg)`,
    };
  }, [questionProgress.percent]);

  const handleQuestionToggle = (questionId: string) => {
    setCompletedQuestions((prev) => {
      const next = { ...prev };
      if (next[questionId]) {
        delete next[questionId];
      } else {
        next[questionId] = true;
      }
      return next;
    });
  };

  if (!plan) {
    return (
      <div className="min-h-screen px-6 pb-16 pt-10 sm:px-10 lg:px-16">
        <div className="glass mx-auto max-w-2xl rounded-3xl p-8 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-muted">
            Tracker
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-foreground">
            No plan found yet
          </h1>
          <p className="mt-3 text-sm text-muted">
            Build a plan on the home page first, then return here to track your
            daily questions.
          </p>
          <a
            href="/"
            className="neon-button mt-6 inline-flex rounded-full px-6 py-3 text-sm font-semibold"
          >
            Go to planner
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 pb-16 pt-8 sm:px-10 lg:px-16">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-muted">
            Glowgrid tracker
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-foreground">
            {plan.role} at {plan.company}
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="/"
            className="outline-button rounded-full px-4 py-2 text-xs uppercase tracking-[0.2em]"
          >
            Back to planner
          </a>
        </div>
      </header>

      <main className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="glass rounded-3xl p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-muted">
            Progress tracker
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-6">
            <div
              className="flex h-32 w-32 items-center justify-center rounded-full"
              style={ringStyle}
            >
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-background text-2xl font-semibold text-foreground">
                {questionProgress.percent}%
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-muted">
                  Questions done
                </p>
                <p className="text-lg text-foreground">
                  {questionProgress.done} of {questionProgress.total}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-muted">
                  Focus streak
                </p>
                <p className="text-lg text-foreground">
                  {Math.min(7, questionProgress.done)} days
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {weekTargets.map((target) => (
              <button
                key={target.week}
                type="button"
                onClick={() => setSelectedWeek(target.week)}
                aria-pressed={selectedWeek === target.week}
                className={`rounded-full px-4 py-2 text-xs uppercase tracking-[0.2em] transition ${
                  selectedWeek === target.week
                    ? "neon-button"
                    : "outline-button"
                }`}
              >
                Week {target.week}
              </button>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {focusAreas.map((focus) => (
              <button
                key={focus}
                type="button"
                onClick={() => setSelectedFocus(selectedFocus === focus ? null : focus)}
                aria-pressed={selectedFocus === focus}
                className={`rounded-full px-4 py-2 text-xs uppercase tracking-[0.2em] transition ${
                  selectedFocus === focus
                    ? "neon-button"
                    : "outline-button"
                }`}
              >
                {focus}
              </button>
            ))}
          </div>

          {activeWeek ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {activeWeek.days.map((day, index) => (
                <button
                  key={day.label}
                  type="button"
                  onClick={() => setSelectedDay(index + 1)}
                  aria-pressed={selectedDay === index + 1}
                  className={`rounded-full px-4 py-2 text-xs uppercase tracking-[0.2em] transition ${
                    selectedDay === index + 1
                      ? "neon-button"
                      : "outline-button"
                  }`}
                >
                  {day.label}
                </button>
              ))}
            </div>
          ) : null}

          <div className="mt-6 space-y-3">
            {!activeWeek || !activeDay ? (
              <div className="rounded-2xl border border-white/10 bg-black/30 px-4 py-6 text-sm text-muted">
                Pick a week and day to see your questions.
              </div>
            ) : (
              filteredQuestions.map((question, index) => {
                const questionId = makeQuestionId(
                  activeWeek.week,
                  selectedDay - 1,
                  index
                );
                const isDone = Boolean(completedQuestions[questionId]);

                return (
                  <label
                    key={questionId}
                    className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm"
                  >
                    <p
                      className={`text-foreground ${
                        isDone ? "line-through opacity-70" : ""
                      }`}
                    >
                      {question}
                    </p>
                    <input
                      type="checkbox"
                      checked={isDone}
                      onChange={() => handleQuestionToggle(questionId)}
                      className="h-5 w-5 rounded border border-white/20 bg-black/40 text-accent"
                    />
                  </label>
                );
              })
            )}
          </div>
        </section>

        <section className="space-y-6">
          <div className="glow-card rounded-3xl p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-muted">
              Day details
            </p>
            {activeDay ? (
              <div>
                <h2 className="mt-2 text-2xl font-semibold text-foreground">
                  {activeDay.label} focus
                </h2>
                {renderListSection("Concepts", activeDay.concepts)}
                {renderListSection("DSA topics", activeDay.topics)}
                {renderListSection("LeetCode tags", activeDay.tags)}
                {renderListSection("System prompts", activeDay.systemPrompts)}
                {renderListSection("Project tasks", activeDay.projectTasks)}
                {renderListSection("Behavioral", activeDay.behavioral)}
              </div>
            ) : (
              <p className="mt-3 text-sm text-muted">
                Pick a week and day to reveal the daily breakdown.
              </p>
            )}
          </div>

          <div className="glow-card rounded-3xl p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-muted">
              Daily routine
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-foreground">
              A rhythm you can repeat
            </h3>
            <p className="mt-2 text-sm text-muted">
              Use this as a base and swap blocks based on your energy.
            </p>
            <div className="mt-6 space-y-4">
              {ROUTINE.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-white/10 bg-black/30 px-4 py-4"
                >
                  <p className="text-sm font-semibold text-foreground">
                    {item.title}
                  </p>
                  <p className="mt-2 text-sm text-muted">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function renderListSection(label: string, items: string[]) {
  if (!items.length) {
    return null;
  }

  return (
    <div>
      <p className="mt-4 text-xs uppercase tracking-[0.2em] text-muted">
        {label}
      </p>
      <ul className="mt-2 space-y-1 text-sm text-foreground">
        {items.map((item) => (
          <li key={`${label}-${item}`}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
