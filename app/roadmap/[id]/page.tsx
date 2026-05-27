'use client';

export const dynamic = 'force-dynamic';

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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
      <div style={{
        minHeight: '100vh',
        backgroundColor: 'rgb(3, 7, 18)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div style={{ animation: 'spin 1s linear infinite' }}>
          <Zap style={{ width: '40px', height: '40px', color: '#f43f5e' }} />
        </div>
      </div>
    );
  }

  if (!roadmap) {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: 'rgb(3, 7, 18)',
        color: 'rgb(241, 245, 249)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px',
      }}>
        <div style={{
          background: 'rgba(15, 23, 42, 0.8)',
          border: '1px solid rgba(148, 163, 184, 0.2)',
          borderRadius: '12px',
          padding: '40px',
          maxWidth: '500px',
          backdropFilter: 'blur(10px)',
          textAlign: 'center',
        }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>
            Roadmap Not Found
          </h2>
          <p style={{ color: '#cbd5e1', marginBottom: '24px' }}>
            The roadmap you're looking for doesn't exist or has been deleted.
          </p>
          <button
            onClick={() => router.push('/dashboard')}
            style={{
              padding: '12px 24px',
              background: 'linear-gradient(135deg, #f43f5e, #ec4899)',
              border: 'none',
              borderRadius: '8px',
              color: 'white',
              fontWeight: '600',
              cursor: 'pointer',
            }}
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const completedCount = tasks.filter(t => t.completed).length;
  const completionPercentage = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  // Group tasks by category
  const tasksByCategory = tasks.reduce((acc: any, task: any) => {
    const category = task.category || 'Other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(task);
    return acc;
  }, {});

  const categoryOrder = [
    'DSA - Data Structures',
    'System Design',
    'CS Fundamentals',
    'Behavioral',
  ];

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'rgb(3, 7, 18)',
      color: 'rgb(241, 245, 249)',
      padding: '80px 40px 60px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '60px' }}>
          <button
            onClick={() => router.push('/dashboard')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: '#f43f5e',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '500',
              marginBottom: '30px',
              transition: '0.3s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
          >
            <ArrowLeft style={{ width: '18px', height: '18px' }} />
            Back to Dashboard
          </button>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '40px' }}>
            <div>
              <h1 style={{
                fontSize: '56px',
                fontWeight: 'bold',
                marginBottom: '16px',
                background: 'linear-gradient(135deg, #f43f5e 0%, #ec4899 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                {roadmap.company}
              </h1>
              <p style={{
                fontSize: '24px',
                color: '#cbd5e1',
                marginBottom: '8px',
              }}>
                {roadmap.role}
              </p>
              <p style={{
                fontSize: '16px',
                color: '#94a3b8',
                lineHeight: '1.5',
              }}>
                {roadmap.timeline} days preparation · Level: <span style={{ textTransform: 'capitalize', color: '#f1f5f9' }}>{roadmap.level}</span>
              </p>
            </div>
            <div style={{
              background: 'linear-gradient(135deg, rgba(244, 63, 94, 0.2), rgba(236, 72, 153, 0.2))',
              border: '1px solid rgba(244, 63, 94, 0.5)',
              borderRadius: '12px',
              padding: '24px',
              textAlign: 'center',
              minWidth: '150px',
            }}>
              <p style={{ fontSize: '14px', color: '#cbd5e1', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Progress
              </p>
              <p style={{
                fontSize: '48px',
                fontWeight: 'bold',
                background: 'linear-gradient(135deg, #f43f5e 0%, #ec4899 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                {completionPercentage}%
              </p>
            </div>
          </div>
        </div>

        {/* Progress Details */}
        <div style={{
          background: 'rgba(15, 23, 42, 0.6)',
          border: '1px solid rgba(148, 163, 184, 0.2)',
          borderRadius: '12px',
          padding: '24px',
          marginBottom: '60px',
          backdropFilter: 'blur(10px)',
        }}>
          <div style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ fontSize: '14px', color: '#cbd5e1' }}>Overall Progress</span>
              <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#f1f5f9' }}>
                {completedCount} of {tasks.length} tasks
              </span>
            </div>
            <div style={{
              width: '100%',
              height: '8px',
              background: 'rgba(148, 163, 184, 0.1)',
              borderRadius: '4px',
              overflow: 'hidden',
            }}>
              <div
                style={{
                  width: `${completionPercentage}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, #f43f5e, #ec4899)',
                  transition: 'width 0.5s ease-out',
                  boxShadow: '0 0 20px rgba(244, 63, 94, 0.4)',
                }}
              />
            </div>
          </div>
        </div>

        {/* Tasks by Category */}
        {tasks.length === 0 ? (
          <div style={{
            background: 'rgba(15, 23, 42, 0.8)',
            border: '1px solid rgba(148, 163, 184, 0.2)',
            borderRadius: '12px',
            padding: '60px 40px',
            textAlign: 'center',
            backdropFilter: 'blur(10px)',
          }}>
            <p style={{ color: '#cbd5e1', marginBottom: '20px' }}>
              No tasks in this roadmap yet.
            </p>
            <button
              onClick={() => router.push('/dashboard')}
              style={{
                padding: '12px 24px',
                background: 'rgba(244, 63, 94, 0.2)',
                border: '1px solid rgba(244, 63, 94, 0.5)',
                borderRadius: '8px',
                color: '#f43f5e',
                fontWeight: '600',
                cursor: 'pointer',
              }}
            >
              Back to Dashboard
            </button>
          </div>
        ) : (
          <div>
            {categoryOrder.map((category) => {
              const categoryTasks = tasksByCategory[category] || [];
              if (categoryTasks.length === 0) return null;

              const categoryCompleted = categoryTasks.filter((t: any) => t.completed).length;
              const categoryPercentage = Math.round((categoryCompleted / categoryTasks.length) * 100);

              const categoryColors: any = {
                'DSA - Data Structures': { bg: 'rgba(244, 63, 94, 0.1)', border: 'rgba(244, 63, 94, 0.3)', accent: '#f43f5e' },
                'System Design': { bg: 'rgba(168, 85, 247, 0.1)', border: 'rgba(168, 85, 247, 0.3)', accent: '#a855f7' },
                'CS Fundamentals': { bg: 'rgba(59, 130, 246, 0.1)', border: 'rgba(59, 130, 246, 0.3)', accent: '#3b82f6' },
                'Behavioral': { bg: 'rgba(34, 197, 94, 0.1)', border: 'rgba(34, 197, 94, 0.3)', accent: '#22c55e' },
              };

              const colors = categoryColors[category] || { bg: 'rgba(100, 116, 139, 0.1)', border: 'rgba(100, 116, 139, 0.3)', accent: '#64748b' };

              return (
                <div key={category} style={{ marginBottom: '50px' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: '16px',
                    marginBottom: '24px',
                  }}>
                    <h2 style={{
                      fontSize: '24px',
                      fontWeight: 'bold',
                      color: colors.accent,
                    }}>
                      {category}
                    </h2>
                    <span style={{
                      fontSize: '14px',
                      color: '#cbd5e1',
                    }}>
                      {categoryCompleted}/{categoryTasks.length} · {categoryPercentage}%
                    </span>
                  </div>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                    gap: '16px',
                  }}>
                    {categoryTasks.map((task: any) => (
                      <div
                        key={task.id}
                        style={{
                          background: colors.bg,
                          border: `1px solid ${colors.border}`,
                          borderRadius: '12px',
                          padding: '20px',
                          cursor: 'pointer',
                          transition: '0.3s',
                          position: 'relative',
                          overflow: 'hidden',
                        }}
                        onMouseEnter={(e) => {
                          const el = e.currentTarget as HTMLElement;
                          el.style.background = `rgba(${colors.accent === '#f43f5e' ? '244, 63, 94' : colors.accent === '#a855f7' ? '168, 85, 247' : colors.accent === '#3b82f6' ? '59, 130, 246' : '34, 197, 94'}, 0.15)`;
                          el.style.borderColor = colors.accent;
                          el.style.transform = 'translateY(-4px)';
                          el.style.boxShadow = `0 10px 30px ${colors.accent}40`;
                        }}
                        onMouseLeave={(e) => {
                          const el = e.currentTarget as HTMLElement;
                          el.style.background = colors.bg;
                          el.style.borderColor = colors.border;
                          el.style.transform = 'translateY(0)';
                          el.style.boxShadow = 'none';
                        }}
                      >
                        <button
                          onClick={() => toggleTask(task.id, task.completed)}
                          disabled={updating === task.id}
                          style={{
                            background: 'transparent',
                            border: 'none',
                            cursor: updating === task.id ? 'not-allowed' : 'pointer',
                            padding: '0',
                            marginBottom: '12px',
                            display: 'flex',
                            opacity: updating === task.id ? 0.5 : 1,
                          }}
                        >
                          {task.completed ? (
                            <CheckCircle2 style={{ width: '24px', height: '24px', color: colors.accent }} />
                          ) : (
                            <Circle style={{ width: '24px', height: '24px', color: '#64748b' }} />
                          )}
                        </button>

                        <p style={{
                          fontSize: '16px',
                          fontWeight: '600',
                          color: task.completed ? '#94a3b8' : '#f1f5f9',
                          textDecoration: task.completed ? 'line-through' : 'none',
                          marginBottom: '8px',
                          transition: '0.3s',
                        }}>
                          {task.title}
                        </p>

                        {task.description && (
                          <p style={{
                            fontSize: '13px',
                            color: '#cbd5e1',
                            marginBottom: '12px',
                            lineHeight: '1.4',
                          }}>
                            {task.description}
                          </p>
                        )}

                        <div style={{
                          display: 'flex',
                          gap: '8px',
                          flexWrap: 'wrap',
                        }}>
                          {task.difficulty && (
                            <span style={{
                              fontSize: '12px',
                              padding: '4px 8px',
                              background: colors.bg,
                              border: `1px solid ${colors.border}`,
                              borderRadius: '4px',
                              color: colors.accent,
                              textTransform: 'capitalize',
                            }}>
                              {task.difficulty}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
