import React from "react";
import Link from "next/link";
import { TruckIcon, ClockIcon, ArrowRightIcon } from "@/components/icons";

interface MaintenanceRecommendationCardProps {
  recommendedAction: string;
  priority: "P1" | "P2" | "P3" | "P4";
  suggestedTimeline: string;
  prototypeEstimatedCost: string;
}

export default function MaintenanceRecommendationCard({
  recommendedAction,
  priority,
  suggestedTimeline,
  prototypeEstimatedCost,
}: MaintenanceRecommendationCardProps) {
  const getPriorityStyle = (p: string) => {
    switch (p) {
      case "P1":
        return "bg-rose-950/80 text-rose-300 border-rose-500/40";
      case "P2":
        return "bg-amber-950/80 text-amber-300 border-amber-500/40";
      case "P3":
        return "bg-sky-950/80 text-sky-300 border-sky-500/40";
      default:
        return "bg-slate-800 text-slate-300 border-slate-700";
    }
  };

  return (
    <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4 flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <TruckIcon size={18} className="text-amber-400" />
            <h2 className="text-base font-bold text-white">Maintenance Recommendation</h2>
          </div>
          <span className={`px-2.5 py-1 rounded-md text-xs font-mono font-bold border ${getPriorityStyle(priority)}`}>
            Priority {priority}
          </span>
        </div>

        {/* Recommended Action */}
        <div className="my-3 space-y-1">
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
            Preservation Treatment
          </span>
          <div className="text-base font-bold text-white leading-snug">
            {recommendedAction}
          </div>
        </div>

        {/* Suggested Timeline & Estimated Cost */}
        <div className="grid grid-cols-2 gap-3 pt-2 font-mono text-xs">
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-1">
            <div className="flex items-center gap-1.5 text-slate-400 text-[10px] uppercase">
              <ClockIcon size={12} />
              <span>Suggested Timeline</span>
            </div>
            <div className="font-bold text-amber-300 text-xs">
              {suggestedTimeline}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-1">
            <span className="text-slate-400 text-[10px] uppercase block">
              Prototype Est. Cost
            </span>
            <div className="font-bold text-emerald-400 text-base">
              {prototypeEstimatedCost}
            </div>
          </div>
        </div>
      </div>

      <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
        <span className="text-slate-400 text-[11px]">
          Cost avoidance vs full rebuild: <strong className="text-emerald-400">$1.2M</strong>
        </span>

        <Link
          href="/maintenance"
          className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-semibold"
        >
          <span>Dispatch Unit</span>
          <ArrowRightIcon size={12} />
        </Link>
      </div>
    </div>
  );
}
