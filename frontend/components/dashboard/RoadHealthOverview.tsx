import React from "react";
import { RoadHealthOverviewData } from "@/types/dashboard";
import { CheckCircleIcon, AlertTriangleIcon, ActivityIcon } from "@/components/icons";

interface RoadHealthOverviewProps {
  healthData: RoadHealthOverviewData;
}

export default function RoadHealthOverview({ healthData }: RoadHealthOverviewProps) {
  const tiers = [
    healthData.healthy,
    healthData.moderate,
    healthData.highRisk,
    healthData.critical,
  ];

  return (
    <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <ActivityIcon size={18} className="text-cyan-400" />
            <h2 className="text-base sm:text-lg font-bold text-white">Road Health Overview</h2>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Network-wide distribution by ASTM D6433 Pavement Condition Index (PCI).
          </p>
        </div>

        {/* Average Network PCI Indicator */}
        <div className="flex items-center gap-3 px-3 py-1.5 rounded-xl bg-slate-950/80 border border-slate-800 font-mono">
          <span className="text-xs text-slate-400">Network Average PCI:</span>
          <span className="text-base font-black text-cyan-400">{healthData.averagePci} / 100</span>
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-950 text-cyan-300 border border-cyan-500/30">
            Fair-to-Good
          </span>
        </div>
      </div>

      {/* Composite Segmented Health Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs font-mono text-slate-400">
          <span>Overall Network Condition Spectrum</span>
          <span>100% of Monitored Grid</span>
        </div>

        <div className="w-full h-4 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800 flex gap-0.5">
          <div
            style={{ width: `${healthData.healthy.percentage}%` }}
            className="h-full bg-emerald-500 rounded-l-full transition-all duration-500 hover:opacity-90"
            title={`Healthy: ${healthData.healthy.percentage}%`}
          />
          <div
            style={{ width: `${healthData.moderate.percentage}%` }}
            className="h-full bg-sky-400 transition-all duration-500 hover:opacity-90"
            title={`Moderate: ${healthData.moderate.percentage}%`}
          />
          <div
            style={{ width: `${healthData.highRisk.percentage}%` }}
            className="h-full bg-amber-400 transition-all duration-500 hover:opacity-90"
            title={`High Risk: ${healthData.highRisk.percentage}%`}
          />
          <div
            style={{ width: `${healthData.critical.percentage}%` }}
            className="h-full bg-rose-500 rounded-r-full transition-all duration-500 hover:opacity-90"
            title={`Critical: ${healthData.critical.percentage}%`}
          />
        </div>
      </div>

      {/* 4 Health Category Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {tiers.map((tier) => (
          <div
            key={tier.key}
            className={`p-4 rounded-xl border ${tier.bgColor} ${tier.borderColor} flex flex-col justify-between space-y-3 transition-all hover:translate-y-[-2px]`}
          >
            <div>
              {/* Header: Label + PCI */}
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 font-bold text-white text-sm">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: tier.color }}
                  />
                  {tier.label}
                </span>
                <span className={`text-xs font-mono font-bold ${tier.textColor}`}>
                  {tier.pciRange}
                </span>
              </div>

              {/* Lane Miles & Percentage */}
              <div className="mt-3 flex items-baseline justify-between font-mono">
                <span className="text-2xl font-black text-white">
                  {tier.percentage.toFixed(1)}%
                </span>
                <span className="text-xs text-slate-400">
                  {tier.laneMiles.toLocaleString()} mi
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-[11px] text-slate-400 leading-relaxed pt-2 border-t border-slate-800/60">
              {tier.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
