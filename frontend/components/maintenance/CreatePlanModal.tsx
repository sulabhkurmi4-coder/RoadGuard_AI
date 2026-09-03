"use client";

import React, { useState } from "react";
import { XIcon, TruckIcon, ShieldCheckIcon, CheckCircleIcon } from "@/components/icons";
import { MaintenancePriority } from "@/types/maintenance";

interface CreatePlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPlanCreated: (planName: string, count: number, budget: string) => void;
}

export default function CreatePlanModal({
  isOpen,
  onClose,
  onPlanCreated,
}: CreatePlanModalProps) {
  const [planName, setPlanName] = useState("FY2027 Capital Preservation Plan — Sector 4");
  const [priorityTier, setPriorityTier] = useState<MaintenancePriority | "All">("P1");
  const [budgetCap, setBudgetCap] = useState("3.5");
  const [targetDays, setTargetDays] = useState("45");
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      onPlanCreated(planName, 6, `$${budgetCap}M`);
      setSubmitted(false);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-6 space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <TruckIcon size={18} className="text-cyan-400" />
            <h2 className="text-lg font-bold text-white tracking-tight">
              Create Maintenance Plan
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <XIcon size={18} />
          </button>
        </div>

        <p className="text-xs text-slate-400 font-mono">
          Bundle prioritized high-risk road corridors into an approved DPW capital work package.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
          {/* Plan Name */}
          <div className="space-y-1.5">
            <label className="text-slate-300 font-semibold uppercase text-[10px]">
              Plan Title
            </label>
            <input
              type="text"
              value={planName}
              onChange={(e) => setPlanName(e.target.value)}
              required
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400 transition-colors"
            />
          </div>

          {/* Priority Threshold */}
          <div className="space-y-1.5">
            <label className="text-slate-300 font-semibold uppercase text-[10px]">
              Target Priority Threshold
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: "P1 Critical Only", val: "P1" },
                { label: "P1 & P2 Urgent", val: "P2" },
                { label: "All Tiers (P1-P3)", val: "All" },
              ].map((item) => (
                <button
                  key={item.val}
                  type="button"
                  onClick={() => setPriorityTier(item.val as any)}
                  className={`p-2.5 rounded-xl border text-center font-bold text-xs transition-all ${
                    priorityTier === item.val
                      ? "bg-cyan-950/80 text-cyan-300 border-cyan-500/50"
                      : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Budget Ceiling */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-slate-300 font-semibold uppercase text-[10px]">
                Budget Ceiling ($M)
              </label>
              <input
                type="number"
                step="0.1"
                min="0.5"
                max="20.0"
                value={budgetCap}
                onChange={(e) => setBudgetCap(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400 transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-slate-300 font-semibold uppercase text-[10px]">
                Target Completion (Days)
              </label>
              <input
                type="number"
                step="5"
                min="7"
                max="180"
                value={targetDays}
                onChange={(e) => setTargetDays(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400 transition-colors"
              />
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[10px] text-slate-500 leading-relaxed">
            * Prototype Plan Simulator: Generates mock work orders and sync tokens for municipal CMMS systems.
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitted}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-bold transition-all shadow-md flex items-center gap-2"
            >
              {submitted ? (
                <>
                  <div className="w-3.5 h-3.5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                  <span>Generating Plan...</span>
                </>
              ) : (
                <>
                  <ShieldCheckIcon size={14} />
                  <span>Generate Maintenance Plan</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
