import React from "react";
import Link from "next/link";
import { RadarIcon, CalendarIcon, ArrowLeftIcon, MapPinIcon } from "@/components/icons";

interface ResultsHeaderProps {
  inspectionId: string;
  roadId: string;
  roadName: string;
  inspectionDate: string;
}

export default function ResultsHeader({
  inspectionId,
  roadId,
  roadName,
  inspectionDate,
}: ResultsHeaderProps) {
  return (
    <div className="space-y-3 pb-4 border-b border-slate-800/80">
      {/* Back button link */}
      <Link
        href="/inspection"
        className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors"
      >
        <ArrowLeftIcon size={12} />
        <span>Back to Inspection Scanner</span>
      </Link>

      {/* Main Title & ID Badges */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30 text-[10px] font-mono font-bold">
              INSPECTION ID: {inspectionId}
            </span>
            <span className="px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-700 text-[10px] font-mono font-bold">
              ROAD ID: {roadId}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            AI Inspection Results
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            {roadName}
          </p>
        </div>

        {/* Inspection Date */}
        <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-mono text-slate-300 self-start lg:self-auto">
          <CalendarIcon size={14} className="text-cyan-400" />
          <span>Date: <strong>{inspectionDate}</strong></span>
        </div>
      </div>
    </div>
  );
}
