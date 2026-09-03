import React from "react";
import Link from "next/link";
import { AiInsight } from "@/types/dashboard";
import { SparklesIcon, TrendingDownIcon, AlertTriangleIcon, CheckCircleIcon } from "@/components/icons";

interface AiInsightsPanelProps {
  insights: AiInsight[];
}

export default function AiInsightsPanel({ insights }: AiInsightsPanelProps) {
  const getCategoryTheme = (category: AiInsight["category"]) => {
    switch (category) {
      case "Economic Preservation":
        return {
          badgeColor: "text-emerald-300 bg-emerald-950/80 border-emerald-500/40",
          glowBorder: "hover:border-emerald-500/50",
        };
      case "Climate Hazard Alert":
        return {
          badgeColor: "text-amber-300 bg-amber-950/80 border-amber-500/40",
          glowBorder: "hover:border-amber-500/50",
        };
      case "Structural Anomaly":
        return {
          badgeColor: "text-rose-300 bg-rose-950/80 border-rose-500/40",
          glowBorder: "hover:border-rose-500/50",
        };
      default:
        return {
          badgeColor: "text-cyan-300 bg-cyan-950/80 border-cyan-500/40",
          glowBorder: "hover:border-cyan-500/50",
        };
    }
  };

  return (
    <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <SparklesIcon size={18} className="text-cyan-400" />
          <h2 className="text-base sm:text-lg font-bold text-white">
            Autonomous AI Insights & Predictive Warnings
          </h2>
        </div>
        <span className="text-xs font-mono text-cyan-400 font-semibold flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
          Neural Engine v4.2 Active
        </span>
      </div>

      {/* Insights Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {insights.map((insight) => {
          const theme = getCategoryTheme(insight.category);
          return (
            <div
              key={insight.id}
              className={`p-5 rounded-xl bg-slate-950/80 border border-slate-800 ${theme.glowBorder} transition-all flex flex-col justify-between space-y-4`}
            >
              <div>
                {/* Header: Category & Timestamp */}
                <div className="flex items-center justify-between gap-2 mb-3 text-xs font-mono">
                  <span className={`px-2 py-0.5 rounded text-[10px] border font-bold ${theme.badgeColor}`}>
                    {insight.category}
                  </span>
                  <span className="text-slate-500 text-[11px]">{insight.timestamp}</span>
                </div>

                {/* Title */}
                <h3 className="text-sm sm:text-base font-bold text-white mb-2 leading-snug">
                  {insight.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {insight.description}
                </p>
              </div>

              <div className="space-y-3 pt-3 border-t border-slate-800/80">
                {/* Impact Metric */}
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">Quantified Impact:</span>
                  <span className="text-white font-bold px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
                    {insight.impactMetric}
                  </span>
                </div>

                {/* Action Recommendation */}
                <div className="p-2.5 rounded-lg bg-cyan-950/30 border border-cyan-500/20 text-xs">
                  <div className="text-[10px] font-mono text-cyan-400 uppercase font-semibold mb-0.5">
                    Recommended Action:
                  </div>
                  <div className="text-slate-200 text-xs font-medium">
                    {insight.actionRecommendation}
                  </div>
                </div>

                {/* Confidence */}
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 pt-1">
                  <span>Confidence: <strong>{insight.confidence}%</strong></span>
                  <Link href="/predictions" className="text-cyan-400 hover:text-cyan-300">
                    Model Trace &rarr;
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
