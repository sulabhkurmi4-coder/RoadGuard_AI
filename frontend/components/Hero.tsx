"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  RadarIcon,
  ShieldCheckIcon,
  ArrowRightIcon,
  ActivityIcon,
  CpuChipIcon,
  AlertTriangleIcon,
  CheckCircleIcon,
  SparklesIcon,
  LayersIcon,
} from "./icons";

export default function Hero() {
  const [activeDefectIndex, setActiveDefectIndex] = useState(0);

  const defects = [
    {
      id: "DEF-01",
      type: "Severe Fatigue Cracking",
      confidence: "98.7%",
      severity: "Level 4 (Critical)",
      location: "Lane 2 • MP 142.8",
      action: "Micro-surfacing seal required within 14 days",
      boxPos: { top: "35%", left: "22%", width: "170px", height: "110px" },
      color: "border-rose-500 bg-rose-500/10 text-rose-300",
      pciImpact: "-14 pts",
    },
    {
      id: "DEF-02",
      type: "Pothole Inception (Sub-base void)",
      confidence: "99.2%",
      severity: "Urgent (Depth: 52mm)",
      location: "Lane 1 • MP 143.1",
      action: "Automated work-order dispatched to DPW Unit 4",
      boxPos: { top: "54%", left: "54%", width: "190px", height: "120px" },
      color: "border-amber-500 bg-amber-500/10 text-amber-300",
      pciImpact: "-22 pts",
    },
    {
      id: "DEF-03",
      type: "Longitudinal Joint Ravelling",
      confidence: "94.6%",
      severity: "Moderate (Progression: +18%)",
      location: "Center Seam • MP 143.4",
      action: "Schedule mastic joint sealing in Q2",
      boxPos: { top: "28%", left: "62%", width: "140px", height: "90px" },
      color: "border-cyan-500 bg-cyan-500/10 text-cyan-300",
      pciImpact: "-6 pts",
    },
  ];

  return (
    <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden bg-grid-pattern">
      {/* Ambient background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-tr from-cyan-500/10 via-blue-600/15 to-emerald-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-10 right-10 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Hero Header Content */}
        <div className="text-center max-w-4xl mx-auto mb-14">
          {/* Government / Enterprise Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 text-xs font-mono text-cyan-300 mb-6 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <span className="tracking-wide">FEDRAMP READY • NEXT-GEN PAVEMENT INTELLIGENCE</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08] mb-6">
            Predict Roads.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-emerald-400">
              Prevent Failures.
            </span>
          </h1>

          {/* Supporting Text */}
          <p className="text-lg sm:text-xl text-slate-300 leading-relaxed font-normal max-w-3xl mx-auto mb-9">
            AI-powered continuous road infrastructure monitoring for State DOTs, municipal authorities, and highway
            concessionaires. Detect sub-millimeter fissures, forecast structural pavement degradation, and automate
            zero-touch work orders before potholes form.
          </p>

          {/* Call-to-Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <Link
              href="/dashboard"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 text-base font-semibold text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-cyan-600 hover:from-cyan-400 hover:to-blue-500 rounded-xl shadow-[0_0_30px_rgba(6,182,212,0.35)] border border-cyan-300/40 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Launch Command Center</span>
              <ArrowRightIcon size={18} />
            </Link>

            <Link
              href="/inspection"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 text-base font-semibold text-slate-200 bg-slate-900/90 hover:bg-slate-800/90 hover:text-white rounded-xl border border-slate-700/80 transition-all hover:border-cyan-500/40 shadow-sm"
            >
              <RadarIcon size={18} className="text-cyan-400" />
              <span>Run AI Inspection</span>
            </Link>
          </div>

          {/* Trust and Compliance Badges */}
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-slate-400 font-mono">
            <span className="flex items-center gap-1.5">
              <ShieldCheckIcon size={16} className="text-emerald-400" />
              AASHTO PP 67-10 Compliant
            </span>
            <span className="flex items-center gap-1.5">
              <CpuChipIcon size={16} className="text-cyan-400" />
              Edge & Cloud Neural Ingestion
            </span>
            <span className="flex items-center gap-1.5">
              <LayersIcon size={16} className="text-blue-400" />
              GIS & OpenStreetMap Native
            </span>
            <span className="flex items-center gap-1.5">
              <ActivityIcon size={16} className="text-amber-400" />
              Sub-Millimeter Resolution
            </span>
          </div>
        </div>

        {/* Command Center Telemetry HUD Preview Card */}
        <div id="command-center" className="relative max-w-6xl mx-auto">
          {/* Outer glow ring */}
          <div className="absolute -inset-1.5 bg-gradient-to-r from-cyan-500/30 via-blue-600/20 to-emerald-500/30 rounded-2xl blur-lg opacity-70"></div>

          {/* HUD Container */}
          <div className="relative rounded-2xl bg-slate-950/90 border border-slate-700/80 shadow-2xl backdrop-blur-xl overflow-hidden">
            {/* Window Top Bar / Status Header */}
            <div className="flex flex-wrap items-center justify-between px-4 sm:px-6 py-3 bg-slate-900/90 border-b border-slate-800 text-xs font-mono text-slate-300">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
                  <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
                </div>
                <span className="text-slate-400 hidden sm:inline">|</span>
                <span className="font-semibold text-slate-200 flex items-center gap-1.5">
                  <ActivityIcon size={14} className="text-cyan-400" />
                  CORRIDOR-INSPECT // I-95 NORTHBOUND MP 142.8 - 144.0
                </span>
              </div>

              <div className="flex items-center gap-4 text-[11px]">
                <span className="hidden md:inline-flex items-center gap-1.5 text-slate-400">
                  <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                  SENSOR: Mobile LiDAR + FLIR Multispectral 8K
                </span>
                <span className="px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/40 text-cyan-300">
                  INFERENCE: 18.4ms
                </span>
              </div>
            </div>

            {/* HUD Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Left & Center: Simulated Highway Sensor Feed (8 cols) */}
              <div className="lg:col-span-8 relative min-h-[380px] sm:min-h-[460px] bg-gradient-to-b from-slate-950 via-slate-900 to-[#0c1322] p-4 sm:p-6 flex flex-col justify-between overflow-hidden">
                {/* Visual perspective highway surface simulation */}
                <div className="absolute inset-0 opacity-40 pointer-events-none">
                  {/* Perspective road grid */}
                  <div
                    className="w-full h-full"
                    style={{
                      backgroundImage: `
                        repeating-linear-gradient(0deg, rgba(56, 189, 248, 0.08) 0px, rgba(56, 189, 248, 0.08) 1px, transparent 1px, transparent 32px),
                        repeating-linear-gradient(90deg, rgba(56, 189, 248, 0.08) 0px, rgba(56, 189, 248, 0.08) 1px, transparent 1px, transparent 32px)
                      `,
                      transform: "perspective(300px) rotateX(25deg) scale(1.1)",
                      transformOrigin: "bottom center",
                    }}
                  />
                </div>

                {/* Animated Horizontal Scan Beam */}
                <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-75 animate-scanline pointer-events-none" />

                {/* Crosshair overlays */}
                <div className="absolute top-6 left-6 text-slate-600 font-mono text-[10px] pointer-events-none">
                  + LAT: 38.8951° N • LON: 77.0364° W
                </div>
                <div className="absolute top-6 right-6 text-slate-600 font-mono text-[10px] pointer-events-none">
                  + LiDAR DENSITY: 1,420 pts/m²
                </div>

                {/* Road surface lane lines simulation */}
                <div className="absolute inset-0 flex justify-center pointer-events-none opacity-20">
                  <div className="w-1 border-r-2 border-dashed border-amber-400 h-full"></div>
                </div>

                {/* Interactive Neural Bounding Boxes */}
                {defects.map((defect, idx) => {
                  const isSelected = activeDefectIndex === idx;
                  return (
                    <div
                      key={defect.id}
                      onClick={() => setActiveDefectIndex(idx)}
                      style={{
                        top: defect.boxPos.top,
                        left: defect.boxPos.left,
                        width: defect.boxPos.width,
                        height: defect.boxPos.height,
                      }}
                      className={`absolute cursor-pointer transition-all duration-200 border-2 rounded-lg p-2 flex flex-col justify-between ${
                        isSelected
                          ? "border-cyan-400 bg-cyan-950/50 shadow-[0_0_20px_rgba(6,182,212,0.4)] scale-105 z-20"
                          : "border-slate-600/70 bg-slate-900/40 hover:border-slate-400 hover:bg-slate-900/60 z-10"
                      }`}
                    >
                      <div className="flex items-center justify-between text-[10px] font-mono">
                        <span
                          className={`px-1 rounded font-bold ${
                            isSelected ? "bg-cyan-400 text-slate-950" : "bg-slate-800 text-slate-300"
                          }`}
                        >
                          {defect.id}
                        </span>
                        <span className="text-emerald-400 font-semibold">{defect.confidence}</span>
                      </div>

                      {/* Defect Corner brackets */}
                      <div className="text-[11px] font-semibold text-white truncate drop-shadow">
                        {defect.type}
                      </div>

                      <div className="flex items-center justify-between text-[9px] font-mono text-slate-300">
                        <span>{defect.location}</span>
                        <span className="text-rose-400">{defect.pciImpact}</span>
                      </div>
                    </div>
                  );
                })}

                {/* Bottom sensor HUD overlay */}
                <div className="relative z-10 mt-auto pt-4 flex flex-wrap items-center justify-between gap-2 border-t border-slate-800/80 bg-slate-950/70 -mx-4 -mb-4 sm:-mx-6 sm:-mb-6 px-4 py-3 sm:px-6">
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-slate-400 font-mono">Defect Selector:</span>
                    <div className="flex gap-1.5">
                      {defects.map((d, i) => (
                        <button
                          key={d.id}
                          onClick={() => setActiveDefectIndex(i)}
                          className={`px-2 py-1 rounded text-xs font-mono transition-colors ${
                            activeDefectIndex === i
                              ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/50"
                              : "bg-slate-800/80 text-slate-400 border border-slate-700 hover:text-slate-200"
                          }`}
                        >
                          {d.id}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                    <CheckCircleIcon size={14} />
                    <span>Edge Processing Nominal (60 FPS)</span>
                  </div>
                </div>
              </div>

              {/* Right: Telemetry & Predictive Dispatch Panel (4 cols) */}
              <div className="lg:col-span-4 bg-slate-900/60 p-5 sm:p-6 border-t lg:border-t-0 lg:border-l border-slate-800 flex flex-col justify-between space-y-6">
                {/* Active Detection Deep Dive */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                      Neural Diagnostics
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-rose-950/70 border border-rose-500/40 text-rose-300">
                      ACTION REQ
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-1">
                    {defects[activeDefectIndex].type}
                  </h3>
                  <p className="text-xs text-slate-400 font-mono mb-4">
                    {defects[activeDefectIndex].location} • Conf: {defects[activeDefectIndex].confidence}
                  </p>

                  <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 space-y-2 mb-4">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Severity Metric</span>
                      <span className="text-amber-400 font-mono font-medium">
                        {defects[activeDefectIndex].severity}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">PCI Impact</span>
                      <span className="text-rose-400 font-mono font-medium">
                        {defects[activeDefectIndex].pciImpact}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Degradation Rate</span>
                      <span className="text-cyan-400 font-mono font-medium">+2.3 mm/mo</span>
                    </div>
                  </div>

                  <div className="text-xs text-slate-300 bg-cyan-950/30 border border-cyan-500/20 p-2.5 rounded-lg mb-4">
                    <span className="font-semibold text-cyan-300 block mb-1 flex items-center gap-1.5">
                      <SparklesIcon size={14} /> Recommended Treatment:
                    </span>
                    {defects[activeDefectIndex].action}
                  </div>
                </div>

                {/* Live Pavement Health Metric (PCI) */}
                <div className="border-t border-slate-800 pt-4">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-mono text-slate-400">Segment Health (PCI)</span>
                    <span className="text-xs font-mono font-bold text-amber-400">54 / 100 (Fair)</span>
                  </div>
                  {/* Progress bar */}
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mb-3">
                    <div className="bg-gradient-to-r from-rose-500 via-amber-500 to-emerald-500 h-full w-[54%]"></div>
                  </div>

                  {/* Automated Work Order Generated Box */}
                  <div className="p-3 rounded-lg bg-slate-950/90 border border-slate-800/80">
                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1">
                      <span>AUTO WORK ORDER</span>
                      <span className="text-emerald-400 font-semibold">QUEUED</span>
                    </div>
                    <div className="text-xs font-mono text-slate-200">
                      WO #RG-2026-9142 &rarr; District 4 Highway Dept
                    </div>
                  </div>
                </div>

                {/* Bottom CTA within HUD */}
                <a
                  href="#ai-inspection"
                  className="w-full py-2.5 text-center text-xs font-semibold text-cyan-300 bg-cyan-950/60 hover:bg-cyan-900/60 border border-cyan-500/40 rounded-lg transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Explore Full Inspection Pipeline</span>
                  <ArrowRightIcon size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
