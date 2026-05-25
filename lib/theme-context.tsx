// Theme provider context for managing app-wide theme
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Theme = 'dark' | 'light' | 'pink' | 'purple' | 'neon' | 'ocean';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Color schemes for each theme
const themeColors: Record<Theme, Record<string, string>> = {
  dark: {
    bg: '#0a0a0a',
    card: '#1a1a1a',
    accent: '#ff4444',
    text: '#ffffff',
  },
  light: {
    bg: '#ffffff',
    card: '#f5f5f5',
    accent: '#ff4444',
    text: '#000000',
  },
  pink: {
    bg: '#fff5f9',
    card: '#ffe6f0',
    accent: '#ff1493',
    text: '#4a0e4e',
  },
  purple: {
    bg: '#1a0033',
    card: '#330066',
    accent: '#bb86fc',
    text: '#ffffff',
  },
  neon: {
    bg: '#0d0221',
    card: '#1d0a4a',
    accent: '#00ff88',
    text: '#00ff88',
  },
  ocean: {
    bg: '#0a2463',
    card: '#247ba0',
    accent: '#06a77d',
    text: '#f0f3f7',
  },
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');
  const [mounted, setMounted] = useState(false);

  // Load saved theme from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('theme') as Theme | null;
    if (saved) {
      setTheme(saved);
      applyTheme(saved);
    }
    setMounted(true);
  }, []);

  // Apply theme to document
  const applyTheme = (selectedTheme: Theme) => {
    const colors = themeColors[selectedTheme];
    const root = document.documentElement;
    
    root.style.setProperty('--theme-bg', colors.bg);
    root.style.setProperty('--theme-card', colors.card);
    root.style.setProperty('--theme-accent', colors.accent);
    root.style.setProperty('--theme-text', colors.text);
  };

  const handleSetTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
  };

  if (!mounted) return <>{children}</>;

  return (
    <ThemeContext.Provider value={{ theme, setTheme: handleSetTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
