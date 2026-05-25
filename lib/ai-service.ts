import OpenAI from "openai";

export type AIGeneratedContent = {
  dsaRoadmap?: string;
  systemDesignRoadmap?: string;
  fundamentalsRoadmap?: string;
  behavioralRoadmap?: string;
  dailyPlan?: string;
  mockInterviewTopics?: string[];
  studySchedule?: Array<{
    week: number;
    focus: string;
    tasks: string[];
  }>;
};

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateRoadmapWithAI(
  company: string,
  role: string,
  timeline: string,
  level: string,
  jdSummary?: string
): Promise<AIGeneratedContent> {
  const prompt = `
You are an expert interview preparation coach. Generate a comprehensive interview preparation roadmap for:
- Company: ${company}
- Role: ${role}
- Timeline: ${timeline} days
- Current Level: ${level}
${jdSummary ? `- Job Description: ${jdSummary}` : ""}

Please provide the response in the following JSON format:
{
  "dsaRoadmap": "A detailed DSA preparation plan with topics and difficulty progression",
  "systemDesignRoadmap": "A system design preparation roadmap for this role",
  "fundamentalsRoadmap": "CS fundamentals topics to review",
  "behavioralRoadmap": "Behavioral interview preparation with common questions",
  "dailyPlan": "A day-by-day study schedule for the first week",
  "mockInterviewTopics": ["array of specific mock interview topics"],
  "studySchedule": [
    {
      "week": 1,
      "focus": "Focus area for week 1",
      "tasks": ["task1", "task2", "task3"]
    }
  ]
}

Make sure the plan is realistic, achievable, and tailored to the role and company.
  `;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "You are an expert interview preparation coach who creates personalized roadmaps.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 4000,
    });

    const content = response.choices[0]?.message?.content || "";

    // Extract JSON from the response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Could not parse AI response as JSON");
    }

    const generatedContent = JSON.parse(jsonMatch[0]) as AIGeneratedContent;
    return generatedContent;
  } catch (error) {
    console.error("Error generating roadmap with AI:", error);
    throw new Error("Failed to generate roadmap with AI");
  }
}

export async function generateDailyRecommendations(
  userId: string,
  currentProgress: any
): Promise<string[]> {
  const prompt = `
Based on the following study progress:
${JSON.stringify(currentProgress, null, 2)}

Generate 3-5 specific, actionable study recommendations for today.
Return as a JSON array of strings.
  `;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an expert interview preparation coach.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const content = response.choices[0]?.message?.content || "";
    const jsonMatch = content.match(/\[[\s\S]*\]/);

    if (!jsonMatch) {
      return ["Review weak topics", "Practice DSA problems", "Mock interview session"];
    }

    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    console.error("Error generating recommendations:", error);
    return ["Review today's topics", "Practice problems", "Take a break"];
  }
}

export async function analyzeWeakAreas(
  userId: string,
  performanceData: any
): Promise<{ topic: string; weakness: string }[]> {
  const prompt = `
Based on the following performance data:
${JSON.stringify(performanceData, null, 2)}

Identify the top 5 weak areas and provide specific recommendations.
Return as a JSON array with objects containing "topic" and "weakness" keys.
  `;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an expert at identifying knowledge gaps.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 800,
    });

    const content = response.choices[0]?.message?.content || "";
    const jsonMatch = content.match(/\[[\s\S]*\]/);

    if (!jsonMatch) {
      return [
        { topic: "Binary Trees", weakness: "Practice tree traversal" },
        { topic: "Dynamic Programming", weakness: "Review classic DP problems" },
      ];
    }

    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    console.error("Error analyzing weak areas:", error);
    return [];
  }
}

export async function generateMotivationalMessage(): Promise<string> {
  const prompt =
    "Generate a short (1-2 sentences) motivational message for someone preparing for a job interview. Make it inspiring but realistic.";

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.8,
      max_tokens: 100,
    });

    return (
      response.choices[0]?.message?.content ||
      "Keep pushing forward! You've got this!"
    );
  } catch (error) {
    console.error("Error generating message:", error);
    return "Keep pushing forward! You've got this!";
  }
}
