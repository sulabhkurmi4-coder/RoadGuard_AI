import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RoadGuard AI — Infrastructure Intelligence & Predictive Maintenance",
  description:
    "AI-powered road infrastructure monitoring, LiDAR pavement profiling, and automated predictive maintenance for State DOTs and municipal authorities.",
  keywords: [
    "RoadGuard AI",
    "Road Infrastructure",
    "Predictive Maintenance",
    "Pavement Condition Index",
    "Pothole Detection",
    "DOT Intelligence",
    "Computer Vision Roads",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth dark`}
    >
      <body className="min-h-full flex flex-col bg-[#070b14] text-slate-100 font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
        {children}
      </body>
    </html>
  );
}
