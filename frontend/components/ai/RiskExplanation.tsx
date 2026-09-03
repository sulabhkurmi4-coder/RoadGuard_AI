"use client";

import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { SparklesIcon, AlertTriangleIcon } from "@/components/icons";

export interface RiskFactorContribution {
  name: string;
  contributionPercentage: number; // e.g. 34 (represents +34% contribution to failure risk)
  metricValue: string; // e.g. "6.4 cavities / 100m"
  color: string;
  description: string;
}

interface RiskExplanationProps {
  title?: string;
  factors?: RiskFactorContribution[];
  roadName?: string;
}

export const defaultRiskContributions: RiskFactorContribution[] = [
  {
    name: "Pothole density",
    contributionPercentage: 34,
    metricValue: "6.4 voids / 100m",
    color: "#f43f5e", // Rose
    description:
      "Surface cavity punch-throughs allow hydraulic impact directly on untreated sub-base foundation.",
  },
  {
    name: "Rainfall",
    contributionPercentage: 24,
    metricValue: "42mm (3 freeze cycles)",
    color: "#f59e0b", // Amber
    description:
      "Precipitation infiltrates unsealed transverse seams, expanding 9% during overnight freezes.",
  },
  {
    name: "Traffic exposure",
    contributionPercentage: 19,
    metricValue: "148k AADT (82k ESALs)",
    color: "#38bdf8", // Sky
    description:
      "Heavy freight truck axle repetitions compound shear stress along wheel track lines.",
  },
  {
    name: "Road age",
    contributionPercentage: 14,
    metricValue: "8.4 years since mill",
    color: "#a855f7", // Purple
    description:
      "Thermal UV oxidation has oxidized bitumen binder, reducing aggregate flexibility.",
  },
  {
    name: "Previous road condition",
    contributionPercentage: 9,
    metricValue: "Level 3 fatigue history",
    color: "#10b981", // Emerald
    description:
      "Prior season micro-fissures created established sub-surface moisture migration routes.",
  },
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    const item = payload[0].payload as RiskFactorContribution;
    return (
      <div className="p-3.5 rounded-xl bg-slate-950/95 border border-slate-700 shadow-2xl backdrop-blur-md text-xs font-mono space-y-1.5 z-50">
        <div className="flex items-center justify-between gap-4 border-b border-slate-800 pb-1">
          <span className="font-bold text-white text-sm">{item.name}</span>
          <span className="text-cyan-400 font-bold">+{item.contributionPercentage}% Risk SHAP</span>
        </div>
        <div className="text-slate-300">
          Observed Value: <strong className="text-white">{item.metricValue}</strong>
        </div>
        <div className="text-slate-400 text-[11px] leading-relaxed pt-1">
          {item.description}
        </div>
      </div>
    );
  }
  return null;
}

export default function RiskExplanation({
  title = "Why is this road high risk?",
  factors = defaultRiskContributions,
  roadName,
}: RiskExplanationProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-6">
      {/* Header */}
      <div className="space-y-2 pb-4 border-b border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <SparklesIcon size={18} className="text-cyan-400" />
            <h2 className="text-base sm:text-lg font-bold text-white">{title}</h2>
          </div>

          <span className="px-2.5 py-1 rounded bg-slate-950 border border-slate-800 text-[10px] font-mono text-cyan-400 font-semibold self-start sm:self-auto">
            EXPLAINABLE AI (XAI) ATTRIBUTION
          </span>
        </div>

        {roadName && (
          <p className="text-xs font-mono text-slate-400">
            Feature importance and deterioration drivers for: <span className="text-slate-200 font-semibold">{roadName}</span>
          </p>
        )}
      </div>

      {/* Horizontal Contribution Chart (Recharts Horizontal Layout) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-mono text-slate-400">
          <span>Feature Contribution to Failure Risk (%)</span>
          <span>Relative Attribution Weight</span>
        </div>

        {mounted ? (
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={factors}
                margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
                <XAxis
                  type="number"
                  domain={[0, 40]}
                  stroke="#64748b"
                  fontSize={11}
                  fontFamily="monospace"
                  tickLine={false}
                  tickFormatter={(v) => `+${v}%`}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  stroke="#94a3b8"
                  fontSize={11}
                  fontFamily="monospace"
                  tickLine={false}
                  width={140}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="contributionPercentage"
                  radius={[0, 6, 6, 0]}
                  animationDuration={1000}
                >
                  {factors.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="h-64 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-center font-mono text-xs text-slate-500">
            Loading XAI Contribution Chart...
          </div>
        )}
      </div>

      {/* Factor Detail Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
        {factors.map((factor) => (
          <div
            key={factor.name}
            className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80 hover:border-slate-700 transition-all flex flex-col justify-between space-y-2"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: factor.color }}
                />
                {factor.name}
              </span>
              <span
                className="text-xs font-mono font-bold px-1.5 py-0.5 rounded"
                style={{
                  color: factor.color,
                  backgroundColor: `${factor.color}15`,
                }}
              >
                +{factor.contributionPercentage}%
              </span>
            </div>

            <div className="text-[11px] font-mono text-slate-400">
              Observed: <span className="text-slate-200 font-semibold">{factor.metricValue}</span>
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed font-mono pt-1 border-t border-slate-900">
              {factor.description}
            </p>
          </div>
        ))}
      </div>

      {/* Mandatory Prototype Label Disclaimer */}
      <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-500/30 flex items-start gap-2.5 text-xs font-mono text-amber-300">
        <AlertTriangleIcon size={16} className="text-amber-400 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          Prototype explanation — actual SHAP values will be connected after the ML model is implemented.
        </div>
      </div>
    </div>
  );
}
