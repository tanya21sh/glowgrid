import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const roadmapId = searchParams.get("roadmapId");

    if (!userId) {
      return NextResponse.json(
        { error: "Missing userId" },
        { status: 400 }
      );
    }

    const where: any = {};

    if (roadmapId) {
      where.roadmapId = roadmapId;
    } else {
      // Get tasks from active roadmap
      const activeRoadmap = await prisma.roadmap.findFirst({
        where: { userId, isActive: true },
      });
      if (activeRoadmap) {
        where.roadmapId = activeRoadmap.id;
      } else {
        return NextResponse.json([]);
      }
    }

    const tasks = await prisma.roadmapTask.findMany({
      where,
      orderBy: { order: "asc" },
    });

    return NextResponse.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return NextResponse.json(
      { error: "Failed to fetch tasks" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { roadmapId, title, description, category, subcategory, difficulty, estimatedTime } =
      body;

    const task = await prisma.roadmapTask.create({
      data: {
        roadmapId,
        title,
        description: description || null,
        category,
        subcategory: subcategory || null,
        difficulty,
        estimatedTime: estimatedTime || null,
      },
    });

    return NextResponse.json(task);
  } catch (error) {
    console.error("Error creating task:", error);
    return NextResponse.json(
      { error: "Failed to create task" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { id, completed } = await req.json();

    const task = await prisma.roadmapTask.update({
      where: { id },
      data: {
        completed,
        completedAt: completed ? new Date() : null,
      },
    });

    return NextResponse.json(task);
  } catch (error) {
    console.error("Error updating task:", error);
    return NextResponse.json(
      { error: "Failed to update task" },
      { status: 500 }
    );
  }
}
