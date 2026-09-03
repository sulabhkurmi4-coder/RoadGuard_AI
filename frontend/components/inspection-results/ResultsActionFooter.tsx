import React from "react";
import Link from "next/link";
import {
  ArrowLeftIcon,
  MapPinIcon,
  TruckIcon,
} from "@/components/icons";

export default function ResultsActionFooter() {
  return (
    <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
      <Link
        href="/inspection"
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
      >
        <ArrowLeftIcon size={14} />
        <span>Back to Inspection</span>
      </Link>

      <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
        <Link
          href="/risk-map"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 hover:text-white text-xs font-semibold border border-slate-700 transition-colors"
        >
          <MapPinIcon size={14} />
          <span>View on Risk Map</span>
        </Link>

        <Link
          href="/maintenance"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-cyan-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold shadow-lg shadow-cyan-950/50 border border-cyan-300/40 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <TruckIcon size={15} />
          <span>Add to Maintenance Plan</span>
        </Link>
      </div>
    </div>
  );
}
