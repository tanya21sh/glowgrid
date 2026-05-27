'use client';

export const dynamic = 'force-dynamic';

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function RoadmapGeneratorPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    company: "",
    role: "",
    timeline: "30",
    level: "intermediate",
    jdSummary: "",
  });

  const userId = "guest-user";

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    
    // Validation
    if (!formData.company.trim()) {
      toast.error("Please enter target company");
      return;
    }
    if (!formData.role.trim()) {
      toast.error("Please enter target role");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/roadmaps/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          ...formData,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate roadmap");
      }

      const roadmap = await response.json();
      toast.success("Roadmap generated successfully!");
      router.push(`/roadmap/${roadmap.id}`);
    } catch (error) {
      console.error(error);
      toast.error("Failed to generate roadmap");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'rgb(3, 7, 18)',
      color: 'rgb(241, 245, 249)',
      padding: '80px 40px 60px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto'
    }}>
      <div style={{
        maxWidth: '600px',
        margin: '0 auto'
      }}>
        {/* Header */}
        <div style={{ marginBottom: '50px', textAlign: 'center' }}>
          <h1 style={{
            fontSize: '48px',
            fontWeight: 'bold',
            marginBottom: '20px',
            background: 'linear-gradient(135deg, #f43f5e 0%, #ec4899 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Generate Your Roadmap
          </h1>
          <p style={{
            fontSize: '18px',
            color: '#cbd5e1',
            lineHeight: '1.6'
          }}>
            Tell us about your target role and we'll create a personalized preparation plan powered by AI.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{
          background: 'rgba(15, 23, 42, 0.8)',
          border: '1px solid rgba(148, 163, 184, 0.2)',
          borderRadius: '12px',
          padding: '40px',
          backdropFilter: 'blur(10px)'
        }}>
          {/* Target Company */}
          <div style={{ marginBottom: '30px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '600',
              marginBottom: '8px',
              color: '#f1f5f9'
            }}>
              Target Company <span style={{ color: '#f43f5e' }}>*</span>
            </label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="e.g., Google, Microsoft, Amazon"
              style={{
                width: '100%',
                padding: '12px 16px',
                backgroundColor: 'rgba(15, 23, 42, 0.6)',
                border: '1px solid rgba(148, 163, 184, 0.3)',
                borderRadius: '8px',
                color: '#f1f5f9',
                fontSize: '16px',
                outline: 'none',
                transition: '0.3s',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = '#f43f5e';
                e.currentTarget.style.backgroundColor = 'rgba(15, 23, 42, 0.8)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'rgba(148, 163, 184, 0.3)';
                e.currentTarget.style.backgroundColor = 'rgba(15, 23, 42, 0.6)';
              }}
            />
          </div>

          {/* Target Role */}
          <div style={{ marginBottom: '30px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '600',
              marginBottom: '8px',
              color: '#f1f5f9'
            }}>
              Target Role <span style={{ color: '#f43f5e' }}>*</span>
            </label>
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              placeholder="e.g., Software Engineer, Senior Developer"
              style={{
                width: '100%',
                padding: '12px 16px',
                backgroundColor: 'rgba(15, 23, 42, 0.6)',
                border: '1px solid rgba(148, 163, 184, 0.3)',
                borderRadius: '8px',
                color: '#f1f5f9',
                fontSize: '16px',
                outline: 'none',
                transition: '0.3s',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = '#f43f5e';
                e.currentTarget.style.backgroundColor = 'rgba(15, 23, 42, 0.8)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'rgba(148, 163, 184, 0.3)';
                e.currentTarget.style.backgroundColor = 'rgba(15, 23, 42, 0.6)';
              }}
            />
          </div>

          {/* Preparation Timeline */}
          <div style={{ marginBottom: '30px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '600',
              marginBottom: '8px',
              color: '#f1f5f9'
            }}>
              Preparation Timeline <span style={{ color: '#f43f5e' }}>*</span>
            </label>
            <select
              name="timeline"
              value={formData.timeline}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '12px 16px',
                backgroundColor: 'rgba(15, 23, 42, 0.6)',
                border: '1px solid rgba(148, 163, 184, 0.3)',
                borderRadius: '8px',
                color: '#f1f5f9',
                fontSize: '16px',
                outline: 'none',
                cursor: 'pointer',
                transition: '0.3s',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = '#f43f5e';
                e.currentTarget.style.backgroundColor = 'rgba(15, 23, 42, 0.8)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'rgba(148, 163, 184, 0.3)';
                e.currentTarget.style.backgroundColor = 'rgba(15, 23, 42, 0.6)';
              }}
            >
              <option value="15">15 Days</option>
              <option value="30">30 Days</option>
              <option value="60">60 Days</option>
              <option value="90">90 Days</option>
            </select>
          </div>

          {/* Current Skill Level */}
          <div style={{ marginBottom: '30px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '600',
              marginBottom: '8px',
              color: '#f1f5f9'
            }}>
              Current Skill Level <span style={{ color: '#f43f5e' }}>*</span>
            </label>
            <select
              name="level"
              value={formData.level}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '12px 16px',
                backgroundColor: 'rgba(15, 23, 42, 0.6)',
                border: '1px solid rgba(148, 163, 184, 0.3)',
                borderRadius: '8px',
                color: '#f1f5f9',
                fontSize: '16px',
                outline: 'none',
                cursor: 'pointer',
                transition: '0.3s',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = '#f43f5e';
                e.currentTarget.style.backgroundColor = 'rgba(15, 23, 42, 0.8)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'rgba(148, 163, 184, 0.3)';
                e.currentTarget.style.backgroundColor = 'rgba(15, 23, 42, 0.6)';
              }}
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>

          {/* Job Description (Optional) */}
          <div style={{ marginBottom: '40px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '600',
              marginBottom: '8px',
              color: '#f1f5f9'
            }}>
              Job Description (Optional)
            </label>
            <textarea
              name="jdSummary"
              value={formData.jdSummary}
              onChange={handleChange}
              placeholder="Paste the job description here for a more tailored roadmap..."
              rows={6}
              style={{
                width: '100%',
                padding: '12px 16px',
                backgroundColor: 'rgba(15, 23, 42, 0.6)',
                border: '1px solid rgba(148, 163, 184, 0.3)',
                borderRadius: '8px',
                color: '#f1f5f9',
                fontSize: '16px',
                outline: 'none',
                transition: '0.3s',
                boxSizing: 'border-box',
                fontFamily: 'inherit',
                resize: 'vertical'
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = '#f43f5e';
                e.currentTarget.style.backgroundColor = 'rgba(15, 23, 42, 0.8)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'rgba(148, 163, 184, 0.3)';
                e.currentTarget.style.backgroundColor = 'rgba(15, 23, 42, 0.6)';
              }}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '16px',
              background: loading 
                ? 'rgba(244, 63, 94, 0.5)' 
                : 'linear-gradient(135deg, #f43f5e, #ec4899)',
              border: 'none',
              borderRadius: '8px',
              color: 'white',
              fontSize: '16px',
              fontWeight: '700',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: '0.3s',
              boxShadow: '0 10px 25px rgba(244, 63, 94, 0.2)'
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 15px 35px rgba(244, 63, 94, 0.3)';
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 25px rgba(244, 63, 94, 0.2)';
              }
            }}
          >
            {loading ? 'Generating...' : 'Generate Roadmap'}
          </button>
        </form>
      </div>
    </div>
  );
}
