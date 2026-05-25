type StageTemplate = {
  title: string;
  description: string;
  tasks: { title: string; track: string }[];
};

export type PlanInput = {
  role: string;
  company: string;
  packageTarget?: string | null;
  jdSummary?: string | null;
  startDate: string;
  endDate: string;
};

const STAGE_TEMPLATES: StageTemplate[] = [
  {
    title: "Foundation sprint",
    description: "Lock language basics and clean problem solving habits.",
    tasks: [
      { title: "DSA warmup: arrays, strings, hash maps", track: "DSA" },
      { title: "Language deep dive: OOP, collections, async", track: "Core" },
      { title: "Complexity drills and pattern notes", track: "DSA" },
    ],
  },
  {
    title: "Core DSA engine",
    description: "Build speed with timed sets and common patterns.",
    tasks: [
      { title: "Two pointers, sliding window, stacks", track: "DSA" },
      { title: "Binary search, recursion, backtracking", track: "DSA" },
      { title: "45 minute timed set + review", track: "Speed" },
    ],
  },
  {
    title: "Systems and data layer",
    description: "Sharpen design basics and data modeling.",
    tasks: [
      { title: "HTTP, networking, and caching basics", track: "System" },
      { title: "Schema design and SQL practice", track: "System" },
      { title: "Write a mini design doc", track: "System" },
    ],
  },
  {
    title: "Project build week",
    description: "Ship a role aligned project with a clean story.",
    tasks: [
      { title: "Build the flagship project feature", track: "Project" },
      { title: "Polish README and demo flow", track: "Project" },
      { title: "Update resume with impact bullets", track: "Resume" },
    ],
  },
  {
    title: "Company alignment",
    description: "Sync prep to the target company and JD.",
    tasks: [
      { title: "Map JD keywords to your stories", track: "Company" },
      { title: "Solve 10 tagged problems", track: "Company" },
      { title: "Mock interview: technical", track: "Interview" },
    ],
  },
  {
    title: "Behavioral polish",
    description: "Upgrade communication and confidence.",
    tasks: [
      { title: "STAR stories for 6 wins", track: "Behavioral" },
      { title: "Mock interview: behavioral", track: "Interview" },
      { title: "Refine your intro and closing", track: "Behavioral" },
    ],
  },
  {
    title: "Offer sprint",
    description: "Reduce weak spots and rehearse end to end.",
    tasks: [
      { title: "Mixed set on weak areas", track: "DSA" },
      { title: "Full stack system recap", track: "System" },
      { title: "Final mock with feedback", track: "Interview" },
    ],
  },
];

const MS_PER_DAY = 24 * 60 * 60 * 1000;

export function buildPlan(input: PlanInput) {
  const start = new Date(input.startDate);
  const end = new Date(input.endDate);
  const diffMs = Math.max(0, end.getTime() - start.getTime());
  const totalWeeks = Math.max(1, Math.ceil(diffMs / (MS_PER_DAY * 7)));
  const stageCount = Math.min(STAGE_TEMPLATES.length, totalWeeks);
  const stages = STAGE_TEMPLATES.slice(0, stageCount);

  const milestones = stages.map((stage, index) => {
    const weekIndex = Math.floor((index / stageCount) * totalWeeks) + 1;
    const dueDate = clampDate(addDays(start, weekIndex * 7 - 1), end);

    return {
      title: stage.title,
      description: stage.description,
      weekIndex,
      dueDate,
    };
  });

  const tasks = stages.flatMap((stage, index) => {
    const weekIndex = Math.floor((index / stageCount) * totalWeeks) + 1;
    return stage.tasks.map((task) => ({
      title: task.title,
      track: task.track,
      weekIndex,
    }));
  });

  return { milestones, tasks, totalWeeks };
}

function addDays(date: Date, days: number) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function clampDate(date: Date, maxDate: Date) {
  return date.getTime() > maxDate.getTime() ? maxDate : date;
}
