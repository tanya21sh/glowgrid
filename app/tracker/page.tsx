'use client';

export const dynamic = 'force-dynamic';

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, CheckCircle2, Circle } from "lucide-react";

export default function TrackerPage() {
  const router = useRouter();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Using a guest user for now since Clerk is disabled
  const userId = "guest-user";

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch(`/api/tasks?userId=${userId}`);
      if (response.ok) {
        const data = await response.json();
        setTasks(data);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin">
          <Zap className="w-8 h-8 text-accent" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2">Progress Tracker</h1>
          <p className="text-muted-foreground">
            Track your daily learning journey and monitor your progress
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Tasks */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Daily Tasks</CardTitle>
                <CardDescription>
                  Complete your daily preparation tasks
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center py-8">
                    <Zap className="w-8 h-8 text-accent mx-auto animate-spin" />
                  </div>
                ) : tasks.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>No tasks yet. Generate a roadmap to get started!</p>
                    <Button
                      onClick={() => router.push("/roadmap-generator")}
                      className="mt-4"
                    >
                      Generate Roadmap
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {tasks.map((task: any) => (
                      <div
                        key={task.id}
                        className="flex items-start gap-4 p-4 border border-border rounded-lg hover:bg-card/50 transition"
                      >
                        <button
                          onClick={() => toggleTask(task.id)}
                          className="mt-1 flex-shrink-0"
                        >
                          {task.completed ? (
                            <CheckCircle2 className="w-6 h-6 text-accent" />
                          ) : (
                            <Circle className="w-6 h-6 text-muted" />
                          )}
                        </button>
                        <div className="flex-1 min-w-0">
                          <p
                            className={`font-semibold ${
                              task.completed && "line-through text-muted"
                            }`}
                          >
                            {task.title}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {task.description}
                          </p>
                        </div>
                        <div className="text-xs bg-muted px-2 py-1 rounded">
                          {task.difficulty}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Stats */}
          <div className="space-y-6">
            {/* Today's Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Today</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Tasks Completed
                  </p>
                  <p className="text-3xl font-bold">3 / 5</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Study Hours
                  </p>
                  <p className="text-3xl font-bold">2.5h</p>
                </div>
              </CardContent>
            </Card>

            {/* Weekly Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">This Week</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Total Hours
                  </p>
                  <p className="text-3xl font-bold">18.5h</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Completion Rate
                  </p>
                  <p className="text-3xl font-bold">87%</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

function toggleTask(taskId: string) {
  // Placeholder for task toggle functionality
  console.log("Toggle task:", taskId);
}
