"use client";

import React from "react";
import { RiskMapFilter, MapRoadSegment } from "@/types/risk-map";
import { SlidersIcon, XIcon, RadarIcon } from "@/components/icons";

interface RiskMapControlsProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedFilter: RiskMapFilter;
  onFilterChange: (filter: RiskMapFilter) => void;
  segments: MapRoadSegment[];
  onSelectSegment?: (segment: MapRoadSegment) => void;
}

export default function RiskMapControls({
  searchQuery,
  onSearchChange,
  selectedFilter,
  onFilterChange,
  segments,
  onSelectSegment,
}: RiskMapControlsProps) {
  const filterOptions: { label: RiskMapFilter; color: string; activeStyle: string }[] = [
    {
      label: "All",
      color: "text-slate-300",
      activeStyle: "bg-slate-800 text-white border-cyan-500/50 shadow-md",
    },
    {
      label: "Healthy",
      color: "text-emerald-400",
      activeStyle: "bg-emerald-950/80 text-emerald-300 border-emerald-500/50 shadow-emerald-950/40",
    },
    {
      label: "Moderate",
      color: "text-sky-400",
      activeStyle: "bg-sky-950/80 text-sky-300 border-sky-500/50 shadow-sky-950/40",
    },
    {
      label: "High Risk",
      color: "text-amber-400",
      activeStyle: "bg-amber-950/80 text-amber-300 border-amber-500/50 shadow-amber-950/40",
    },
    {
      label: "Critical",
      color: "text-rose-400",
      activeStyle: "bg-rose-950/80 text-rose-300 border-rose-500/50 shadow-rose-950/40",
    },
  ];

  // Count segments per category
  const counts: Record<string, number> = {
    All: segments.length,
    Healthy: segments.filter((s) => s.riskCategory === "Healthy").length,
    Moderate: segments.filter((s) => s.riskCategory === "Moderate").length,
    "High Risk": segments.filter((s) => s.riskCategory === "High Risk").length,
    Critical: segments.filter((s) => s.riskCategory === "Critical").length,
  };

  return (
    <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/90 border border-slate-800 backdrop-blur-md shadow-xl">
      {/* Search Field for Road ID */}
      <div className="relative flex-1 max-w-md">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
          <RadarIcon size={16} />
        </div>

        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          aria-label="Search by Road ID or corridor name"
          placeholder="Search by Road ID (e.g. I-95, PORT-EXP, US-1)..."
          className="w-full pl-10 pr-9 py-2 rounded-xl bg-slate-950/90 border border-slate-700/80 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors shadow-inner"
        />

        {searchQuery && (
          <button
            type="button"
            onClick={() => onSearchChange("")}
            aria-label="Clear search query"
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-white"
          >
            <XIcon size={14} />
          </button>
        )}
      </div>

      {/* Filter Tabs: All, Healthy, Moderate, High Risk, Critical */}
      <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
        <span className="text-slate-500 text-[11px] hidden xl:inline">Risk Filters:</span>
        {filterOptions.map((opt) => {
          const isActive = selectedFilter === opt.label;
          const count = counts[opt.label] ?? 0;

          return (
            <button
              key={opt.label}
              type="button"
              onClick={() => onFilterChange(opt.label)}
              className={`px-3 py-1.5 rounded-xl border text-xs font-mono font-semibold transition-all flex items-center gap-1.5 ${
                isActive
                  ? `${opt.activeStyle} border`
                  : "bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700"
              }`}
            >
              <span className={opt.color}>{opt.label}</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-900/80 text-slate-400 border border-slate-800">
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
