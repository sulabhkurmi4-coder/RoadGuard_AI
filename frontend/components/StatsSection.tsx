import React from "react";
import {
  RoadGuardLogoIcon,
  ShieldCheckIcon,
  ActivityIcon,
  TrendingDownIcon,
  ClockIcon,
  BarChartIcon,
} from "./icons";

export default function StatsSection() {
  const stats = [
    {
      value: "140,000+",
      label: "Lane Miles Scanned",
      description: "Continuous automated vision & LiDAR data across state highways and municipal arterials.",
      badge: "High-Volume Telemetry",
      badgeColor: "text-cyan-400 bg-cyan-950/60 border-cyan-500/30",
    },
    {
      value: "74%",
      label: "Maintenance Cost Reduction",
      description: "Proactive preventative sealing compared to catastrophic emergency full-depth milling.",
      badge: "Budget Efficiency",
      badgeColor: "text-emerald-400 bg-emerald-950/60 border-emerald-500/30",
    },
    {
      value: "98.7%",
      label: "Defect Detection Accuracy",
      description: "AASHTO PP 67-10 verified neural segmentation for cracks, joint spalls, and depressions.",
      badge: "Gov Certified",
      badgeColor: "text-purple-400 bg-purple-950/60 border-purple-500/30",
    },
    {
      value: "3.2x",
      label: "Faster Work-Order Resolution",
      description: "Automated direct API dispatch to municipal DPW, Cartegraph, Cityworks, and SAP teams.",
      badge: "Zero Friction",
      badgeColor: "text-amber-400 bg-amber-950/60 border-amber-500/30",
    },
  ];

  return (
    <section id="dashboard" className="relative py-20 bg-slate-950/60 border-y border-slate-800/80">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/30 to-slate-950 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-700/80 text-xs font-mono text-cyan-400 mb-3">
            <BarChartIcon size={14} />
            <span>INFRASTRUCTURE METRICS & PROVEN IMPACT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Engineered for Civil Scale. Proven in the Field.
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-400">
            RoadGuard AI empowers transportation departments to transition from reactive pothole complaints to
            predictive lifecycle asset preservation.
          </p>
        </div>

        {/* Stats 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="relative rounded-2xl bg-slate-900/70 border border-slate-800 p-6 backdrop-blur-sm transition-all duration-300 hover:border-cyan-500/40 hover:bg-slate-900 hover:shadow-xl hover:shadow-cyan-950/20 group"
            >
              {/* Corner accent glow */}
              <div className="absolute -top-px -right-px w-16 h-16 bg-cyan-500/10 rounded-tr-2xl blur-md group-hover:bg-cyan-500/20 transition-all" />

              {/* Tag / Badge */}
              <span
                className={`inline-block px-2.5 py-0.5 text-[11px] font-mono font-medium rounded-md border mb-4 ${stat.badgeColor}`}
              >
                {stat.badge}
              </span>

              {/* Numeric Metric Value */}
              <div className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-2 font-mono group-hover:text-cyan-300 transition-colors">
                {stat.value}
              </div>

              {/* Metric Label */}
              <h3 className="text-base font-bold text-slate-200 mb-2">{stat.label}</h3>

              {/* Metric Description */}
              <p className="text-xs text-slate-400 leading-relaxed">{stat.description}</p>
            </div>
          ))}
        </div>

        {/* Bottom Banner with Additional DOT Proof Point */}
        <div className="mt-12 p-4 sm:p-6 rounded-xl bg-gradient-to-r from-slate-900/90 via-cyan-950/30 to-slate-900/90 border border-cyan-500/20 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 shrink-0">
              <ShieldCheckIcon size={24} />
            </div>
            <div>
              <div className="text-sm font-semibold text-white">
                Municipal & State DOT Capital Preservation Certified
              </div>
              <div className="text-xs text-slate-400">
                Over $420M in highway reconstruction budgets deferred through early neural crack detection.
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6 font-mono text-xs text-slate-300 shrink-0">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>FedRAMP In-Process</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
              <span>ISO 27001</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
