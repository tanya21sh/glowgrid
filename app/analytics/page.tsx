'use client';

export const dynamic = 'force-dynamic';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, TrendingUp, Target, Award } from "lucide-react";

export default function AnalyticsPage() {
  // Using guest user since Clerk is disabled

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2">Your Analytics</h1>
          <p className="text-muted-foreground">
            Comprehensive insights into your preparation journey
          </p>
        </div>

        {/* Overview Cards */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Total Study Hours
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">142.5</p>
              <p className="text-xs text-muted-foreground mt-1">↑ 12% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Target className="w-4 h-4" />
                Completion Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">78%</p>
              <p className="text-xs text-muted-foreground mt-1">↑ 5% improvement</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Award className="w-4 h-4" />
                Problems Solved
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">256</p>
              <p className="text-xs text-muted-foreground mt-1">↑ 32 this week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Consistency Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">92%</p>
              <p className="text-xs text-muted-foreground mt-1">Excellent streak</p>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Analytics */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Most Practiced Topics */}
          <Card>
            <CardHeader>
              <CardTitle>Most Practiced Topics</CardTitle>
              <CardDescription>Your top focus areas</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { topic: "Arrays & Strings", problems: 45 },
                { topic: "Trees & Graphs", problems: 38 },
                { topic: "Dynamic Programming", problems: 32 },
                { topic: "System Design", problems: 18 },
                { topic: "Behavioral Prep", problems: 12 },
              ].map((item, idx) => (
                <div key={idx} className="flex justify-between items-center">
                  <span className="text-sm">{item.topic}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 h-2 bg-muted rounded-full">
                      <div
                        className="h-2 bg-accent rounded-full"
                        style={{ width: `${(item.problems / 45) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground w-10 text-right">
                      {item.problems}
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Weak Areas */}
          <Card>
            <CardHeader>
              <CardTitle>Areas for Improvement</CardTitle>
              <CardDescription>Topics with lower accuracy</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { topic: "Bit Manipulation", accuracy: 45 },
                { topic: "Greedy Algorithms", accuracy: 58 },
                { topic: "Heap Problems", accuracy: 62 },
              ].map((item, idx) => (
                <div key={idx} className="flex justify-between items-center p-3 bg-muted/50 rounded-lg border border-destructive/30">
                  <span className="text-sm font-medium">{item.topic}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-destructive font-semibold">
                      {item.accuracy}%
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
