'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Bell, Moon, Target } from "lucide-react";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState({
    name: 'Guest User',
    email: 'guest-user@glowgrid.local',
    targetRole: 'Software Engineer',
    targetCompanies: 'Google, Microsoft, Amazon',
    currentLevel: 'intermediate',
    timePerDay: '2',
    preferredTopics: 'DSA, System Design',
    notifications: true,
    darkMode: true,
    emailDigest: 'weekly',
  });

  const [saving, setSaving] = useState(false);
  const [changes, setChanges] = useState(false);

  const handleInputChange = (field: string, value: any) => {
    setProfile(prev => ({ ...prev, [field]: value }));
    setChanges(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Simulate saving
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Profile updated successfully! ✅');
      setChanges(false);
    } catch (error) {
      toast.error('Failed to save profile');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'rgb(3, 7, 18)',
      color: 'rgb(241, 245, 249)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto',
      padding: '40px',
    }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
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

        <h1 style={{
          fontSize: '44px',
          fontWeight: 'bold',
          marginBottom: '40px',
          color: '#f1f5f9',
        }}>
          👤 Profile Settings
        </h1>

        {/* Profile Sections */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', gap: '30px', marginBottom: '50px' }}>
          {/* Basic Info */}
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
              marginBottom: '24px',
              color: '#f1f5f9',
            }}>
              Basic Information
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  marginBottom: '8px',
                  color: '#cbd5e1',
                }}>
                  Full Name
                </label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    backgroundColor: 'rgba(15, 23, 42, 0.6)',
                    border: '1px solid rgba(148, 163, 184, 0.3)',
                    borderRadius: '8px',
                    color: '#f1f5f9',
                    fontSize: '14px',
                    outline: 'none',
                    transition: '0.3s',
                    boxSizing: 'border-box',
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

              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  marginBottom: '8px',
                  color: '#cbd5e1',
                }}>
                  Email
                </label>
                <input
                  type="email"
                  value={profile.email}
                  disabled
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    backgroundColor: 'rgba(15, 23, 42, 0.4)',
                    border: '1px solid rgba(148, 163, 184, 0.2)',
                    borderRadius: '8px',
                    color: '#94a3b8',
                    fontSize: '14px',
                    opacity: 0.6,
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  marginBottom: '8px',
                  color: '#cbd5e1',
                }}>
                  Current Skill Level
                </label>
                <select
                  value={profile.currentLevel}
                  onChange={(e) => handleInputChange('currentLevel', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    backgroundColor: 'rgba(15, 23, 42, 0.6)',
                    border: '1px solid rgba(148, 163, 184, 0.3)',
                    borderRadius: '8px',
                    color: '#f1f5f9',
                    fontSize: '14px',
                    cursor: 'pointer',
                    outline: 'none',
                    transition: '0.3s',
                    boxSizing: 'border-box',
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
            </div>
          </div>

          {/* Interview Goals */}
          <div style={{
            background: 'rgba(15, 23, 42, 0.8)',
            border: '1px solid rgba(148, 163, 184, 0.2)',
            borderRadius: '12px',
            padding: '30px',
            backdropFilter: 'blur(10px)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <Target style={{ width: '24px', height: '24px', color: '#f43f5e' }} />
              <h2 style={{
                fontSize: '20px',
                fontWeight: 'bold',
                color: '#f1f5f9',
                margin: 0,
              }}>
                Interview Goals
              </h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  marginBottom: '8px',
                  color: '#cbd5e1',
                }}>
                  Target Role
                </label>
                <input
                  type="text"
                  value={profile.targetRole}
                  onChange={(e) => handleInputChange('targetRole', e.target.value)}
                  placeholder="e.g., Senior Software Engineer"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    backgroundColor: 'rgba(15, 23, 42, 0.6)',
                    border: '1px solid rgba(148, 163, 184, 0.3)',
                    borderRadius: '8px',
                    color: '#f1f5f9',
                    fontSize: '14px',
                    outline: 'none',
                    transition: '0.3s',
                    boxSizing: 'border-box',
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

              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  marginBottom: '8px',
                  color: '#cbd5e1',
                }}>
                  Target Companies (comma-separated)
                </label>
                <textarea
                  value={profile.targetCompanies}
                  onChange={(e) => handleInputChange('targetCompanies', e.target.value)}
                  placeholder="e.g., Google, Meta, Apple"
                  rows={3}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    backgroundColor: 'rgba(15, 23, 42, 0.6)',
                    border: '1px solid rgba(148, 163, 184, 0.3)',
                    borderRadius: '8px',
                    color: '#f1f5f9',
                    fontSize: '14px',
                    outline: 'none',
                    transition: '0.3s',
                    boxSizing: 'border-box',
                    fontFamily: 'inherit',
                    resize: 'vertical',
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

              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  marginBottom: '8px',
                  color: '#cbd5e1',
                }}>
                  Daily Study Time (hours)
                </label>
                <input
                  type="number"
                  value={profile.timePerDay}
                  onChange={(e) => handleInputChange('timePerDay', e.target.value)}
                  min="0.5"
                  max="12"
                  step="0.5"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    backgroundColor: 'rgba(15, 23, 42, 0.6)',
                    border: '1px solid rgba(148, 163, 184, 0.3)',
                    borderRadius: '8px',
                    color: '#f1f5f9',
                    fontSize: '14px',
                    outline: 'none',
                    transition: '0.3s',
                    boxSizing: 'border-box',
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
            </div>
          </div>
        </div>

        {/* Preferences Section */}
        <div style={{
          background: 'rgba(15, 23, 42, 0.8)',
          border: '1px solid rgba(148, 163, 184, 0.2)',
          borderRadius: '12px',
          padding: '30px',
          backdropFilter: 'blur(10px)',
          marginBottom: '50px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <Bell style={{ width: '24px', height: '24px', color: '#f43f5e' }} />
            <h2 style={{
              fontSize: '20px',
              fontWeight: 'bold',
              color: '#f1f5f9',
              margin: 0,
            }}>
              Preferences
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {/* Notifications Toggle */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <div>
                <div style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#f1f5f9',
                  marginBottom: '4px',
                }}>
                  Push Notifications
                </div>
                <div style={{
                  fontSize: '14px',
                  color: '#94a3b8',
                }}>
                  Get reminders for study sessions
                </div>
              </div>
              <label style={{
                position: 'relative',
                display: 'inline-block',
                width: '60px',
                height: '34px',
              }}>
                <input
                  type="checkbox"
                  checked={profile.notifications}
                  onChange={(e) => handleInputChange('notifications', e.target.checked)}
                  style={{
                    opacity: 0,
                    width: 0,
                    height: 0,
                  }}
                />
                <span
                  style={{
                    position: 'absolute',
                    cursor: 'pointer',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: profile.notifications ? '#f43f5e' : '#475569',
                    transition: '0.3s',
                    borderRadius: '34px',
                  }}
                >
                  <span
                    style={{
                      position: 'absolute',
                      content: '""',
                      height: '26px',
                      width: '26px',
                      left: profile.notifications ? '31px' : '4px',
                      bottom: '4px',
                      backgroundColor: 'white',
                      transition: '0.3s',
                      borderRadius: '50%',
                    }}
                  />
                </span>
              </label>
            </div>

            {/* Email Digest */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '16px',
                fontWeight: '600',
                marginBottom: '8px',
                color: '#f1f5f9',
              }}>
                Email Digest
              </label>
              <select
                value={profile.emailDigest}
                onChange={(e) => handleInputChange('emailDigest', e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  backgroundColor: 'rgba(15, 23, 42, 0.6)',
                  border: '1px solid rgba(148, 163, 184, 0.3)',
                  borderRadius: '6px',
                  color: '#f1f5f9',
                  fontSize: '14px',
                  cursor: 'pointer',
                  outline: 'none',
                  transition: '0.3s',
                }}
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="none">Never</option>
              </select>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          disabled={!changes || saving}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '14px 32px',
            background: changes ? 'linear-gradient(135deg, #f43f5e, #ec4899)' : 'rgba(148, 163, 184, 0.2)',
            border: 'none',
            borderRadius: '8px',
            color: 'white',
            fontWeight: '700',
            fontSize: '16px',
            cursor: changes ? 'pointer' : 'not-allowed',
            opacity: changes ? 1 : 0.5,
            transition: '0.3s',
          }}
          onMouseEnter={(e) => {
            if (changes && !saving) {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 10px 25px rgba(244, 63, 94, 0.3)';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <Save style={{ width: '18px', height: '18px' }} />
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
}
