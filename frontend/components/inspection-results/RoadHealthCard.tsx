import React from "react";
import { RoadHealthStatus } from "@/types/inspection-results";
import { ActivityIcon, AlertTriangleIcon } from "@/components/icons";
import { getHealthDetails } from "@/lib/road-health";

interface RoadHealthCardProps {
  score: number;
  status?: RoadHealthStatus;
  statusDescription?: string;
}

export default function RoadHealthCard({
  score,
  status,
  statusDescription,
}: RoadHealthCardProps) {
  const healthDetails = getHealthDetails(score);
  const displayStatus = status || healthDetails.category;
  const displayDescription = statusDescription || healthDetails.description;
  const styling = healthDetails.styling;

  return (
    <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-5 flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <ActivityIcon size={18} className="text-cyan-400" />
            <h2 className="text-base font-bold text-white">Road Health Score</h2>
          </div>
          <span className={`px-2.5 py-1 rounded-md text-xs font-mono font-bold border ${styling.bgColor} ${styling.textColor} ${styling.borderColor}`}>
            {displayStatus}
          </span>
        </div>

        {/* Large Visual Score Gauge */}
        <div className="my-4 flex items-baseline gap-3 font-mono">
          <span className="text-6xl font-black text-white tracking-tight">
            {healthDetails.score}
          </span>
          <span className="text-lg text-slate-400 font-semibold">/ 100</span>
          <span className={`text-xs px-2 py-0.5 rounded border ml-auto font-bold ${styling.bgColor} ${styling.textColor} ${styling.borderColor}`}>
            Bracket: {healthDetails.range}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-950 h-3.5 rounded-full overflow-hidden p-0.5 border border-slate-800 mb-3">
          <div
            className={`h-full rounded-full transition-all duration-700 ${styling.progressColor}`}
            style={{ width: `${healthDetails.score}%` }}
          />
        </div>

        {/* Status Description */}
        <p className="text-xs text-slate-300 leading-relaxed font-mono">
          {displayDescription}
        </p>
      </div>

      {/* Threshold Reference Table */}
      <div className="pt-3 border-t border-slate-800/80 space-y-3">
        <div className="grid grid-cols-4 gap-1 text-[10px] font-mono text-center">
          <div className="p-1 rounded bg-slate-950 border border-slate-800">
            <span className="text-emerald-400 block font-bold">80–100</span>
            <span className="text-slate-400">Healthy</span>
          </div>
          <div className="p-1 rounded bg-slate-950 border border-slate-800">
            <span className="text-sky-400 block font-bold">60–79</span>
            <span className="text-slate-400">Moderate</span>
          </div>
          <div className="p-1 rounded bg-slate-950 border border-slate-800">
            <span className="text-amber-400 block font-bold">40–59</span>
            <span className="text-slate-400">High Risk</span>
          </div>
          <div className="p-1 rounded bg-slate-950 border border-slate-800">
            <span className="text-rose-400 block font-bold">0–39</span>
            <span className="text-slate-400">Critical</span>
          </div>
        </div>

        {/* Mandatory Prototype Disclaimer Notice */}
        <div className="p-2.5 rounded-lg bg-amber-950/40 border border-amber-500/30 text-[11px] font-mono text-amber-300 leading-snug flex items-start gap-2">
          <AlertTriangleIcon size={14} className="shrink-0 mt-0.5 text-amber-400" />
          <span>
            <strong>IMPORTANT:</strong> This is a RoadGuard prototype scoring system, not an official engineering standard.
          </span>
        </div>
      </div>
    </div>
  );
}
