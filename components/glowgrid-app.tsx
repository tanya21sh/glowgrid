"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";

import { buildPlan } from "@/lib/planner";
import {
  buildWeekTargets,
  makeQuestionId,
  type PromptContext,
  type WeekTarget,
} from "@/lib/weekly-targets";

type User = {
  id: string;
  email: string;
  name: string | null;
};

type Milestone = {
  id: string;
  title: string;
  description: string | null;
  week: number | null;
  dueDate: string | null;
};

type Task = {
  id: string;
  title: string;
  category: string | null;
  order: number | null;
  completed: boolean;
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

type PlanForm = {
  role: string;
  company: string;
  packageTarget: string;
  jdSummary: string;
  startDate: string;
  endDate: string;
};

const DEFAULT_FOCUS = ["DSA", "System", "Project", "Resume", "Interview"];

const FORM_DEFAULTS: PlanForm = {
  role: "",
  company: "",
  packageTarget: "",
  jdSummary: "",
  startDate: "",
  endDate: "",
};

const PLAN_STORAGE_KEY = "glowgrid-plan";
const QUESTIONS_STORAGE_KEY = "glowgrid-questions";

export default function GlowgridApp() {
  const user: User = {
    id: "guest-user",
    email: "guest@glowgrid.dev",
    name: "Guest",
  };
  const [plan, setPlan] = useState<Plan | null>(null);
  const [form, setForm] = useState<PlanForm>(FORM_DEFAULTS);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [selectedDay, setSelectedDay] = useState(1);
  const [selectedFocus, setSelectedFocus] = useState<string | null>(null);
  const [completedQuestions, setCompletedQuestions] = useState<
    Record<string, boolean>
  >({});
  const hasPlan = Boolean(plan);

  useEffect(() => {
    const today = new Date();
    const end = new Date();
    end.setDate(today.getDate() + 84);

    setForm((prev) => ({
      ...prev,
      startDate: toDateInput(today),
      endDate: toDateInput(end),
    }));
  }, []);

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
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (plan) {
      window.localStorage.setItem(PLAN_STORAGE_KEY, JSON.stringify(plan));
    }
  }, [plan]);

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
      return DEFAULT_FOCUS;
    }

    const unique = new Set<string>();
    plan.tasks.forEach((task) => {
      if (task.category) {
        unique.add(task.category);
      }
    });

    return Array.from(unique).slice(0, 6);
  }, [plan]);

  const weekTargets = useMemo(() => {
    if (!plan) {
      return [] as WeekTarget[];
    }

    const milestones = plan.milestones;

    const weekList = milestones.map((milestone, index) => ({
      week: milestone.week ?? index + 1,
      title: milestone.title,
      description: milestone.description ?? null,
      dueDate: milestone.dueDate ?? null,
    }));

    const tasks = plan.tasks ?? [];
    const promptContext: PromptContext = {
      role: plan.role,
      company: plan.company,
      jdSummary: plan.jdSummary ?? "",
      packageTarget: plan.packageTarget ?? "",
    };

    return buildWeekTargets(weekList, tasks, focusAreas, promptContext);
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

    const total = questionIds.length;
    const done = questionIds.filter((id) => completedQuestions[id]).length;
    const percent = total ? Math.round((done / total) * 100) : 0;
    return { percent, total, done };
  }, [weekTargets, completedQuestions]);

  const daysLeft = useMemo(() => {
    if (!plan) {
      return null;
    }
    const end = new Date(plan.endDate);
    const diff = Math.max(0, end.getTime() - Date.now());
    return Math.ceil(diff / (24 * 60 * 60 * 1000));
  }, [plan]);

  const handleGeneratePlan = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!form.role.trim() || !form.company.trim()) {
      setError("Role and company are required.");
      return;
    }

    const start = new Date(form.startDate);
    const end = new Date(form.endDate);

    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
      setError("Please choose valid dates.");
      return;
    }

    if (end.getTime() < start.getTime()) {
      setError("End date must be after start date.");
      return;
    }

    setIsLoading(true);

    const { milestones, tasks } = buildPlan({
      role: form.role,
      company: form.company,
      packageTarget: form.packageTarget || null,
      jdSummary: form.jdSummary || null,
      startDate: form.startDate,
      endDate: form.endDate,
    });

    const nextPlan: Plan = {
      id: createId(),
      role: form.role,
      company: form.company,
      packageTarget: form.packageTarget || null,
      jdSummary: form.jdSummary || null,
      startDate: form.startDate,
      endDate: form.endDate,
      milestones: milestones.map((milestone) => ({
        id: createId(),
        title: milestone.title,
        description: milestone.description ?? null,
        week: milestone.week ?? null,
        dueDate: milestone.dueDate ? milestone.dueDate.toISOString() : null,
      })),
      tasks: tasks.map((task) => ({
        id: createId(),
        title: task.title,
        category: task.category ?? null,
        order: task.order ?? null,
        completed: false,
      })),
    };

    setPlan(nextPlan);
    setCompletedQuestions({});
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen">
      <header className="px-6 pb-8 pt-8 sm:px-10 lg:px-16">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="float-fast h-10 w-10 rounded-2xl bg-gradient-to-br from-accent to-accent-2" />
            <div>
              <p className="text-lg font-semibold text-foreground">Glowgrid</p>
              <p className="text-xs uppercase tracking-[0.3em] text-muted">
                Placement prep
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted">
            <a className="hover:text-foreground" href="#planner">
              Planner
            </a>
            <a className="hover:text-foreground" href="#guide">
              Guide
            </a>
            <a className="hover:text-foreground" href="/tracker">
              Tracker
            </a>
            {user ? (
              <span className="text-muted">Demo Mode</span>
            ) : null}
          </div>
        </nav>
      </header>

      <main className="px-6 pb-16 sm:px-10 lg:px-16">
        <section className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="enter-up space-y-6">
            <p className="chip inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs uppercase tracking-[0.2em]">
              Gen Z mode: ON
            </p>
            <h1 className="text-4xl font-semibold text-foreground sm:text-5xl lg:text-6xl">
              Aesthetic placement prep that feels like a game.
            </h1>
            <p className="max-w-xl text-base text-muted sm:text-lg">
              Drop the JD, role, company, and package. Glowgrid spins a structured
              guide, daily routine, and a tracker you can actually stick to.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#planner"
                className="neon-button rounded-full px-6 py-3 text-sm font-semibold"
              >
                Build my prep grid
              </a>
              <a
                href="/tracker"
                className="outline-button rounded-full px-6 py-3 text-sm"
              >
                Open tracker
              </a>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              {focusAreas.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => {
                    setSelectedFocus(item);
                    if (typeof window !== "undefined") {
                      window.localStorage.setItem("glowgrid-focus", item);
                      window.location.href = `/tracker?focus=${encodeURIComponent(item)}`;
                    }
                  }}
                  className={`rounded-full px-4 py-2 text-xs uppercase tracking-[0.2em] transition ${
                    selectedFocus === item
                      ? "neon-button"
                      : "chip hover:bg-white/5"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="glow-card float-slow rounded-3xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-muted">
                  Live status
                </p>
                <p className="mt-1 text-xl font-semibold text-foreground">
                  {user?.name ? `Hey, ${user.name}` : "Glowgrid pilot"}
                </p>
              </div>
              <span className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-muted">
                Beta
              </span>
            </div>
            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between rounded-2xl bg-black/30 px-4 py-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-muted">
                    Goal
                  </p>
                  <p className="text-sm text-foreground">
                    {plan ? `${plan.role} at ${plan.company}` : "Define your goal"}
                  </p>
                </div>
                <span className="text-xs uppercase tracking-[0.2em] text-accent">
                  {plan?.packageTarget || "Target package"}
                </span>
              </div>
              <div className="flex items-center justify-between rounded-2xl bg-black/30 px-4 py-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-muted">
                    Questions complete
                  </p>
                  <p className="text-sm text-foreground">
                    {questionProgress.done} / {questionProgress.total}
                  </p>
                </div>
                <span className="text-xs uppercase tracking-[0.2em] text-accent-3">
                  {questionProgress.percent}%
                </span>
              </div>
              <div className="flex items-center justify-between rounded-2xl bg-black/30 px-4 py-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-muted">
                    Days left
                  </p>
                  <p className="text-sm text-foreground">
                    {daysLeft !== null ? `${daysLeft} days` : "Set a timeline"}
                  </p>
                </div>
                <span className="text-xs uppercase tracking-[0.2em] text-accent-2">
                  Locked in
                </span>
              </div>
            </div>
          </div>
        </section>

        <section id="planner" className="mt-16 grid gap-8 lg:grid-cols-2">
          <div className="glass rounded-3xl p-6">
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-accent" />
              <span className="h-2 w-2 rounded-full bg-accent-2" />
              <span className="h-2 w-2 rounded-full bg-accent-3" />
              <p className="text-xs uppercase tracking-[0.3em] text-muted">
                Glowgrid Chat
              </p>
            </div>
            <div className="mt-6 space-y-4 text-sm">
              <div className="max-w-sm rounded-2xl bg-black/40 px-4 py-3 text-foreground">
                Drop the JD, role, company, package, and your learning period.
              </div>
              <div className="ml-auto max-w-sm rounded-2xl bg-card px-4 py-3 text-foreground">
                {form.role || form.company || form.packageTarget ? (
                  <p>
                    {form.role || "Role"} at {form.company || "Company"},
                    target {form.packageTarget || "package"}. Timeline: {" "}
                    {form.startDate || "start"} to {form.endDate || "end"}.
                  </p>
                ) : (
                  <p>Ready when you are.</p>
                )}
              </div>
              <div className="max-w-sm rounded-2xl bg-black/40 px-4 py-3 text-foreground">
                {plan
                  ? "Grid built. Scroll for your guide and tracker."
                  : "I will craft your routine with milestones and progress sync."}
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {focusAreas.map((item) => (
                <span key={item} className="chip rounded-full px-3 py-1 text-xs">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <form
            onSubmit={handleGeneratePlan}
            className="glass rounded-3xl p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-muted">
                  Planner
                </p>
                <h3 className="mt-2 text-2xl font-semibold text-foreground">
                  Build your prep grid
                </h3>
              </div>
              <span className="chip rounded-full px-3 py-1 text-xs uppercase tracking-[0.2em]">
                Demo mode
              </span>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-xs uppercase tracking-[0.2em] text-muted">
                  Role
                </label>
                <input
                  required
                  value={form.role}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, role: event.target.value }))
                  }
                  placeholder="SDE Intern"
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-foreground outline-none focus:border-accent"
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-[0.2em] text-muted">
                  Company
                </label>
                <input
                  required
                  value={form.company}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, company: event.target.value }))
                  }
                  placeholder="Google"
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-foreground outline-none focus:border-accent"
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-[0.2em] text-muted">
                  Package goal
                </label>
                <input
                  value={form.packageTarget}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      packageTarget: event.target.value,
                    }))
                  }
                  placeholder="20 LPA"
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-foreground outline-none focus:border-accent"
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-[0.2em] text-muted">
                  Learning period
                </label>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  <input
                    type="date"
                    required
                    value={form.startDate}
                    onChange={(event) =>
                      setForm((prev) => ({
                        ...prev,
                        startDate: event.target.value,
                      }))
                    }
                    className="w-full rounded-2xl border border-white/10 bg-black/40 px-3 py-3 text-xs text-foreground outline-none focus:border-accent"
                  />
                  <input
                    type="date"
                    required
                    value={form.endDate}
                    onChange={(event) =>
                      setForm((prev) => ({
                        ...prev,
                        endDate: event.target.value,
                      }))
                    }
                    className="w-full rounded-2xl border border-white/10 bg-black/40 px-3 py-3 text-xs text-foreground outline-none focus:border-accent"
                  />
                </div>
              </div>
            </div>

            <div className="mt-4">
              <label className="text-xs uppercase tracking-[0.2em] text-muted">
                JD summary
              </label>
              <textarea
                rows={4}
                value={form.jdSummary}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    jdSummary: event.target.value,
                  }))
                }
                placeholder="Key skills, responsibilities, and keywords"
                className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-foreground outline-none focus:border-accent"
              />
            </div>

            {error ? <p className="mt-4 text-sm text-accent-2">{error}</p> : null}

            <button
              type="submit"
              disabled={isLoading}
              className="neon-button mt-6 w-full rounded-2xl px-5 py-3 text-sm font-semibold disabled:opacity-60"
            >
              {isLoading ? "Generating grid..." : "Generate my plan"}
            </button>
          </form>
        </section>

        <section id="guide" className="mt-16">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-muted">
                Structured guide
              </p>
              <h2 className="mt-2 text-3xl font-semibold text-foreground">
                Weekly targets with daily quests
              </h2>
            </div>
            <span className="chip rounded-full px-4 py-2 text-xs uppercase tracking-[0.2em]">
              {plan ? "Active plan" : "Sample"}
            </span>
          </div>

          {hasPlan ? (
            <div className="mt-6 flex flex-wrap gap-3">
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
          ) : null}

          {!hasPlan ? (
            <div className="mt-8 glass rounded-3xl p-6 text-sm text-muted">
              Enter your role, company, and JD summary, then generate a plan to
              unlock the weekly targets and day-wise questions.
            </div>
          ) : weekTargets.length ? (
            <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="glow-card rounded-3xl p-6">
                {activeWeek ? (
                  <div key={activeWeek.week}>
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="text-xs uppercase tracking-[0.3em] text-muted">
                          Week {activeWeek.week}
                        </p>
                        <h3 className="mt-2 text-2xl font-semibold text-foreground">
                          {activeWeek.title}
                        </h3>
                      </div>
                      <span className="chip rounded-full px-4 py-2 text-xs uppercase tracking-[0.2em]">
                        {activeWeek.dueDate
                          ? formatDate(activeWeek.dueDate)
                          : "Anytime"}
                      </span>
                    </div>
                    <p className="mt-3 text-sm text-muted">
                      {activeWeek.description}
                    </p>
                    <div className="mt-6 flex flex-wrap gap-2">
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
                    {activeDay ? (
                      <div className="mt-6 rounded-2xl border border-white/10 bg-black/30 p-5">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <p className="text-sm font-semibold text-foreground">
                            {activeDay.label}
                          </p>
                          <span className="text-xs uppercase tracking-[0.2em] text-muted">
                            Daily targets
                          </span>
                        </div>
                        {renderListSection("Concepts", activeDay.concepts)}
                        {renderListSection("DSA topics", activeDay.topics)}
                        {renderListSection("LeetCode tags", activeDay.tags)}
                        {renderListSection("Questions", activeDay.questions)}
                        {renderListSection(
                          "System prompts",
                          activeDay.systemPrompts
                        )}
                        {renderListSection(
                          "Project tasks",
                          activeDay.projectTasks
                        )}
                        {renderListSection(
                          "Behavioral",
                          activeDay.behavioral
                        )}
                      </div>
                    ) : null}
                  </div>
                ) : null}
              </div>
              <div className="glass rounded-3xl p-6">
                <p className="text-xs uppercase tracking-[0.3em] text-muted">
                  Weekly focus
                </p>
                <h3 className="mt-2 text-2xl font-semibold text-foreground">
                  Based on your prompt
                </h3>
                <p className="mt-3 text-sm text-muted">
                  We blend your role, company, and JD keywords to build daily
                  concepts and question sets. Update the prompt to refresh.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  {focusAreas.map((item) => (
                    <span
                      key={item}
                      className="chip rounded-full px-4 py-2 text-xs uppercase tracking-[0.2em]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : null}
        </section>

        <section className="mt-16">
          <div className="glass rounded-3xl p-6 text-sm text-muted">
            Your tracker now lives on its own page so it can stay focused. Use
            the planner above, then open the tracker to mark questions as
            completed.
            <div className="mt-4">
              <a
                href="/tracker"
                className="neon-button inline-flex rounded-full px-6 py-3 text-sm font-semibold"
              >
                Open tracker
              </a>
            </div>
          </div>
        </section>

        <section className="mt-16">
          <div className="glow-card rounded-3xl p-8 text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-muted">
              Ready to glow
            </p>
            <h3 className="mt-3 text-3xl font-semibold text-foreground">
              Your placement grid is one click away.
            </h3>
            <p className="mt-2 text-sm text-muted">
              Generate, track, and adapt your prep without losing the vibe.
            </p>
            <a
              href="#planner"
              className="neon-button mt-6 inline-flex rounded-full px-6 py-3 text-sm font-semibold"
            >
              Start my plan
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}

function toDateInput(date: Date) {
  return date.toISOString().slice(0, 10);
}

function formatDate(value: string) {
  const date = new Date(value);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
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

function createId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `id-${Math.random().toString(36).slice(2, 10)}`;
}

