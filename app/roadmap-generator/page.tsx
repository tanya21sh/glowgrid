"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import toast from "react-hot-toast";
import { Zap } from "lucide-react";

export default function RoadmapGeneratorPage() {
  const router = useRouter();
  const { user, isSignedIn, isLoaded } = useUser();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      company: "",
      role: "",
      timeline: "30",
      level: "intermediate",
      jdSummary: "",
    },
  });

  const timeline = watch("timeline");

  const onSubmit = async (data: any) => {
    if (!user?.id) return;

    setLoading(true);
    try {
      const response = await fetch("/api/roadmaps/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          ...data,
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

  if (!isLoaded || !isSignedIn) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin">
          <Zap className="w-8 h-8 text-accent" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">Generate Your Roadmap</CardTitle>
            <CardDescription>
              Tell us about your target role and we'll create a personalized
              preparation plan powered by AI.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Company */}
              <div>
                <Label htmlFor="company">Target Company *</Label>
                <Input
                  id="company"
                  placeholder="e.g., Google, Microsoft, Amazon"
                  {...register("company", { required: true })}
                  className="mt-2"
                />
              </div>

              {/* Role */}
              <div>
                <Label htmlFor="role">Target Role *</Label>
                <Input
                  id="role"
                  placeholder="e.g., Software Engineer, Senior Developer"
                  {...register("role", { required: true })}
                  className="mt-2"
                />
              </div>

              {/* Timeline */}
              <div>
                <Label htmlFor="timeline">Preparation Timeline *</Label>
                <select
                  {...register("timeline")}
                  className="input-base mt-2"
                >
                  <option value="15">15 Days</option>
                  <option value="30">30 Days</option>
                  <option value="60">60 Days</option>
                  <option value="custom">Custom</option>
                </select>
                {timeline === "custom" && (
                  <Input
                    type="number"
                    placeholder="Enter number of days"
                    className="mt-2"
                  />
                )}
              </div>

              {/* Level */}
              <div>
                <Label htmlFor="level">Current Skill Level *</Label>
                <select {...register("level")} className="input-base mt-2">
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>

              {/* JD Summary */}
              <div>
                <Label htmlFor="jdSummary">Job Description (Optional)</Label>
                <Textarea
                  id="jdSummary"
                  placeholder="Paste the job description here for a more tailored roadmap..."
                  rows={5}
                  {...register("jdSummary")}
                  className="mt-2"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full"
                  size="lg"
                >
                  {loading ? (
                    <>
                      <span className="animate-spin mr-2">⏳</span>
                      Generating Your Roadmap...
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 mr-2" />
                      Generate Roadmap
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
