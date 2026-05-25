"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
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
  Flame,
  Trophy,
  Rocket,
  Star,
} from "lucide-react";

// Gen Z style landing page with bold colors, gradients, and modern design
export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Animated gradient background */}
      <div className="fixed inset-0 -z-20">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl animate-blob" />
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-pink-600/30 rounded-full blur-3xl animate-blob animation-delay-2s" />
        <div className="absolute -bottom-32 left-1/2 w-96 h-96 bg-cyan-600/20 rounded-full blur-3xl animate-blob animation-delay-4s" />
      </div>

      {/* Navigation - Sleek and minimal */}
      <nav className="fixed top-0 w-full z-50 bg-black/40 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 via-pink-500 to-cyan-500 rounded-lg flex items-center justify-center shadow-lg shadow-pink-500/50 group-hover:shadow-xl group-hover:shadow-purple-500/60 transition-all">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              PrepPilot
            </span>
          </div>

          <div className="flex gap-2 items-center">
            <Link href="/sign-in">
              <Button
                variant="ghost"
                className="text-white hover:bg-white/10 font-semibold"
              >
                Sign In
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold shadow-lg shadow-purple-600/50 hover:shadow-xl hover:shadow-pink-600/60 transition-all border-0">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section - Bold and energetic */}
      <section className="pt-32 pb-24 px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="mb-8 inline-block">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-full border border-purple-500/30 backdrop-blur-sm">
              <Flame className="w-4 h-4 text-orange-400 animate-bounce" />
              <span className="text-sm font-bold text-transparent bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text">
                The AI Interview Prep that actually hits different
              </span>
            </div>
          </div>

          {/* Main heading */}
          <h1 className="text-7xl md:text-8xl lg:text-9xl font-black mb-8 leading-tight">
            <span className="block text-white">Stop Losing</span>
            <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Job Interviews
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
            Your AI mentor that actually understands what companies want. Get
            personalized roadmaps, crush mock interviews, and land your dream job
            in weeks, not months.
          </p>

          {/* CTA Buttons */}
          <div className="flex gap-4 justify-center flex-wrap mb-12">
            <Link href="/sign-up">
              <Button className="text-lg h-14 px-8 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-black shadow-xl shadow-purple-600/50 hover:shadow-2xl hover:scale-105 transition-all border-0 gap-2">
                Start Your Prep
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link href="/sign-in">
              <Button
                variant="outline"
                className="text-lg h-14 px-8 border-2 border-white/30 text-white hover:bg-white/5 font-bold transition-all hover:border-white/50"
              >
                See How It Works
              </Button>
            </Link>
          </div>

          {/* Social proof */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-12 border-t border-white/10">
            <div className="text-center">
              <p className="text-3xl font-black bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                10K+
              </p>
              <p className="text-sm text-gray-400 font-medium">
                Interviews Crushed
              </p>
            </div>
            <div className="hidden sm:block w-px h-12 bg-white/20" />
            <div className="text-center">
              <p className="text-3xl font-black bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">
                95%
              </p>
              <p className="text-sm text-gray-400 font-medium">Success Rate</p>
            </div>
            <div className="hidden sm:block w-px h-12 bg-white/20" />
            <div className="text-center">
              <p className="text-3xl font-black bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                4.9⭐
              </p>
              <p className="text-sm text-gray-400 font-medium">User Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features - Gen Z style cards with glassmorphism */}
      <section className="py-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-6xl md:text-7xl font-black mb-4 text-center">
            Why PrepPilot{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              hits
            </span>
          </h2>
          <p className="text-center text-gray-400 text-xl mb-16">
            Built for Gen Z. Made by people who actually know what's up.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Rocket,
                title: "AI That Gets It",
                desc: "Not your boomer chatbot. Real AI that understands modern interviews.",
                color: "from-purple-600",
              },
              {
                icon: BarChart3,
                title: "Live Stats",
                desc: "Watch your skills level up in real-time with actual metrics.",
                color: "from-pink-600",
              },
              {
                icon: Flame,
                title: "Roast Sessions",
                desc: "Get honest feedback on your weak spots. Yeah, it's harsh. You'll love it.",
                color: "from-orange-600",
              },
              {
                icon: Trophy,
                title: "W After W",
                desc: "Join thousands of people who landed their dream jobs.",
                color: "from-cyan-600",
              },
              {
                icon: Code2,
                title: "DSA Grind",
                desc: "2000+ problems with instant explanations and solutions.",
                color: "from-blue-600",
              },
              {
                icon: Users,
                title: "Community",
                desc: "Vibe with other prep warriors and share strategies.",
                color: "from-indigo-600",
              },
              {
                icon: BookOpen,
                title: "System Design",
                desc: "Master system design like you're already at Big Tech.",
                color: "from-emerald-600",
              },
              {
                icon: Star,
                title: "Behavioral",
                desc: "Crush behavioral questions with confidence and authenticity.",
                color: "from-yellow-600",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${feature.color}/10 to-transparent backdrop-blur-xl border border-white/10 p-8 hover:border-white/30 transition-all duration-500 hover:shadow-2xl hover:shadow-${feature.color.split("-")[1]}-600/30 hover:scale-105`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="relative">
                  <feature.icon className="w-12 h-12 mb-4 group-hover:scale-125 group-hover:rotate-12 transition-transform text-white" />
                  <h3 className="text-xl font-black mb-2 text-white">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works - Timeline style */}
      <section className="py-24 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-6xl md:text-7xl font-black text-center mb-4">
            The{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Glow-Up
            </span>{" "}
            Process
          </h2>
          <p className="text-center text-gray-400 text-lg mb-16">
            5 steps to becoming unstoppable
          </p>

          <div className="space-y-8">
            {[
              {
                number: 1,
                title: "Tell us your vibe",
                desc: "Company, role, timeline. We get it.",
                icon: "🎯",
              },
              {
                number: 2,
                title: "Get your AI mentor",
                desc: "Custom roadmap that actually makes sense.",
                icon: "🤖",
              },
              {
                number: 3,
                title: "Grind it out",
                desc: "Follow your plan, crush daily goals, watch yourself improve.",
                icon: "💪",
              },
              {
                number: 4,
                title: "Mock interview szn",
                desc: "Practice with AI, get rated, iterate until you're unbeatable.",
                icon: "🎬",
              },
              {
                number: 5,
                title: "Secure the bag",
                desc: "Walk into your interview and absolutely destroy it.",
                icon: "🚀",
              },
            ].map((step) => (
              <div
                key={step.number}
                className="flex gap-8 items-start group hover:scale-102 transition-transform"
              >
                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-3xl font-black text-white shadow-lg shadow-purple-600/50 group-hover:shadow-xl group-hover:shadow-pink-600/60 group-hover:scale-110 transition-all">
                  {step.icon}
                </div>
                <div className="flex-1 pt-2">
                  <h3 className="text-2xl font-black text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-400 text-lg">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA - Attention grabbing */}
      <section className="py-24 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-900/50 via-pink-900/30 to-black border border-white/20 p-12 md:p-20 text-center">
            {/* Animated background blobs */}
            <div className="absolute inset-0 -z-10">
              <div className="absolute -top-20 -right-20 w-60 h-60 bg-purple-500/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-pink-500/20 rounded-full blur-3xl" />
            </div>

            <h2 className="text-6xl md:text-7xl font-black mb-6 leading-tight">
              Your Interview Glow-Up Starts{" "}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Today
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
              No cap. PrepPilot has helped 10K+ people land their dream jobs. You
              could be next.
            </p>

            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/sign-up">
                <Button className="text-lg h-14 px-8 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-black shadow-xl shadow-purple-600/50 hover:shadow-2xl hover:scale-105 transition-all border-0 gap-2">
                  Start Free
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="/sign-in">
                <Button
                  variant="outline"
                  className="text-lg h-14 px-8 border-2 border-white/30 text-white hover:bg-white/10 font-black transition-all"
                >
                  Demo
                </Button>
              </Link>
            </div>

            <p className="text-sm text-gray-400 mt-8 font-medium">
              7-day free trial • No credit card • No BS
            </p>
          </div>
        </div>
      </section>

      {/* Footer - Minimal */}
      <footer className="border-t border-white/10 py-12 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-400" />
              <span className="font-black text-lg">PrepPilot © 2024</span>
            </div>

            <div className="flex gap-8 text-gray-400 text-sm font-medium">
              <Link href="#" className="hover:text-white transition-colors">
                Twitter
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Discord
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Privacy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
