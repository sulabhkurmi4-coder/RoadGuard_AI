import React from "react";
import { AlertTriangleIcon, ActivityIcon, TruckIcon, ShieldCheckIcon } from "@/components/icons";

interface MaintenanceSummaryCardsProps {
  criticalRoads: number;
  highRiskRoads: number;
  pendingMaintenance: number;
  formattedBudget: string;
}

export default function MaintenanceSummaryCards({
  criticalRoads,
  highRiskRoads,
  pendingMaintenance,
  formattedBudget,
}: MaintenanceSummaryCardsProps) {
  const cards = [
    {
      label: "Critical Roads",
      subtext: "P1 Immediate (PCI < 40)",
      value: criticalRoads,
      icon: AlertTriangleIcon,
      color: "text-rose-400",
      bgColor: "bg-rose-950/20",
      borderColor: "border-rose-500/40",
      badge: "Urgent Dispatch",
      badgeClass: "bg-rose-950/80 text-rose-300 border-rose-500/40",
    },
    {
      label: "High Risk Roads",
      subtext: "P2 Action Required (PCI 40–59)",
      value: highRiskRoads,
      icon: ActivityIcon,
      color: "text-amber-400",
      bgColor: "bg-amber-950/20",
      borderColor: "border-amber-500/40",
      badge: "Phase 2 Crack Infill",
      badgeClass: "bg-amber-950/80 text-amber-300 border-amber-500/40",
    },
    {
      label: "Pending Maintenance",
      subtext: "Total Scheduled Work Packages",
      value: pendingMaintenance,
      icon: TruckIcon,
      color: "text-cyan-400",
      bgColor: "bg-cyan-950/20",
      borderColor: "border-cyan-500/40",
      badge: "CMMS Synced",
      badgeClass: "bg-cyan-950/80 text-cyan-300 border-cyan-500/40",
    },
    {
      label: "Estimated Budget",
      subtext: "District Capital Allocation",
      value: formattedBudget,
      icon: ShieldCheckIcon,
      color: "text-emerald-400",
      bgColor: "bg-emerald-950/20",
      borderColor: "border-emerald-500/40",
      badge: "Prototype Estimate",
      badgeClass: "bg-emerald-950/80 text-emerald-300 border-emerald-500/40",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.label}
            className={`p-5 rounded-2xl border ${card.borderColor} ${card.bgColor} backdrop-blur-md shadow-xl flex flex-col justify-between space-y-3`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400 uppercase font-semibold">
                {card.label}
              </span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${card.badgeClass}`}>
                {card.badge}
              </span>
            </div>

            <div className="flex items-baseline justify-between pt-1">
              <div className={`text-3xl sm:text-4xl font-black font-mono tracking-tight ${card.color}`}>
                {card.value}
              </div>
              <div className={`p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 ${card.color}`}>
                <Icon size={20} />
              </div>
            </div>

            <div className="text-[11px] font-mono text-slate-500 border-t border-slate-800/80 pt-2 flex items-center justify-between">
              <span>{card.subtext}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
