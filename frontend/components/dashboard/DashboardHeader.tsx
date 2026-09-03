"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ActivityIcon,
  RefreshCwIcon,
  FileTextIcon,
  RadarIcon,
  CheckCircleIcon,
  ChevronDownIcon,
} from "@/components/icons";
import { DEMO_DATA_DISCLAIMER } from "@/lib/dashboard-demo-data";

interface DashboardHeaderProps {
  onRefresh?: () => void;
  selectedDistrict?: string;
  onSelectDistrict?: (district: string) => void;
}

export default function DashboardHeader({
  onRefresh,
  selectedDistrict = "District 4 (State Highway Grid)",
  onSelectDistrict,
}: DashboardHeaderProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefreshClick = () => {
    setIsRefreshing(true);
    if (onRefresh) onRefresh();
    setTimeout(() => setIsRefreshing(false), 1200);
  };

  return (
    <div className="space-y-4 pb-2 border-b border-slate-800/80">
      {/* Top Disclaimer & Telemetry Status Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
        {/* Synthetic Demo Notice */}
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-amber-950/40 border border-amber-500/30 text-amber-300 text-[11px]">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
          <span>{DEMO_DATA_DISCLAIMER}</span>
        </div>

        <div className="flex items-center gap-4 text-slate-400 text-[11px]">
          <span className="flex items-center gap-1.5">
            <CheckCircleIcon size={13} className="text-emerald-400" />
            Federal Highway Administration (FHWA) LTPP Standards
          </span>
          <span className="hidden md:inline text-slate-600">|</span>
          <span className="hidden md:inline">Last Sync: 12 seconds ago</span>
        </div>
      </div>

      {/* Main Title Row */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Infrastructure Command Center
            </h1>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-500/40 uppercase">
              Live Console
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real-time pavement degradation telemetry, multi-sensor network inspection logs, and predictive capital maintenance triage.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* District selector */}
          <div className="relative">
            <select
              value={selectedDistrict}
              onChange={(e) => onSelectDistrict && onSelectDistrict(e.target.value)}
              className="appearance-none pl-3 pr-8 py-2 text-xs font-mono bg-slate-900 border border-slate-700/80 rounded-lg text-slate-200 focus:outline-none focus:border-cyan-500/60 cursor-pointer"
            >
              <option value="District 4 (State Highway Grid)">District 4 (State Highway Grid)</option>
              <option value="All State Districts (1-4)">All State Districts (1-4)</option>
              <option value="Interstate 95 Corridor Only">Interstate 95 Corridor Only</option>
              <option value="State Route 101 Coastal Only">State Route 101 Coastal Only</option>
            </select>
            <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none text-slate-400">
              <ChevronDownIcon size={14} />
            </div>
          </div>

          {/* Refresh Action */}
          <button
            type="button"
            onClick={handleRefreshClick}
            disabled={isRefreshing}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-lg transition-colors disabled:opacity-50"
          >
            <RefreshCwIcon size={14} className={isRefreshing ? "animate-spin text-cyan-400" : ""} />
            <span>{isRefreshing ? "Syncing..." : "Refresh"}</span>
          </button>

          {/* Quick Launch Ingestion */}
          <Link
            href="/inspection"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 rounded-lg shadow-sm shadow-cyan-950/40 border border-cyan-400/30"
          >
            <RadarIcon size={14} />
            <span>Launch Ingestion</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
