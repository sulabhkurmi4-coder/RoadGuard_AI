"use client";

import React, { useState } from "react";
import { RiskDistributionSegment } from "@/types/dashboard";
import { formatNumber, formatMiles } from "@/lib/format-utils";
import { LayersIcon } from "@/components/icons";

interface RiskDistributionChartProps {
  distribution: RiskDistributionSegment[];
}

export default function RiskDistributionChart({ distribution }: RiskDistributionChartProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // SVG Donut calculation
  const radius = 58;
  const circumference = 2 * Math.PI * radius; // ~364.42
  let accumulatedPercent = 0;

  const totalMiles = distribution.reduce((sum, item) => sum + item.laneMiles, 0);

  return (
    <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-6 flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <LayersIcon size={18} className="text-purple-400" />
          <h2 className="text-base sm:text-lg font-bold text-white">Risk Distribution by Functional Class</h2>
        </div>
        <span className="text-xs font-mono text-slate-400">FHWA Functional Classification</span>
      </div>

      {/* Chart & Legend Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Left: SVG Donut Chart (5 cols) */}
        <div className="md:col-span-5 flex items-center justify-center relative">
          <div className="relative w-48 h-48 sm:w-56 sm:h-56">
            <svg viewBox="0 0 160 160" className="w-full h-full -rotate-90 transform">
              {/* Background Track Circle */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                fill="transparent"
                stroke="#1e293b"
                strokeWidth="18"
              />

              {/* Slices */}
              {distribution.map((item, idx) => {
                const strokeDasharray = `${(item.percentage / 100) * circumference} ${circumference}`;
                const strokeDashoffset = -((accumulatedPercent / 100) * circumference);
                accumulatedPercent += item.percentage;
                const isHovered = hoveredIdx === idx;

                return (
                  <circle
                    key={item.classification}
                    cx="80"
                    cy="80"
                    r={radius}
                    fill="transparent"
                    stroke={item.color}
                    strokeWidth={isHovered ? 24 : 18}
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset={strokeDashoffset}
                    className="transition-all duration-300 cursor-pointer"
                    onMouseEnter={() => setHoveredIdx(idx)}
                    onMouseLeave={() => setHoveredIdx(null)}
                  />
                );
              })}
            </svg>

            {/* Donut Center Display */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none font-mono">
              {hoveredIdx !== null ? (
                <>
                  <span className="text-xs text-slate-400 uppercase font-semibold">
                    {distribution[hoveredIdx].percentage}%
                  </span>
                  <span className="text-base sm:text-lg font-black text-white">
                    {formatMiles(distribution[hoveredIdx].laneMiles)}
                  </span>
                  <span
                    className="text-[10px] font-bold px-1.5 py-0.5 rounded mt-0.5"
                    style={{
                      color: distribution[hoveredIdx].color,
                      backgroundColor: `${distribution[hoveredIdx].color}20`,
                    }}
                  >
                    PCI {distribution[hoveredIdx].averagePci}
                  </span>
                </>
              ) : (
                <>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider">
                    Total Monitored
                  </span>
                  <span className="text-lg sm:text-xl font-black text-white">
                    {formatNumber(totalMiles)}
                  </span>
                  <span className="text-[10px] text-cyan-400 font-bold">Lane-Miles</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Right: Detailed Legend & Breakdown Cards (7 cols) */}
        <div className="md:col-span-7 space-y-3">
          {distribution.map((item, idx) => {
            const isHovered = hoveredIdx === idx;
            return (
              <div
                key={item.classification}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className={`p-3 rounded-xl border transition-all cursor-pointer ${
                  isHovered
                    ? "bg-slate-800/90 border-cyan-500/50 shadow-md translate-x-1"
                    : "bg-slate-950/60 border-slate-800 hover:border-slate-700"
                }`}
              >
                <div className="flex items-center justify-between text-xs font-mono mb-1">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-3 h-3 rounded-md shrink-0"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="font-bold text-white text-sm">
                      {item.classification}
                    </span>
                  </div>
                  <span className="font-black text-white text-sm">
                    {item.percentage}%
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs font-mono text-slate-400 pl-5">
                  <span>{formatNumber(item.laneMiles)} lane-miles</span>
                  <div className="flex items-center gap-3 text-[11px]">
                    <span className="text-slate-300">Avg PCI: <strong>{item.averagePci}</strong></span>
                    <span className="text-rose-400 font-semibold">
                      {item.criticalCount} Critical Sectors
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
