"use client";

import React from "react";
import { demoRoads, DemoRoadSegment } from "@/data/roads";
import { ChevronDownIcon, RadarIcon } from "@/components/icons";

interface PredictionRoadSelectorProps {
  selectedRoadId: string;
  onSelectRoad: (roadId: string) => void;
}

export default function PredictionRoadSelector({
  selectedRoadId,
  onSelectRoad,
}: PredictionRoadSelectorProps) {
  return (
    <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 backdrop-blur-md shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-semibold mb-1">
          <RadarIcon size={14} />
          <span>SELECT HIGHWAY CORRIDOR FOR PREDICTIVE FORECASTING</span>
        </div>
        <p className="text-xs text-slate-400 font-mono">
          Pick any road segment from the municipal infrastructure grid to run AI degradation models.
        </p>
      </div>

      {/* Select Dropdown */}
      <div className="relative min-w-[280px] sm:min-w-[340px]">
        <select
          value={selectedRoadId}
          onChange={(e) => onSelectRoad(e.target.value)}
          aria-label="Select highway corridor for predictive forecasting"
          className="w-full appearance-none px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs font-mono text-white focus:outline-none focus:border-cyan-400 transition-colors cursor-pointer pr-10 shadow-inner"
        >
          {demoRoads.map((road) => (
            <option key={road.id} value={road.id} className="bg-slate-950 text-white">
              {road.id} — {road.name} (PCI: {road.healthScore})
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
          <ChevronDownIcon size={16} />
        </div>
      </div>
    </div>
  );
}
