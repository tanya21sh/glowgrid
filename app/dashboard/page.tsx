// Dynamic rendering to avoid Clerk context errors during static export
'use client';

export const dynamic = 'force-dynamic';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Plus, Zap, TrendingUp } from "lucide-react";

export default function DashboardPage() {
  // Using guest user since Clerk is disabled
  const user = {
    firstName: "Guest",
    email: "guest@glowgrid.dev",
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold mb-2">
                Welcome back, {user?.firstName}!
              </h1>
              <p className="text-muted-foreground">
                Track your interview preparation journey
              </p>
            </div>
            <Link href="/roadmap-generator">
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                New Roadmap
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-4 mb-12">
          {[
            { label: "Active Roadmaps", value: "1", icon: Zap },
            { label: "Study Hours", value: "24.5", icon: TrendingUp },
            { label: "Problems Solved", value: "156", icon: TrendingUp },
            { label: "Current Streak", value: "7 days", icon: Zap },
          ].map((stat, idx) => (
            <Card key={idx}>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{stat.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Sections */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Active Roadmap */}
            <Card>
              <CardHeader>
                <CardTitle>Active Roadmap</CardTitle>
                <CardDescription>
                  Your current preparation plan
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-card border border-border rounded-lg">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">Google SDE Prep</h3>
                      <p className="text-sm text-muted-foreground">
                        60-day comprehensive preparation
                      </p>
                    </div>
                    <Badge>In Progress</Badge>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span className="font-semibold">35%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-accent h-2 rounded-full"
                        style={{ width: "35%" }}
                      />
                    </div>
                  </div>
                  <Link href="/tracker">
                    <Button variant="outline" className="w-full">
                      View Tracker
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-4">
                <Link href="/tracker">
                  <Button variant="outline" className="w-full justify-start">
                    📊 View Tracker
                  </Button>
                </Link>
                <Link href="/analytics">
                  <Button variant="outline" className="w-full justify-start">
                    📈 View Analytics
                  </Button>
                </Link>
                <Button variant="outline" className="w-full justify-start">
                  🎤 Start Mock Interview
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  💡 Get AI Recommendations
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Today's Focus */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Today's Focus</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-muted/50 rounded-lg border border-border">
                  <p className="font-semibold text-sm mb-1">
                    DSA Practice - Arrays
                  </p>
                  <p className="text-xs text-muted-foreground">
                    2 hours recommended
                  </p>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg border border-border">
                  <p className="font-semibold text-sm mb-1">
                    System Design - Caching
                  </p>
                  <p className="text-xs text-muted-foreground">
                    1.5 hours recommended
                  </p>
                </div>
                <Button className="w-full">Start Session</Button>
              </CardContent>
            </Card>

            {/* Streak Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">🔥 Streak</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-4">
                  <p className="text-4xl font-bold text-accent mb-2">7</p>
                  <p className="text-sm text-muted-foreground">
                    days of consistent learning
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
