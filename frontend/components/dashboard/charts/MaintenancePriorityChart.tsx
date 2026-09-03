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
  Legend,
} from "recharts";
import { MaintenancePriorityChartItem } from "@/types/dashboard";
import { demoMaintenancePriorityChartData } from "@/lib/dashboard-demo-data";
import { TruckIcon } from "@/components/icons";

interface MaintenancePriorityChartProps {
  data?: MaintenancePriorityChartItem[];
  title?: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    const raw = payload[0].payload as MaintenancePriorityChartItem;
    const savings = raw.deferredPenalty - raw.preservationCost;

    return (
      <div className="p-3.5 rounded-xl bg-slate-950/95 border border-slate-700 shadow-2xl backdrop-blur-md text-xs font-mono space-y-2 z-50">
        <div className="text-white font-bold text-sm border-b border-slate-800 pb-1 flex justify-between items-center gap-4">
          <span>{label}</span>
          <span className="text-amber-400">{raw.workOrders} Work Orders</span>
        </div>

        <div className="space-y-1">
          <div className="flex items-center justify-between gap-4 text-emerald-400">
            <span>Preservation Cost:</span>
            <span className="font-bold">${raw.preservationCost}k (${(raw.preservationCost * 1000).toLocaleString()})</span>
          </div>

          <div className="flex items-center justify-between gap-4 text-rose-400">
            <span>Deferred Rebuild Penalty:</span>
            <span className="font-bold">${raw.deferredPenalty}k (${(raw.deferredPenalty * 1000).toLocaleString()})</span>
          </div>
        </div>

        <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-cyan-300 font-semibold text-[11px]">
          <span>Net Capital Preservation:</span>
          <span>+${savings}k saved</span>
        </div>
      </div>
    );
  }
  return null;
}

export default function MaintenancePriorityChart({
  data = demoMaintenancePriorityChartData,
  title = "Maintenance Cost vs. Deferred Rebuild Penalty",
}: MaintenancePriorityChartProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 h-80 flex items-center justify-center">
        <div className="text-xs font-mono text-slate-500 animate-pulse">
          Loading Recharts Maintenance Priority Chart...
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
            <TruckIcon size={18} className="text-amber-400" />
            <h2 className="text-base sm:text-lg font-bold text-white">{title}</h2>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Demonstrating capital preservation ROI: immediate micro-surfacing vs catastrophic deferred rebuilding.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-cyan-300 bg-cyan-950/60 border border-cyan-500/30 px-2.5 py-1 rounded-lg">
          <span>Average Cost Reduction:</span>
          <strong className="text-white">74%</strong>
        </div>
      </div>

      {/* Recharts Bar Chart */}
      <div className="h-72 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            barGap={6}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            <XAxis
              dataKey="category"
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
              tickFormatter={(v) => `$${v}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ fontSize: "11px", fontFamily: "monospace", paddingTop: "12px" }}
            />

            <Bar
              dataKey="preservationCost"
              name="Preservation Cost ($k)"
              fill="#10b981"
              radius={[4, 4, 0, 0]}
              animationDuration={1000}
            />
            <Bar
              dataKey="deferredPenalty"
              name="Deferred Rebuild Penalty ($k)"
              fill="#f43f5e"
              radius={[4, 4, 0, 0]}
              animationDuration={1000}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
