"use client";

import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { TimelineForecastPoint } from "@/types/prediction";
import { TrendingDownIcon } from "@/components/icons";

interface RiskProgressionChartProps {
  timelineData: TimelineForecastPoint[];
  roadName: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    const raw = payload[0].payload as TimelineForecastPoint;
    return (
      <div className="p-3.5 rounded-xl bg-slate-950/95 border border-slate-700 shadow-2xl backdrop-blur-md text-xs font-mono space-y-1.5 z-50">
        <div className="text-white font-bold text-sm border-b border-slate-800 pb-1 flex justify-between items-center gap-4">
          <span>{label}</span>
          <span className="text-cyan-400 font-bold">{raw.projectedStatus}</span>
        </div>

        <div className="flex justify-between items-center gap-4 text-emerald-400">
          <span>Projected Health (PCI):</span>
          <strong className="text-white">{raw.projectedHealthScore} / 100</strong>
        </div>

        <div className="flex justify-between items-center gap-4 text-rose-400">
          <span>Failure Risk:</span>
          <strong className="text-rose-400">{raw.projectedRiskPercentage}%</strong>
        </div>
      </div>
    );
  }
  return null;
}

export default function RiskProgressionChart({
  timelineData,
  roadName,
}: RiskProgressionChartProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 h-80 flex items-center justify-center font-mono text-xs text-slate-500">
        Loading Recharts Risk Progression Model...
      </div>
    );
  }

  return (
    <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <TrendingDownIcon size={18} className="text-cyan-400" />
            <h2 className="text-base font-bold text-white">Risk Progression & Decay Curve</h2>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            180-Day AI structural degradation projection for {roadName}
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-400">
          <span>Decay Velocity: </span>
          <strong className="text-rose-400">Non-Linear Cliff</strong>
        </div>
      </div>

      {/* Recharts Line Chart */}
      <div className="h-72 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={timelineData}
            margin={{ top: 10, right: 15, left: -20, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis
              dataKey="dayLabel"
              stroke="#64748b"
              fontSize={11}
              fontFamily="monospace"
              tickLine={false}
            />
            <YAxis
              stroke="#64748b"
              fontSize={11}
              fontFamily="monospace"
              tickLine={false}
              domain={[0, 100]}
              tickFormatter={(v) => `${v}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{
                fontSize: "11px",
                fontFamily: "monospace",
                paddingTop: "12px",
              }}
            />

            {/* Health Score Line (Green/Cyan, decaying) */}
            <Line
              type="monotone"
              dataKey="projectedHealthScore"
              name="Projected Health Score (PCI)"
              stroke="#10b981"
              strokeWidth={3}
              dot={{ fill: "#10b981", r: 4 }}
              activeDot={{ r: 6, fill: "#34d399" }}
            />

            {/* Risk Percentage Line (Rose/Red, rising) */}
            <Line
              type="monotone"
              dataKey="projectedRiskPercentage"
              name="Projected Failure Risk (%)"
              stroke="#f43f5e"
              strokeWidth={3}
              dot={{ fill: "#f43f5e", r: 4 }}
              activeDot={{ r: 6, fill: "#fb7185" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
