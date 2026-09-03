import React from "react";
import { NetworkStatistics } from "@/types/dashboard";
import {
  BarChartIcon,
  RadarIcon,
  AlertTriangleIcon,
  CheckCircleIcon,
  ActivityIcon,
} from "@/components/icons";

interface NetworkStatsProps {
  stats: NetworkStatistics;
}

export default function NetworkStats({ stats }: NetworkStatsProps) {
  const cards = [
    {
      title: "Total Road Network",
      value: `${stats.totalRoadNetworkMiles.toLocaleString()} mi`,
      subValue: `${stats.totalRoadNetworkKm.toLocaleString()} km`,
      badge: "Jurisdiction Grid",
      badgeColor: "text-slate-300 bg-slate-800 border-slate-700",
      description: "Complete state highway and municipal arterial network",
      progress: 100,
      progressColor: "bg-cyan-500",
      icon: BarChartIcon,
      iconColor: "text-cyan-400 bg-cyan-950/60 border-cyan-500/30",
    },
    {
      title: "Roads Inspected",
      value: `${stats.roadsInspectedMiles.toLocaleString()} mi`,
      subValue: `${stats.roadsInspectedKm.toLocaleString()} km`,
      badge: `${stats.inspectedPercentage}% Monitored`,
      badgeColor: "text-emerald-300 bg-emerald-950/80 border-emerald-500/40",
      description: "Scanned via mobile LiDAR and 8K multispectral vision",
      progress: stats.inspectedPercentage,
      progressColor: "bg-emerald-400",
      icon: CheckCircleIcon,
      iconColor: "text-emerald-400 bg-emerald-950/60 border-emerald-500/30",
    },
    {
      title: "Critical Roads",
      value: `${stats.criticalRoadsMiles.toLocaleString()} mi`,
      subValue: `${stats.criticalRoadsKm.toLocaleString()} km`,
      badge: `${stats.criticalPercentage}% Critical`,
      badgeColor: "text-rose-300 bg-rose-950/80 border-rose-500/40",
      description: "PCI < 40: Sub-base collapse & severe alligator cracking",
      progress: stats.criticalPercentage * 4, // Visual emphasis
      progressColor: "bg-rose-500",
      icon: AlertTriangleIcon,
      iconColor: "text-rose-400 bg-rose-950/60 border-rose-500/30",
    },
    {
      title: "High Risk Roads",
      value: `${stats.highRiskRoadsMiles.toLocaleString()} mi`,
      subValue: `${stats.highRiskRoadsKm.toLocaleString()} km`,
      badge: `${stats.highRiskPercentage}% High Risk`,
      badgeColor: "text-amber-300 bg-amber-950/80 border-amber-500/40",
      description: "PCI 40–59: Accelerating ravelling & joint moisture ingress",
      progress: stats.highRiskPercentage * 2.5,
      progressColor: "bg-amber-400",
      icon: ActivityIcon,
      iconColor: "text-amber-400 bg-amber-950/60 border-amber-500/30",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div
            key={idx}
            className="p-5 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between space-y-3 group"
          >
            {/* Header: Title & Icon */}
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
                  {card.title}
                </span>
                <div className="text-2xl sm:text-3xl font-black font-mono text-white tracking-tight group-hover:text-cyan-200 transition-colors">
                  {card.value}
                </div>
              </div>
              <div className={`p-2.5 rounded-xl border ${card.iconColor}`}>
                <Icon size={18} />
              </div>
            </div>

            {/* Sub-value & Progress Bar */}
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-500">{card.subValue}</span>
                <span className={`px-2 py-0.5 rounded text-[10px] border font-bold ${card.badgeColor}`}>
                  {card.badge}
                </span>
              </div>

              {/* Progress Line */}
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${card.progressColor}`}
                  style={{ width: `${Math.min(card.progress, 100)}%` }}
                />
              </div>
            </div>

            {/* Description note */}
            <div className="text-[11px] text-slate-400 pt-1 border-t border-slate-800/60 leading-tight">
              {card.description}
            </div>
          </div>
        );
      })}
    </div>
  );
}
