import React from "react";
import { RISK_CATEGORY_COLORS } from "@/lib/risk-map-service";
import { RoadHealthCategory } from "@/lib/road-health";

export default function RiskMapLegend() {
  const tiers: { label: RoadHealthCategory; scoreRange: string; color: string }[] = [
    { label: "Healthy", scoreRange: "80–100", color: RISK_CATEGORY_COLORS.Healthy },
    { label: "Moderate", scoreRange: "60–79", color: RISK_CATEGORY_COLORS.Moderate },
    { label: "High Risk", scoreRange: "40–59", color: RISK_CATEGORY_COLORS["High Risk"] },
    { label: "Critical", scoreRange: "0–39", color: RISK_CATEGORY_COLORS.Critical },
  ];

  return (
    <div className="p-3.5 sm:p-4 rounded-xl bg-slate-950/90 border border-slate-800/90 shadow-2xl backdrop-blur-md space-y-2.5 text-xs font-mono w-[calc(100vw-3rem)] max-w-xs">
      <div className="flex items-center justify-between pb-1.5 border-b border-slate-800">
        <span className="font-bold text-white uppercase tracking-wider text-[11px]">
          Road Risk Classification
        </span>
        <span className="text-[10px] text-cyan-400 font-semibold">GIS Layer</span>
      </div>

      <div className="space-y-1.5">
        {tiers.map((tier) => (
          <div key={tier.label} className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span
                className="w-3.5 h-1.5 rounded-full shrink-0"
                style={{ backgroundColor: tier.color }}
              />
              <span className="text-slate-200 text-xs font-medium">{tier.label}</span>
            </div>
            <span className="text-slate-400 text-[11px] font-mono">
              PCI {tier.scoreRange}
            </span>
          </div>
        ))}
      </div>

      <div className="pt-2 border-t border-slate-800 text-[9px] text-slate-500 leading-tight">
        * Prototype demonstration thresholds. Not an official DOT engineering standard.
      </div>
    </div>
  );
}
