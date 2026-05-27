import type { Metadata } from "next";
// import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@/lib/theme-context";
import "./globals.css";

export const metadata: Metadata = {
  title: "GlowGrid - Your Personalized Interview Preparation Platform",
  description:
    "AI-powered interview prep with personalized roadmaps, progress tracking, and expert guidance.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body 
          className="bg-slate-950 text-slate-100"
          style={{
            backgroundColor: 'rgb(3, 7, 18)',
            color: 'rgb(241, 245, 249)',
            margin: 0,
            padding: 0
          }}
        >
          <ThemeProvider>
            {children}
            <Toaster position="bottom-right" />
          </ThemeProvider>
        </body>
      </html>
    // </ClerkProvider>
  );
}
