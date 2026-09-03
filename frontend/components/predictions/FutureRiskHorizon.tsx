import React from "react";
import { RoadHealthCategory } from "@/lib/road-health";
import { ClockIcon, AlertTriangleIcon, TrendingDownIcon } from "@/components/icons";

interface ForecastPeriod {
  health: number;
  risk: number;
  status: RoadHealthCategory;
}

interface FutureRiskHorizonProps {
  thirtyDays: ForecastPeriod;
  sixtyDays: ForecastPeriod;
  ninetyDays: ForecastPeriod;
}

export default function FutureRiskHorizon({
  thirtyDays,
  sixtyDays,
  ninetyDays,
}: FutureRiskHorizonProps) {
  const periods = [
    {
      label: "30 Days Forecast",
      subLabel: "Immediate Horizon",
      data: thirtyDays,
      borderColor: "border-sky-500/40",
      accentColor: "text-sky-400",
      bgGlow: "bg-sky-950/20",
    },
    {
      label: "60 Days Forecast",
      subLabel: "Seasonal Window",
      data: sixtyDays,
      borderColor: "border-amber-500/40",
      accentColor: "text-amber-400",
      bgGlow: "bg-amber-950/20",
    },
    {
      label: "90 Days Forecast",
      subLabel: "Critical Cliff",
      data: ninetyDays,
      borderColor: "border-rose-500/40",
      accentColor: "text-rose-400",
      bgGlow: "bg-rose-950/20",
    },
  ];

  return (
    <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <ClockIcon size={18} className="text-purple-400" />
          <h2 className="text-base font-bold text-white">Future Risk Trajectory (30 / 60 / 90 Days)</h2>
        </div>
        <span className="text-xs font-mono text-slate-400">Degradation Velocity Model</span>
      </div>

      {/* 30, 60, 90 Days Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {periods.map((period) => (
          <div
            key={period.label}
            className={`p-5 rounded-xl border ${period.borderColor} ${period.bgGlow} flex flex-col justify-between space-y-4 shadow-lg`}
          >
            <div>
              <div className="flex items-center justify-between text-xs font-mono mb-1">
                <span className="font-bold text-white text-sm">{period.label}</span>
                <span className={`px-2 py-0.5 rounded text-[10px] border font-bold ${
                  period.data.status === "Critical"
                    ? "bg-rose-950/80 text-rose-300 border-rose-500/40"
                    : period.data.status === "High Risk"
                    ? "bg-amber-950/80 text-amber-300 border-amber-500/40"
                    : "bg-sky-950/80 text-sky-300 border-sky-500/40"
                }`}>
                  {period.data.status}
                </span>
              </div>
              <span className="text-[11px] font-mono text-slate-400 block mb-3">
                {period.subLabel}
              </span>

              {/* Metrics */}
              <div className="grid grid-cols-2 gap-3 pt-1 border-t border-slate-800/80 font-mono">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block">Est. Health</span>
                  <span className="text-2xl font-black text-white">
                    {period.data.health}
                    <span className="text-xs text-slate-500 font-normal"> / 100</span>
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block">Failure Risk</span>
                  <span className={`text-2xl font-black ${period.accentColor}`}>
                    {period.data.risk}%
                  </span>
                </div>
              </div>
            </div>

            {/* Risk bar */}
            <div className="space-y-1">
              <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${
                    period.data.risk > 80
                      ? "bg-rose-500"
                      : period.data.risk > 60
                      ? "bg-amber-400"
                      : "bg-sky-400"
                  }`}
                  style={{ width: `${period.data.risk}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
