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

    const progress = await prisma.dailyProgress.findMany({
      where: { userId },
      orderBy: { date: "desc" },
      take: 90, // Last 90 days
    });

    return NextResponse.json(progress);
  } catch (error) {
    console.error("Error fetching progress:", error);
    return NextResponse.json(
      { error: "Failed to fetch progress" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest, { params }: { params: { userId: string } }) {
  try {
    const userId = params.userId;
    const body = await req.json();
    const { date, studyHours, problemsSolved, mockInterviews, revisionSessions, mood, notes } =
      body;

    const today = new Date(date || new Date());
    today.setHours(0, 0, 0, 0);

    const existing = await prisma.dailyProgress.findFirst({
      where: {
        userId,
        date: {
          gte: today,
          lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
        },
      },
    });

    let progress;
    if (existing) {
      progress = await prisma.dailyProgress.update({
        where: { id: existing.id },
        data: {
          studyHours: studyHours || existing.studyHours,
          problemsSolved: problemsSolved || existing.problemsSolved,
          mockInterviews: mockInterviews || existing.mockInterviews,
          revisionSessions: revisionSessions || existing.revisionSessions,
          mood: mood || existing.mood,
          notes: notes || existing.notes,
        },
      });
    } else {
      progress = await prisma.dailyProgress.create({
        data: {
          userId,
          date: today,
          studyHours: studyHours || 0,
          problemsSolved: problemsSolved || 0,
          mockInterviews: mockInterviews || 0,
          revisionSessions: revisionSessions || 0,
          mood: mood || null,
          notes: notes || null,
          tasksCompleted: 0,
          currentStreak: 0,
        },
      });
    }

    return NextResponse.json(progress);
  } catch (error) {
    console.error("Error creating/updating progress:", error);
    return NextResponse.json(
      { error: "Failed to save progress" },
      { status: 500 }
    );
  }
}
