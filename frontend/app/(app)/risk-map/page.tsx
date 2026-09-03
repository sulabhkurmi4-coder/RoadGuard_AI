"use client";

import React, { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import RiskMapControls from "@/components/risk-map/RiskMapControls";
import { RiskMapFilter, MapRoadSegment } from "@/types/risk-map";
import { demoRoadSegments } from "@/lib/risk-map-service";
import { MapPinIcon, ShieldCheckIcon, AlertTriangleIcon, ActivityIcon } from "@/components/icons";

// Dynamic import with SSR disabled for MapLibre GL JS
const RiskMapContainer = dynamic(
  () => import("@/components/risk-map/RiskMapContainer"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[620px] sm:h-[680px] rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center font-mono text-xs text-slate-400">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
          <span>Initializing MapLibre GL GIS Engine...</span>
        </div>
      </div>
    ),
  }
);

export default function RiskMapPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<RiskMapFilter>("All");
  const [selectedSegment, setSelectedSegment] = useState<MapRoadSegment | null>(null);

  // Filter road segments based on search query and category filter
  const filteredSegments = useMemo(() => {
    return demoRoadSegments.filter((seg) => {
      // Category filter
      const matchesCategory =
        selectedFilter === "All" || seg.riskCategory === selectedFilter;

      // Road ID search query
      const normalized = searchQuery.trim().toLowerCase();
      const matchesQuery =
        !normalized ||
        seg.roadId.toLowerCase().includes(normalized) ||
        seg.roadName.toLowerCase().includes(normalized);

      return matchesCategory && matchesQuery;
    });
  }, [searchQuery, selectedFilter]);

  return (
    <div className="space-y-6 pb-16">
      {/* 1. Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800/80">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-[11px] font-mono text-cyan-400 mb-2">
            <MapPinIcon size={12} />
            <span>GIS INFRASTRUCTURE RISK ATLAS</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Network Risk Map
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Geospatial deterioration mapping, multi-corridor telemetry, and failure vulnerability classification.
          </p>
        </div>

        {/* Status indicator */}
        <div className="flex items-center gap-3 px-3.5 py-2 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-mono text-slate-300 self-start sm:self-auto">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Tile Engine: <strong>OpenStreetMap / CartoDB Dark</strong></span>
        </div>
      </div>

      {/* 7 & 8. Search Field & Category Filter Controls */}
      <RiskMapControls
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedFilter={selectedFilter}
        onFilterChange={setSelectedFilter}
        segments={demoRoadSegments}
      />

      {/* Empty State when no segments match search/filter */}
      {filteredSegments.length === 0 && (
        <div className="p-4 rounded-xl bg-slate-900/90 border border-amber-500/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono text-amber-300">
          <div className="flex items-center gap-2.5">
            <AlertTriangleIcon size={16} className="text-amber-400 shrink-0" />
            <span>
              No road corridors match query <strong>"{searchQuery}"</strong> in category <strong>"{selectedFilter}"</strong>.
            </span>
          </div>
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setSelectedFilter("All");
            }}
            className="px-3 py-1.5 rounded-lg bg-amber-950/80 border border-amber-500/50 text-amber-200 hover:text-white font-bold transition-colors shrink-0"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* 1, 2, 3, 4, 5 & 6. Full-Width Interactive MapLibre GL Map with Popups & Legend */}
      <div className="w-full">
        <RiskMapContainer
          segments={filteredSegments}
          onSelectSegment={setSelectedSegment}
          selectedRoadId={searchQuery.trim()}
        />
      </div>

      {/* Selected Segment Telemetry Card (Displays when segment is active) */}
      {selectedSegment && (
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-cyan-500/40 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30 text-[10px] font-mono font-bold">
                {selectedSegment.roadId}
              </span>
              <span className="text-sm font-bold text-white">
                {selectedSegment.roadName}
              </span>
              <span className="text-xs font-mono text-slate-400">
                ({selectedSegment.milepost})
              </span>
            </div>

            <p className="text-xs font-mono text-slate-300">
              <strong className="text-cyan-300">Recommended Treatment: </strong>
              {selectedSegment.recommendedMaintenance}
            </p>
          </div>

          <div className="flex items-center gap-4 self-stretch md:self-auto justify-between md:justify-end border-t md:border-t-0 pt-3 md:pt-0 border-slate-800">
            <div className="text-right font-mono">
              <span className="text-[10px] text-slate-400 uppercase block">Health Score</span>
              <span className="text-xl font-black text-white">
                {selectedSegment.healthScore} / 100
              </span>
            </div>

            <div className="text-right font-mono">
              <span className="text-[10px] text-slate-400 uppercase block">Failure Risk</span>
              <span className="text-xl font-black text-rose-400">
                {selectedSegment.riskPercentage}%
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
