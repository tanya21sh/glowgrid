'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { LogIn, Mail, Lock, ArrowRight } from 'lucide-react';

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate sign in - in production, connect to auth service
    setTimeout(() => {
      setLoading(false);
      router.push('/dashboard');
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-background/50 flex items-center justify-center relative overflow-hidden px-4">
      {/* Animated background blobs */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-gradient-to-br from-accent/20 to-pink-500/10 rounded-full blur-3xl opacity-40 animate-blob" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-gradient-to-tr from-pink-500/15 to-purple-500/10 rounded-full blur-3xl opacity-30 animate-blob animation-delay-2000" />
      </div>

      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-pink-500 flex items-center justify-center">
              <LogIn className="w-6 h-6 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-accent to-pink-500 bg-clip-text text-transparent mb-2">
            Welcome Back
          </h1>
          <p className="text-muted-foreground">Sign in to your GlowGrid account</p>
        </div>

        {/* Form Card */}
        <div className="bg-card/50 backdrop-blur-xl border border-border/50 rounded-2xl p-8 shadow-2xl mb-6">
          <form onSubmit={handleSignIn} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-background/50 border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 bg-background/50 border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded" />
                <span className="text-muted-foreground">Remember me</span>
              </label>
              <Link href="#" className="text-accent hover:underline font-medium">
                Forgot password?
              </Link>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 bg-gradient-to-r from-accent to-pink-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? 'Signing in...' : 'Sign In'}
              {!loading && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>
        </div>

        {/* Sign Up Link */}
        <p className="text-center text-muted-foreground">
          Don't have an account?{' '}
          <Link href="/sign-up" className="text-accent hover:underline font-semibold">
            Create one
          </Link>
        </p>

        {/* Demo Note */}
        <div className="mt-6 p-4 bg-muted/50 rounded-lg border border-border/50 text-center text-sm">
          <p className="text-muted-foreground">
            <strong>Demo:</strong> Use any credentials to enter (redirects to dashboard)
          </p>
        </div>
      </div>
    </div>
  );
}
