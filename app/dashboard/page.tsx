// Dynamic rendering to avoid Clerk context errors during static export
'use client';

export const dynamic = 'force-dynamic';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Plus } from "lucide-react";
import toast from "react-hot-toast";

export default function DashboardPage() {
  const router = useRouter();
  const [roadmap, setRoadmap] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const userId = "guest-user";

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const roadmapResponse = await fetch(`/api/dashboard?userId=${userId}`);
      if (roadmapResponse.ok) {
        const roadmapData = await roadmapResponse.json();
        setRoadmap(roadmapData);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      toast.error("Failed to load roadmap");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'rgb(3, 7, 18)',
      color: 'rgb(241, 245, 249)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto',
    }}>
      {/* Navigation */}
      <header style={{
        borderBottom: '1px solid rgba(148, 163, 184, 0.1)',
        backgroundColor: 'rgba(15, 23, 42, 0.8)',
        backdropFilter: 'blur(10px)',
        padding: '20px 40px',
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <h1 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#f1f5f9',
          }}>
            GlowGrid
          </h1>
          <button
            onClick={() => router.push('/roadmap-generator')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 20px',
              background: 'linear-gradient(135deg, #f43f5e, #ec4899)',
              border: 'none',
              borderRadius: '8px',
              color: 'white',
              fontWeight: '600',
              cursor: 'pointer',
              transition: '0.3s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 10px 25px rgba(244, 63, 94, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <Plus style={{ width: '18px', height: '18px' }} />
            New Roadmap
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '60px 40px',
      }}>
        {loading ? (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '400px',
          }}>
            <div style={{ animation: 'spin 1s linear infinite' }}>
              <div style={{
                width: '40px',
                height: '40px',
                color: '#f43f5e',
              }}>⚡</div>
            </div>
          </div>
        ) : roadmap ? (
          <div>
            <h2 style={{
              fontSize: '32px',
              fontWeight: 'bold',
              marginBottom: '40px',
              color: '#f1f5f9',
            }}>
              Your Roadmaps
            </h2>

            <div
              style={{
                background: 'rgba(15, 23, 42, 0.8)',
                border: '1px solid rgba(148, 163, 184, 0.2)',
                borderRadius: '12px',
                padding: '30px',
                backdropFilter: 'blur(10px)',
                cursor: 'pointer',
                transition: '0.3s',
              }}
              onClick={() => router.push(`/roadmap/${roadmap.id}`)}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = '#f43f5e';
                el.style.background = 'rgba(244, 63, 94, 0.05)';
                el.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = 'rgba(148, 163, 184, 0.2)';
                el.style.background = 'rgba(15, 23, 42, 0.8)';
                el.style.transform = 'translateY(0)';
              }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '20px',
              }}>
                <div>
                  <h3 style={{
                    fontSize: '24px',
                    fontWeight: 'bold',
                    marginBottom: '8px',
                    color: '#f1f5f9',
                  }}>
                    {roadmap.company} - {roadmap.role}
                  </h3>
                  <p style={{
                    fontSize: '16px',
                    color: '#cbd5e1',
                  }}>
                    {roadmap.timeline} day preparation • Level: {roadmap.level}
                  </p>
                </div>
                <div style={{
                  background: 'rgba(244, 63, 94, 0.1)',
                  border: '1px solid rgba(244, 63, 94, 0.3)',
                  borderRadius: '8px',
                  padding: '8px 16px',
                  color: '#f43f5e',
                  fontSize: '14px',
                  fontWeight: '600',
                }}>
                  Active
                </div>
              </div>

              <button
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginTop: '20px',
                  padding: '12px 24px',
                  background: 'linear-gradient(135deg, #f43f5e, #ec4899)',
                  border: 'none',
                  borderRadius: '8px',
                  color: 'white',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: '0.3s',
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(`/roadmap/${roadmap.id}`);
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 10px 25px rgba(244, 63, 94, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                View Roadmap
                <ArrowRight style={{ width: '18px', height: '18px' }} />
              </button>
            </div>
          </div>
        ) : (
          <div style={{
            textAlign: 'center',
            padding: '80px 40px',
          }}>
            <h2 style={{
              fontSize: '32px',
              fontWeight: 'bold',
              marginBottom: '16px',
              color: '#f1f5f9',
            }}>
              No Roadmaps Yet
            </h2>
            <p style={{
              fontSize: '18px',
              color: '#cbd5e1',
              marginBottom: '32px',
            }}>
              Create your first interview preparation roadmap to get started.
            </p>
            <button
              onClick={() => router.push('/roadmap-generator')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '14px 28px',
                background: 'linear-gradient(135deg, #f43f5e, #ec4899)',
                border: 'none',
                borderRadius: '8px',
                color: 'white',
                fontWeight: '600',
                fontSize: '16px',
                cursor: 'pointer',
                transition: '0.3s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 10px 25px rgba(244, 63, 94, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <Plus style={{ width: '20px', height: '20px' }} />
              Create Roadmap
            </button>
          </div>
        )}
      </main>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
