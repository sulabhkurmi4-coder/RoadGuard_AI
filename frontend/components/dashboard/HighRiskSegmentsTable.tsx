"use client";

import React, { useState } from "react";
import Link from "next/link";
import { HighRiskRoadSegment } from "@/types/dashboard";
import { AlertTriangleIcon, MapPinIcon, TruckIcon } from "@/components/icons";

interface HighRiskSegmentsTableProps {
  segments: HighRiskRoadSegment[];
}

export default function HighRiskSegmentsTable({ segments }: HighRiskSegmentsTableProps) {
  const [filterPci, setFilterPci] = useState<"all" | "critical" | "high">("all");

  const filtered = segments.filter((s) => {
    if (filterPci === "critical") return s.pci < 45;
    if (filterPci === "high") return s.pci >= 45 && s.pci <= 60;
    return true;
  });

  return (
    <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-6">
      {/* Header & Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <AlertTriangleIcon size={18} className="text-rose-400" />
            <h2 className="text-base sm:text-lg font-bold text-white">
              High Risk Road Segments
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Corridors identified by neural segmentation requiring immediate municipal intervention.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-slate-500 hidden sm:inline">Filter:</span>
          <button
            type="button"
            onClick={() => setFilterPci("all")}
            className={`px-2.5 py-1 rounded text-xs font-mono transition-colors ${filterPci === "all"
                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                : "bg-slate-800 text-slate-400 hover:text-slate-200"
              }`}
          >
            All ({segments.length})
          </button>
          <button
            type="button"
            onClick={() => setFilterPci("critical")}
            className={`px-2.5 py-1 rounded text-xs font-mono transition-colors ${filterPci === "critical"
                ? "bg-rose-500/20 text-rose-300 border border-rose-500/40"
                : "bg-slate-800 text-slate-400 hover:text-slate-200"
              }`}
          >
            Critical (PCI &lt; 45)
          </button>
          <button
            type="button"
            onClick={() => setFilterPci("high")}
            className={`px-2.5 py-1 rounded text-xs font-mono transition-colors ${filterPci === "high"
                ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                : "bg-slate-800 text-slate-400 hover:text-slate-200"
              }`}
          >
            High (PCI 45–60)
          </button>
        </div>
      </div>

      {/* Responsive Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs font-mono">
          <thead className="text-slate-400 border-b border-slate-800 bg-slate-950/80 uppercase text-[11px]">
            <tr>
              <th className="py-3 px-4">Highway Corridor</th>
              <th className="py-3 px-4">Mileposts & Dir</th>
              <th className="py-3 px-4">PCI Score</th>
              <th className="py-3 px-4">Primary Distress Class</th>
              <th className="py-3 px-4">Traffic Load (ESALs)</th>
              <th className="py-3 px-4">Recommended Treatment</th>
              <th className="py-3 px-4">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/70 text-slate-300">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-10 text-slate-500 font-mono text-xs">
                  No road segments matching the selected PCI filter criteria.
                </td>
              </tr>
            ) : (
              filtered.map((seg) => (
                <tr key={seg.id} className="hover:bg-slate-800/40 transition-colors">
                  {/* Corridor */}
                  <td className="py-3.5 px-4 font-bold text-white">
                    <div className="flex items-center gap-2">
                      <MapPinIcon size={14} className="text-cyan-400 shrink-0" />
                      <div>
                        <div>{seg.corridor}</div>
                        <div className="text-[10px] text-slate-500">{seg.segmentCode}</div>
                      </div>
                    </div>
                  </td>

                  {/* Mileposts */}
                  <td className="py-3.5 px-4 text-slate-300">
                    <div>MP {seg.milepostStart} - {seg.milepostEnd}</div>
                    <div className="text-[10px] text-slate-500">{seg.direction}</div>
                  </td>

                  {/* PCI Score */}
                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2 py-0.5 rounded text-[11px] font-bold border ${seg.pci < 45
                          ? "text-rose-400 bg-rose-950/80 border-rose-500/40"
                          : "text-amber-400 bg-amber-950/80 border-amber-500/40"
                        }`}
                    >
                      PCI {seg.pci}
                    </span>
                  </td>

                  {/* Distress */}
                  <td className="py-3.5 px-4">
                    <div className="text-white font-medium">{seg.primaryDefect}</div>
                    <div className="text-[10px] text-slate-500">{seg.urgency}</div>
                  </td>

                  {/* Traffic */}
                  <td className="py-3.5 px-4 text-slate-400">
                    {seg.trafficVolumeEsal}
                  </td>

                  {/* Treatment */}
                  <td className="py-3.5 px-4">
                    <div className="text-cyan-300 font-medium">{seg.recommendedTreatment}</div>
                    <div className="text-[10px] text-slate-500">Est: {seg.estimatedBudget}</div>
                  </td>

                  {/* Action Trigger */}
                  <td className="py-3.5 px-4">
                    <Link
                      href="/maintenance"
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-cyan-300 hover:text-white text-[11px] font-semibold border border-slate-700 transition-colors"
                    >
                      <TruckIcon size={12} />
                      <span>Dispatch</span>
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
