'use client';

import { useState, useEffect } from 'react';

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    { icon: '🎯', title: 'AI Roadmaps', desc: 'Custom interview prep plans generated just for you' },
    { icon: '📊', title: 'Live Analytics', desc: 'Track progress with real-time insights & metrics' },
    { icon: '💬', title: 'Mock Interviews', desc: 'AI-powered practice with instant feedback' },
    { icon: '📚', title: 'Study Resources', desc: 'Curated materials for all interview types' },
    { icon: '⏰', title: 'Smart Scheduling', desc: 'AI-optimized study plan that adapts to you' },
    { icon: '🎁', title: 'Weekly Goals', desc: 'Stay motivated with achievable milestones' },
    { icon: '🔍', title: 'Weak Areas', desc: 'AI identifies gaps and recommends practice' },
    { icon: '✅', title: 'Interview Checklist', desc: 'Complete prep with our verification system' },
  ];

  const pricingPlans = [
    { name: 'Starter', price: 'Free', features: ['Basic roadmap generation', '5 mock interviews/month', 'Community access'] },
    { name: 'Pro', price: '$29/mo', features: ['Unlimited roadmaps', 'Unlimited mock interviews', 'Priority support', 'Advanced analytics', 'PDF export'], highlight: true },
    { name: 'Enterprise', price: 'Custom', features: ['Everything in Pro', 'Team management', 'Dedicated support', 'Custom integrations'] },
  ];

  return (
    <div style={{ backgroundColor: '#0f172a', color: '#f1f5f9', minHeight: '100vh', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto' }}>
      {/* Animated Background */}
      <div style={{ position: 'fixed', inset: 0, zIndex: -1 }}>
        <div style={{
          position: 'absolute', top: '-40%', right: '-40%', width: '600px', height: '600px',
          background: 'radial-gradient(circle, rgba(244, 63, 94, 0.1) 0%, transparent 70%)',
          borderRadius: '50%', filter: 'blur(80px)', animation: 'float 20s ease-in-out infinite'
        }} />
        <div style={{
          position: 'absolute', bottom: '-40%', left: '-40%', width: '500px', height: '500px',
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.1) 0%, transparent 70%)',
          borderRadius: '50%', filter: 'blur(80px)', animation: 'float 20s ease-in-out infinite 5s'
        }} />
      </div>

      <style>{`
        @keyframes float { 0%, 100% { transform: translateY(0px) translateX(0px); } 50% { transform: translateY(-60px) translateX(30px); } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        .animate-in { animation: slideUp 0.8s ease-out; }
      `}</style>

      {/* Navigation */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 40,
        background: scrolled ? 'rgba(15, 23, 42, 0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(148, 163, 184, 0.1)' : 'none',
        padding: '20px 40px',
        transition: 'all 0.3s'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: '28px', fontWeight: 'bold', background: 'linear-gradient(135deg, #f43f5e, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            ✨ GlowGrid
          </div>
          <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
            <a href="#features" style={{ color: '#cbd5e1', textDecoration: 'none', cursor: 'pointer', transition: '0.3s' }} onMouseEnter={(e) => (e.target as HTMLElement).style.color = '#f43f5e'} onMouseLeave={(e) => (e.target as HTMLElement).style.color = '#cbd5e1'}>Features</a>
            <a href="#pricing" style={{ color: '#cbd5e1', textDecoration: 'none', cursor: 'pointer', transition: '0.3s' }} onMouseEnter={(e) => (e.target as HTMLElement).style.color = '#f43f5e'} onMouseLeave={(e) => (e.target as HTMLElement).style.color = '#cbd5e1'}>Pricing</a>
            <button style={{ background: 'linear-gradient(135deg, #f43f5e, #ec4899)', border: 'none', color: 'white', padding: '10px 24px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', transition: '0.3s', boxShadow: '0 4px 15px rgba(244, 63, 94, 0.3)' }} onMouseEnter={(e) => (e.target as HTMLElement).style.transform = 'translateY(-2px)'} onMouseLeave={(e) => (e.target as HTMLElement).style.transform = 'translateY(0)'}>
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{ paddingTop: '160px', paddingBottom: '120px', maxWidth: '1200px', margin: '0 auto', padding: '160px 40px 120px' }}>
        <div className="animate-in" style={{ textAlign: 'center' }}>
          <div style={{ display: 'inline-block', background: 'rgba(244, 63, 94, 0.1)', border: '1px solid rgba(244, 63, 94, 0.3)', borderRadius: '50px', padding: '12px 24px', marginBottom: '30px', fontSize: '14px', color: '#f43f5e', fontWeight: '600' }}>
            🚀 AI-Powered Interview Prep (BETA)
          </div>
          <h1 style={{ fontSize: '72px', fontWeight: '900', lineHeight: '1.2', marginBottom: '30px', background: 'linear-gradient(135deg, #f43f5e 0%, #ec4899 50%, #a855f7 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            Land Your Dream Job
          </h1>
          <p style={{ fontSize: '20px', color: '#cbd5e1', maxWidth: '700px', margin: '0 auto 50px', lineHeight: '1.8' }}>
            Master any interview with AI-powered prep. Personalized roadmaps, real-time feedback, and expert guidance—all in one place.
          </p>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button style={{ background: 'linear-gradient(135deg, #f43f5e, #ec4899)', border: 'none', color: 'white', padding: '16px 40px', borderRadius: '8px', fontSize: '16px', fontWeight: '700', cursor: 'pointer', transition: '0.3s', boxShadow: '0 20px 40px rgba(244, 63, 94, 0.3)' }} onMouseEnter={(e) => (e.target as HTMLElement).style.transform = 'translateY(-3px)'} onMouseLeave={(e) => (e.target as HTMLElement).style.transform = 'translateY(0)'}>
              Start Free Trial
            </button>
            <button style={{ background: 'transparent', border: '2px solid #f43f5e', color: '#f43f5e', padding: '14px 40px', borderRadius: '8px', fontSize: '16px', fontWeight: '700', cursor: 'pointer', transition: '0.3s' }} onMouseEnter={(e) => { (e.target as HTMLElement).style.background = 'rgba(244, 63, 94, 0.1)'; (e.target as HTMLElement).style.transform = 'translateY(-3px)'; }} onMouseLeave={(e) => { (e.target as HTMLElement).style.background = 'transparent'; (e.target as HTMLElement).style.transform = 'translateY(0)'; }}>
              Watch Demo
            </button>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '40px', maxWidth: '800px', margin: '100px auto 0', paddingTop: '60px', borderTop: '1px solid rgba(148, 163, 184, 0.1)' }}>
          {[{ num: '10K+', label: 'Students' }, { num: '95%', label: 'Success Rate' }, { num: '4.9★', label: 'Rating' }].map((stat, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '36px', fontWeight: '900', color: '#f43f5e', marginBottom: '8px' }}>{stat.num}</div>
              <div style={{ fontSize: '14px', color: '#94a3b8' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" style={{ padding: '120px 40px', background: 'linear-gradient(180deg, transparent, rgba(244, 63, 94, 0.05))' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <h2 style={{ fontSize: '48px', fontWeight: '900', marginBottom: '20px', background: 'linear-gradient(135deg, #f43f5e, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Why GlowGrid is Different
            </h2>
            <p style={{ fontSize: '18px', color: '#cbd5e1', maxWidth: '600px', margin: '0 auto' }}>
              Everything you need to crush your interviews and land that offer 💪
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
            {features.map((feature, i) => (
              <div key={i}
                style={{
                  background: activeFeature === i ? 'rgba(244, 63, 94, 0.1)' : 'rgba(30, 41, 59, 0.6)',
                  border: activeFeature === i ? '1px solid rgba(244, 63, 94, 0.5)' : '1px solid rgba(148, 163, 184, 0.1)',
                  borderRadius: '12px',
                  padding: '30px',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  backdropFilter: 'blur(10px)'
                }}
                onMouseEnter={() => setActiveFeature(i)}
              >
                <div style={{ fontSize: '40px', marginBottom: '15px' }}>{feature.icon}</div>
                <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '10px', color: '#f1f5f9' }}>{feature.title}</h3>
                <p style={{ color: '#cbd5e1', fontSize: '14px', lineHeight: '1.6' }}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section style={{ padding: '120px 40px', background: 'rgba(15, 23, 42, 0.5)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '48px', fontWeight: '900', marginBottom: '80px', textAlign: 'center', background: 'linear-gradient(135deg, #f43f5e, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            5 Steps to Success
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '30px' }}>
            {[
              { step: '1', title: 'Tell Us Your Target', emoji: '🎯' },
              { step: '2', title: 'Get AI Roadmap', emoji: '🗺️' },
              { step: '3', title: 'Study & Track', emoji: '📊' },
              { step: '4', title: 'Mock Interviews', emoji: '💬' },
              { step: '5', title: 'Land The Job!', emoji: '🎉' },
            ].map((item, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ width: '60px', height: '60px', background: 'linear-gradient(135deg, #f43f5e, #ec4899)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', fontWeight: '900', color: 'white', margin: '0 auto 20px' }}>
                  {item.step}
                </div>
                <div style={{ fontSize: '32px', marginBottom: '10px' }}>{item.emoji}</div>
                <h3 style={{ fontSize: '16px', fontWeight: '700' }}>{item.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" style={{ padding: '120px 40px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '48px', fontWeight: '900', marginBottom: '80px', textAlign: 'center', background: 'linear-gradient(135deg, #f43f5e, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            Simple, Transparent Pricing
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            {pricingPlans.map((plan, i) => (
              <div key={i}
                style={{
                  background: plan.highlight ? 'linear-gradient(135deg, rgba(244, 63, 94, 0.2), rgba(168, 85, 247, 0.2))' : 'rgba(30, 41, 59, 0.6)',
                  border: plan.highlight ? '2px solid rgba(244, 63, 94, 0.5)' : '1px solid rgba(148, 163, 184, 0.1)',
                  borderRadius: '12px',
                  padding: '40px',
                  position: 'relative',
                  transition: 'all 0.3s',
                  backdropFilter: 'blur(10px)',
                  transform: plan.highlight ? 'scale(1.05)' : 'scale(1)'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = plan.highlight ? 'scale(1.08)' : 'translateY(-5px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = plan.highlight ? 'scale(1.05)' : 'scale(1)'}
              >
                {plan.highlight && <div style={{ position: 'absolute', top: '20px', right: '20px', background: '#f43f5e', color: 'white', padding: '5px 15px', borderRadius: '20px', fontSize: '12px', fontWeight: '700' }}>POPULAR</div>}
                <h3 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '10px' }}>{plan.name}</h3>
                <div style={{ fontSize: '36px', fontWeight: '900', marginBottom: '30px', color: '#f43f5e' }}>{plan.price}</div>
                <ul style={{ listStyle: 'none', padding: 0, marginBottom: '30px' }}>
                  {plan.features.map((feature, j) => (
                    <li key={j} style={{ color: '#cbd5e1', fontSize: '14px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ color: '#f43f5e' }}>✓</span> {feature}
                    </li>
                  ))}
                </ul>
                <button style={{
                  width: '100%',
                  background: plan.highlight ? 'linear-gradient(135deg, #f43f5e, #ec4899)' : 'transparent',
                  border: plan.highlight ? 'none' : '1px solid #f43f5e',
                  color: 'white',
                  padding: '12px',
                  borderRadius: '6px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  transition: '0.3s'
                }} onMouseEnter={(e) => (e.target as HTMLElement).style.transform = 'translateY(-2px)'} onMouseLeave={(e) => (e.target as HTMLElement).style.transform = 'translateY(0)'}>
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: '120px 40px', background: 'linear-gradient(135deg, rgba(244, 63, 94, 0.1), rgba(168, 85, 247, 0.1))' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '42px', fontWeight: '900', marginBottom: '20px' }}>
            Ready to Glow?
          </h2>
          <p style={{ fontSize: '18px', color: '#cbd5e1', marginBottom: '40px' }}>
            Join thousands of students who landed their dream jobs with GlowGrid. Your success story starts here.
          </p>
          <button style={{ background: 'linear-gradient(135deg, #f43f5e, #ec4899)', border: 'none', color: 'white', padding: '16px 50px', borderRadius: '8px', fontSize: '16px', fontWeight: '700', cursor: 'pointer', boxShadow: '0 20px 40px rgba(244, 63, 94, 0.3)', transition: '0.3s' }} onMouseEnter={(e) => (e.target as HTMLElement).style.transform = 'translateY(-3px)'} onMouseLeave={(e) => (e.target as HTMLElement).style.transform = 'translateY(0)'}>
            Start Your Free Trial
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '60px 40px', borderTop: '1px solid rgba(148, 163, 184, 0.1)', background: 'rgba(15, 23, 42, 0.5)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', marginBottom: '40px' }}>
            {[
              { title: 'Product', links: ['Features', 'Pricing', 'FAQ', 'Blog'] },
              { title: 'Company', links: ['About', 'Contact', 'Careers', 'Press'] },
              { title: 'Resources', links: ['Docs', 'API', 'Community', 'Support'] },
              { title: 'Legal', links: ['Privacy', 'Terms', 'Cookie Policy', 'Security'] },
            ].map((col, i) => (
              <div key={i}>
                <h4 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '20px', color: '#f1f5f9' }}>{col.title}</h4>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {col.links.map((link, j) => (
                    <li key={j} style={{ marginBottom: '12px' }}>
                      <a href="#" style={{ color: '#cbd5e1', textDecoration: 'none', cursor: 'pointer', transition: '0.3s' }} onMouseEnter={(e) => (e.target as HTMLElement).style.color = '#f43f5e'} onMouseLeave={(e) => (e.target as HTMLElement).style.color = '#cbd5e1'}>{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div style={{ borderTop: '1px solid rgba(148, 163, 184, 0.1)', paddingTop: '40px', textAlign: 'center', color: '#94a3b8', fontSize: '14px' }}>
            <p>© 2024 GlowGrid. Built with ❤️ by students, for students.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
