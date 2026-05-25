// Theme switcher component for selecting different themes
'use client';

import { useTheme, type Theme } from '@/lib/theme-context';
import { Moon, Sun, Sparkles, Heart, Zap, Waves } from 'lucide-react';
import { useEffect, useState } from 'react';

const themes: Array<{ value: Theme; label: string; icon: React.ComponentType<any>; description: string }> = [
  { value: 'dark', label: 'Dark', icon: Moon, description: 'Classic dark mode' },
  { value: 'light', label: 'Light', icon: Sun, description: 'Bright & clean' },
  { value: 'pink', label: 'Pink', icon: Heart, description: 'Soft & cute' },
  { value: 'purple', label: 'Purple', icon: Sparkles, description: 'Mystical vibes' },
  { value: 'neon', label: 'Neon', icon: Zap, description: 'Cyber punk' },
  { value: 'ocean', label: 'Ocean', icon: Waves, description: 'Cool & calm' },
];

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Theme selector button */}
      <div className="group relative">
        {/* Main button */}
        <button
          className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-accent to-pink-500 text-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95"
          title="Change theme"
        >
          <Sparkles className="w-6 h-6" />
        </button>

        {/* Theme menu - shows on hover */}
        <div className="absolute bottom-20 right-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 bg-background/95 backdrop-blur-xl border border-border/50 rounded-2xl shadow-2xl p-3 w-48">
          <p className="text-xs font-bold text-accent mb-3 px-2">Choose Your Vibe</p>
          <div className="space-y-2">
            {themes.map(({ value, label, icon: Icon, description }) => (
              <button
                key={value}
                onClick={() => setTheme(value)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                  theme === value
                    ? 'bg-accent text-white font-semibold'
                    : 'text-foreground hover:bg-card'
                }`}
              >
                <Icon className="w-4 h-4" />
                <div className="text-left">
                  <p className="text-sm font-medium">{label}</p>
                  <p className="text-xs opacity-75">{description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
