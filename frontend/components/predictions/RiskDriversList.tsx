import React from "react";
import { RiskDriverItem } from "@/types/prediction";
import { AlertTriangleIcon, ActivityIcon, SparklesIcon } from "@/components/icons";

interface RiskDriversListProps {
  drivers: RiskDriverItem[];
}

export default function RiskDriversList({ drivers }: RiskDriversListProps) {
  const getImpactBadge = (level: RiskDriverItem["impactLevel"]) => {
    switch (level) {
      case "Critical":
        return "bg-rose-950/80 text-rose-300 border-rose-500/40";
      case "High":
        return "bg-amber-950/80 text-amber-300 border-amber-500/40";
      case "Moderate":
        return "bg-sky-950/80 text-sky-300 border-sky-500/40";
      case "Low":
        return "bg-slate-800 text-slate-300 border-slate-700";
    }
  };

  return (
    <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <AlertTriangleIcon size={18} className="text-amber-400" />
            <h2 className="text-base font-bold text-white">Contributing Risk Drivers</h2>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            Key physical and environmental parameters driving pavement matrix collapse.
          </p>
        </div>

        <span className="text-xs font-mono text-cyan-400 font-semibold">
          5 Core Variables Analyzed
        </span>
      </div>

      {/* Drivers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {drivers.map((driver) => (
          <div
            key={driver.id}
            className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between space-y-3"
          >
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm font-bold text-white">{driver.name}</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${getImpactBadge(driver.impactLevel)}`}>
                  {driver.impactLevel} Impact
                </span>
              </div>

              {/* Metric Value */}
              <div className="text-xs font-mono text-cyan-300 font-semibold mb-2">
                {driver.metricValue}
              </div>

              {/* Technical Description */}
              <p className="text-xs text-slate-300 leading-relaxed font-mono">
                {driver.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
