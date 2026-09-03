"use client";

import React, { useState } from "react";
import {
  RadarIcon,
  MapPinIcon,
  TruckIcon,
  CheckCircleIcon,
  AlertTriangleIcon,
  CpuChipIcon,
  LayersIcon,
  SearchIcon,
  SparklesIcon,
  FileTextIcon,
  ArrowRightIcon,
} from "./icons";

export default function InteractiveDemo() {
  const [activeTab, setActiveTab] = useState<"vision" | "risk" | "dispatch">("vision");
  const [isScanning, setIsScanning] = useState(false);
  const [filterSeverity, setFilterSeverity] = useState<"all" | "critical" | "warning">("all");

  const runScanSimulation = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
    }, 1800);
  };

  const sampleCorridors = [
    {
      corridor: "Interstate 95 • Northbound",
      segment: "MP 142.0 - 148.5 (6.5 mi)",
      pci: 42,
      status: "Critical Risk",
      statusColor: "text-rose-400 bg-rose-950/70 border-rose-500/40",
      defectsFound: 18,
      weatherStress: "High (Freeze-Thaw + 80k ESALs)",
      recommendedAction: "Micro-milling & crack sealing within 7 days",
    },
    {
      corridor: "State Route 101 • Coastal Corridor",
      segment: "MP 88.2 - 94.0 (5.8 mi)",
      pci: 68,
      status: "Moderate Wear",
      statusColor: "text-amber-400 bg-amber-950/70 border-amber-500/40",
      defectsFound: 7,
      weatherStress: "Moderate (Saline Marine Fog)",
      recommendedAction: "Joint rejuvenation scheduled for Q3",
    },
    {
      corridor: "Metro Ring Arterial (SR-4)",
      segment: "Exit 12 to Exit 19 (7.2 mi)",
      pci: 88,
      status: "Good Condition",
      statusColor: "text-emerald-400 bg-emerald-950/70 border-emerald-500/40",
      defectsFound: 2,
      weatherStress: "Low (Nominal Traffic Load)",
      recommendedAction: "Annual passive monitoring",
    },
    {
      corridor: "Port Access Freight Express",
      segment: "Terminal Gate 3 - Junction (3.1 mi)",
      pci: 38,
      status: "Critical Risk",
      statusColor: "text-rose-400 bg-rose-950/70 border-rose-500/40",
      defectsFound: 24,
      weatherStress: "Severe (Overweight Container Trucks)",
      recommendedAction: "Emergency base stabilization dispatched",
    },
  ];

  const sampleWorkOrders = [
    {
      id: "WO-9941",
      corridor: "I-95 North MP 142.8",
      defectType: "Alligator Cracking (48 sq. m)",
      crew: "District 4 Road Maintenance Crew #2",
      materials: "4.2 Tons Polymer Modified Emulsion",
      priority: "Urgent",
      priorityColor: "bg-rose-950/80 text-rose-300 border-rose-500/40",
      status: "Dispatched",
      eta: "Today, 14:30 EST",
    },
    {
      id: "WO-9940",
      corridor: "Port Access Express Gate 3",
      defectType: "Pothole Cavity Depth 62mm",
      crew: "City DPW Rapid Asphalt Unit 1",
      materials: "1.8 Tons Hot-Mix Asphalt (Type S)",
      priority: "Critical",
      priorityColor: "bg-rose-950/80 text-rose-300 border-rose-500/40",
      status: "En Route",
      eta: "Today, 11:15 EST",
    },
    {
      id: "WO-9938",
      corridor: "Route 101 MP 91.4",
      defectType: "Transverse Joint Spall",
      crew: "Contractor Maintenance Partner",
      materials: "Silicone Joint Sealant 240 LF",
      priority: "Scheduled",
      priorityColor: "bg-cyan-950/80 text-cyan-300 border-cyan-500/40",
      status: "Approved",
      eta: "Sept 12, 08:00 EST",
    },
  ];

  const filteredCorridors = sampleCorridors.filter((c) => {
    if (filterSeverity === "critical") return c.pci < 50;
    if (filterSeverity === "warning") return c.pci >= 50 && c.pci < 75;
    return true;
  });

  return (
    <section id="maintenance" className="relative py-24 bg-[#070b14] border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-700/80 text-xs font-mono text-cyan-400 mb-4">
            <CpuChipIcon size={14} />
            <span>INTERACTIVE COMMAND CENTER</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Live Infrastructure Intelligence Console
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400">
            Simulate live DOT telemetry across vision inference, geospatial risk layers, and automated work-order
            crew dispatching.
          </p>
        </div>

        {/* Command Console Shell */}
        <div className="rounded-2xl bg-slate-950 border border-slate-800 shadow-2xl overflow-hidden backdrop-blur-xl">
          {/* Top Bar with Navigation Tabs */}
          <div className="flex flex-wrap items-center justify-between border-b border-slate-800 bg-slate-900/80 px-4 sm:px-6 py-3 gap-3">
            {/* Tabs */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab("vision")}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                  activeTab === "vision"
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-sm"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                }`}
              >
                <RadarIcon size={16} />
                <span>AI Vision Scanner</span>
              </button>

              <button
                onClick={() => setActiveTab("risk")}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                  activeTab === "risk"
                    ? "bg-amber-500/20 text-amber-300 border border-amber-500/50 shadow-sm"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                }`}
              >
                <MapPinIcon size={16} />
                <span>Corridor Risk Map</span>
              </button>

              <button
                onClick={() => setActiveTab("dispatch")}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                  activeTab === "dispatch"
                    ? "bg-blue-500/20 text-blue-300 border border-blue-500/50 shadow-sm"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                }`}
              >
                <TruckIcon size={16} />
                <span>Maintenance Dispatch</span>
              </button>
            </div>

            {/* Action Trigger */}
            <div className="flex items-center gap-3">
              <button
                onClick={runScanSimulation}
                disabled={isScanning}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-semibold shadow-md transition-all disabled:opacity-50"
              >
                <SparklesIcon size={14} className={isScanning ? "animate-spin" : ""} />
                <span>{isScanning ? "Neural Scanning..." : "Run Inspection Pulse"}</span>
              </button>
            </div>
          </div>

          {/* Console Body */}
          <div className="p-4 sm:p-8">
            {/* Tab 1: AI Vision Scanner */}
            {activeTab === "vision" && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800 text-xs font-mono">
                  <div className="flex items-center gap-3">
                    <span className="text-slate-400">FEED STREAM:</span>
                    <span className="text-cyan-300 font-bold">MOBILE FLIR-8K MULTISPECTRAL</span>
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300">60.2 FPS</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-400">
                    <span>LiDAR POINT RATE: 1.2M pts/sec</span>
                    <span className="text-emerald-400 font-bold">● ONLINE</span>
                  </div>
                </div>

                {/* Simulated Vision Viewport */}
                <div className="relative rounded-xl bg-slate-900/90 border border-slate-800 min-h-[340px] p-6 overflow-hidden flex flex-col justify-between">
                  {/* Perspective road grid */}
                  <div
                    className="absolute inset-0 opacity-25 pointer-events-none"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(0deg, rgba(6,182,212,0.15) 0, rgba(6,182,212,0.15) 1px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, rgba(6,182,212,0.15) 0, rgba(6,182,212,0.15) 1px, transparent 1px, transparent 40px)",
                      transform: "perspective(350px) rotateX(30deg) scale(1.15)",
                      transformOrigin: "bottom center",
                    }}
                  />

                  {/* Scanning beam animation if isScanning */}
                  {isScanning && (
                    <div className="absolute inset-0 bg-cyan-500/10 backdrop-blur-[1px] animate-pulse flex items-center justify-center">
                      <div className="px-4 py-2 rounded-xl bg-slate-950 border border-cyan-400 text-cyan-300 font-mono text-xs flex items-center gap-2">
                        <RadarIcon size={16} className="animate-spin" />
                        <span>INGESTING HIGH-DENSITY POINT CLOUD... 98.4%</span>
                      </div>
                    </div>
                  )}

                  {/* Bounding Box 1 */}
                  <div className="absolute top-[28%] left-[18%] border-2 border-rose-500/90 bg-rose-500/10 p-2.5 rounded-lg w-56 backdrop-blur-xs">
                    <div className="flex justify-between items-center text-[10px] font-mono text-rose-300 mb-1">
                      <span className="font-bold bg-rose-950 px-1 rounded">ALLIGATOR-CRACK</span>
                      <span>99.1% CONF</span>
                    </div>
                    <div className="text-xs font-bold text-white">Structural Base Fatigue</div>
                    <div className="text-[10px] font-mono text-slate-300 mt-1">
                      Area: 3.4m² • Severity: Level 4
                    </div>
                  </div>

                  {/* Bounding Box 2 */}
                  <div className="absolute top-[48%] right-[22%] border-2 border-amber-500/90 bg-amber-500/10 p-2.5 rounded-lg w-52 backdrop-blur-xs">
                    <div className="flex justify-between items-center text-[10px] font-mono text-amber-300 mb-1">
                      <span className="font-bold bg-amber-950 px-1 rounded">TRANSVERSE-SEAM</span>
                      <span>96.4% CONF</span>
                    </div>
                    <div className="text-xs font-bold text-white">Thermal Expansion Joint</div>
                    <div className="text-[10px] font-mono text-slate-300 mt-1">
                      Width: 14mm • Ingress: High
                    </div>
                  </div>

                  {/* Overlay Stats Bar */}
                  <div className="relative z-10 mt-auto flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800 bg-slate-950/80 -mx-6 -mb-6 p-4">
                    <div className="flex items-center gap-4 text-xs font-mono">
                      <span className="text-slate-400">Current Pavement PCI:</span>
                      <span className="text-amber-400 font-bold text-sm">48 / 100 (Sub-Standard)</span>
                    </div>
                    <div className="text-xs font-mono text-cyan-300">
                      Recommendation: Immediate Slurry Seal will prevent $184,000 Reconstruction.
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Corridor Risk Map (GIS) */}
            {activeTab === "risk" && (
              <div className="space-y-6">
                {/* Filter bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                    <span>Corridor Severity Filter:</span>
                    <button
                      onClick={() => setFilterSeverity("all")}
                      className={`px-2.5 py-1 rounded text-xs font-mono ${
                        filterSeverity === "all" ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40" : "bg-slate-800 text-slate-400"
                      }`}
                    >
                      All Corridors ({sampleCorridors.length})
                    </button>
                    <button
                      onClick={() => setFilterSeverity("critical")}
                      className={`px-2.5 py-1 rounded text-xs font-mono ${
                        filterSeverity === "critical" ? "bg-rose-500/20 text-rose-300 border border-rose-500/40" : "bg-slate-800 text-slate-400"
                      }`}
                    >
                      Critical (PCI &lt; 50)
                    </button>
                    <button
                      onClick={() => setFilterSeverity("warning")}
                      className={`px-2.5 py-1 rounded text-xs font-mono ${
                        filterSeverity === "warning" ? "bg-amber-500/20 text-amber-300 border border-amber-500/40" : "bg-slate-800 text-slate-400"
                      }`}
                    >
                      Fair (PCI 50-75)
                    </button>
                  </div>

                  <span className="text-xs font-mono text-slate-400">
                    GIS Coordinate Reference: EPSG:4326 / WGS 84
                  </span>
                </div>

                {/* Corridor Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="text-slate-400 border-b border-slate-800 bg-slate-900/50 uppercase">
                      <tr>
                        <th className="py-3 px-4">Highway / Corridor</th>
                        <th className="py-3 px-4">Segment Milepost</th>
                        <th className="py-3 px-4">PCI Rating</th>
                        <th className="py-3 px-4">Defects</th>
                        <th className="py-3 px-4">Environmental Stress</th>
                        <th className="py-3 px-4">Preservation Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-slate-300">
                      {filteredCorridors.map((c, i) => (
                        <tr key={i} className="hover:bg-slate-900/40 transition-colors">
                          <td className="py-3.5 px-4 font-bold text-white flex items-center gap-2">
                            <MapPinIcon size={14} className="text-cyan-400" />
                            {c.corridor}
                          </td>
                          <td className="py-3.5 px-4 text-slate-400">{c.segment}</td>
                          <td className="py-3.5 px-4">
                            <span className={`px-2 py-0.5 rounded border text-[11px] font-bold ${c.statusColor}`}>
                              {c.pci} / 100 ({c.status})
                            </span>
                          </td>
                          <td className="py-3.5 px-4 font-bold text-amber-400">{c.defectsFound}</td>
                          <td className="py-3.5 px-4 text-slate-400">{c.weatherStress}</td>
                          <td className="py-3.5 px-4 text-cyan-300 font-semibold">{c.recommendedAction}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Tab 3: Maintenance Dispatch Queue */}
            {activeTab === "dispatch" && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800 text-xs font-mono">
                  <div className="flex items-center gap-3">
                    <span className="text-slate-400">DPW DISPATCH API INTEGRATION:</span>
                    <span className="text-emerald-400 font-bold">CONNECTED (Cityworks / Cartegraph / SAP)</span>
                  </div>
                  <span className="text-slate-400">Total Active Work Orders: 14</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {sampleWorkOrders.map((wo) => (
                    <div
                      key={wo.id}
                      className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3 text-xs font-mono">
                          <span className="font-bold text-white flex items-center gap-1.5">
                            <FileTextIcon size={14} className="text-cyan-400" />
                            {wo.id}
                          </span>
                          <span className={`px-2 py-0.5 rounded border text-[10px] font-bold ${wo.priorityColor}`}>
                            {wo.priority}
                          </span>
                        </div>

                        <h4 className="text-sm font-bold text-slate-200 mb-1">{wo.corridor}</h4>
                        <div className="text-xs text-amber-400 font-mono mb-3">{wo.defectType}</div>

                        <div className="space-y-1.5 text-xs text-slate-400 font-mono pt-3 border-t border-slate-800">
                          <div>
                            <span className="text-slate-500">Unit: </span>
                            <span className="text-slate-300">{wo.crew}</span>
                          </div>
                          <div>
                            <span className="text-slate-500">Requisition: </span>
                            <span className="text-slate-300">{wo.materials}</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
                        <span className="text-emerald-400 flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                          {wo.status}
                        </span>
                        <span className="text-slate-400">{wo.eta}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
