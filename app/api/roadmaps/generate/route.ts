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

    return NextResponse.json(roadmap);
  } catch (error) {
    console.error("Error generating roadmap:", error);
    return NextResponse.json(
      { error: "Failed to generate roadmap" },
      { status: 500 }
    );
  }
}
