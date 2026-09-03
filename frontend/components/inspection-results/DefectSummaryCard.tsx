import React from "react";
import { SeverityCounts } from "@/types/inspection-results";
import { AlertTriangleIcon } from "@/components/icons";

interface DefectSummaryCardProps {
  defectSummary: {
    potholes: number;
    cracks: number;
    surfaceDamage: number;
    totalDefects: number;
  };
  severity: SeverityCounts;
}

export default function DefectSummaryCard({
  defectSummary,
  severity,
}: DefectSummaryCardProps) {
  return (
    <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <AlertTriangleIcon size={18} className="text-amber-400" />
          <h2 className="text-base font-bold text-white">Defect Summary & Severity</h2>
        </div>
        <span className="text-xs font-mono text-slate-400">
          Total: <strong className="text-white">{defectSummary.totalDefects} Defects</strong>
        </span>
      </div>

      {/* 4. Defect Category Counts Grid */}
      <div>
        <span className="text-xs font-mono text-slate-400 uppercase tracking-wider font-semibold block mb-3">
          Defects by Distress Type
        </span>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {/* Potholes */}
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80">
            <span className="text-xs font-mono text-slate-400">Potholes</span>
            <div className="text-2xl font-black font-mono text-rose-400 mt-1">
              {defectSummary.potholes}
            </div>
            <span className="text-[10px] font-mono text-slate-500">Cavities</span>
          </div>

          {/* Cracks */}
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80">
            <span className="text-xs font-mono text-slate-400">Cracks</span>
            <div className="text-2xl font-black font-mono text-amber-400 mt-1">
              {defectSummary.cracks}
            </div>
            <span className="text-[10px] font-mono text-slate-500">Fatigue & seams</span>
          </div>

          {/* Surface Damage */}
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80">
            <span className="text-xs font-mono text-slate-400">Surface Damage</span>
            <div className="text-2xl font-black font-mono text-sky-400 mt-1">
              {defectSummary.surfaceDamage}
            </div>
            <span className="text-[10px] font-mono text-slate-500">Ravelling/ruts</span>
          </div>

          {/* Total Defects */}
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80">
            <span className="text-xs font-mono text-slate-400">Total Defects</span>
            <div className="text-2xl font-black font-mono text-white mt-1">
              {defectSummary.totalDefects}
            </div>
            <span className="text-[10px] font-mono text-cyan-400">Cumulative</span>
          </div>
        </div>
      </div>

      {/* 5. Severity Breakdown: Low, Medium, High, Critical */}
      <div className="pt-2 border-t border-slate-800/80">
        <span className="text-xs font-mono text-slate-400 uppercase tracking-wider font-semibold block mb-3">
          Severity Breakdown
        </span>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
          {/* Low */}
          <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/20">
            <div className="flex items-center justify-between">
              <span className="text-xs text-emerald-300 font-semibold">Low</span>
              <span className="text-lg font-black text-emerald-400">{severity.low}</span>
            </div>
            <div className="text-[10px] text-slate-400 mt-1">Minor ravelling</div>
          </div>

          {/* Medium */}
          <div className="p-3 rounded-xl bg-sky-950/20 border border-sky-500/20">
            <div className="flex items-center justify-between">
              <span className="text-xs text-sky-300 font-semibold">Medium</span>
              <span className="text-lg font-black text-sky-400">{severity.medium}</span>
            </div>
            <div className="text-[10px] text-slate-400 mt-1">Seam spalls</div>
          </div>

          {/* High */}
          <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-500/20">
            <div className="flex items-center justify-between">
              <span className="text-xs text-amber-300 font-semibold">High</span>
              <span className="text-lg font-black text-amber-400">{severity.high}</span>
            </div>
            <div className="text-[10px] text-slate-400 mt-1">Deep cracks</div>
          </div>

          {/* Critical */}
          <div className="p-3 rounded-xl bg-rose-950/20 border border-rose-500/20">
            <div className="flex items-center justify-between">
              <span className="text-xs text-rose-300 font-semibold">Critical</span>
              <span className="text-lg font-black text-rose-400">{severity.critical}</span>
            </div>
            <div className="text-[10px] text-slate-400 mt-1">Void inception</div>
          </div>
        </div>
      </div>
    </div>
  );
}
