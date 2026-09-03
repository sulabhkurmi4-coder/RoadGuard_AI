import React from "react";
import Link from "next/link";
import { ArrowRightIcon, ShieldCheckIcon, RadarIcon, ActivityIcon } from "./icons";

export default function CtaBanner() {
  return (
    <section className="relative py-20 bg-slate-950 overflow-hidden">
      {/* Glow effect */}
      <div className="absolute inset-0 bg-radial-glow opacity-80 pointer-events-none" />
      <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 border border-cyan-500/30 p-8 sm:p-14 shadow-2xl backdrop-blur-xl text-center relative overflow-hidden">
          {/* Subtle grid pattern inside */}
          <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-950/80 border border-cyan-500/40 text-xs font-mono text-cyan-300 mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>PILOT PROGRAMS OPEN FOR STATE DOTS & MUNICIPALITIES</span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight max-w-3xl mx-auto mb-6">
            Transition from Reactive Potholes to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-emerald-400">
              Autonomous Infrastructure Intelligence
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            Deploy RoadGuard AI across your existing vehicle fleet in under 72 hours. Ingest optical telemetry, detect
            sub-millimeter deterioration, and safeguard citizen transit corridors.
          </p>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <Link
              href="/dashboard"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 text-base font-semibold text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-cyan-600 hover:from-cyan-400 hover:to-blue-500 rounded-xl shadow-[0_0_25px_rgba(6,182,212,0.3)] border border-cyan-300/40 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Launch Command Center</span>
              <ArrowRightIcon size={18} />
            </Link>

            <Link
              href="/inspection"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 text-base font-semibold text-slate-200 bg-slate-800/80 hover:bg-slate-700/80 hover:text-white rounded-xl border border-slate-700 transition-all"
            >
              <RadarIcon size={18} className="text-cyan-400" />
              <span>Run AI Road Inspection</span>
            </Link>
          </div>

          {/* Security & Assurance footer */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-mono pt-6 border-t border-slate-800/80">
            <span className="flex items-center gap-1.5">
              <ShieldCheckIcon size={16} className="text-emerald-400" />
              CJIS & FedRAMP Ready Storage
            </span>
            <span className="flex items-center gap-1.5">
              <ActivityIcon size={16} className="text-cyan-400" />
              REST & GeoJSON API Access
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              99.98% Service Level Agreement
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
