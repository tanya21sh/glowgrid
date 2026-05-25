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

  // Load saved theme from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('theme') as Theme | null;
    if (saved && saved !== theme) {
      setTheme(saved);
      applyTheme(saved);
    } else {
      applyTheme(theme);
    }
  }, []);

  // Apply theme to document by converting hex colors to HSL
  const applyTheme = (selectedTheme: Theme) => {
    const colors = themeColors[selectedTheme];
    const root = document.documentElement;
    
    // Convert hex to HSL values for Tailwind variables
    const bgHSL = hexToHSL(colors.bg);
    const cardHSL = hexToHSL(colors.card);
    const accentHSL = hexToHSL(colors.accent);
    
    root.style.setProperty('--background', bgHSL);
    root.style.setProperty('--card', cardHSL);
    root.style.setProperty('--accent', accentHSL);
    root.style.setProperty('--foreground', '0 0% 98.2%');
    root.style.setProperty('--card-foreground', '0 0% 98.2%');
    root.style.setProperty('--accent-foreground', '0 0% 8.5%');
    root.style.setProperty('--border', '0 0% 14.9%');
    root.style.setProperty('--muted', '0 0% 14.9%');
  };

  const handleSetTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme: handleSetTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Helper function to convert hex to HSL format for Tailwind
function hexToHSL(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0,
    s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  const hDeg = Math.round(h * 360);
  const sPct = Math.round(s * 100);
  const lPct = Math.round(l * 100);

  return `${hDeg} ${sPct}% ${lPct}%`;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

// Safe version that returns null if context is not available
export function useThemeOptional() {
  const context = useContext(ThemeContext);
  return context;
}
