"use client";

import React from "react";
import { usePathname } from "next/navigation";
import {
  MenuIcon,
  SearchIcon,
  BellIcon,
  ActivityIcon,
  SparklesIcon,
} from "@/components/icons";

interface AppHeaderProps {
  onOpenMobile: () => void;
}

export default function AppHeader({ onOpenMobile }: AppHeaderProps) {
  const pathname = usePathname();

  const getPageTitle = (path: string) => {
    switch (path) {
      case "/dashboard":
        return { title: "Command Center Dashboard", section: "Overview" };
      case "/inspection":
        return { title: "AI Road Inspection Console", section: "Ingestion & Vision" };
      case "/inspection/results":
        return { title: "Neural Defect Analysis & Results", section: "Inspection Runs" };
      case "/risk-map":
        return { title: "Geospatial Risk Map (GIS)", section: "Corridor Vulnerability" };
      case "/predictions":
        return { title: "Predictive Degradation & Capital Models", section: "Lifecycle AI" };
      case "/maintenance":
        return { title: "Automated Maintenance & DPW Dispatch", section: "Work Orders" };
      case "/reports":
        return { title: "Agency Audit & Legislative Reports", section: "Compliance" };
      default:
        return { title: "Infrastructure Intelligence", section: "Platform" };
    }
  };

  const { title, section } = getPageTitle(pathname);

  return (
    <header className="sticky top-0 z-30 h-16 bg-[#070b14]/90 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
      {/* Left: Mobile trigger & Breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenMobile}
          className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 lg:hidden"
          aria-label="Open sidebar menu"
        >
          <MenuIcon size={20} />
        </button>

        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 text-[10px] font-mono text-cyan-400/80 uppercase tracking-wider">
            <span>RoadGuard</span>
            <span>/</span>
            <span>{section}</span>
          </div>
          <h1 className="text-sm sm:text-base font-bold text-white tracking-tight leading-tight">
            {title}
          </h1>
        </div>
      </div>

      {/* Center Search Input (Desktop) */}
      <div className="hidden md:flex items-center max-w-md w-full mx-4">
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
            <SearchIcon size={16} />
          </div>
          <input
            type="text"
            placeholder="Search corridor, milepost (e.g. I-95 MP 142), or WO #..."
            className="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-900/90 border border-slate-800 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/40 font-mono"
          />
        </div>
      </div>

      {/* Right Actions: Telemetry & Notifications */}
      <div className="flex items-center gap-3">
        {/* Telemetry pill */}
        <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-300">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span className="hidden xl:inline">Telemetry Grid:</span>
          <span className="text-emerald-400 font-semibold">Online</span>
        </div>

        {/* Notifications Bell */}
        <div className="relative">
          <button
            type="button"
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 relative transition-colors"
            aria-label="Notifications"
          >
            <BellIcon size={18} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-cyan-500" />
          </button>
        </div>

        {/* Live Pulse CTA */}
        <button
          type="button"
          aria-label="View live sensor telemetry pulse"
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-cyan-300 bg-cyan-950/70 hover:bg-cyan-900/80 border border-cyan-500/40 rounded-lg transition-all"
        >
          <SparklesIcon size={14} />
          <span>Live Pulse</span>
        </button>
      </div>
    </header>
  );
}
