import React from "react";
import Link from "next/link";
import { RecentInspection } from "@/types/dashboard";
import { RadarIcon, LidarIcon, ArrowRightIcon, CheckCircleIcon } from "@/components/icons";

interface RecentInspectionsListProps {
  inspections: RecentInspection[];
}

export default function RecentInspectionsList({ inspections }: RecentInspectionsListProps) {
  const getSeverityBadge = (sev: RecentInspection["severity"]) => {
    switch (sev) {
      case "Critical":
        return "text-rose-300 bg-rose-950/80 border-rose-500/40";
      case "Moderate":
        return "text-amber-300 bg-amber-950/80 border-amber-500/40";
      case "Good":
        return "text-emerald-300 bg-emerald-950/80 border-emerald-500/40";
    }
  };

  return (
    <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <RadarIcon size={18} className="text-cyan-400" />
            <h2 className="text-base sm:text-lg font-bold text-white">Recent AI Inspections</h2>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Automated defect segmentation runs across mobile optical and LiDAR arrays.
          </p>
        </div>

        <Link
          href="/inspection/results"
          className="inline-flex items-center gap-1 text-xs font-mono text-cyan-400 hover:text-cyan-300 font-semibold"
        >
          <span>View Detailed Neural Defect Logs</span>
          <ArrowRightIcon size={13} />
        </Link>
      </div>

      {/* Inspections Stream Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {inspections.map((insp) => (
          <div
            key={insp.id}
            className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between space-y-3"
          >
            {/* Upper: Sensor Type & Time */}
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-300 text-[10px]">
                {insp.sensorType}
              </span>
              <span className="text-slate-500 text-[11px]">{insp.timestamp}</span>
            </div>

            {/* Corridor & Mileposts */}
            <div>
              <h3 className="text-sm font-bold text-white mb-0.5 truncate">
                {insp.corridorName}
              </h3>
              <div className="text-xs text-slate-400 font-mono">
                {insp.milepostRange}
              </div>
            </div>

            {/* Metrics: Defects, Confidence, PCI */}
            <div className="pt-2 border-t border-slate-800/80 space-y-2 text-xs font-mono">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Defects Found:</span>
                <span className="text-amber-400 font-bold">{insp.defectsDetected} distresses</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-slate-400">Pavement PCI:</span>
                <span className={`px-1.5 py-0.5 rounded border text-[10px] font-bold ${getSeverityBadge(insp.severity)}`}>
                  PCI {insp.pciScore}
                </span>
              </div>

              <div className="flex justify-between items-center text-[11px] text-slate-400">
                <span>Model Confidence:</span>
                <span className="text-emerald-400 font-semibold">{insp.confidenceScore}%</span>
              </div>
            </div>

            {/* Bottom link */}
            <Link
              href="/inspection/results"
              className="pt-2 text-center text-xs font-mono text-cyan-400 hover:text-cyan-300 font-medium block"
            >
              Examine Defect Segmentation &rarr;
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
