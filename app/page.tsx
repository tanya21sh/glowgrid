// GlowGrid Landing Page - Gen-Z Modern Design
// Modern, attractive, and highly functional landing page with glassmorphism effects
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Sparkles,
  Zap,
  TrendingUp,
  Target,
  CheckCircle2,
  ArrowRight,
  Code2,
  Users,
  BarChart3,
  BookOpen,
  Rocket,
  Brain,
  Shield,
  Flame,
} from 'lucide-react';

export default function LandingPage() {
  // Scroll to section handler
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800 overflow-hidden relative">
      {/* Animated background blobs - Enhanced */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {/* Main accent blob */}
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-gradient-to-br from-accent/30 to-pink-500/20 rounded-full blur-3xl opacity-50 animate-blob" />
        
        {/* Secondary pink blob */}
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-gradient-to-tr from-pink-500/25 to-purple-500/15 rounded-full blur-3xl opacity-40 animate-blob animation-delay-2000" />
        
        {/* Tertiary blue blob */}
        <div className="absolute top-1/2 left-1/2 w-[700px] h-[700px] bg-gradient-to-tl from-blue-500/15 via-cyan-400/10 to-teal-400/5 rounded-full blur-3xl opacity-30 animate-blob animation-delay-4000" />
        
        {/* Purple accent blob */}
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-gradient-to-bl from-purple-500/20 to-pink-500/10 rounded-full blur-3xl opacity-35 animate-blob animation-delay-6000" />
        
        {/* Grid background overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:50px_50px] opacity-20" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-slate-900/40 backdrop-blur-2xl border-b border-slate-700/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-3 group">
            <div className="w-11 h-11 bg-gradient-to-br from-accent via-pink-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black bg-gradient-to-r from-accent via-pink-500 to-purple-500 bg-clip-text text-transparent">
                GlowGrid
              </span>
              <span className="text-xs text-accent font-bold tracking-widest">BY STUDENTS FOR STUDENTS</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex gap-1">
            {[
              { label: 'Features', id: 'features' },
              { label: 'How It Works', id: 'how-it-works' },
              { label: 'Pricing', id: 'pricing' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="px-4 py-2 text-foreground/80 hover:text-accent transition-colors font-medium"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex gap-3 items-center">
            <Link href="/sign-in">
              <Button variant="ghost" className="text-base font-semibold">
                Sign In
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button className="text-base font-semibold bg-gradient-to-r from-accent to-pink-500 hover:shadow-lg hover:shadow-accent/50 transition-all hover:scale-105">
                Get Started Free
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-32 px-6 lg:px-8 relative">
        <div className="max-w-6xl mx-auto text-center">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full border border-accent/30 backdrop-blur-sm hover:border-accent/60 transition-all">
            <Zap className="w-4 h-4 text-accent animate-pulse" />
            <span className="text-sm font-bold text-accent">✨ AI-Powered Interview Prep (BETA)</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-7xl md:text-8xl lg:text-9xl font-black mb-8 leading-tight">
            <span className="bg-gradient-to-r from-accent via-pink-500 to-purple-500 bg-clip-text text-transparent block">
              Land Your
            </span>
            <span className="bg-gradient-to-r from-blue-500 via-cyan-400 to-teal-400 bg-clip-text text-transparent block">
              Dream Job
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-2xl md:text-3xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
            Master any interview with{' '}
            <span className="bg-gradient-to-r from-accent to-pink-500 bg-clip-text text-transparent font-bold">
              AI-powered prep
            </span>
            . Personalized roadmaps, real-time feedback, and expert guidance—all in one place. 🚀
          </p>

          {/* CTA Buttons */}
          <div className="flex gap-4 justify-center flex-wrap mb-16">
            <Link href="/sign-up">
              <Button
                size="lg"
                className="text-lg h-14 px-8 bg-gradient-to-r from-accent to-pink-500 hover:shadow-2xl hover:shadow-accent/50 transition-all hover:scale-105 font-bold gap-2"
              >
                <Rocket className="w-5 h-5" />
                Start Free Trial
              </Button>
            </Link>
            <Link href="/sign-in">
              <Button
                size="lg"
                variant="outline"
                className="text-lg h-14 px-8 border-2 hover:bg-background/50 transition-all font-bold"
              >
                Watch Demo
              </Button>
            </Link>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center pt-8 border-t border-border/30">
            {[
              { number: '10K+', label: 'Students Helped', icon: '🎓' },
              { number: '95%', label: 'Success Rate', icon: '🎯' },
              { number: '4.9★', label: 'User Rating', icon: '⭐' },
            ].map((stat, i) => (
              <div key={i} className="text-center group">
                <p className="text-3xl font-black text-accent group-hover:scale-110 transition-transform">
                  {stat.icon} {stat.number}
                </p>
                <p className="text-sm text-muted-foreground font-semibold mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 rounded-full border border-purple-500/30 mb-6">
              <Flame className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-bold text-purple-400">FEATURES</span>
            </div>
            <h2 className="text-6xl md:text-7xl font-black mb-6">
              Why{' '}
              <span className="bg-gradient-to-r from-accent to-pink-500 bg-clip-text text-transparent">
                GlowGrid
              </span>
              <br />
              is Different
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to crush your interviews and land that offer 💪
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                icon: Brain,
                title: 'AI Roadmaps',
                desc: 'Custom interview prep plans generated just for you',
                gradient: 'from-blue-500 to-cyan-500',
                bgGradient: 'bg-gradient-to-br from-blue-500/5 to-cyan-500/5',
              },
              {
                icon: BarChart3,
                title: 'Live Analytics',
                desc: 'Track progress with real-time insights & metrics',
                gradient: 'from-purple-500 to-pink-500',
                bgGradient: 'bg-gradient-to-br from-purple-500/5 to-pink-500/5',
              },
              {
                icon: Users,
                title: 'Mock Interviews',
                desc: 'AI-powered practice with instant feedback',
                gradient: 'from-orange-500 to-red-500',
                bgGradient: 'bg-gradient-to-br from-orange-500/5 to-red-500/5',
              },
              {
                icon: BookOpen,
                title: 'Study Resources',
                desc: 'Curated materials for all interview types',
                gradient: 'from-green-500 to-emerald-500',
                bgGradient: 'bg-gradient-to-br from-green-500/5 to-emerald-500/5',
              },
              {
                icon: Zap,
                title: 'Smart Scheduling',
                desc: 'AI-optimized study plan that adapts to you',
                gradient: 'from-yellow-500 to-orange-500',
                bgGradient: 'bg-gradient-to-br from-yellow-500/5 to-orange-500/5',
              },
              {
                icon: TrendingUp,
                title: 'Weekly Goals',
                desc: 'Stay motivated with achievable milestones',
                gradient: 'from-pink-500 to-red-500',
                bgGradient: 'bg-gradient-to-br from-pink-500/5 to-red-500/5',
              },
              {
                icon: Target,
                title: 'Weak Area Focus',
                desc: 'AI identifies gaps and recommends practice',
                gradient: 'from-cyan-500 to-blue-500',
                bgGradient: 'bg-gradient-to-br from-cyan-500/5 to-blue-500/5',
              },
              {
                icon: CheckCircle2,
                title: 'Interview Checklist',
                desc: 'Complete prep with our verification system',
                gradient: 'from-teal-500 to-green-500',
                bgGradient: 'bg-gradient-to-br from-teal-500/5 to-green-500/5',
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className={`group relative overflow-hidden rounded-2xl ${feature.bgGradient} backdrop-blur-xl border-2 border-transparent hover:border-accent/60 p-6 transition-all duration-500 hover:shadow-2xl hover:shadow-accent/30 hover:-translate-y-3 cursor-pointer`}
              >
                {/* Gradient border on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" style={{backgroundImage: `linear-gradient(135deg, var(--tw-gradient-stops))`}} />

                {/* Enhanced gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-[0.08] transition-all duration-500 rounded-2xl`} />

                <div className="relative z-10">
                  {/* Icon with enhanced animation */}
                  <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${feature.gradient} mb-5 group-hover:scale-125 group-hover:shadow-lg group-hover:shadow-current/50 transition-all duration-500 text-white`}>
                    <feature.icon className="w-6 h-6" />
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg font-black mb-3 group-hover:text-accent transition-colors">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed group-hover:text-foreground/70 transition-colors">{feature.desc}</p>
                  
                  {/* Arrow indicator on hover */}
                  <div className="mt-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                    <ArrowRight className="w-4 h-4 text-accent" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-32 px-6 lg:px-8 bg-gradient-to-r from-accent/5 via-transparent to-pink-500/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-16 text-center">
            {[
              { number: '2,400+', label: 'Interview Questions', icon: '📚' },
              { number: '500+', label: 'Companies Covered', icon: '🏢' },
              { number: '99.9%', label: 'Uptime Guarantee', icon: '⚡' },
            ].map((stat, i) => (
              <div key={i} className="group">
                <p className="text-5xl md:text-6xl font-black text-accent mb-4 group-hover:scale-110 transition-transform">
                  {stat.icon} {stat.number}
                </p>
                <p className="text-lg text-muted-foreground font-semibold">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-32 px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 rounded-full border border-blue-500/30 mb-6">
              <Rocket className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-bold text-blue-400">HOW IT WORKS</span>
            </div>
            <h2 className="text-6xl md:text-7xl font-black mb-6">
              5 Steps to{' '}
              <span className="bg-gradient-to-r from-accent to-pink-500 bg-clip-text text-transparent">
                Success
              </span>
            </h2>
          </div>

          {/* Steps */}
          <div className="space-y-6">
            {[
              {
                num: 1,
                title: 'Tell Us Your Target',
                desc: 'Share your dream company, role, and experience level',
                icon: '🎯',
              },
              {
                num: 2,
                title: 'Get AI Roadmap',
                desc: 'We generate a personalized 12-week interview prep plan',
                icon: '🗺️',
              },
              {
                num: 3,
                title: 'Study & Track',
                desc: 'Follow daily goals with real-time progress analytics',
                icon: '📊',
              },
              {
                num: 4,
                title: 'Mock Interviews',
                desc: 'Practice with AI and get detailed feedback instantly',
                icon: '💬',
              },
              {
                num: 5,
                title: 'Land The Job! 🎉',
                desc: 'Go into your interview fully prepared and confident',
                icon: '✨',
              },
            ].map((step, idx) => (
              <div key={idx} className="flex gap-6 items-start group">
                {/* Step Number */}
                <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-accent to-pink-500 flex items-center justify-center text-white font-black text-2xl group-hover:scale-110 transition-transform shadow-lg">
                  {step.num}
                </div>

                {/* Step Content */}
                <div className="flex-1 pt-2">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-2xl font-black">{step.title}</h3>
                    <span className="text-2xl">{step.icon}</span>
                  </div>
                  <p className="text-muted-foreground text-lg leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* CTA Card */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-accent/30 via-pink-500/20 to-purple-500/10 border-2 border-accent/30 p-16 text-center group hover:border-accent/60 transition-all">
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-r from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="relative">
              <h2 className="text-6xl md:text-7xl font-black mb-6">
                Ready to{' '}
                <span className="bg-gradient-to-r from-accent to-pink-500 bg-clip-text text-transparent">
                  Glow
                </span>
                ?
              </h2>
              <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
                Join thousands of students who landed their dream jobs with GlowGrid. Your success story starts here. 🚀
              </p>

              {/* CTA Buttons */}
              <div className="flex gap-4 justify-center flex-wrap">
                <Link href="/sign-up">
                  <Button
                    size="lg"
                    className="text-lg h-14 px-10 bg-white text-accent hover:bg-gray-100 font-black transition-all hover:scale-105 gap-2"
                  >
                    <Sparkles className="w-5 h-5" />
                    Start Your Free Trial
                  </Button>
                </Link>
                <Link href="/sign-in">
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-lg h-14 px-10 border-2 border-white text-white hover:bg-white/10 font-black"
                  >
                    Sign In
                  </Button>
                </Link>
              </div>

              <p className="text-sm text-muted-foreground mt-8 font-medium">
                ✨ No credit card required • 7-day free trial • Cancel anytime
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/20 py-16 px-6 lg:px-8 bg-gradient-to-t from-background/80 to-transparent">
        <div className="max-w-7xl mx-auto">
          {/* Footer Grid */}
          <div className="grid md:grid-cols-5 gap-12 mb-12">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-6 h-6 text-accent" />
                <span className="font-black text-xl">GlowGrid</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Your personal AI interview prep coach. Always ready, always learning.
              </p>
            </div>

            {/* Links */}
            {[
              {
                title: 'Product',
                links: ['Features', 'Pricing', 'FAQ', 'Blog'],
              },
              {
                title: 'Company',
                links: ['About', 'Contact', 'Press', 'Careers'],
              },
              {
                title: 'Resources',
                links: ['Docs', 'API', 'Community', 'Support'],
              },
              {
                title: 'Legal',
                links: ['Privacy', 'Terms', 'Cookie Policy', 'Security'],
              },
            ].map((section) => (
              <div key={section.title}>
                <h4 className="font-black mb-4 text-foreground">{section.title}</h4>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link}>
                      <Link
                        href="#"
                        className="text-muted-foreground hover:text-accent transition-colors text-sm"
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-border/30 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-muted-foreground text-sm">
                © 2024 GlowGrid. Built with ❤️ by students, for students.
              </p>
              <div className="flex gap-4">
                {['Twitter', 'Discord', 'GitHub'].map((social) => (
                  <Link
                    key={social}
                    href="#"
                    className="text-muted-foreground hover:text-accent transition-colors text-sm font-medium"
                  >
                    {social}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
