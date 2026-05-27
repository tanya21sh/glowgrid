'use client';

export const dynamic = 'force-dynamic';

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Zap, ArrowLeft, CheckCircle2, Circle } from "lucide-react";
import toast from "react-hot-toast";

export default function RoadmapDetailPage() {
  const params = useParams();
  const router = useRouter();
  const roadmapId = params.id as string;

  const [roadmap, setRoadmap] = useState<any>(null);
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);

  const userId = "guest-user";

  useEffect(() => {
    fetchRoadmapAndTasks();
  }, [roadmapId]);

  const fetchRoadmapAndTasks = async () => {
    try {
      // Fetch roadmap details with tasks included
      const roadmapResponse = await fetch(`/api/roadmaps/${roadmapId}`);
      if (roadmapResponse.ok) {
        const roadmapData = await roadmapResponse.json();
        setRoadmap(roadmapData);
        setTasks(roadmapData.tasks || []);
      } else {
        toast.error("Failed to load roadmap");
      }
    } catch (error) {
      console.error("Error fetching roadmap:", error);
      toast.error("Failed to load roadmap");
    } finally {
      setLoading(false);
    }
  };

  const toggleTask = async (taskId: string, currentStatus: boolean) => {
    setUpdating(taskId);
    try {
      const response = await fetch("/api/tasks", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: taskId,
          completed: !currentStatus,
        }),
      });

      if (response.ok) {
        const updatedTask = await response.json();
        setTasks(tasks.map(t => t.id === taskId ? updatedTask : t));
        toast.success(!currentStatus ? "Task completed! 🎉" : "Task unmarked");
      }
    } catch (error) {
      console.error("Error updating task:", error);
      toast.error("Failed to update task");
    } finally {
      setUpdating(null);
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

  if (!roadmap) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Roadmap Not Found</CardTitle>
            <CardDescription>
              The roadmap you're looking for doesn't exist or has been deleted.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/dashboard">
              <Button>Back to Dashboard</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const completedCount = tasks.filter(t => t.completed).length;
  const completionPercentage = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/dashboard" className="inline-flex items-center gap-2 text-accent hover:text-accent/80 mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold mb-2">
                {roadmap.company} - {roadmap.role}
              </h1>
              <p className="text-muted-foreground">
                {roadmap.timeline} days preparation roadmap · Level: {roadmap.level}
              </p>
            </div>
            <Badge variant="secondary">{completionPercentage}% Complete</Badge>
          </div>
        </div>

        {/* Progress Bar */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm mb-2">
                <span>Overall Progress</span>
                <span className="font-semibold">{completedCount} / {tasks.length}</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-accent rounded-full h-2 transition-all duration-300"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tasks by Category */}
        <div className="space-y-6">
          {tasks.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <p className="text-muted-foreground mb-4">No tasks in this roadmap yet.</p>
                <Link href="/dashboard">
                  <Button variant="outline">Back to Dashboard</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            tasks.map((task: any) => (
              <Card key={task.id}>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <button
                      onClick={() => toggleTask(task.id, task.completed)}
                      disabled={updating === task.id}
                      className="mt-1 flex-shrink-0 opacity-70 hover:opacity-100 transition"
                    >
                      {task.completed ? (
                        <CheckCircle2 className="w-6 h-6 text-accent" />
                      ) : (
                        <Circle className="w-6 h-6 text-muted" />
                      )}
                    </button>
                    <div className="flex-1">
                      <p
                        className={`font-semibold text-lg ${
                          task.completed && "line-through text-muted"
                        }`}
                      >
                        {task.title}
                      </p>
                      {task.description && (
                        <p className="text-sm text-muted-foreground mt-1">
                          {task.description}
                        </p>
                      )}
                      <div className="flex gap-2 mt-3 flex-wrap">
                        {task.category && (
                          <Badge variant="outline">{task.category}</Badge>
                        )}
                        {task.difficulty && (
                          <Badge
                            variant={task.difficulty === 'hard' ? 'destructive' : task.difficulty === 'medium' ? 'secondary' : 'default'}
                          >
                            {task.difficulty}
                          </Badge>
                        )}
                      </div>
                    </div>
                    {task.estimatedTime && (
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">Est. Time</p>
                        <p className="font-semibold">{task.estimatedTime}m</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
