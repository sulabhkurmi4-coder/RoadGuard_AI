import React from "react";
import Link from "next/link";
import { SparklesIcon, TruckIcon, AlertTriangleIcon, CheckCircleIcon } from "@/components/icons";

interface RecommendationData {
  title: string;
  action: string;
  urgencyWindow: string;
  preservationCost: string;
  rebuildPenaltyIfDeferred: string;
  netSavings: string;
}

interface PredictionExplanationCardProps {
  explanation: string;
  recommendation: RecommendationData;
  disclaimer: string;
}

export default function PredictionExplanationCard({
  explanation,
  recommendation,
  disclaimer,
}: PredictionExplanationCardProps) {
  return (
    <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-6">
      {/* 6. Section Heading: "Why is this road expected to deteriorate?" */}
      <div className="space-y-3 pb-5 border-b border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <SparklesIcon size={18} className="text-cyan-400" />
            <h2 className="text-base sm:text-lg font-bold text-white">
              Why is this road expected to deteriorate?
            </h2>
          </div>

          <span className="px-2.5 py-1 rounded bg-amber-950/60 border border-amber-500/30 text-[10px] font-mono text-amber-300 font-bold self-start sm:self-auto">
            PROTOTYPE PREDICTION
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-mono">
          {explanation}
        </p>
      </div>

      {/* 7. Section: Prototype Recommendation Based on Risk */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TruckIcon size={18} className="text-amber-400" />
            <h3 className="text-base font-bold text-white">
              Prototype Recommendation & Capital Preservation ROI
            </h3>
          </div>
          <span className="text-xs font-mono text-emerald-400 font-semibold">
            Preservation Window: {recommendation.urgencyWindow}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          {/* Action Card (7 cols) */}
          <div className="lg:col-span-7 p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3 flex flex-col justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold tracking-wider">
                Recommended Intervention Plan
              </span>
              <div className="text-base font-bold text-white">
                {recommendation.title}
              </div>
              <p className="text-xs text-slate-300 font-mono leading-relaxed pt-1">
                {recommendation.action}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">Target Action Window:</span>
              <strong className="text-amber-400">{recommendation.urgencyWindow}</strong>
            </div>
          </div>

          {/* ROI Metric Card (5 cols) */}
          <div className="lg:col-span-5 p-5 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col justify-between space-y-3 font-mono">
            <div className="space-y-2">
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                Economic Impact Comparison
              </span>

              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Preservation Cost Now:</span>
                <span className="text-emerald-400 font-bold">{recommendation.preservationCost}</span>
              </div>

              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Rebuild Cost if Deferred:</span>
                <span className="text-rose-400 font-bold">{recommendation.rebuildPenaltyIfDeferred}</span>
              </div>

              <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-xs">
                <span className="text-cyan-300 font-bold">Net Capital Preserved:</span>
                <span className="text-emerald-300 font-black text-sm">{recommendation.netSavings}</span>
              </div>
            </div>

            <Link
              href="/maintenance"
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-bold transition-all shadow-sm"
            >
              <TruckIcon size={14} />
              <span>Dispatch Work Order to Maintenance Queue</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Prototype ML Disclaimer Box */}
      <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 flex items-start gap-2.5 text-xs font-mono text-slate-400">
        <AlertTriangleIcon size={16} className="text-amber-400 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong className="text-slate-200">Prototype Disclaimer: </strong>
          {disclaimer}
        </div>
      </div>
    </div>
  );
}
