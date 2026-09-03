"use client";

import React, { useState, useRef } from "react";
import { UploadIcon, RadarIcon, SparklesIcon, CheckCircleIcon } from "@/components/icons";
import { samplePresets } from "@/lib/inspection-service";
import { SamplePreset } from "@/types/inspection";

interface InspectionDropzoneProps {
  onSelectFile: (file: File) => void;
  onSelectPreset: (preset: SamplePreset) => void;
}

export default function InspectionDropzone({
  onSelectFile,
  onSelectPreset,
}: InspectionDropzoneProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      if (file.type.startsWith("image/")) {
        onSelectFile(file);
      }
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onSelectFile(e.target.files[0]);
    }
  };

  return (
    <div className="space-y-8">
      {/* Primary Upload Dropzone Card */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-2xl p-10 sm:p-14 text-center cursor-pointer transition-all duration-300 ${
          isDragOver
            ? "border-cyan-400 bg-cyan-950/30 scale-[1.01] shadow-2xl shadow-cyan-950/40"
            : "border-slate-700/80 bg-slate-900/60 hover:border-cyan-500/50 hover:bg-slate-900/90"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleFileInputChange}
          className="hidden"
        />

        <div className="max-w-md mx-auto flex flex-col items-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-950 to-slate-900 border border-cyan-500/40 text-cyan-400 flex items-center justify-center shadow-lg shadow-cyan-950/30">
            <UploadIcon size={32} />
          </div>

          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white mb-1">
              Drag and drop road inspection imagery
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Upload forward-facing camera frames, FLIR multispectral scans, or drone aerial captures.
            </p>
          </div>

          <div className="pt-2">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors shadow-sm">
              <UploadIcon size={14} />
              <span>Browse Local Files</span>
            </span>
          </div>

          <div className="text-[11px] font-mono text-slate-500 pt-2">
            Supported formats: PNG, JPG, JPEG, WEBP • Max file size: 50MB
          </div>
        </div>
      </div>

      {/* 1-Click Built-in Road Sample Presets */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-semibold">
            <SparklesIcon size={14} />
            <span>OR TEST WITH PRE-CONFIGURED HIGHWAY SCAN SAMPLES</span>
          </div>
          <span className="text-[11px] font-mono text-slate-500">1-Click Neural Ingestion</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {samplePresets.map((preset) => (
            <div
              key={preset.id}
              onClick={() => onSelectPreset(preset)}
              className={`p-4 rounded-xl bg-gradient-to-b ${preset.thumbnailColor} border hover:border-cyan-400/80 transition-all cursor-pointer hover:-translate-y-1 shadow-lg group flex flex-col justify-between space-y-3`}
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                  <span className="font-bold text-white group-hover:text-cyan-200 transition-colors">
                    {preset.name}
                  </span>
                  <span className="text-[10px] text-cyan-400 font-semibold uppercase">
                    Select Sample
                  </span>
                </div>
                <div className="text-xs text-amber-300 font-mono mb-2">
                  {preset.primaryDefect}
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {preset.description}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-cyan-400">
                <span>Load into inspection scanner &rarr;</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
