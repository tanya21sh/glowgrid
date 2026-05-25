/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    // Background colors
    "bg-slate-950",
    "bg-slate-900",
    "bg-slate-800",
    "bg-slate-700",
    "bg-slate-600",
    // Text colors
    "text-slate-100",
    "text-slate-200",
    "text-slate-50",
    // Gradient colors
    "from-slate-950",
    "via-slate-900",
    "to-slate-800",
    // Borders
    "border-slate-700",
    "border-slate-600",
    // Animation classes
    "animate-blob",
    "animation-delay-2000",
    "animation-delay-4000",
    "animation-delay-6000",
    // Gradients from Tailwind
    "bg-gradient-to-b",
    "bg-gradient-to-br",
    "bg-gradient-to-tr",
    "bg-gradient-to-tl",
    "bg-gradient-to-bl",
    "bg-gradient-to-r",
    "from-accent",
    "to-pink-500",
    "via-pink-500",
    "from-blue-500",
    "to-cyan-500",
    "via-cyan-400",
    "to-teal-400",
    "from-purple-500",
    "to-purple-500",
    // Hover and opacity
    "hover:bg-accent",
    "hover:text-accent",
    "hover:text-accent-foreground",
    "hover:shadow-lg",
    "hover:shadow-xl",
    "hover:scale-110",
    "hover:scale-105",
    "active:scale-95",
    "opacity-50",
    "opacity-40",
    "opacity-30",
    "opacity-35",
    "opacity-20",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
        pulse: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.5 },
        },
        spin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        blob: {
          "0%": { 
            transform: "translate(0, 0) scale(1)",
            opacity: "0.5",
          },
          "33%": { 
            transform: "translate(30px, -50px) scale(1.1)",
            opacity: "0.6",
          },
          "66%": { 
            transform: "translate(-20px, 20px) scale(0.9)",
            opacity: "0.5",
          },
          "100%": { 
            transform: "translate(0, 0) scale(1)",
            opacity: "0.5",
          },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        shimmer: "shimmer 2s linear infinite",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        spin: "spin 1s linear infinite",
        blob: "blob 7s infinite",
        float: "float 3s ease-in-out infinite",
        "fade-in": "fade-in 0.5s ease-in-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
