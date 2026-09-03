import React from "react";
import Link from "next/link";
import { MaintenancePriorityItem } from "@/types/dashboard";
import { TruckIcon, AlertTriangleIcon, ClockIcon, ArrowRightIcon } from "@/components/icons";

interface MaintenancePrioritySectionProps {
  priorities: MaintenancePriorityItem[];
}

export default function MaintenancePrioritySection({
  priorities,
}: MaintenancePrioritySectionProps) {
  const getBadgeStyle = (level: MaintenancePriorityItem["priorityLevel"]) => {
    switch (level) {
      case "P1_URGENT":
        return {
          label: "P1 Urgent (7 Days)",
          style: "bg-rose-950/80 text-rose-300 border-rose-500/40",
        };
      case "P2_HIGH":
        return {
          label: "P2 High (14 Days)",
          style: "bg-amber-950/80 text-amber-300 border-amber-500/40",
        };
      case "P3_MEDIUM":
        return {
          label: "P3 Medium (30 Days)",
          style: "bg-cyan-950/80 text-cyan-300 border-cyan-500/40",
        };
    }
  };

  return (
    <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <TruckIcon size={18} className="text-amber-400" />
            <h2 className="text-base sm:text-lg font-bold text-white">
              Maintenance Priority & Action Triage
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Preservation packages ranked by economic ROI and sub-base failure risk.
          </p>
        </div>

        <Link
          href="/maintenance"
          className="inline-flex items-center gap-1 text-xs font-mono text-cyan-400 hover:text-cyan-300 font-semibold"
        >
          <span>Open Full CMMS Queue ({priorities.length} Active)</span>
          <ArrowRightIcon size={13} />
        </Link>
      </div>

      {/* Priority Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {priorities.map((item) => {
          const badge = getBadgeStyle(item.priorityLevel);
          return (
            <div
              key={item.id}
              className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between space-y-4"
            >
              <div>
                {/* Header: ID, Priority, Date */}
                <div className="flex items-center justify-between gap-2 mb-2 text-xs font-mono">
                  <span className={`px-2 py-0.5 rounded border font-bold ${badge.style}`}>
                    {badge.label}
                  </span>
                  <span className="text-slate-400 flex items-center gap-1">
                    <ClockIcon size={12} /> Target: {item.targetResolutionDate}
                  </span>
                </div>

                {/* Title & Corridor */}
                <h3 className="text-sm sm:text-base font-bold text-white mb-1">
                  {item.title}
                </h3>
                <div className="text-xs font-mono text-cyan-300/90 mb-3">
                  {item.corridor} • {item.milepost}
                </div>

                {/* Defect Summary */}
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {item.defectSummary}
                </p>

                {/* Action & Materials Box */}
                <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800/90 text-xs font-mono space-y-1.5">
                  <div className="text-slate-200">
                    <span className="text-slate-500">Treatment: </span>
                    <span className="text-cyan-300 font-semibold">{item.recommendedAction}</span>
                  </div>
                  <div className="text-slate-400 text-[11px]">
                    <span className="text-slate-500">Unit / Mat: </span>
                    <span>{item.assignedUnit} • {item.materialsNeeded}</span>
                  </div>
                </div>
              </div>

              {/* Economic Comparison Footer */}
              <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 font-mono text-xs">
                <div>
                  <span className="text-slate-500 text-[10px] uppercase block">Preservation Cost</span>
                  <span className="text-emerald-400 font-bold">{item.estimatedCost}</span>
                </div>

                <div className="text-right">
                  <span className="text-slate-500 text-[10px] uppercase block">Cost If Deferred</span>
                  <span className="text-rose-400 font-bold">{item.deferralPenalty}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
