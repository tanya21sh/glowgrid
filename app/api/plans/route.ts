import { NextResponse } from "next/server";

import { buildPlan } from "@/lib/planner";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const body = await request.json();

  const userId = typeof body.userId === "string" ? body.userId : "";
  const role = typeof body.role === "string" ? body.role.trim() : "";
  const company = typeof body.company === "string" ? body.company.trim() : "";
  const packageTarget =
    typeof body.packageTarget === "string" ? body.packageTarget.trim() : "";
  const jdSummary =
    typeof body.jdSummary === "string" ? body.jdSummary.trim() : "";
  const startDate = typeof body.startDate === "string" ? body.startDate : new Date().toISOString();
  const endDate = typeof body.endDate === "string" ? body.endDate : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
  const timeline = typeof body.timeline === "string" ? body.timeline.trim() : "30";
  const level = typeof body.level === "string" ? body.level.trim() : "intermediate";

  if (!userId || !role || !company) {
    return NextResponse.json(
      { error: "Missing required fields." },
      { status: 400 }
    );
  }

  const { milestones, tasks } = buildPlan({
    role,
    company,
    packageTarget,
    jdSummary,
    startDate,
    endDate,
  });

  const roadmap = await prisma.roadmap.create({
    data: {
      userId,
      role,
      company,
      timeline: timeline || "30",
      level: level || "intermediate",
      jdSummary: jdSummary || null,
      milestones: { create: milestones },
      tasks: { create: tasks },
    },
    include: {
      milestones: { orderBy: { week: "asc" } },
      tasks: { orderBy: { order: "asc" } },
    },
  });

  return NextResponse.json(roadmap);
}
