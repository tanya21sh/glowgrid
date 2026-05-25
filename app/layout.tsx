import type { Metadata } from "next";
// import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "react-hot-toast";
import "./globals.css";

export const metadata: Metadata = {
  title: "PrepPilot - Your Personalized Placement Preparation OS",
  description:
    "AI-powered interview preparation platform with personalized roadmaps, progress tracking, and expert guidance.",
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
        <body className="bg-background text-foreground">
          {children}
          <Toaster position="bottom-right" />
        </body>
      </html>
    // </ClerkProvider>
  );
}
