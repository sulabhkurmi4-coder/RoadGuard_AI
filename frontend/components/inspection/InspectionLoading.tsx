"use client";

import React, { useState, useEffect } from "react";
import { RadarIcon, ActivityIcon, SparklesIcon, CheckCircleIcon } from "@/components/icons";

interface InspectionLoadingProps {
  fileName?: string;
}

export default function InspectionLoading({ fileName }: InspectionLoadingProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    "Ingesting optical frame & normalizing spatial color depth...",
    "Executing YOLOv11 distress segmentation & feature extraction...",
    "Measuring crack width, spall depth & volumetric cavity...",
    "Computing ASTM D6433 Pavement Condition Index (PCI) & work orders...",
  ];

  useEffect(() => {
    const timer1 = setTimeout(() => setCurrentStep(1), 400);
    const timer2 = setTimeout(() => setCurrentStep(2), 850);
    const timer3 = setTimeout(() => setCurrentStep(3), 1300);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <div className="p-8 sm:p-14 rounded-2xl bg-slate-900/80 border border-slate-800 text-center space-y-8 max-w-2xl mx-auto shadow-2xl backdrop-blur-xl relative overflow-hidden">
      {/* Background scan beam */}
      <div className="absolute inset-0 bg-radial-glow opacity-40 pointer-events-none" />

      {/* Pulsing Radar Graphic */}
      <div className="relative mx-auto w-24 h-24 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border-2 border-cyan-500/30 animate-ping opacity-50" />
        <div className="absolute -inset-2 rounded-full border border-cyan-400/20 animate-pulse" />
        <div className="w-20 h-20 rounded-full bg-slate-950 border border-cyan-500/50 flex items-center justify-center shadow-[0_0_25px_rgba(6,182,212,0.4)]">
          <RadarIcon size={36} className="text-cyan-400 animate-spin" />
        </div>
      </div>

      {/* Main Status Text */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/30 text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
          <span>NEURAL INFERENCE IN PROGRESS</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
          Analyzing Pavement Matrix
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 font-mono">
          Target: {fileName || "Survey Frame 8K"} • Running Sub-Millimeter Classifier
        </p>
      </div>

      {/* Stepped Progress Checklist */}
      <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 text-left space-y-2.5 max-w-lg mx-auto font-mono text-xs">
        {steps.map((step, idx) => {
          const isDone = idx < currentStep;
          const isCurrent = idx === currentStep;

          return (
            <div
              key={idx}
              className={`flex items-center gap-3 transition-colors ${
                isDone
                  ? "text-slate-400"
                  : isCurrent
                  ? "text-cyan-300 font-bold"
                  : "text-slate-600"
              }`}
            >
              {isDone ? (
                <CheckCircleIcon size={14} className="text-emerald-400 shrink-0" />
              ) : isCurrent ? (
                <div className="w-3.5 h-3.5 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin shrink-0" />
              ) : (
                <div className="w-3.5 h-3.5 rounded-full border border-slate-700 shrink-0" />
              )}
              <span className="truncate">{step}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
