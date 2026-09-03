"use client";

import React, { useState } from "react";
import {
  BarChartIcon,
  TrendingDownIcon,
  ShieldCheckIcon,
  CheckCircleIcon,
  AlertTriangleIcon,
  ClockIcon,
  SparklesIcon,
} from "./icons";

export default function PredictiveMaintenance() {
  const [activeStage, setActiveStage] = useState(0);

  const stages = [
    {
      id: "stage-1",
      phase: "Phase 1: Early Micro-Fissuring",
      timeline: "Year 0 - 2",
      costPerYd: "$2.50",
      pciRange: "PCI 85 - 100 (Good)",
      treatment: "Crack Sealing & Slurry Seal",
      actionDesc:
        "Surface fissures are sub-millimeter. Water has not compromised the crushed stone base. Low-cost preventative seal halts moisture intrusion completely.",
      savings: "Saves 95% vs rebuild",
      riskLevel: "Low Risk — Optimal Intervention Point",
      riskColor: "text-emerald-400 bg-emerald-950/60 border-emerald-500/30",
      graphPercent: 85,
    },
    {
      id: "stage-2",
      phase: "Phase 2: Accelerated Ravelling",
      timeline: "Year 3 - 4",
      costPerYd: "$16.00",
      pciRange: "PCI 60 - 84 (Fair)",
      treatment: "Mill & Thin Hot-Mix Overlay",
      actionDesc:
        "Micro-cracks have widened to 5mm+. Moisture penetration begins stripping aggregate. Requires milling top 2 inches and laying fresh bituminous surface.",
      savings: "Saves 66% vs rebuild",
      riskLevel: "Moderate Risk — Rapid Degradation Ahead",
      riskColor: "text-amber-400 bg-amber-950/60 border-amber-500/30",
      graphPercent: 55,
    },
    {
      id: "stage-3",
      phase: "Phase 3: Sub-Base Structural Collapse",
      timeline: "Year 5+",
      costPerYd: "$48.00",
      pciRange: "PCI < 50 (Critical / Failed)",
      treatment: "Full-Depth Excavation & Reconstruction",
      actionDesc:
        "Alligator cracking has disintegrated the sub-base into loose blocks. Traffic impact punches potholes through weakened foundation. Complete excavation required.",
      savings: "0% (Maximum Cost Penalty)",
      riskLevel: "Emergency — Catastrophic Failure",
      riskColor: "text-rose-400 bg-rose-950/60 border-rose-500/30",
      graphPercent: 20,
    },
  ];

  return (
    <section id="predictive-intelligence" className="relative py-24 bg-[#080d1a] border-t border-slate-800">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[400px] bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-700/80 text-xs font-mono text-cyan-400 mb-4">
            <BarChartIcon size={14} />
            <span>THE DETERIORATION CLIFF</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Fix at $2.50 or Rebuild at $48.00. The Math of Road Preservation.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400">
            Road pavements don’t fail linearly. They stay stable for years, then drop off a steep economic cliff.
            RoadGuard AI flags the exact week to seal before structural damage multiplies costs by 19x.
          </p>
        </div>

        {/* Degradation Curve & Cost Comparison Interactive Card */}
        <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Interactive Timeline Selector (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                Select Degradation Stage:
              </span>

              {stages.map((stg, idx) => (
                <div
                  key={stg.id}
                  onClick={() => setActiveStage(idx)}
                  className={`cursor-pointer rounded-xl p-4 transition-all duration-200 border text-left ${
                    activeStage === idx
                      ? "bg-slate-800/90 border-cyan-400/80 shadow-lg shadow-cyan-950/40 translate-x-1"
                      : "bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/50"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-bold text-white">{stg.phase}</span>
                    <span className="text-xs font-mono text-cyan-300 font-bold">{stg.timeline}</span>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-mono">Cost: {stg.costPerYd} / sq. yd</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono border ${stg.riskColor}`}>
                      {stg.savings}
                    </span>
                  </div>
                </div>
              ))}

              {/* Proactive ROI callout */}
              <div className="pt-4 mt-4 border-t border-slate-800 text-xs text-slate-400 leading-relaxed font-mono">
                <span className="text-cyan-300 font-semibold block mb-1">
                  &bull; The Federal Highway Administration (FHWA) Rule:
                </span>
                Every $1 spent on preventative pavement preservation avoids $6 to $10 in future full reconstruction.
              </div>
            </div>

            {/* Right: Comparative Detail Visualization (7 cols) */}
            <div className="lg:col-span-7 bg-slate-950/90 rounded-xl border border-slate-800 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                {/* Active Stage Heading */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <span className={`px-2.5 py-1 rounded text-xs font-mono border ${stages[activeStage].riskColor}`}>
                    {stages[activeStage].riskLevel}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    Health Index: <strong className="text-white">{stages[activeStage].pciRange}</strong>
                  </span>
                </div>

                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-4xl font-black font-mono text-white">
                    {stages[activeStage].costPerYd}
                  </span>
                  <span className="text-sm font-medium text-slate-400">per square yard estimated repair</span>
                </div>

                <div className="text-base font-semibold text-cyan-300 mb-3">
                  Recommended Treatment: {stages[activeStage].treatment}
                </div>

                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  {stages[activeStage].actionDesc}
                </p>
              </div>

              {/* Visual Health Gauge Bar */}
              <div className="pt-6 border-t border-slate-800">
                <div className="flex justify-between text-xs font-mono text-slate-400 mb-2">
                  <span>Pavement Structural Integrity</span>
                  <span className="text-white font-bold">{stages[activeStage].graphPercent}% remaining</span>
                </div>

                <div className="w-full bg-slate-900 h-3 rounded-full overflow-hidden p-0.5 border border-slate-800">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      activeStage === 0
                        ? "bg-gradient-to-r from-emerald-500 to-cyan-400 w-[85%]"
                        : activeStage === 1
                        ? "bg-gradient-to-r from-amber-500 to-yellow-400 w-[55%]"
                        : "bg-gradient-to-r from-rose-600 to-red-500 w-[20%]"
                    }`}
                  />
                </div>

                {/* Economic Summary Badges */}
                <div className="grid grid-cols-3 gap-3 mt-6 pt-4 text-center font-mono border-t border-slate-800/80">
                  <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800">
                    <div className="text-[10px] text-slate-400 uppercase">Year 1 Cost</div>
                    <div className="text-base font-bold text-emerald-400 mt-0.5">$2.50/yd</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800">
                    <div className="text-[10px] text-slate-400 uppercase">Year 3 Cost</div>
                    <div className="text-base font-bold text-amber-400 mt-0.5">$16.00/yd</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800">
                    <div className="text-[10px] text-slate-400 uppercase">Year 5+ Cost</div>
                    <div className="text-base font-bold text-rose-400 mt-0.5">$48.00/yd</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits for Municipalities & DOTs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircleIcon size={20} className="text-emerald-400" />
              <h4 className="text-sm font-bold text-white">State DOT Legislative Reporting</h4>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Generate transparent, audit-ready asset depreciation curves and multi-year funding requests with objective
              AI telemetry.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center gap-3 mb-2">
              <ShieldCheckIcon size={20} className="text-cyan-400" />
              <h4 className="text-sm font-bold text-white">Reduced Public Liability Claims</h4>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Eliminate tire blowouts and vehicle damage tort claims by preemptively filling sub-base voids before rim-bending
              potholes form.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center gap-3 mb-2">
              <ClockIcon size={20} className="text-purple-400" />
              <h4 className="text-sm font-bold text-white">Carbon & Traffic Disruption Savings</h4>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Nighttime slurry seals cause 90% fewer traffic delays than month-long lane closures required for full-depth
              emergency rebuilding.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
