import React from "react";
import {
  CpuChipIcon,
  RadarIcon,
  MapPinIcon,
  TruckIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  ActivityIcon,
} from "./icons";

export default function HowItWorks() {
  const steps = [
    {
      step: "01",
      icon: <RadarIcon size={24} className="text-cyan-400" />,
      title: "Multi-Source Sensor Ingestion",
      subtitle: "Continuous Optical & Telemetry Streams",
      description:
        "Passively collects high-resolution imagery and LiDAR point-clouds from existing municipal fleets, transit buses, specialized survey vehicles, and aerial drone passes.",
      details: [
        "Zero custom hardware required for fleet dashcams",
        "Sub-meter GPS tag synchronization",
        "Edge pre-filtering drops redundant frames",
      ],
      tag: "Ingestion Stage",
    },
    {
      step: "02",
      icon: <CpuChipIcon size={24} className="text-emerald-400" />,
      title: "Neural Vision & Depth Profiling",
      subtitle: "Sub-Millimeter Defect Classification",
      description:
        "High-throughput transformer models segment pavement distress into 18 standardized ASTM D6433 classes, measuring crack width, depth, spalling, and rutting index.",
      details: [
        "AASHTO PP 67-10 compliant classification",
        "Volumetric cavity measurement in 3D",
        "Real-time edge inference at 60 FPS",
      ],
      tag: "AI Inference",
    },
    {
      step: "03",
      icon: <MapPinIcon size={24} className="text-amber-400" />,
      title: "Geospatial Risk Modeling",
      subtitle: "Dynamic Pavement Condition Index (PCI)",
      description:
        "Aggregates distress ratings into lane-level PCI scores, cross-referenced with weather telemetry, freeze-thaw cycles, and heavy vehicle axle weight (ESALs).",
      details: [
        "Automated deterioration trajectory forecasting",
        "Interactive GIS heatmaps with corridor filtering",
        "Multi-agency data sharing & export",
      ],
      tag: "Predictive Analytics",
    },
    {
      step: "04",
      icon: <TruckIcon size={24} className="text-blue-400" />,
      title: "Zero-Touch Dispatch & Maintenance",
      subtitle: "Closed-Loop Municipal Execution",
      description:
        "Dispatches prioritized work packages directly into DPW asset management systems (Cityworks, Cartegraph, SAP) with exact material tonnage and repair coordinates.",
      details: [
        "Recommends proactive sealing before pothole formation",
        "Reduces citizen complaint response times by 3.2x",
        "Post-repair visual verification scanning",
      ],
      tag: "Automated Action",
    },
  ];

  return (
    <section id="risk-map" className="relative py-24 bg-slate-950/80 border-t border-slate-800">
      {/* Background Subtle Gradient Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-700/80 text-xs font-mono text-emerald-400 mb-4">
            <ActivityIcon size={14} />
            <span>THE ROADGUARD AI PIPELINE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            How It Works: Autonomous Infrastructure Intelligence
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400">
            From raw fleet camera streams to prioritized municipal asphalt work orders — a seamless 4-stage pipeline
            powering modern state and city DOT operations.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, idx) => (
            <div
              key={step.step}
              className="relative rounded-2xl bg-slate-900/80 border border-slate-800 p-6 flex flex-col justify-between hover:border-cyan-500/40 hover:bg-slate-900 transition-all duration-300 group"
            >
              <div>
                {/* Step Number & Tag */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl font-black font-mono text-slate-700 group-hover:text-cyan-400/80 transition-colors">
                    {step.step}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-slate-800 text-slate-300 border border-slate-700">
                    {step.tag}
                  </span>
                </div>

                {/* Step Icon */}
                <div className="w-12 h-12 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  {step.icon}
                </div>

                {/* Step Title & Subtitle */}
                <h3 className="text-lg font-bold text-white mb-1 group-hover:text-cyan-200 transition-colors">
                  {step.title}
                </h3>
                <div className="text-xs font-medium text-cyan-400 mb-3 font-mono">
                  {step.subtitle}
                </div>

                {/* Description */}
                <p className="text-xs text-slate-400 leading-relaxed mb-5">
                  {step.description}
                </p>
              </div>

              {/* Bullet Points */}
              <div className="pt-4 border-t border-slate-800/80 space-y-2">
                {step.details.map((detail, dIdx) => (
                  <div key={dIdx} className="flex items-start gap-2 text-[11px] text-slate-300">
                    <CheckCircleIcon size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Pipeline Summary Bar */}
        <div className="mt-12 rounded-xl bg-gradient-to-r from-cyan-950/40 via-slate-900/80 to-blue-950/40 border border-cyan-500/30 p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-sm text-slate-200 font-mono">
              Average End-to-End Latency: <span className="text-cyan-300 font-bold">14.2 minutes</span> from camera capture to dispatched municipal work-order.
            </span>
          </div>

          <a
            href="#predictive-intelligence"
            className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-300 hover:text-cyan-200 font-mono"
          >
            <span>Explore Predictive Economics</span>
            <ArrowRightIcon size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}
