import React from "react";
import { RadarIcon } from "@/components/icons";

interface InspectedImageSectionProps {
  imageUrl: string;
  roadName: string;
}

export default function InspectedImageSection({
  imageUrl,
  roadName,
}: InspectedImageSectionProps) {
  return (
    <div className="rounded-2xl bg-slate-900/80 border border-slate-800 overflow-hidden shadow-2xl space-y-3 p-5 sm:p-6">
      {/* Header with "Inspection Image" small label */}
      <div className="flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-md bg-cyan-950 text-cyan-300 border border-cyan-500/40 text-[11px] font-bold tracking-wide uppercase">
            Inspection Image
          </span>
          <span className="text-slate-400 hidden sm:inline">• High-Resolution Visual Feed</span>
        </div>

        <div className="text-[11px] text-slate-500">
          Source: Forward Inspection Van 8K
        </div>
      </div>

      {/* Main Image Viewport */}
      <div className="relative w-full aspect-[16/9] max-h-[460px] rounded-xl bg-slate-950 border border-slate-800 overflow-hidden flex items-center justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageUrl}
          alt={`Inspected road image for ${roadName}`}
          className="w-full h-full object-cover object-center"
        />

        {/* Perspective grid lines */}
        <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />

        {/* HUD Annotations */}
        <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded border border-slate-800 text-[10px] font-mono text-slate-300">
          COORDINATES: 40.7128° N, 74.0060° W
        </div>

        <div className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded border border-cyan-500/30 text-[10px] font-mono text-cyan-300">
          SURVEY SPEED: 45 MPH
        </div>

        <div className="absolute bottom-3 left-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded border border-rose-500/40 text-[10px] font-mono text-rose-300 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-ping"></span>
          <span>FATIGUE DISTRESS REGION DETECTED</span>
        </div>
      </div>
    </div>
  );
}
