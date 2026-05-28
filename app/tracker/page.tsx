'use client';

export const dynamic = 'force-dynamic';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, TrendingUp, Calendar, Target, Zap } from "lucide-react";
import toast from "react-hot-toast";

export default function TrackerPage() {
  const router = useRouter();
  const [roadmap, setRoadmap] = useState<any>(null);
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    completionPercentage: 0,
    daysLeft: 30,
    tasksPerDay: 0,
    dailyProgress: [] as any[],
  });

  const userId = "guest-user";

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const roadmapResponse = await fetch(`/api/dashboard?userId=${userId}`);
      if (roadmapResponse.ok) {
        const roadmapData = await roadmapResponse.json();
        setRoadmap(roadmapData);

        const tasksResponse = await fetch(`/api/roadmaps/${roadmapData.id}`);
        if (tasksResponse.ok) {
          const roadmapTasks = await tasksResponse.json();
          setTasks(roadmapTasks.tasks || []);

          const completed = (roadmapTasks.tasks || []).filter((t: any) => t.completed).length;
          const total = (roadmapTasks.tasks || []).length;
          const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
          const daysLeft = Math.max(0, parseInt(roadmapData.timeline) - 5);
          const tasksPerDay = total > 0 && daysLeft > 0 ? Math.ceil(total / daysLeft) : 0;

          setStats({
            totalTasks: total,
            completedTasks: completed,
            completionPercentage: percentage,
            daysLeft,
            tasksPerDay,
            dailyProgress: generateDailyProgress(completed, total, daysLeft),
          });
        }
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to load tracker data");
    } finally {
      setLoading(false);
    }
  };

  const generateDailyProgress = (completed: number, total: number, days: number) => {
    const progress = [];
    for (let i = 0; i < 7; i++) {
      const randomCompleted = Math.random() * (i + 1) * (completed / Math.max(1, days));
      progress.push({
        day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
        count: Math.floor(randomCompleted),
      });
    }
    return progress;
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
        <div style={{ animation: 'spin 1s linear infinite' }}>⚡</div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'rgb(3, 7, 18)',
      color: 'rgb(241, 245, 249)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto',
      padding: '40px',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <button
          onClick={() => router.back()}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '40px',
            padding: '8px 0',
            background: 'transparent',
            border: 'none',
            color: '#f43f5e',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: '500',
          }}
        >
          <ArrowLeft style={{ width: '18px', height: '18px' }} />
          Back
        </button>

        <div style={{ marginBottom: '50px' }}>
          <h1 style={{
            fontSize: '44px',
            fontWeight: 'bold',
            marginBottom: '12px',
            color: '#f1f5f9',
          }}>
            📊 Your Progress Tracker
          </h1>
          <p style={{
            fontSize: '18px',
            color: '#cbd5e1',
          }}>
            {roadmap?.company} - {roadmap?.role}
          </p>
        </div>

        {/* Key Metrics */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '24px',
          marginBottom: '50px',
        }}>
          {/* Overall Progress */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(244, 63, 94, 0.1), rgba(236, 72, 153, 0.1))',
            border: '1px solid rgba(244, 63, 94, 0.3)',
            borderRadius: '12px',
            padding: '30px',
            backdropFilter: 'blur(10px)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{ fontSize: '24px' }}>🎯</div>
              <span style={{ fontSize: '14px', color: '#cbd5e1', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Overall Progress
              </span>
            </div>
            <div style={{
              fontSize: '48px',
              fontWeight: 'bold',
              color: '#f43f5e',
              marginBottom: '12px',
            }}>
              {stats.completionPercentage}%
            </div>
            <div style={{ fontSize: '14px', color: '#94a3b8' }}>
              {stats.completedTasks} of {stats.totalTasks} tasks completed
            </div>
          </div>

          {/* Days Remaining */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(59, 130, 246, 0.1))',
            border: '1px solid rgba(59, 130, 246, 0.3)',
            borderRadius: '12px',
            padding: '30px',
            backdropFilter: 'blur(10px)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <Calendar style={{ width: '24px', height: '24px', color: '#3b82f6' }} />
              <span style={{ fontSize: '14px', color: '#cbd5e1', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Days Left
              </span>
            </div>
            <div style={{
              fontSize: '48px',
              fontWeight: 'bold',
              color: '#3b82f6',
              marginBottom: '12px',
            }}>
              {stats.daysLeft}
            </div>
            <div style={{ fontSize: '14px', color: '#94a3b8' }}>
              Out of {roadmap?.timeline} days total
            </div>
          </div>

          {/* Daily Target */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.1), rgba(168, 85, 247, 0.1))',
            border: '1px solid rgba(168, 85, 247, 0.3)',
            borderRadius: '12px',
            padding: '30px',
            backdropFilter: 'blur(10px)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <Target style={{ width: '24px', height: '24px', color: '#a855f7' }} />
              <span style={{ fontSize: '14px', color: '#cbd5e1', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Daily Target
              </span>
            </div>
            <div style={{
              fontSize: '48px',
              fontWeight: 'bold',
              color: '#a855f7',
              marginBottom: '12px',
            }}>
              {stats.tasksPerDay}
            </div>
            <div style={{ fontSize: '14px', color: '#94a3b8' }}>
              Tasks per day to stay on track
            </div>
          </div>

          {/* Completion Rate */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(34, 197, 94, 0.1))',
            border: '1px solid rgba(34, 197, 94, 0.3)',
            borderRadius: '12px',
            padding: '30px',
            backdropFilter: 'blur(10px)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <TrendingUp style={{ width: '24px', height: '24px', color: '#22c55e' }} />
              <span style={{ fontSize: '14px', color: '#cbd5e1', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                On Track
              </span>
            </div>
            <div style={{
              fontSize: '48px',
              fontWeight: 'bold',
              color: stats.completionPercentage >= 70 ? '#22c55e' : stats.completionPercentage >= 40 ? '#f59e0b' : '#ef4444',
              marginBottom: '12px',
            }}>
              {stats.completionPercentage >= 70 ? '✅' : stats.completionPercentage >= 40 ? '⚠️' : '❌'}
            </div>
            <div style={{ fontSize: '14px', color: '#94a3b8' }}>
              {stats.completionPercentage >= 70 ? 'Great pace!' : stats.completionPercentage >= 40 ? 'Keep pushing!' : 'Need to catch up!'}
            </div>
          </div>
        </div>

        {/* Weekly Activity Chart */}
        <div style={{
          background: 'rgba(15, 23, 42, 0.8)',
          border: '1px solid rgba(148, 163, 184, 0.2)',
          borderRadius: '12px',
          padding: '30px',
          backdropFilter: 'blur(10px)',
          marginBottom: '50px',
        }}>
          <h2 style={{
            fontSize: '20px',
            fontWeight: 'bold',
            marginBottom: '30px',
            color: '#f1f5f9',
          }}>
            📈 Weekly Activity
          </h2>

          <div style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-around',
            height: '200px',
            gap: '12px',
          }}>
            {stats.dailyProgress.map((day, idx) => (
              <div key={idx} style={{ textAlign: 'center' }}>
                <div style={{
                  width: '40px',
                  height: `${(day.count / Math.max(...stats.dailyProgress.map((d: any) => d.count), 1)) * 150 + 20}px`,
                  background: 'linear-gradient(180deg, #f43f5e, #ec4899)',
                  borderRadius: '8px 8px 0 0',
                  marginBottom: '12px',
                  transition: '0.3s',
                  cursor: 'pointer',
                }} 
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = '0.8';
                  e.currentTarget.style.transform = 'scaleY(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = '1';
                  e.currentTarget.style.transform = 'scaleY(1)';
                }}
                />
                <div style={{ fontSize: '13px', color: '#cbd5e1', fontWeight: '500' }}>
                  {day.day}
                </div>
                <div style={{ fontSize: '12px', color: '#94a3b8' }}>
                  {day.count} tasks
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Task Breakdown */}
        <div style={{
          background: 'rgba(15, 23, 42, 0.8)',
          border: '1px solid rgba(148, 163, 184, 0.2)',
          borderRadius: '12px',
          padding: '30px',
          backdropFilter: 'blur(10px)',
        }}>
          <h2 style={{
            fontSize: '20px',
            fontWeight: 'bold',
            marginBottom: '30px',
            color: '#f1f5f9',
          }}>
            ✅ Task Breakdown by Category
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {['DSA - Data Structures', 'System Design', 'CS Fundamentals', 'Behavioral'].map((category) => {
              const categoryTasks = tasks.filter(t => t.category === category);
              const completed = categoryTasks.filter(t => t.completed).length;
              const percentage = categoryTasks.length > 0 ? Math.round((completed / categoryTasks.length) * 100) : 0;

              const colors: any = {
                'DSA - Data Structures': { accent: '#f43f5e', light: 'rgba(244, 63, 94, 0.1)' },
                'System Design': { accent: '#a855f7', light: 'rgba(168, 85, 247, 0.1)' },
                'CS Fundamentals': { accent: '#3b82f6', light: 'rgba(59, 130, 246, 0.1)' },
                'Behavioral': { accent: '#22c55e', light: 'rgba(34, 197, 94, 0.1)' },
              };

              const color = colors[category];

              return (
                <div key={category} style={{
                  background: color.light,
                  border: `1px solid ${color.accent}40`,
                  borderRadius: '12px',
                  padding: '20px',
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '12px',
                  }}>
                    <div>
                      <div style={{ fontSize: '16px', fontWeight: '600', color: '#f1f5f9', marginBottom: '4px' }}>
                        {category}
                      </div>
                      <div style={{ fontSize: '13px', color: '#cbd5e1' }}>
                        {completed} of {categoryTasks.length} tasks
                      </div>
                    </div>
                    <div style={{
                      fontSize: '24px',
                      fontWeight: 'bold',
                      color: color.accent,
                    }}>
                      {percentage}%
                    </div>
                  </div>

                  <div style={{
                    width: '100%',
                    height: '8px',
                    backgroundColor: 'rgba(148, 163, 184, 0.1)',
                    borderRadius: '4px',
                    overflow: 'hidden',
                  }}>
                    <div
                      style={{
                        width: `${percentage}%`,
                        height: '100%',
                        backgroundColor: color.accent,
                        transition: 'width 0.5s ease-out',
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
