"use client";

import React, { useState } from "react";
import Link from "next/link";
import { InspectionAnalysisResult, DefectDetection } from "@/types/inspection";
import { INSPECTION_DISCLAIMER } from "@/lib/inspection-service";
import {
  ShieldCheckIcon,
  AlertTriangleIcon,
  CheckCircleIcon,
  TruckIcon,
  FileTextIcon,
  RefreshCwIcon,
  SparklesIcon,
  ActivityIcon,
} from "@/components/icons";

interface InspectionResultsViewProps {
  result: InspectionAnalysisResult;
  onReset: () => void;
}

export default function InspectionResultsView({
  result,
  onReset,
}: InspectionResultsViewProps) {
  const [selectedDefectId, setSelectedDefectId] = useState<string | null>(
    result.defects.length > 0 ? result.defects[0].id : null
  );

  return (
    <div className="space-y-8">
      {/* Top Bar: Disclaimer & Quick Controls */}
      <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-2.5">
          <span className="px-2.5 py-1 rounded bg-amber-950/70 text-amber-300 border border-amber-500/30 text-[11px] font-bold">
            {INSPECTION_DISCLAIMER}
          </span>
          <span className="text-slate-400 hidden sm:inline">
            Inference: {result.modelMetadata.inferenceLatencyMs}ms • Model: {result.modelMetadata.modelName}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
          >
            <RefreshCwIcon size={12} />
            <span>New Inspection Scan</span>
          </button>
        </div>
      </div>

      {/* Top 2 Cards: Health Score & Inspection Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Road Health Score Card (5 cols) */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider font-semibold">
                Pavement Condition Rating
              </span>
              <span
                className={`px-2.5 py-1 rounded-md text-xs font-mono font-bold border ${result.riskColor}`}
              >
                {result.riskLevel}
              </span>
            </div>

            {/* Big Health Score Meter */}
            <div className="flex items-baseline gap-3 my-2">
              <span className="text-5xl font-black font-mono text-white tracking-tight">
                {result.roadHealthScore}
              </span>
              <span className="text-sm font-mono text-slate-400">/ 100 PCI Score</span>
            </div>

            {/* Health Bar */}
            <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden p-0.5 border border-slate-800 my-3">
              <div
                className={`h-full rounded-full transition-all duration-700 ${
                  result.roadHealthScore < 50
                    ? "bg-gradient-to-r from-rose-600 to-rose-400"
                    : result.roadHealthScore < 75
                    ? "bg-gradient-to-r from-amber-500 to-yellow-400"
                    : "bg-gradient-to-r from-emerald-500 to-cyan-400"
                }`}
                style={{ width: `${result.roadHealthScore}%` }}
              />
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800/80 grid grid-cols-2 gap-2 text-xs font-mono text-slate-400">
            <div>
              <span className="text-slate-500 block text-[10px]">Defects Segmented:</span>
              <strong className="text-white text-sm">{result.defectCount} Identified</strong>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">Standard Compliance:</span>
              <strong className="text-emerald-400 text-sm">ASTM D6433</strong>
            </div>
          </div>
        </div>

        {/* Inspection Summary Card (7 cols) */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <SparklesIcon size={18} className="text-cyan-400" />
              <h2 className="text-base font-bold text-white">Autonomous Inspection Summary</h2>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              {result.inspectionSummary}
            </p>
          </div>

          <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
            <span className="text-slate-400">
              Corridor Session: <strong>{result.analysisId}</strong>
            </span>
            <div className="flex items-center gap-3">
              <Link
                href="/maintenance"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-950 text-cyan-300 hover:bg-cyan-900 border border-cyan-500/40 font-semibold"
              >
                <TruckIcon size={14} />
                <span>Create Work Order</span>
              </Link>
              <Link
                href="/reports"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
              >
                <FileTextIcon size={14} />
                <span>Export Audit</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Scan with Neural Bounding Box Overlay */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div>
            <h2 className="text-base font-bold text-white">Neural Bounding Box Segmentation</h2>
            <p className="text-xs text-slate-400 font-mono">
              Click on any bounding box or defect card below to inspect volumetric measurements.
            </p>
          </div>
          <span className="text-xs font-mono text-cyan-400">YOLOv11 Point Projection</span>
        </div>

        {/* Viewport with Bounding Boxes */}
        <div className="relative aspect-[16/9] max-h-[440px] w-full rounded-xl bg-slate-950 border border-slate-800 overflow-hidden shadow-2xl">
          {/* Base Image */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={result.imageUrl}
            alt="Analyzed pavement surface"
            className="w-full h-full object-cover object-center"
          />

          {/* Perspective grid lines */}
          <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />

          {/* Bounding Boxes */}
          {result.defects.map((defect) => {
            const isSelected = selectedDefectId === defect.id;
            return (
              <div
                key={defect.id}
                onClick={() => setSelectedDefectId(defect.id)}
                style={{
                  top: `${defect.boundingBox.topPercent}%`,
                  left: `${defect.boundingBox.leftPercent}%`,
                  width: `${defect.boundingBox.widthPercent}%`,
                  height: `${defect.boundingBox.heightPercent}%`,
                }}
                className={`absolute cursor-pointer rounded-lg border-2 transition-all p-2 flex flex-col justify-between ${
                  isSelected
                    ? "border-cyan-400 bg-cyan-950/60 shadow-[0_0_20px_rgba(6,182,212,0.6)] scale-105 z-20"
                    : "border-rose-500/80 bg-rose-950/25 hover:border-cyan-400/80 hover:bg-cyan-950/40 z-10"
                }`}
              >
                <div className="flex justify-between items-center text-[10px] font-mono">
                  <span
                    className={`px-1.5 py-0.5 rounded font-bold ${
                      isSelected ? "bg-cyan-400 text-slate-950" : "bg-rose-950 text-rose-300"
                    }`}
                  >
                    {defect.id}
                  </span>
                  <span className="text-emerald-400 font-bold">
                    {(defect.confidence * 100).toFixed(1)}%
                  </span>
                </div>

                <div className="text-xs font-bold text-white truncate drop-shadow">
                  {defect.distressType}
                </div>

                <div className="flex justify-between items-center text-[9px] font-mono text-slate-300">
                  <span>PCI Impact:</span>
                  <span className="text-rose-400 font-bold">-{defect.pciDeduction} pts</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Defect Cards Grid */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-white">Segmented Defect Details</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {result.defects.map((defect) => {
            const isSelected = selectedDefectId === defect.id;
            return (
              <div
                key={defect.id}
                onClick={() => setSelectedDefectId(defect.id)}
                className={`p-5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between space-y-4 ${
                  isSelected
                    ? "bg-slate-900 border-cyan-400/80 shadow-lg shadow-cyan-950/50 translate-y-[-2px]"
                    : "bg-slate-900/70 border-slate-800 hover:border-slate-700"
                }`}
              >
                <div>
                  {/* Header: ID, Severity, Confidence */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold text-cyan-400">
                      {defect.id}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono border font-bold ${defect.severityColor}`}>
                      {defect.severity}
                    </span>
                  </div>

                  {/* Title & Distress Class */}
                  <h3 className="text-base font-bold text-white mb-1">
                    {defect.distressType}
                  </h3>

                  <div className="text-xs font-mono text-slate-400 mb-3">
                    Confidence: <strong className="text-emerald-400">{(defect.confidence * 100).toFixed(1)}%</strong> • Deduct:{" "}
                    <strong className="text-rose-400">-{defect.pciDeduction} pts</strong>
                  </div>

                  {/* Dimensions Box */}
                  <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 text-xs font-mono space-y-1 mb-3">
                    <div className="text-slate-400">
                      Dimensions:{" "}
                      <span className="text-slate-200">
                        {defect.dimensions.areaSqM ? `${defect.dimensions.areaSqM} m²` : ""}
                        {defect.dimensions.lengthM ? `${defect.dimensions.lengthM}m length ` : ""}
                        {defect.dimensions.depthMm ? `(Depth: ${defect.dimensions.depthMm}mm)` : ""}
                      </span>
                    </div>
                    <div className="text-slate-400">
                      Urgency: <span className="text-amber-400">{defect.actionUrgency}</span>
                    </div>
                  </div>

                  {/* Recommended Action */}
                  <p className="text-xs text-slate-300 leading-relaxed">
                    <strong className="text-cyan-300 font-semibold block mb-0.5">
                      Treatment Plan:
                    </strong>
                    {defect.treatmentRecommendation}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-500">Est. Repair:</span>
                  <span className="text-white font-bold">{defect.estimatedCost}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
