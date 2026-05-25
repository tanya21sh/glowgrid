import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "User id is required." }, { status: 400 });
  }

  const plan = await prisma.plan.findFirst({
    where: { userId },
    orderBy: { createdAt: "desc" },
    include: {
      milestones: { orderBy: { weekIndex: "asc" } },
      tasks: { orderBy: { weekIndex: "asc" } },
    },
  });

  return NextResponse.json(plan);
}
