"use client";

import React from "react";
import { MaintenanceItem } from "@/types/maintenance";
import {
  XIcon,
  TruckIcon,
  AlertTriangleIcon,
  ActivityIcon,
  CheckCircleIcon,
  WrenchIcon,
  FileTextIcon,
} from "@/components/icons";

interface MaintenanceDetailModalProps {
  item: MaintenanceItem | null;
  onClose: () => void;
  onDispatch: (item: MaintenanceItem) => void;
}

export default function MaintenanceDetailModal({
  item,
  onClose,
  onDispatch,
}: MaintenanceDetailModalProps) {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-6 space-y-5 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/40 text-xs font-mono font-bold">
                {item.roadId}
              </span>
              <span className={`px-2 py-0.5 rounded text-xs font-mono font-bold border ${
                item.priority === "P1"
                  ? "bg-rose-950 text-rose-300 border-rose-500/40"
                  : item.priority === "P2"
                  ? "bg-amber-950 text-amber-300 border-amber-500/40"
                  : "bg-sky-950 text-sky-300 border-sky-500/40"
              }`}>
                {item.priorityLabel}
              </span>
            </div>
            <h2 className="text-lg font-bold text-white tracking-tight">
              {item.roadName}
            </h2>
            <div className="text-xs font-mono text-slate-400 mt-0.5">
              {item.milepost} • Last Inspected: {item.lastInspection}
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <XIcon size={18} />
          </button>
        </div>

        {/* Condition Summary Gauges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-[10px] text-slate-500 uppercase block">Health (PCI)</span>
            <div className="text-xl font-bold text-white">{item.healthScore} / 100</div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-[10px] text-slate-500 uppercase block">Failure Risk</span>
            <div className="text-xl font-bold text-rose-400">{item.riskPercentage}%</div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-[10px] text-slate-500 uppercase block">Execution Window</span>
            <div className="text-xs font-bold text-amber-300 pt-1">{item.timeline}</div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-[10px] text-slate-500 uppercase block">Estimated Cost *</span>
            <div className="text-xl font-bold text-emerald-400">{item.formattedCost}</div>
          </div>
        </div>

        {/* Defect Telemetry */}
        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2 font-mono text-xs">
          <div className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">
            Verified Defect Inventory
          </div>
          <div className="grid grid-cols-3 gap-3 pt-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              <span className="text-slate-300">Potholes: <strong className="text-white">{item.potholeCount}</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span className="text-slate-300">Cracks: <strong className="text-white">{item.crackCount}</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-sky-500" />
              <span className="text-slate-300">Surface Damage: <strong className="text-white">{item.surfaceDamage}</strong></span>
            </div>
          </div>
        </div>

        {/* Recommended Action & Work Scope */}
        <div className="space-y-3 font-mono text-xs">
          <div>
            <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider block mb-1">
              Preservation Treatment Scope
            </span>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-white font-semibold leading-relaxed">
              {item.recommendedAction}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-slate-500 text-[10px] uppercase font-bold block">
                Required Materials Manifest
              </span>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                {item.materialsManifest}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-slate-500 text-[10px] uppercase font-bold block">
                Assigned DPW Taskforce
              </span>
              <p className="text-cyan-300 text-[11px] font-semibold leading-relaxed">
                {item.assignedCrew}
              </p>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-slate-500 text-[10px] uppercase font-bold block">
              Traffic Control & Lane Closure Protocol
            </span>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              {item.trafficControlPlan}
            </p>
          </div>
        </div>

        {/* Cost Disclaimer */}
        <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-500/20 text-[10px] font-mono text-amber-400 flex items-start gap-2">
          <AlertTriangleIcon size={14} className="shrink-0 mt-0.5" />
          <span>
            * Prototype Cost Estimate: Calculated using regional DOT standard unit costs. Material bidding and contractor letting will determine final invoice amounts.
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono font-bold transition-colors"
          >
            Close
          </button>
          <button
            type="button"
            onClick={() => {
              onDispatch(item);
              onClose();
            }}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-mono font-bold transition-all shadow-md flex items-center gap-2"
          >
            <TruckIcon size={14} />
            <span>Approve & Dispatch Work Order</span>
          </button>
        </div>
      </div>
    </div>
  );
}
