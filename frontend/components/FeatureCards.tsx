import React from "react";
import {
  RadarIcon,
  LidarIcon,
  MapPinIcon,
  TruckIcon,
  CpuChipIcon,
  BarChartIcon,
  LayersIcon,
  ShieldCheckIcon,
  SparklesIcon,
  ArrowRightIcon,
} from "./icons";

export default function FeatureCards() {
  const features = [
    {
      icon: <RadarIcon size={26} className="text-cyan-400" />,
      tag: "Computer Vision",
      title: "Sub-Millimeter Crack & Defect Segmentation",
      description:
        "High-frequency neural segmentation models trained on over 2.4 million lane-miles identify longitudinal, transverse, alligator cracking, and surface ravelling down to 0.5mm width.",
      metrics: "98.7% classification confidence",
      color: "border-cyan-500/30 group-hover:border-cyan-400/60",
      accentBg: "bg-cyan-500/10 text-cyan-300",
    },
    {
      icon: <LidarIcon size={26} className="text-emerald-400" />,
      tag: "LiDAR Point Cloud",
      title: "3D Pavement Profiling & Roughness Index (IRI)",
      description:
        "Real-time laser depth mapping measures rutting, localized subsidence, and International Roughness Index (IRI). Identifies sub-surface voids and water-ponding hazards before asphalt collapse.",
      metrics: "Sub-centimeter volumetric depth",
      color: "border-emerald-500/30 group-hover:border-emerald-400/60",
      accentBg: "bg-emerald-500/10 text-emerald-300",
    },
    {
      icon: <MapPinIcon size={26} className="text-amber-400" />,
      tag: "Geospatial Intelligence",
      title: "GIS-Native Risk Heatmaps & Climate Correlation",
      description:
        "Overlays structural pavement health with freeze-thaw cycles, precipitation forecasts, and heavy truck axle loads (ESALs) to calculate real-time vulnerability scores by lane segment.",
      metrics: "ESRI & OpenStreetMap integration",
      color: "border-amber-500/30 group-hover:border-amber-400/60",
      accentBg: "bg-amber-500/10 text-amber-300",
    },
    {
      icon: <TruckIcon size={26} className="text-blue-400" />,
      tag: "Municipal Integration",
      title: "Automated Work-Order & Crew Dispatch",
      description:
        "Eliminates manual citizen complaint triage. Automatically generates geo-tagged work orders with exact asphalt tonnage estimates and sends directly into Cityworks, Cartegraph, and SAP.",
      metrics: "Zero-touch ticket generation",
      color: "border-blue-500/30 group-hover:border-blue-400/60",
      accentBg: "bg-blue-500/10 text-blue-300",
    },
    {
      icon: <CpuChipIcon size={26} className="text-purple-400" />,
      tag: "Passive Sensor Ingestion",
      title: "Turnkey Fleet Video & Dashcam Ingestion",
      description:
        "Ingests optical telemetry from municipal buses, waste collection trucks, and police cruisers. Transforms existing city vehicles into a continuously updating road inspection sensor grid.",
      metrics: "Zero specialized hardware required",
      color: "border-purple-500/30 group-hover:border-purple-400/60",
      accentBg: "bg-purple-500/10 text-purple-300",
    },
    {
      icon: <BarChartIcon size={26} className="text-rose-400" />,
      tag: "Predictive Economics",
      title: "10-Year Capital Lifecycle Optimization",
      description:
        "AI models predict when pavement reaches the critical 'deterioration cliff'. Guides State DOT engineers to perform $2.50/sq.yd micro-surfacing rather than $48/sq.yd emergency full replacements.",
      metrics: "Up to 74% capital budget preservation",
      color: "border-rose-500/30 group-hover:border-rose-400/60",
      accentBg: "bg-rose-500/10 text-rose-300",
    },
  ];

  return (
    <section id="ai-inspection" className="relative py-24 bg-[#070b14]">
      {/* Background visual accents */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-700/80 text-xs font-mono text-cyan-400 mb-4">
            <SparklesIcon size={14} />
            <span>PLATFORM CAPABILITIES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Complete Infrastructure Intelligence. From Sensor to Street.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400">
            A unified stack replacing subjective visual surveys with sub-millimeter computer vision, automated
            volumetric depth mapping, and predictive degradation models.
          </p>
        </div>

        {/* Feature Cards Grid (6 cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className={`group relative rounded-2xl bg-slate-900/60 border ${feature.color} p-7 backdrop-blur-md transition-all duration-300 hover:bg-slate-900 hover:-translate-y-1 hover:shadow-2xl hover:shadow-cyan-950/30 flex flex-col justify-between`}
            >
              <div>
                {/* Header: Icon & Tag */}
                <div className="flex items-center justify-between mb-5">
                  <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80 group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <span className={`px-2.5 py-1 rounded-md text-[11px] font-mono font-medium ${feature.accentBg}`}>
                    {feature.tag}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-200 transition-colors">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  {feature.description}
                </p>
              </div>

              {/* Bottom Telemetry Metric Pill */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                  {feature.metrics}
                </span>
                <span className="text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  &rarr;
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
