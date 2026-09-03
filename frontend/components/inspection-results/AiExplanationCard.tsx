import React from "react";
import { RiskFactor } from "@/types/inspection-results";
import { SparklesIcon, AlertTriangleIcon } from "@/components/icons";

interface AiExplanationCardProps {
  heading: string;
  factors: RiskFactor[];
  demoNotice: string;
}

export default function AiExplanationCard({
  heading,
  factors,
  demoNotice,
}: AiExplanationCardProps) {
  const getLevelBadge = (level: RiskFactor["level"]) => {
    switch (level) {
      case "Critical":
        return "text-rose-300 bg-rose-950/80 border-rose-500/40";
      case "High":
        return "text-amber-300 bg-amber-950/80 border-amber-500/40";
      case "Moderate":
        return "text-sky-300 bg-sky-950/80 border-sky-500/40";
    }
  };

  return (
    <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <SparklesIcon size={18} className="text-cyan-400" />
          <h2 className="text-base sm:text-lg font-bold text-white">{heading}</h2>
        </div>

        {/* Prototype / Demo Label */}
        <span className="px-2.5 py-1 rounded-md bg-amber-950/60 border border-amber-500/30 text-[10px] font-mono text-amber-300 font-semibold self-start sm:self-auto">
          PROTOTYPE REASONING ENGINE (SYNTHETIC)
        </span>
      </div>

      {/* 4 Example Factors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {factors.map((factor, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 hover:border-slate-700 transition-all flex flex-col justify-between space-y-2.5"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                {factor.title}
              </span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${getLevelBadge(factor.level)}`}>
                {factor.level} Impact
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed font-mono">
              {factor.description}
            </p>
          </div>
        ))}
      </div>

      {/* Clear Prototype Notice */}
      <div className="p-3 rounded-xl bg-slate-950/90 border border-slate-800 flex items-start gap-2.5 text-xs font-mono text-slate-400">
        <AlertTriangleIcon size={16} className="text-cyan-400 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong className="text-slate-200">Prototype Disclaimer: </strong>
          {demoNotice}
        </div>
      </div>
    </div>
  );
}
