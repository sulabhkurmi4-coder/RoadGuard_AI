"use client";

import React from "react";
import {
  MaintenanceItem,
  MaintenanceFilter,
  MaintenanceSortOption,
  MaintenancePriority,
} from "@/types/maintenance";
import { getHealthStyling } from "@/lib/road-health";
import {
  SlidersIcon,
  ChevronDownIcon,
  SearchIcon,
  AlertTriangleIcon,
  ClockIcon,
} from "@/components/icons";

interface MaintenanceTableProps {
  items: MaintenanceItem[];
  selectedFilter: MaintenanceFilter;
  onFilterChange: (filter: MaintenanceFilter) => void;
  selectedSort: MaintenanceSortOption;
  onSortChange: (sort: MaintenanceSortOption) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSelectRoad: (item: MaintenanceItem) => void;
}

export default function MaintenanceTable({
  items,
  selectedFilter,
  onFilterChange,
  selectedSort,
  onSortChange,
  searchQuery,
  onSearchChange,
  onSelectRoad,
}: MaintenanceTableProps) {
  const filterOptions: { label: MaintenanceFilter; count: number; activeStyle: string }[] = [
    {
      label: "All",
      count: items.length,
      activeStyle: "bg-slate-800 text-white border-cyan-500/50",
    },
    {
      label: "P1",
      count: items.filter((i) => i.priority === "P1").length,
      activeStyle: "bg-rose-950/80 text-rose-300 border-rose-500/50",
    },
    {
      label: "P2",
      count: items.filter((i) => i.priority === "P2").length,
      activeStyle: "bg-amber-950/80 text-amber-300 border-amber-500/50",
    },
    {
      label: "P3",
      count: items.filter((i) => i.priority === "P3").length,
      activeStyle: "bg-sky-950/80 text-sky-300 border-sky-500/50",
    },
  ];

  const getPriorityBadge = (priority: MaintenancePriority) => {
    switch (priority) {
      case "P1":
        return "bg-rose-950/80 text-rose-300 border-rose-500/40";
      case "P2":
        return "bg-amber-950/80 text-amber-300 border-amber-500/40";
      case "P3":
        return "bg-sky-950/80 text-sky-300 border-sky-500/40";
    }
  };

  return (
    <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-5">
      {/* Controls Bar: Filters, Sort, Search */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label="Search road ID or corridor name"
            placeholder="Search road ID, corridor name..."
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors shadow-inner"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
            <SearchIcon size={14} />
          </div>
        </div>

        {/* Filter Pills & Sort Selector */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Filters: All, P1, P2, P3 */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-[11px] font-mono text-slate-500 px-2 hidden sm:inline">Priority:</span>
            {filterOptions.map((opt) => (
              <button
                key={opt.label}
                type="button"
                onClick={() => onFilterChange(opt.label)}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-bold border transition-all ${
                  selectedFilter === opt.label
                    ? opt.activeStyle
                    : "bg-transparent border-transparent text-slate-400 hover:text-white"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {/* Sort By Dropdown */}
          <div className="relative">
            <select
              value={selectedSort}
              onChange={(e) => onSortChange(e.target.value as MaintenanceSortOption)}
              aria-label="Sort maintenance priority table"
              className="appearance-none pl-3 pr-8 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 focus:outline-none focus:border-cyan-400 cursor-pointer shadow-inner"
            >
              <option value="highest-risk">Sort: Highest Risk</option>
              <option value="lowest-health">Sort: Lowest Health (PCI)</option>
              <option value="priority">Sort: Priority (P1 &rarr; P3)</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2.5 pointer-events-none text-slate-500">
              <ChevronDownIcon size={14} />
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs font-mono border-collapse">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px] tracking-wider">
              <th className="py-3 px-3">Road ID</th>
              <th className="py-3 px-3">Road</th>
              <th className="py-3 px-3">Health</th>
              <th className="py-3 px-3">Risk</th>
              <th className="py-3 px-3 min-w-[220px]">Recommended Action</th>
              <th className="py-3 px-3">Priority</th>
              <th className="py-3 px-3">Timeline</th>
              <th className="py-3 px-3 text-right">Estimated Cost *</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {items.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-10 text-slate-500">
                  No maintenance records matching current filters.
                </td>
              </tr>
            ) : (
              items.map((item) => {
                const styling = getHealthStyling(item.healthScore);
                return (
                  <tr
                    key={item.id}
                    onClick={() => onSelectRoad(item)}
                    className="hover:bg-slate-800/40 cursor-pointer transition-colors group"
                  >
                    {/* Road ID */}
                    <td className="py-3.5 px-3">
                      <span className="font-bold text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30 group-hover:border-cyan-400 transition-colors">
                        {item.roadId}
                      </span>
                    </td>

                    {/* Road Name */}
                    <td className="py-3.5 px-3">
                      <div className="font-bold text-white max-w-[200px] truncate">
                        {item.roadName}
                      </div>
                      <div className="text-[10px] text-slate-500">
                        {item.milepost}
                      </div>
                    </td>

                    {/* Health Score */}
                    <td className="py-3.5 px-3">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white">
                          {item.healthScore}
                        </span>
                        <div className="w-12 bg-slate-950 h-1.5 rounded-full overflow-hidden hidden sm:block">
                          <div
                            className={`h-full rounded-full ${styling.progressColor}`}
                            style={{ width: `${item.healthScore}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* Risk */}
                    <td className="py-3.5 px-3">
                      <span className={`font-bold ${
                        item.riskPercentage > 80
                          ? "text-rose-400"
                          : item.riskPercentage > 60
                          ? "text-amber-400"
                          : "text-sky-400"
                      }`}>
                        {item.riskPercentage}%
                      </span>
                    </td>

                    {/* Recommended Action */}
                    <td className="py-3.5 px-3">
                      <div className="text-slate-300 line-clamp-1 max-w-[260px]">
                        {item.recommendedAction}
                      </div>
                    </td>

                    {/* Priority */}
                    <td className="py-3.5 px-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getPriorityBadge(item.priority)}`}>
                        {item.priority}
                      </span>
                    </td>

                    {/* Timeline */}
                    <td className="py-3.5 px-3 text-slate-400 text-[11px] whitespace-nowrap">
                      {item.timeline}
                    </td>

                    {/* Estimated Cost */}
                    <td className="py-3.5 px-3 text-right">
                      <span className="font-bold text-emerald-400">
                        {item.formattedCost}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Footer Prototype Cost Disclaimer */}
      <div className="pt-3 border-t border-slate-800 text-[10px] font-mono text-slate-500 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <span>* Prototype Cost Estimate — Modeled regional DPW unit rates. Not official bid awards.</span>
        <span className="text-cyan-400">Showing {items.length} prioritized corridors</span>
      </div>
    </div>
  );
}
