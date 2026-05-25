import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "User id is required." }, { status: 400 });
  }

  const roadmap = await prisma.roadmap.findFirst({
    where: { userId },
    orderBy: { createdAt: "desc" },
    include: {
      milestones: { orderBy: { week: "asc" } },
      tasks: { orderBy: { order: "asc" } },
    },
  });

  return NextResponse.json(roadmap);
}
