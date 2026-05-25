export type DayTarget = {
  label: string;
  concepts: string[];
  topics: string[];
  tags: string[];
  questions: string[];
  systemPrompts: string[];
  projectTasks: string[];
  behavioral: string[];
};

export type WeekTarget = {
  week: number;
  title: string;
  description: string | null;
  dueDate: string | null;
  days: DayTarget[];
};

export type PromptContext = {
  role: string;
  company: string;
  jdSummary: string;
  packageTarget?: string;
};

export type TaskTarget = {
  id: string;
  title: string;
  track?: string | null;
  weekIndex?: number | null;
};

export function makeQuestionId(
  week: number,
  dayIndex: number,
  questionIndex: number
) {
  return `w${week}-d${dayIndex + 1}-q${questionIndex + 1}`;
}

export function buildWeekTargets(
  weeks: Array<{
    week: number;
    title: string;
    description: string | null;
    dueDate: string | null;
  }>,
  tasks: TaskTarget[],
  focusAreas: string[],
  prompt: PromptContext
): WeekTarget[] {
  const promptText = [
    prompt.role,
    prompt.company,
    prompt.jdSummary,
    prompt.packageTarget ?? "",
  ]
    .join(" ")
    .trim();
  const keywords = extractKeywords(promptText);
  const pools = buildPromptPools(keywords, focusAreas, prompt);

  return weeks.map((week) => {
    const weekTasks = tasks.filter((task) => task.weekIndex === week.week);
    const dayTaskMap = mapTasksToDays(weekTasks, 7);
    const seedBase = hashString(`${promptText}|week-${week.week}`);

    const days: DayTarget[] = Array.from({ length: 7 }, (_, index) => {
      const seed = seedBase + index * 37;
      const dayConcepts = pickFrom(pools.concepts, seed, 3);
      const dayTopics = pickFrom(pools.topics, seed + 7, 2);
      const dayTags = pickFrom(pools.tags, seed + 17, 2);
      const dayQuestions = buildDayQuestions({
        templates: pools.questionTemplates,
        topics: dayTopics,
        tags: dayTags,
        seed,
        totalQuestions: 8,
        role: prompt.role,
        company: prompt.company,
      });
      const daySystem = pickFrom(pools.systemPrompts, seed + 23, 1);
      const dayProjects = pickFrom(pools.projectTasks, seed + 29, 1);
      const dayBehavioral = pickFrom(pools.behavioral, seed + 31, 1);
      const taskHighlight = dayTaskMap[index]?.title;
      const questions = taskHighlight
        ? [`Task: ${taskHighlight}`, ...dayQuestions].slice(0, 8)
        : dayQuestions;

      return {
        label: `Day ${index + 1}`,
        concepts: taskHighlight
          ? [taskHighlight, ...dayConcepts].slice(0, 4)
          : dayConcepts,
        topics: dayTopics,
        tags: dayTags,
        questions,
        systemPrompts: daySystem,
        projectTasks: dayProjects,
        behavioral: dayBehavioral,
      };
    });

    return {
      week: week.week,
      title: week.title,
      description: week.description,
      dueDate: week.dueDate,
      days,
    };
  });
}

function buildPromptPools(
  keywords: string[],
  focusAreas: string[],
  prompt: PromptContext
) {
  const companyName = prompt.company.trim() || "target company";
  const roleName = prompt.role.trim() || "role";

  const baseConcepts = [
    "Arrays & strings",
    "Hash maps",
    "Stacks & queues",
    "Trees & graphs",
    "Dynamic programming",
    "System design basics",
    "REST APIs",
    "SQL joins",
    "Caching",
  ];

  const baseTopics = [
    "Arrays",
    "Strings",
    "Hash maps",
    "Stacks",
    "Queues",
    "Trees",
    "Graphs",
    "Dynamic programming",
    "Greedy",
    "Binary search",
  ];

  const baseTags = [
    "two pointers",
    "sliding window",
    "binary search",
    "prefix sum",
    "sorting",
    "heap",
    "bfs",
    "dfs",
    "backtracking",
    "union find",
  ];

  const baseSystemPrompts = [
    `Design a ${companyName}-scale feature (feed/search/notifications)`,
    `Plan API rate limiting for ${companyName} traffic spikes`,
    `Draft a caching strategy for ${companyName} services`,
  ];

  const baseProjectTasks = [
    `Build a ${roleName} mini-feature aligned to ${companyName}`,
    `Ship a dashboard that tracks ${companyName} KPIs`,
    `Implement a clean CRUD flow for a ${companyName} use case`,
  ];

  const baseBehavioral = [
    `Why ${companyName}?`,
    "Tell me about a time you showed ownership",
    `Describe a project relevant to the ${roleName} role`,
  ];

  const baseQuestions = {
    easy: [
      "Warm-up: solve 1 {topic} question ({tag})",
      "Quick drill: explain {topic} basics",
      "Implement a starter {topic} solution ({tag})",
    ],
    medium: [
      "Solve a medium {topic} problem using {tag}",
      "Optimize a {topic} solution and explain tradeoffs",
      "{company} prep: medium {topic} challenge ({tag})",
      "{role} round: {topic} with {tag}",
    ],
    hard: [
      "Hard {topic} problem; target optimal solution ({tag})",
      "{company} bar-raiser: hard {topic} challenge ({tag})",
      "Design an optimized {topic} solution with {tag}",
    ],
  };

  const keywordMap: Record<string, { concepts: string[]; questions: string[] }> =
    {
      react: {
        concepts: ["React hooks", "State management", "Component patterns"],
        questions: ["Build a reusable hook", "Optimize re-renders"],
      },
      next: {
        concepts: ["Routing", "Server components", "Data fetching"],
        questions: ["Design a page + layout", "Add an API route"],
      },
      node: {
        concepts: ["Event loop", "REST APIs", "Auth basics"],
        questions: ["Design an API endpoint", "Handle async flows"],
      },
      javascript: {
        concepts: ["Closures", "Promises", "Async/await"],
        questions: ["Implement debounce", "Explain hoisting"],
      },
      typescript: {
        concepts: ["Generics", "Type narrowing", "Type safety"],
        questions: ["Type a hook", "Refactor to strict types"],
      },
      python: {
        concepts: ["Lists & dicts", "Comprehensions", "OOP basics"],
        questions: ["Implement BFS", "Write clean modules"],
      },
      java: {
        concepts: ["Collections", "OOP design", "JVM basics"],
        questions: ["Implement LRU cache", "Explain GC"],
      },
      cpp: {
        concepts: ["STL", "Pointers", "Memory"],
        questions: ["Implement heap", "Explain RAII"],
      },
      "c++": {
        concepts: ["STL", "Pointers", "Memory"],
        questions: ["Implement heap", "Explain RAII"],
      },
      "c#": {
        concepts: [".NET basics", "LINQ", "OOP"],
        questions: ["Explain async/await", "Build a clean API"],
      },
      sql: {
        concepts: ["Joins", "Indexes", "Normalization"],
        questions: ["Write aggregation query", "Optimize a query"],
      },
      database: {
        concepts: ["Schema design", "Indexes", "Transactions"],
        questions: ["Design a schema", "Explain isolation levels"],
      },
      system: {
        concepts: ["Caching", "Load balancing", "Scalability"],
        questions: ["Design a rate limiter", "Scale a feed"],
      },
      aws: {
        concepts: ["EC2 & S3", "IAM", "Networking"],
        questions: ["Design cloud deploy", "Secure an API"],
      },
      docker: {
        concepts: ["Containers", "Dockerfiles", "Compose"],
        questions: ["Containerize an app", "Debug a build"],
      },
      kubernetes: {
        concepts: ["Pods & services", "Deployments", "Scaling"],
        questions: ["Design a rollout", "Debug pods"],
      },
      frontend: {
        concepts: ["UI state", "Accessibility", "Performance"],
        questions: ["Audit a UI", "Optimize bundle"],
      },
      backend: {
        concepts: ["APIs", "Databases", "Observability"],
        questions: ["Design auth", "Add logging"],
      },
      fullstack: {
        concepts: ["End-to-end flow", "Data modeling", "Deployment"],
        questions: ["Build a CRUD flow", "Ship a feature"],
      },
      ml: {
        concepts: ["Model basics", "Evaluation", "Data prep"],
        questions: ["Explain overfitting", "Design a pipeline"],
      },
      data: {
        concepts: ["ETL", "Analytics", "SQL"],
        questions: ["Write a dashboard query", "Design a pipeline"],
      },
    };

  const focusMap: Record<string, { concepts: string[]; questions: string[] }> =
    {
      dsa: {
        concepts: ["Arrays", "Strings", "Binary search"],
        questions: ["Solve 5 pattern questions", "Analyze complexity"],
      },
      system: {
        concepts: ["System design", "Caching", "Queues"],
        questions: ["Design a cache", "Design a queue"],
      },
      project: {
        concepts: ["Architecture", "Feature delivery", "Testing"],
        questions: ["Ship one feature", "Write tests"],
      },
      resume: {
        concepts: ["Impact bullets", "Storytelling"],
        questions: ["Rewrite 2 bullets", "Refine STAR story"],
      },
      interview: {
        concepts: ["Mock rounds", "Communication"],
        questions: ["Record a mock", "Review feedback"],
      },
    };

  const conceptPool = [...baseConcepts];
  const topicPool = [...baseTopics];
  const tagPool = [...baseTags];
  const systemPool = [...baseSystemPrompts];
  const projectPool = [...baseProjectTasks];
  const behavioralPool = [...baseBehavioral];
  const questionTemplates = {
    easy: [...baseQuestions.easy],
    medium: [...baseQuestions.medium],
    hard: [...baseQuestions.hard],
  };

  const keywordTopicMap: Record<string, string[]> = {
    array: ["Arrays"],
    arrays: ["Arrays"],
    string: ["Strings"],
    strings: ["Strings"],
    hash: ["Hash maps"],
    hashmap: ["Hash maps"],
    tree: ["Trees"],
    trees: ["Trees"],
    graph: ["Graphs"],
    graphs: ["Graphs"],
    dp: ["Dynamic programming"],
    dynamic: ["Dynamic programming"],
    greedy: ["Greedy"],
    backtracking: ["Backtracking"],
    recursion: ["Recursion"],
    sorting: ["Sorting"],
    binary: ["Binary search"],
    search: ["Binary search"],
    heap: ["Heaps"],
    stack: ["Stacks"],
    queue: ["Queues"],
    linked: ["Linked lists"],
    matrix: ["Matrices"],
  };

  const keywordTagMap: Record<string, string[]> = {
    pointer: ["two pointers"],
    pointers: ["two pointers"],
    sliding: ["sliding window"],
    window: ["sliding window"],
    bfs: ["bfs"],
    dfs: ["dfs"],
    prefix: ["prefix sum"],
    heap: ["heap"],
    union: ["union find"],
    bit: ["bit manipulation"],
    greedy: ["greedy"],
    graph: ["graph"],
  };

  keywords.forEach((keyword) => {
    const entry = keywordMap[keyword];
    if (entry) {
      entry.concepts.forEach((concept) => pushUnique(conceptPool, concept));
      entry.questions.forEach((question) =>
        pushUnique(questionTemplates.medium, question)
      );
    }

    const topicEntry = keywordTopicMap[keyword];
    if (topicEntry) {
      topicEntry.forEach((topic) => pushUnique(topicPool, topic));
    }

    const tagEntry = keywordTagMap[keyword];
    if (tagEntry) {
      tagEntry.forEach((tag) => pushUnique(tagPool, tag));
    }
  });

  focusAreas.forEach((focus) => {
    const key = focus.toLowerCase();
    const entry = focusMap[key];
    if (entry) {
      entry.concepts.forEach((concept) => pushUnique(conceptPool, concept));
      entry.questions.forEach((question) =>
        pushUnique(questionTemplates.medium, question)
      );
    }
  });

  keywords.slice(0, 6).forEach((keyword) => {
    pushUnique(conceptPool, `JD focus: ${keyword}`);
  });

  return {
    concepts: conceptPool,
    topics: topicPool,
    tags: tagPool,
    systemPrompts: systemPool,
    projectTasks: projectPool,
    behavioral: behavioralPool,
    questionTemplates,
  };
}

function extractKeywords(text: string) {
  const stopWords = new Set([
    "and",
    "the",
    "for",
    "with",
    "from",
    "that",
    "this",
    "your",
    "you",
    "role",
    "company",
    "package",
    "experience",
    "skills",
    "responsibilities",
    "requirements",
    "preferred",
    "will",
    "have",
    "has",
    "are",
    "job",
    "jd",
    "developer",
  ]);

  const tokens = text
    .toLowerCase()
    .replace(/[^a-z0-9+.# ]/g, " ")
    .split(/\s+/)
    .filter(Boolean);

  const unique = new Set<string>();
  tokens.forEach((token) => {
    if (token.length < 2) {
      return;
    }
    if (stopWords.has(token)) {
      return;
    }
    unique.add(token);
  });

  return Array.from(unique);
}

function hashString(input: string) {
  let hash = 0;
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash * 31 + input.charCodeAt(i)) >>> 0;
  }
  return hash;
}

function pickFrom(list: string[], seed: number, count: number) {
  if (!list.length) {
    return [];
  }

  const picked: string[] = [];
  for (let i = 0; i < count; i += 1) {
    const index = (seed + i * 13) % list.length;
    pushUnique(picked, list[index]);
  }
  return picked;
}

function allocateCounts(total: number, weights: [number, number, number]) {
  const raw = weights.map((weight) => weight * total);
  const counts = raw.map((value) => Math.floor(value));
  let remainder = total - counts.reduce((sum, value) => sum + value, 0);

  const fractional = raw
    .map((value, index) => ({ index, frac: value - Math.floor(value) }))
    .sort((a, b) => {
      if (b.frac === a.frac) {
        return a.index - b.index;
      }
      return b.frac - a.frac;
    });

  let pointer = 0;
  while (remainder > 0) {
    counts[fractional[pointer % fractional.length].index] += 1;
    remainder -= 1;
    pointer += 1;
  }

  return {
    easy: counts[0] || 1,
    medium: counts[1] || 1,
    hard: counts[2] || 1,
  };
}

function buildDayQuestions(options: {
  templates: { easy: string[]; medium: string[]; hard: string[] };
  topics: string[];
  tags: string[];
  seed: number;
  totalQuestions: number;
  role: string;
  company: string;
}) {
  const { templates, topics, tags, seed, totalQuestions, role, company } =
    options;
  const counts = allocateCounts(totalQuestions, [0.2, 0.6, 0.2]);
  const topicPool = topics.length ? topics : ["Arrays", "Strings"];
  const tagPool = tags.length ? tags : ["two pointers", "sliding window"];

  const questions: string[] = [];
  const difficultyConfig = [
    { label: "Easy", count: counts.easy, list: templates.easy, offset: 3 },
    {
      label: "Medium",
      count: counts.medium,
      list: templates.medium,
      offset: 13,
    },
    { label: "Hard", count: counts.hard, list: templates.hard, offset: 23 },
  ];

  difficultyConfig.forEach((config, groupIndex) => {
    for (let i = 0; i < config.count; i += 1) {
      const topic = topicPool[(seed + groupIndex * 17 + i * 5) % topicPool.length];
      const tag = tagPool[(seed + groupIndex * 19 + i * 7) % tagPool.length];
      const template =
        config.list[(seed + config.offset + i) % config.list.length];
      const text = formatQuestion(template, topic, tag, company, role);
      questions.push(`[${config.label}] ${text}`);
    }
  });

  return questions.slice(0, totalQuestions);
}

function formatQuestion(
  template: string,
  topic: string,
  tag: string,
  company: string,
  role: string
) {
  const safeCompany = company.trim() || "target company";
  const safeRole = role.trim() || "role";
  return template
    .replace(/\{topic\}/g, topic)
    .replace(/\{tag\}/g, tag)
    .replace(/\{company\}/g, safeCompany)
    .replace(/\{role\}/g, safeRole);
}

function mapTasksToDays(tasks: TaskTarget[], days: number) {
  const map: TaskTarget[] = [];
  tasks.forEach((task, index) => {
    const slot = index % days;
    if (!map[slot]) {
      map[slot] = task;
    }
  });
  return map;
}

function pushUnique(list: string[], value: string) {
  if (!list.includes(value)) {
    list.push(value);
  }
}
