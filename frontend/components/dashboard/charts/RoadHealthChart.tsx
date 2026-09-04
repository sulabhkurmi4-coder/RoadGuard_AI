"use client";

import React, { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  TooltipProps,
} from "recharts";
import { RoadHealthChartItem } from "@/types/dashboard";
import { demoRoadHealthChartData } from "@/lib/dashboard-demo-data";
import { ActivityIcon } from "@/components/icons";
import { formatNumber, formatMiles } from "@/lib/format-utils";

interface RoadHealthChartProps {
  data?: RoadHealthChartItem[];
  title?: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    const item = payload[0].payload as RoadHealthChartItem;
    return (
      <div className="p-3 rounded-xl bg-slate-950/95 border border-slate-700 shadow-2xl backdrop-blur-md text-xs font-mono space-y-1 z-50">
        <div className="flex items-center gap-2">
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: item.color }}
          />
          <span className="font-bold text-white text-sm">{item.name}</span>
        </div>
        <div className="text-slate-300">
          Lane Miles: <strong className="text-white">{formatMiles(item.value)}</strong>
        </div>
        <div className="text-slate-300">
          Share: <strong className="text-cyan-400">{item.percentage}%</strong> of Network
        </div>
        <div className="text-[10px] text-slate-500 pt-0.5">
          Standard: ASTM D6433 PCI Rating
        </div>
      </div>
    );
  }
  return null;
}

export default function RoadHealthChart({
  data = demoRoadHealthChartData,
  title = "Road Health Distribution",
}: RoadHealthChartProps) {
  const [mounted, setMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const totalMiles = data.reduce((sum, item) => sum + item.value, 0);

  if (!mounted) {
    return (
      <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 h-80 flex items-center justify-center">
        <div className="text-xs font-mono text-slate-500 animate-pulse">
          Loading Recharts Health Distribution...
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4 flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <ActivityIcon size={18} className="text-emerald-400" />
          <h2 className="text-base sm:text-lg font-bold text-white">{title}</h2>
        </div>
        <span className="text-xs font-mono text-slate-400">Recharts Donut Engine</span>
      </div>

      {/* Donut Chart & Legend Container */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Recharts Pie (5 cols) */}
        <div className="md:col-span-5 relative flex items-center justify-center min-h-[220px]">
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={62}
                outerRadius={92}
                paddingAngle={3}
                dataKey="value"
                onMouseEnter={(_, index) => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
                animationDuration={900}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    stroke={activeIndex === index ? "#ffffff" : "#0f172a"}
                    strokeWidth={activeIndex === index ? 2 : 1}
                    className="cursor-pointer transition-all duration-200"
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>

          {/* Donut Center Display */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none font-mono">
            {activeIndex !== null ? (
              <>
                <span className="text-[11px] text-slate-400 uppercase font-semibold">
                  {data[activeIndex].percentage}%
                </span>
                <span className="text-base font-black text-white">
                  {formatNumber(data[activeIndex].value)}
                </span>
                <span
                  className="text-[9px] font-bold px-1.5 py-0.5 rounded mt-0.5"
                  style={{
                    color: data[activeIndex].color,
                    backgroundColor: `${data[activeIndex].color}20`,
                  }}
                >
                  {data[activeIndex].name.split(" ")[0]}
                </span>
              </>
            ) : (
              <>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider">
                  Total
                </span>
                <span className="text-base sm:text-lg font-black text-white">
                  {formatNumber(totalMiles)}
                </span>
                <span className="text-[10px] text-emerald-400 font-bold">Miles</span>
              </>
            )}
          </div>
        </div>

        {/* Legend List (7 cols) */}
        <div className="md:col-span-7 space-y-2.5">
          {data.map((item, idx) => (
            <div
              key={item.name}
              onMouseEnter={() => setActiveIndex(idx)}
              onMouseLeave={() => setActiveIndex(null)}
              className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between text-xs font-mono ${
                activeIndex === idx
                  ? "bg-slate-800/90 border-cyan-500/50 shadow-md translate-x-1"
                  : "bg-slate-950/60 border-slate-800/80 hover:border-slate-700"
              }`}
            >
              <div className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-slate-200 font-medium">{item.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-slate-400">{formatMiles(item.value)}</span>
                <span className="font-bold text-white text-xs px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800">
                  {item.percentage}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
