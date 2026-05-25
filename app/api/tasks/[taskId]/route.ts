import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

type RouteParams = {
  params: { taskId: string };
};

export async function PATCH(request: Request, { params }: RouteParams) {
  const body = await request.json();
  const completed = Boolean(body.completed);

  if (!params.taskId) {
    return NextResponse.json({ error: "Task id is required." }, { status: 400 });
  }

  const task = await prisma.roadmapTask.update({
    where: { id: params.taskId },
    data: {
      completed,
      completedAt: completed ? new Date() : null,
    },
  });

  return NextResponse.json(task);
}
