"use client";

import React, { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { RiskTrendDataPoint } from "@/types/dashboard";
import { demoRiskTrendChartData } from "@/lib/dashboard-demo-data";
import { TrendingUpIcon } from "@/components/icons";

interface RiskTrendChartProps {
  data?: RiskTrendDataPoint[];
  title?: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    return (
      <div className="p-3.5 rounded-xl bg-slate-950/95 border border-slate-700 shadow-2xl backdrop-blur-md text-xs font-mono space-y-2 z-50">
        <div className="text-white font-bold text-sm border-b border-slate-800 pb-1 flex justify-between items-center gap-4">
          <span>{label} 2026 Audit Period</span>
          <span className="text-cyan-400">Monthly Snapshot</span>
        </div>

        {payload.map((entry, index) => (
          <div key={`item-${index}`} className="flex items-center justify-between gap-4">
            <span className="flex items-center gap-2 text-slate-300">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              {entry.name}:
            </span>
            <span className="font-bold text-white">
              {entry.name === "Average PCI"
                ? `${entry.value} / 100`
                : `${entry.value.toLocaleString()} mi`}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
}

export default function RiskTrendChart({
  data = demoRiskTrendChartData,
  title = "Pavement Network Risk Trend (6-Month Horizon)",
}: RiskTrendChartProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 h-80 flex items-center justify-center">
        <div className="text-xs font-mono text-slate-500 animate-pulse">
          Loading Recharts Risk Trend...
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <TrendingUpIcon size={18} className="text-cyan-400" />
            <h2 className="text-base sm:text-lg font-bold text-white">{title}</h2>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Demonstrating risk mitigation and PCI growth as autonomous maintenance packages deploy.
          </p>
        </div>

        {/* Delta Callout */}
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-1 rounded-lg">
          <span>PCI Net Growth:</span>
          <strong className="text-white">+3.8 pts</strong>
        </div>
      </div>

      {/* Recharts Area Chart */}
      <div className="h-72 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="healthyGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="riskGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#f43f5e" stopOpacity={0.0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis
              dataKey="month"
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
              tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ fontSize: "11px", fontFamily: "monospace", paddingTop: "12px" }}
            />

            <Area
              type="monotone"
              dataKey="healthyMiles"
              name="Healthy Miles"
              stroke="#10b981"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#healthyGradient)"
            />
            <Area
              type="monotone"
              dataKey="highRiskMiles"
              name="High Risk Miles"
              stroke="#f43f5e"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#riskGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
