"use client";

import React from "react";
import { RadarIcon, RefreshCwIcon, ArrowRightIcon, ActivityIcon } from "@/components/icons";

interface InspectionPreviewProps {
  imageUrl: string;
  fileName: string;
  fileSize?: string;
  sampleName?: string;
  onAnalyze: () => void;
  onReset: () => void;
}

export default function InspectionPreview({
  imageUrl,
  fileName,
  fileSize = "2.4 MB",
  sampleName,
  onAnalyze,
  onReset,
}: InspectionPreviewProps) {
  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse"></span>
          <span className="text-slate-300">
            SELECTED TARGET: <strong className="text-white">{sampleName || fileName}</strong>
          </span>
          <span className="text-slate-500">({fileSize})</span>
        </div>

        <button
          type="button"
          onClick={onReset}
          className="text-slate-400 hover:text-white transition-colors flex items-center gap-1"
        >
          <RefreshCwIcon size={12} />
          <span>Select Different Frame</span>
        </button>
      </div>

      {/* Main Image Viewport Preview */}
      <div className="relative rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden shadow-2xl">
        {/* Visual Road Image */}
        <div className="relative aspect-[16/10] sm:aspect-[16/9] max-h-[480px] w-full bg-slate-950 flex items-center justify-center overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt="Selected road scan preview"
            className="w-full h-full object-cover object-center"
          />

          {/* Perspective scan grid overlay */}
          <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />

          {/* Target crosshairs */}
          <div className="absolute top-4 left-4 font-mono text-[10px] text-slate-400 bg-slate-950/80 px-2 py-1 rounded border border-slate-800">
            FRAME ID: ROAD-SCAN-2026-F09
          </div>
          <div className="absolute top-4 right-4 font-mono text-[10px] text-cyan-400 bg-slate-950/80 px-2 py-1 rounded border border-cyan-500/30">
            RESOLUTION: 3840 × 2160 (8K MULTISPECTRAL)
          </div>

          <div className="absolute bottom-4 left-4 font-mono text-[11px] text-slate-300 bg-slate-950/80 px-2.5 py-1 rounded border border-slate-800">
            Ready for neural distress segmentation
          </div>
        </div>

        {/* Action Bottom Bar */}
        <div className="p-4 sm:p-6 bg-slate-900/90 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-400 font-mono">
            Clicking analyze will execute the neural distress classifier, measure volumetric depth, and calculate the ASTM D6433 PCI rating.
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={onReset}
              className="w-full sm:w-auto px-4 py-2.5 text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-xl border border-slate-700 transition-colors"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={onAnalyze}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-cyan-600 hover:from-cyan-400 hover:to-blue-500 rounded-xl shadow-lg shadow-cyan-950/50 border border-cyan-300/40 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <RadarIcon size={16} />
              <span>Run AI Inspection</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
