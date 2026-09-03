import React from "react";
import Link from "next/link";
import {
  FileTextIcon,
  DownloadIcon,
  ShieldCheckIcon,
  CheckCircleIcon,
  BarChartIcon,
  ArrowRightIcon,
} from "@/components/icons";

export default function ReportsPage() {
  const reportsList = [
    {
      title: "State Legislature Annual Capital Preservation Request",
      type: "Budget & Asset Depreciations",
      period: "FY 2026 - 2027",
      size: "4.8 MB",
      format: "PDF + GeoJSON",
      status: "Ready for Download",
      badge: "Legislative",
      badgeColor: "bg-purple-950 text-purple-300 border-purple-500/30",
    },
    {
      title: "FHWA Compliance & Pavement Condition Index (PCI) Audit",
      type: "Federal Highway Administration",
      period: "Q2 2026 Audit",
      size: "2.1 MB",
      format: "PDF Signed",
      status: "Certified",
      badge: "Federal",
      badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-500/30",
    },
    {
      title: "District 4 Autonomous Distress Segmentation Log",
      type: "Raw Telemetry & Defect Inventory",
      period: "August 2026",
      size: "18.4 MB",
      format: "CSV + Shapefile",
      status: "Archive Ready",
      badge: "Technical",
      badgeColor: "bg-cyan-950 text-cyan-300 border-cyan-500/30",
    },
    {
      title: "Municipal Public Works Dispatch & Material Consumption",
      type: "Operational DPW Review",
      period: "Q1 - Q2 2026",
      size: "1.4 MB",
      format: "PDF + XLSX",
      status: "Verified",
      badge: "Operations",
      badgeColor: "bg-amber-950 text-amber-300 border-amber-500/30",
    },
  ];

  const districtSummaries = [
    { district: "District 1 (Capital Region)", pciAvg: 78, miles: 32400, health: "Good" },
    { district: "District 2 (Northern Arterials)", pciAvg: 71, miles: 41200, health: "Fair" },
    { district: "District 3 (Mountain Passes)", pciAvg: 64, miles: 28100, health: "Fair" },
    { district: "District 4 (Coastal & Expressways)", pciAvg: 74, miles: 38580, health: "Good" },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-[11px] font-mono text-cyan-400 mb-2">
            <FileTextIcon size={12} />
            <span>LEGISLATIVE & GOV AUDITS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Agency Audit & Legislative Reports
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Export audit-ready civil infrastructure reports, AASHTO PP 67-10 compliance certificates, and multi-year capital funding models.
          </p>
        </div>

        <button
          type="button"
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 rounded-lg shadow-sm"
        >
          <FileTextIcon size={14} />
          <span>Generate New Report</span>
        </button>
      </div>

      {/* Top 2 Featured Report Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Featured Card 1 */}
        <div className="p-6 rounded-xl bg-slate-900/70 border border-slate-800 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono text-purple-400 uppercase font-semibold">
                Legislative Capital Dossier
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-950 text-purple-300 border border-purple-500/30">
                FY 2026-2027
              </span>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              State Transportation Commission Pavement Funding Request
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Comprehensive multi-district lifecycle deterioration forecast demonstrating how $14.2M in proactive micro-surfacing
              safeguards $116M in roadway asset value across 140,280 lane-miles.
            </p>
          </div>

          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400">Format: Signed PDF (4.8 MB)</span>
            <button
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-cyan-300 border border-slate-700"
            >
              <DownloadIcon size={14} />
              <span>Export Dossier</span>
            </button>
          </div>
        </div>

        {/* Featured Card 2 */}
        <div className="p-6 rounded-xl bg-slate-900/70 border border-slate-800 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono text-emerald-400 uppercase font-semibold">
                Federal Highway Administration
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                AASHTO Verified
              </span>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              AASHTO PP 67-10 & ASTM D6433 Pavement Condition Certification
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Formal audit certification attesting that sub-millimeter computer vision defect segmentations and IRI roughness
              laser profiling adhere to all federal transportation quality benchmarks.
            </p>
          </div>

          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400">Format: Certified PDF (2.1 MB)</span>
            <button
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-emerald-300 border border-slate-700"
            >
              <DownloadIcon size={14} />
              <span>Download Audit</span>
            </button>
          </div>
        </div>
      </div>

      {/* Generated Reports Archive List */}
      <div className="p-6 rounded-xl bg-slate-900/70 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div>
            <h2 className="text-base font-bold text-white">Generated Reports & Audits Archive</h2>
            <p className="text-xs text-slate-400">
              Historical archive of agency packages generated for state, municipal, and contractor stakeholders.
            </p>
          </div>
          <span className="text-xs font-mono text-slate-400">All Files Encrypted</span>
        </div>

        <div className="space-y-3">
          {reportsList.map((r, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 hover:border-slate-700 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-white">{r.title}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono border ${r.badgeColor}`}>
                    {r.badge}
                  </span>
                </div>
                <div className="text-xs text-slate-400 font-mono">
                  {r.type} &bull; Scope: {r.period} &bull; Size: {r.size}
                </div>
              </div>

              <div className="flex items-center gap-4 md:self-center font-mono text-xs">
                <span className="text-emerald-400 font-semibold">{r.status}</span>
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
                >
                  <DownloadIcon size={12} />
                  <span>Download</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* District Asset Condition Summary Grid */}
      <div className="p-6 rounded-xl bg-slate-900/70 border border-slate-800 space-y-4">
        <h2 className="text-base font-bold text-white">State DOT District Health Summary</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {districtSummaries.map((d, i) => (
            <div key={i} className="p-4 rounded-lg bg-slate-950/80 border border-slate-800 space-y-1">
              <div className="text-xs font-mono text-slate-400">{d.district}</div>
              <div className="text-xl font-bold font-mono text-white">PCI {d.pciAvg} / 100</div>
              <div className="text-[11px] font-mono text-cyan-400">
                {d.miles.toLocaleString()} Lane-Miles
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
