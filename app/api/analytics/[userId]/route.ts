import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest, { params }: { params: { userId: string } }) {
  try {
    const userId = params.userId;

    if (!userId) {
      return NextResponse.json(
        { error: "Missing userId" },
        { status: 400 }
      );
    }

    // Get or create analytics record
    let analytics = await prisma.analytics.findUnique({
      where: { userId },
    });

    if (!analytics) {
      analytics = await prisma.analytics.create({
        data: {
          userId,
          totalStudyHours: 0,
          totalProblems: 0,
          completionRate: 0,
          consistencyScore: 0,
        },
      });
    }

    // Get recent progress data
    const progressData = await prisma.dailyProgress.findMany({
      where: { userId },
      orderBy: { date: "desc" },
      take: 30,
    });

    // Calculate metrics
    const totalStudyHours = progressData.reduce((sum, p) => sum + p.studyHours, 0);
    const totalProblems = progressData.reduce((sum, p) => sum + p.problemsSolved, 0);
    const daysWithProgress = progressData.filter((p) => p.studyHours > 0).length;
    const consistencyScore = Math.round((daysWithProgress / 30) * 100);

    // Get completion rate from tasks
    const tasks = await prisma.roadmapTask.findMany({
      where: {
        roadmap: {
          userId,
          isActive: true,
        },
      },
    });

    const completedTasks = tasks.filter((t) => t.completed).length;
    const completionRate = tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0;

    // Update analytics
    const updated = await prisma.analytics.update({
      where: { userId },
      data: {
        totalStudyHours: totalStudyHours,
        totalProblems: totalProblems,
        completionRate: completionRate,
        consistencyScore: consistencyScore,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error fetching analytics:", error);
    return NextResponse.json(
      { error: "Failed to fetch analytics" },
      { status: 500 }
    );
  }
}
