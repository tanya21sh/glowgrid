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
  const startDate = typeof body.startDate === "string" ? body.startDate : "";
  const endDate = typeof body.endDate === "string" ? body.endDate : "";

  if (!userId || !role || !company || !startDate || !endDate) {
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

  const plan = await prisma.plan.create({
    data: {
      userId,
      role,
      company,
      packageTarget: packageTarget || null,
      jdSummary: jdSummary || null,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      milestones: { create: milestones },
      tasks: { create: tasks },
    },
    include: {
      milestones: { orderBy: { weekIndex: "asc" } },
      tasks: { orderBy: { weekIndex: "asc" } },
    },
  });

  return NextResponse.json(plan);
}
