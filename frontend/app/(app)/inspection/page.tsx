"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import {
  UploadIcon,
  XIcon,
  RefreshCwIcon,
  RadarIcon,
  CheckCircleIcon,
  AlertTriangleIcon,
  ArrowRightIcon,
  SparklesIcon,
  FileTextIcon,
} from "@/components/icons";
import {
  SamplePreset,
  FastApiInspectionResponse,
} from "@/types/inspection";
import {
  samplePresets,
  analyzeRoadWithFastApi,
  API_BASE_URL,
  INSPECTION_DISCLAIMER,
} from "@/lib/inspection-service";

export default function InspectionPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedPreset, setSelectedPreset] = useState<SamplePreset | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [apiResult, setApiResult] = useState<FastApiInspectionResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // File drop / browse handlers
  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setSelectedPreset(null);
    setApiResult(null);
    setErrorMessage(null);
    const url = URL.createObjectURL(file);
    setImagePreviewUrl(url);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.type.match(/^image\/(jpeg|jpg|png|webp)$/)) {
        handleFileSelect(file);
      }
    }
  };

  const handlePresetSelect = (preset: SamplePreset) => {
    setSelectedFile(null);
    setSelectedPreset(preset);
    setApiResult(null);
    setErrorMessage(null);
    setImagePreviewUrl(preset.previewUrl);
  };

  const handleRemoveImage = () => {
    setSelectedFile(null);
    setSelectedPreset(null);
    setImagePreviewUrl(null);
    setApiResult(null);
    setErrorMessage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Run analysis handler calling live FastAPI backend
  const handleAnalyze = async () => {
    if (!imagePreviewUrl || isAnalyzing) return;
    setIsAnalyzing(true);
    setErrorMessage(null);

    try {
      let fileToSend: File | Blob;
      let filename = "road_inspection.jpg";

      if (selectedFile) {
        fileToSend = selectedFile;
        filename = selectedFile.name;
      } else if (selectedPreset) {
        // Convert SVG preset into a Blob for multipart submission
        const svgData = decodeURIComponent(
          selectedPreset.previewUrl.replace(/^data:image\/svg\+xml;utf8,/, "")
        );
        fileToSend = new Blob([svgData], { type: "image/jpeg" });
        filename = `${selectedPreset.id}.jpg`;
      } else {
        fileToSend = new Blob(["road-image"], { type: "image/jpeg" });
      }

      // Call live FastAPI backend endpoint: POST /api/inspection/analyze
      const result = await analyzeRoadWithFastApi(fileToSend, filename);
      setApiResult(result);
    } catch (err: any) {
      console.error("FastAPI road analysis error:", err);
      setErrorMessage(
        err.message ||
          `Unable to connect to FastAPI backend at ${API_BASE_URL}/api/inspection/analyze. Please ensure the backend server is running.`
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Helper for risk badge colors
  const getRiskBadgeColor = (risk: string) => {
    const normalized = risk.toUpperCase();
    if (normalized.includes("CRITICAL")) {
      return "text-rose-300 bg-rose-950/80 border-rose-500/50";
    }
    if (normalized.includes("HIGH")) {
      return "text-amber-300 bg-amber-950/80 border-amber-500/50";
    }
    if (normalized.includes("MODERATE")) {
      return "text-sky-300 bg-sky-950/80 border-sky-500/50";
    }
    return "text-emerald-300 bg-emerald-950/80 border-emerald-500/50";
  };

  return (
    <div className="space-y-8 pb-16">
      {/* 1. Page Header */}
      <div className="space-y-2 pb-4 border-b border-slate-800/80">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-[11px] font-mono text-cyan-400">
            <RadarIcon size={12} />
            <span>NEURAL DEFECT DETECTION PIPELINE</span>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
            <span>FastAPI Server:</span>
            <strong className="text-cyan-400 px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[11px]">
              {API_BASE_URL}
            </strong>
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          AI Road Inspection
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-3xl">
          Upload road imagery to identify infrastructure defects and assess road condition.
        </p>
      </div>

      {/* 2 & 3. Upload Card / Image Preview */}
      {!imagePreviewUrl ? (
        <div className="space-y-6">
          {/* Large Drag and Drop Area */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`p-10 sm:p-14 rounded-2xl border-2 border-dashed transition-all cursor-pointer flex flex-col items-center justify-center text-center space-y-4 ${
              isDragOver
                ? "border-cyan-400 bg-cyan-950/30 shadow-[0_0_30px_rgba(6,182,212,0.2)]"
                : "border-slate-800 bg-slate-900/60 hover:border-slate-700 hover:bg-slate-900/90"
            }`}
          >
            <div className="w-16 h-16 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center text-cyan-400 shadow-inner group-hover:scale-105 transition-transform">
              <UploadIcon size={32} />
            </div>

            <div className="space-y-1">
              <div className="text-base sm:text-lg font-bold text-white">
                Drop road image here
              </div>
              <div className="text-xs text-slate-400 font-mono">
                or <span className="text-cyan-400 underline underline-offset-4">browse files</span> from your device
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-[11px] font-mono text-slate-500">
              <span>Accepts: JPG, JPEG, PNG, WEBP</span>
              <span>•</span>
              <span>Max file size: 25MB</span>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              aria-label="Upload road inspection image"
              accept=".jpg,.jpeg,.png,.webp"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleFileSelect(e.target.files[0]);
                }
              }}
            />
          </div>

          {/* Quick Presets for 1-Click Testing */}
          <div className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800/80 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400 font-semibold uppercase text-[11px]">
                Or test with pre-analyzed highway presets:
              </span>
              <span className="text-cyan-400 text-[10px]">1-Click Instant Preview</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {samplePresets.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => handlePresetSelect(preset)}
                  className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-900 transition-all text-left group flex items-start justify-between"
                >
                  <div className="space-y-1">
                    <div className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {preset.name}
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono line-clamp-1">
                      {preset.primaryDefect}
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 group-hover:text-cyan-400 mt-0.5">
                    Select &rarr;
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Image Preview Section */
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <RadarIcon size={16} className="text-cyan-400" />
              <span className="text-xs font-mono text-white font-bold">
                {selectedFile ? selectedFile.name : selectedPreset?.name || "Uploaded Image"}
              </span>
            </div>

            <button
              type="button"
              onClick={handleRemoveImage}
              disabled={isAnalyzing}
              className="text-xs font-mono text-slate-400 hover:text-rose-400 flex items-center gap-1 transition-colors disabled:opacity-50"
            >
              <XIcon size={14} />
              <span>Remove image</span>
            </button>
          </div>

          {/* Image Canvas with Aspect Ratio Preservation */}
          <div className="relative w-full rounded-xl overflow-hidden bg-slate-950 border border-slate-800 max-h-[500px] flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imagePreviewUrl}
              alt="Road Inspection Target"
              className="w-full h-auto max-h-[500px] object-contain"
            />

            {/* Loading State Overlay */}
            {isAnalyzing && (
              <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-sm flex flex-col items-center justify-center space-y-4 z-20">
                <div className="w-16 h-16 rounded-full bg-slate-900 border-2 border-cyan-400/50 flex items-center justify-center relative shadow-[0_0_30px_rgba(6,182,212,0.4)]">
                  <RadarIcon size={28} className="text-cyan-400 animate-spin" />
                  <div className="absolute inset-0 rounded-full border border-cyan-400 animate-ping opacity-30" />
                </div>

                <div className="text-center space-y-1 font-mono">
                  <div className="text-sm font-bold text-white">
                    Analyzing road condition...
                  </div>
                  <div className="text-xs text-cyan-300">
                    Calling FastAPI backend: POST /api/inspection/analyze
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Error State Banner */}
          {errorMessage && (
            <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-500/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono text-rose-300">
              <div className="flex items-start gap-2.5">
                <AlertTriangleIcon size={18} className="text-rose-400 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <div className="font-bold text-rose-200">Analysis Request Failed</div>
                  <p className="text-rose-300/90 leading-relaxed">{errorMessage}</p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="px-3.5 py-1.5 rounded-lg bg-rose-900 hover:bg-rose-800 text-white font-bold transition-colors shrink-0"
              >
                Retry Analysis
              </button>
            </div>
          )}

          {/* Analyze Action Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 border-t border-slate-800">
            <div className="text-xs text-slate-400 font-mono">
              Ready to submit imagery to FastAPI server for defect quantification.
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={handleRemoveImage}
                disabled={isAnalyzing}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 border border-slate-700 transition-colors disabled:opacity-50"
              >
                Remove image
              </button>

              <button
                type="button"
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-cyan-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold shadow-lg shadow-cyan-950/50 border border-cyan-300/40 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed"
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCwIcon size={14} className="animate-spin" />
                    <span>Analyzing road condition...</span>
                  </>
                ) : (
                  <>
                    <RadarIcon size={15} />
                    <span>Analyze Road</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success State: Results Section Rendered from FastAPI Endpoint */}
      {apiResult && !isAnalyzing && (
        <div className="space-y-6 pt-4">
          {/* Results Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-800 font-mono">
            <div className="flex items-center gap-2">
              <CheckCircleIcon size={18} className="text-emerald-400" />
              <h2 className="text-base sm:text-lg font-bold text-white">
                Inspection Results from FastAPI Backend
              </h2>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="text-slate-400">Inspection ID:</span>
              <strong className="text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/40">
                {apiResult.inspection_id}
              </strong>
            </div>
          </div>

          {/* Results Grid: Potholes, Cracks, Surface Damage, Health Score, Risk Percentage, Risk Level */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {/* Total Detected Defects */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
              <span className="text-[11px] font-mono text-slate-400 uppercase font-semibold">
                Total Defects
              </span>
              <div className="text-2xl sm:text-3xl font-black font-mono text-white mt-1">
                {apiResult.potholes + apiResult.cracks + apiResult.surface_damage}
              </div>
              <span className="text-[10px] font-mono text-slate-500 mt-1">Identified</span>
            </div>

            {/* Potholes */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
              <span className="text-[11px] font-mono text-slate-400 uppercase font-semibold">
                Potholes
              </span>
              <div className="text-2xl sm:text-3xl font-black font-mono text-rose-400 mt-1">
                {apiResult.potholes}
              </div>
              <span className="text-[10px] font-mono text-rose-400/80 mt-1">Cavity voids</span>
            </div>

            {/* Cracks */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
              <span className="text-[11px] font-mono text-slate-400 uppercase font-semibold">
                Cracks
              </span>
              <div className="text-2xl sm:text-3xl font-black font-mono text-amber-400 mt-1">
                {apiResult.cracks}
              </div>
              <span className="text-[10px] font-mono text-amber-400/80 mt-1">Fissure lines</span>
            </div>

            {/* Surface Damage */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
              <span className="text-[11px] font-mono text-slate-400 uppercase font-semibold">
                Surface Damage
              </span>
              <div className="text-2xl sm:text-3xl font-black font-mono text-sky-400 mt-1">
                {apiResult.surface_damage}
              </div>
              <span className="text-[10px] font-mono text-sky-400/80 mt-1">Ravel & stripping</span>
            </div>

            {/* Road Health Score */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
              <span className="text-[11px] font-mono text-slate-400 uppercase font-semibold">
                Health Score
              </span>
              <div className="text-2xl sm:text-3xl font-black font-mono text-white mt-1">
                {apiResult.health_score}
                <span className="text-xs text-slate-500 font-normal"> / 100</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-1">
                <div
                  className="bg-gradient-to-r from-rose-500 via-amber-500 to-emerald-500 h-full"
                  style={{ width: `${apiResult.health_score}%` }}
                />
              </div>
            </div>

            {/* Risk Level */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
              <span className="text-[11px] font-mono text-slate-400 uppercase font-semibold">
                Risk Level ({apiResult.risk_percentage}%)
              </span>
              <div className="mt-1">
                <span
                  className={`inline-block px-2 py-0.5 rounded text-xs font-mono font-bold border ${getRiskBadgeColor(
                    apiResult.risk_level
                  )}`}
                >
                  {apiResult.risk_level}
                </span>
              </div>
              <span className="text-[10px] font-mono text-slate-500 mt-1">
                Priority: {apiResult.priority}
              </span>
            </div>
          </div>

          {/* Inspection Summary Section */}
          <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 font-mono">
              <div className="flex items-center gap-2">
                <SparklesIcon size={16} className="text-cyan-400" />
                <h3 className="text-base font-bold text-white">Engineering Assessment</h3>
              </div>
              <span className="text-xs text-emerald-400 font-bold">
                API Status: OK (200)
              </span>
            </div>

            {/* Summary Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-1">
                <span className="text-slate-500 text-[10px] uppercase font-semibold block">
                  Recommended Action
                </span>
                <span className="text-cyan-300 font-bold text-sm block">
                  {apiResult.recommendation}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-1">
                <span className="text-slate-500 text-[10px] uppercase font-semibold block">
                  Maintenance Priority Tier
                </span>
                <span className="text-rose-400 font-bold text-sm block">
                  Priority {apiResult.priority}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-1">
                <span className="text-slate-500 text-[10px] uppercase font-semibold block">
                  Failure Risk Probability
                </span>
                <span className="text-amber-300 font-bold text-sm block">
                  {apiResult.risk_percentage}% Structural Risk
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-3 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono">
              <div className="text-xs text-slate-400">
                Analysis generated live by FastAPI backend (`/api/inspection/analyze`).
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="w-full sm:w-auto px-4 py-2.5 text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-xl border border-slate-700 transition-colors"
                >
                  Upload New Image
                </button>

                <Link
                  href="/inspection/results"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 rounded-xl shadow-md border border-cyan-400/40 transition-all hover:scale-[1.02]"
                >
                  <span>Detailed Results Dashboard</span>
                  <ArrowRightIcon size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
