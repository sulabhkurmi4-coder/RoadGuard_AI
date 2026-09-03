import React from "react";
import Link from "next/link";
import {
  RoadGuardLogoIcon,
  ShieldCheckIcon,
  ActivityIcon,
  MapPinIcon,
  FileTextIcon,
} from "./icons";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const links = {
    platform: [
      { name: "Command Center Dashboard", href: "/dashboard" },
      { name: "AI Vision Inspection", href: "/inspection" },
      { name: "Geospatial Risk Heatmap", href: "/risk-map" },
      { name: "Predictive Degradation Models", href: "/predictions" },
      { name: "Automated DPW Dispatch", href: "/maintenance" },
      { name: "Inspection Results Archive", href: "/inspection/results" },
    ],
    solutions: [
      { name: "State Departments of Transportation (DOT)", href: "#" },
      { name: "Municipal & County Public Works", href: "#" },
      { name: "Tollway Authorities & Concessionaires", href: "#" },
      { name: "Airport Runway Asset Preservation", href: "#" },
      { name: "Civil Engineering & Paving Contractors", href: "#" },
    ],
    standards: [
      { name: "AASHTO PP 67-10 Automated Survey", href: "#" },
      { name: "ASTM D6433 Pavement Condition Index", href: "#" },
      { name: "Federal Highway Administration (FHWA) Alignment", href: "#" },
      { name: "FedRAMP Security Whitepaper", href: "#" },
      { name: "CJIS Data Residency Guidelines", href: "#" },
    ],
    agency: [
      { name: "About RoadGuard AI", href: "#" },
      { name: "Government Procurement Schedules", href: "#" },
      { name: "API & GIS Ingestion Documentation", href: "#" },
      { name: "Agency Security Disclosures", href: "#" },
      { name: "Contact Public Works Desk", href: "#" },
    ],
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-850 text-slate-400 text-xs">
      {/* Top Telemetry & Status Ticker */}
      <div className="border-b border-slate-900 bg-slate-950/90 py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 font-mono text-[11px]">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-2 text-emerald-400 font-semibold">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
              ALL SYSTEMS OPERATIONAL
            </span>
            <span className="text-slate-600 hidden sm:inline">|</span>
            <span className="text-slate-400 hidden sm:inline">
              Active Sensor Clusters: <strong>142 Nodes</strong>
            </span>
            <span className="text-slate-600 hidden md:inline">|</span>
            <span className="text-slate-400 hidden md:inline">
              Global GIS Ingestion Latency: <strong>38ms</strong>
            </span>
          </div>

          <div className="text-slate-500 text-[10px]">
            LAST AUDIT: {currentYear} • FEDRAMP READY ARCHITECTURE
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Column (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-slate-900 border border-cyan-500/40">
                <RoadGuardLogoIcon size={24} className="text-cyan-400" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                RoadGuard<span className="text-cyan-400">.AI</span>
              </span>
            </div>

            <p className="text-slate-400 leading-relaxed text-xs max-w-sm">
              Next-generation pavement intelligence, LiDAR profiling, and automated predictive maintenance platform.
              Empowering transportation agencies and highway operators to eliminate potholes, safeguard motorists, and
              conserve public infrastructure capital.
            </p>

            {/* Compliance badges */}
            <div className="pt-2 flex flex-wrap gap-2 text-[10px] font-mono">
              <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">
                AASHTO PP 67-10
              </span>
              <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">
                ASTM D6433
              </span>
              <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">
                SOC2 Type II
              </span>
              <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">
                FedRAMP Ready
              </span>
            </div>
          </div>

          {/* Links Column 1: Platform */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 font-mono mb-4">
              Platform Modules
            </h4>
            <ul className="space-y-2.5">
              {links.platform.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="hover:text-cyan-300 transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Column 2: Solutions */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 font-mono mb-4">
              Agencies & Verticals
            </h4>
            <ul className="space-y-2.5">
              {links.solutions.map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="hover:text-cyan-300 transition-colors">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Column 3: Standards & Agency */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 font-mono mb-4">
              Gov Compliance & Docs
            </h4>
            <ul className="space-y-2.5">
              {links.standards.map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="hover:text-cyan-300 transition-colors">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="mt-14 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px] font-mono">
          <div>
            &copy; {currentYear} RoadGuard AI Technologies Inc. All rights reserved. Dedicated to critical civil infrastructure preservation.
          </div>

          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-slate-300 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-slate-300 transition-colors">
              Security Disclosures
            </a>
            <a href="#" className="hover:text-slate-300 transition-colors">
              CJIS Compliance
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
