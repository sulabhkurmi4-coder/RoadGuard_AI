"use client";

import React, { useState, useMemo } from "react";
import MaintenanceSummaryCards from "@/components/maintenance/MaintenanceSummaryCards";
import MaintenanceTable from "@/components/maintenance/MaintenanceTable";
import MaintenanceDetailModal from "@/components/maintenance/MaintenanceDetailModal";
import CreatePlanModal from "@/components/maintenance/CreatePlanModal";
import {
  MaintenanceFilter,
  MaintenanceSortOption,
  MaintenanceItem,
} from "@/types/maintenance";
import {
  getFilteredMaintenanceItems,
  getMaintenanceSummary,
  PROTOTYPE_COST_DISCLAIMER,
} from "@/lib/maintenance-service";
import { TruckIcon, ShieldCheckIcon, AlertTriangleIcon, PlusIcon } from "@/components/icons";

export default function MaintenancePage() {
  const [selectedFilter, setSelectedFilter] = useState<MaintenanceFilter>("All");
  const [selectedSort, setSelectedSort] = useState<MaintenanceSortOption>("highest-risk");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRoad, setSelectedRoad] = useState<MaintenanceItem | null>(null);
  const [isCreatePlanOpen, setIsCreatePlanOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Summary Metrics
  const summary = useMemo(() => getMaintenanceSummary(), []);

  // Filtered & Sorted Table Items
  const items = useMemo(() => {
    return getFilteredMaintenanceItems(selectedFilter, selectedSort, searchQuery);
  }, [selectedFilter, selectedSort, searchQuery]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  const handleDispatch = (item: MaintenanceItem) => {
    showToast(`Work order for ${item.roadId} (${item.roadName}) successfully dispatched to ${item.assignedCrew}.`);
  };

  const handlePlanCreated = (planName: string, count: number, budget: string) => {
    showToast(`Maintenance plan "${planName}" generated with ${count} corridor packages (Cap: ${budget}).`);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 p-4 rounded-xl bg-slate-900 border border-emerald-500/50 text-white font-mono text-xs shadow-2xl flex items-center gap-3 animate-in slide-in-from-top-4 duration-200">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <div className="leading-snug">{toastMessage}</div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-800/80">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-[11px] font-mono text-amber-400 mb-2">
            <TruckIcon size={12} />
            <span>MUNICIPAL & DPW WORK ORDERS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Maintenance Prioritization Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            AI-prioritized preservation triage, work order dispatch scheduling, and capital budget allocation.
          </p>
        </div>

        {/* 6. "Create Maintenance Plan" Button */}
        <div className="flex items-center gap-3 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setIsCreatePlanOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono font-bold text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 transition-all shadow-md cursor-pointer"
          >
            <PlusIcon size={14} />
            <span>Create Maintenance Plan</span>
          </button>
        </div>
      </div>

      {/* 1. Summary Cards: Critical, High Risk, Pending Maintenance, Estimated Budget */}
      <MaintenanceSummaryCards
        criticalRoads={summary.criticalRoads}
        highRiskRoads={summary.highRiskRoads}
        pendingMaintenance={summary.pendingMaintenance}
        formattedBudget={summary.formattedBudget}
      />

      {/* 2, 3 & 4. Maintenance Priority Table with Filters and Sorting */}
      <MaintenanceTable
        items={items}
        selectedFilter={selectedFilter}
        onFilterChange={setSelectedFilter}
        selectedSort={selectedSort}
        onSortChange={setSelectedSort}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSelectRoad={setSelectedRoad}
      />

      {/* 5. Road Maintenance Detail Modal */}
      <MaintenanceDetailModal
        item={selectedRoad}
        onClose={() => setSelectedRoad(null)}
        onDispatch={handleDispatch}
      />

      {/* 6. Create Maintenance Plan Modal */}
      <CreatePlanModal
        isOpen={isCreatePlanOpen}
        onClose={() => setIsCreatePlanOpen(false)}
        onPlanCreated={handlePlanCreated}
      />
    </div>
  );
}
