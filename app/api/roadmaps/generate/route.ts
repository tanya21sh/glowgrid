import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateRoadmapWithAI } from "@/lib/ai-service";

export async function POST(req: NextRequest) {
  try {
    const { userId, company, role, timeline, level, jdSummary } =
      await req.json();

    if (!userId || !company || !role || !timeline || !level) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Ensure user exists - create if doesn't exist (for guest users)
    await prisma.user.upsert({
      where: { id: userId },
      update: {},
      create: {
        id: userId,
        clerkId: `clerk_${userId}`,
        email: `${userId}@glowgrid.local`,
        name: userId === "guest-user" ? "Guest User" : userId,
      },
    });

    // Generate AI content
    let aiContent;
    try {
      aiContent = await generateRoadmapWithAI(
        company,
        role,
        timeline,
        level,
        jdSummary
      );
    } catch (error) {
      console.error("AI generation failed:", error);
      // Use mock data as fallback
      aiContent = {
        dsaRoadmap: "DSA Preparation Plan",
        systemDesignRoadmap: "System Design Preparation Plan",
        fundamentalsRoadmap: "CS Fundamentals Plan",
        behavioralRoadmap: "Behavioral Interview Prep",
        dailyPlan: "Daily study plan",
        mockInterviewTopics: [
          "Arrays",
          "Strings",
          "Trees",
          "Graphs",
        ],
        studySchedule: [],
      };
    }

    // Create roadmap in database
    const roadmap = await prisma.roadmap.create({
      data: {
        userId,
        company,
        role,
        timeline,
        level,
        jdSummary: jdSummary || null,
        dsaRoadmap: aiContent.dsaRoadmap,
        systemDesignRoadmap: aiContent.systemDesignRoadmap,
        fundamentalsRoadmap: aiContent.fundamentalsRoadmap,
        behavioralRoadmap: aiContent.behavioralRoadmap,
        dailyPlan: aiContent.dailyPlan,
        generatedContent: JSON.stringify(aiContent),
        isActive: true,
      },
    });

    // Create default tasks for the roadmap
    const categories = [
      {
        name: "DSA - Data Structures",
        tasks: ["Arrays & Strings", "Linked Lists", "Stacks & Queues", "Trees & Graphs"],
      },
      {
        name: "System Design",
        tasks: ["Scalability Basics", "Database Design", "Caching Strategies", "Microservices"],
      },
      {
        name: "CS Fundamentals",
        tasks: ["Operating Systems", "Networks", "Databases", "Algorithms Complexity"],
      },
      {
        name: "Behavioral",
        tasks: ["Tell me about yourself", "Why this company?", "Describe a challenge", "Team collaboration"],
      },
    ];

    let order = 0;
    for (const category of categories) {
      for (const taskTitle of category.tasks) {
        await prisma.roadmapTask.create({
          data: {
            roadmapId: roadmap.id,
            title: taskTitle,
            category: category.name,
            difficulty: "medium",
            order: order++,
            completed: false,
          },
        });
      }
    }

    return NextResponse.json(roadmap);
  } catch (error) {
    console.error("Error generating roadmap:", error);
    return NextResponse.json(
      { error: "Failed to generate roadmap" },
      { status: 500 }
    );
  }
}
