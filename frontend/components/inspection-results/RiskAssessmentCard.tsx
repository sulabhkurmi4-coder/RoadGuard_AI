import React from "react";
import { RadarIcon } from "@/components/icons";

interface RiskAssessmentCardProps {
  riskPercentage: number;
  riskCategory: string;
  explanation: string;
}

export default function RiskAssessmentCard({
  riskPercentage,
  riskCategory,
  explanation,
}: RiskAssessmentCardProps) {
  return (
    <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4 flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <RadarIcon size={18} className="text-rose-400" />
            <h2 className="text-base font-bold text-white">Risk Assessment</h2>
          </div>
          <span className="text-xs font-mono text-slate-400">Probabilistic Failure Model</span>
        </div>

        {/* Risk Percentage & Category */}
        <div className="my-3 flex items-baseline justify-between font-mono">
          <div>
            <span className="text-4xl sm:text-5xl font-black text-rose-400">
              {riskPercentage}%
            </span>
            <span className="text-xs text-slate-400 ml-2">Failure Risk</span>
          </div>

          <span className="px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-rose-950/80 text-rose-300 border border-rose-500/40">
            {riskCategory}
          </span>
        </div>

        {/* Short Explanation */}
        <p className="text-xs text-slate-300 leading-relaxed font-mono pt-1">
          {explanation}
        </p>
      </div>

      <div className="pt-3 border-t border-slate-800/80 text-[11px] font-mono text-slate-400">
        Estimated Time to Base Failure: <strong className="text-amber-400">30–45 Days</strong> without preservation sealing.
      </div>
    </div>
  );
}
