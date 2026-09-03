import React from "react";
import { getHealthStyling } from "@/lib/road-health";
import { ActivityIcon, AlertTriangleIcon } from "@/components/icons";

interface CurrentConditionCardProps {
  healthScore: number;
  currentRisk: number;
  currentCondition: string;
  roadName: string;
  roadId: string;
}

export default function CurrentConditionCard({
  healthScore,
  currentRisk,
  currentCondition,
  roadName,
  roadId,
}: CurrentConditionCardProps) {
  const styling = getHealthStyling(healthScore);

  return (
    <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-5 flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <ActivityIcon size={18} className="text-cyan-400" />
            <h2 className="text-base font-bold text-white">Current Pavement Condition</h2>
          </div>
          <span className={`px-2.5 py-1 rounded text-xs font-mono font-bold border ${styling.badgeClass}`}>
            {roadId}
          </span>
        </div>

        {/* Dual Gauges: Health Score & Current Risk */}
        <div className="grid grid-cols-2 gap-4 my-4 font-mono">
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">
              Health Score (PCI)
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl sm:text-5xl font-black text-white">
                {healthScore}
              </span>
              <span className="text-xs text-slate-400">/ 100</span>
            </div>
            {/* Progress Bar */}
            <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden mt-2">
              <div
                className={`h-full rounded-full transition-all duration-700 ${styling.progressColor}`}
                style={{ width: `${healthScore}%` }}
              />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">
              Current Failure Risk
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl sm:text-5xl font-black text-rose-400">
                {currentRisk}%
              </span>
            </div>
            {/* Risk Bar */}
            <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden mt-2">
              <div
                className="h-full rounded-full bg-rose-500 transition-all duration-700"
                style={{ width: `${currentRisk}%` }}
              />
            </div>
          </div>
        </div>

        {/* Current Condition Statement */}
        <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs font-mono space-y-1">
          <span className="text-slate-500 text-[10px] uppercase font-semibold block">
            Baseline Physical Condition
          </span>
          <p className="text-slate-300 leading-relaxed">
            {currentCondition}
          </p>
        </div>
      </div>

      <div className="pt-2 text-[11px] font-mono text-slate-500 flex items-center justify-between">
        <span>Target: {roadName}</span>
        <span className="text-cyan-400">Standard: ASTM D6433</span>
      </div>
    </div>
  );
}
