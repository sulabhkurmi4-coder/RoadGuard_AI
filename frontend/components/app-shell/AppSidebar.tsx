"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  RoadGuardLogoIcon,
  BarChartIcon,
  RadarIcon,
  MapPinIcon,
  TrendingUpIcon,
  TruckIcon,
  FileTextIcon,
  CheckCircleIcon,
  ShieldCheckIcon,
  ArrowRightIcon,
  XIcon,
} from "@/components/icons";

interface AppSidebarProps {
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export default function AppSidebar({ mobileOpen = false, onCloseMobile }: AppSidebarProps) {
  const pathname = usePathname();

  const navigationItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: BarChartIcon,
      badge: null,
    },
    {
      name: "AI Inspection",
      href: "/inspection",
      icon: RadarIcon,
      badge: "Active",
      badgeColor: "bg-cyan-950 text-cyan-300 border border-cyan-500/30",
    },
    {
      name: "Inspection Results",
      href: "/inspection/results",
      icon: CheckCircleIcon,
      badge: "24 New",
      badgeColor: "bg-emerald-950 text-emerald-300 border border-emerald-500/30",
      indent: true,
    },
    {
      name: "Risk Map (GIS)",
      href: "/risk-map",
      icon: MapPinIcon,
      badge: null,
    },
    {
      name: "Predictive Intelligence",
      href: "/predictions",
      icon: TrendingUpIcon,
      badge: "AI Model",
      badgeColor: "bg-purple-950 text-purple-300 border border-purple-500/30",
    },
    {
      name: "Maintenance Dispatch",
      href: "/maintenance",
      icon: TruckIcon,
      badge: "14 WO",
      badgeColor: "bg-amber-950 text-amber-300 border border-amber-500/30",
    },
    {
      name: "Reports & Audits",
      href: "/reports",
      icon: FileTextIcon,
      badge: null,
    },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-[#070c17] border-r border-slate-800/80 flex flex-col justify-between transition-transform duration-300 lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Upper section: Brand & Navigation */}
        <div className="p-5 flex flex-col flex-1 overflow-y-auto">
          {/* Header Brand */}
          <div className="flex items-center justify-between pb-5 border-b border-slate-800/80 mb-6">
            <Link
              href="/dashboard"
              onClick={onCloseMobile}
              className="flex items-center gap-3 group focus:outline-none"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-slate-900 border border-cyan-500/40 shadow-[0_0_12px_rgba(6,182,212,0.2)]">
                <RoadGuardLogoIcon size={24} className="text-cyan-400" />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-bold text-white tracking-tight">
                  RoadGuard<span className="text-cyan-400">.AI</span>
                </span>
                <span className="text-[10px] font-mono text-cyan-300/80 uppercase tracking-wider">
                  Command Center
                </span>
              </div>
            </Link>

            {/* Mobile close button */}
            <button
              type="button"
              onClick={onCloseMobile}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 lg:hidden"
            >
              <XIcon size={20} />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5 flex-1">
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 px-3 mb-2 font-semibold">
              Platform Modules
            </div>

            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onCloseMobile}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                    item.indent ? "ml-4 pl-3" : ""
                  } ${
                    isActive
                      ? "bg-gradient-to-r from-cyan-950/80 to-blue-950/40 text-cyan-300 border border-cyan-500/40 shadow-sm"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      size={18}
                      className={isActive ? "text-cyan-400" : "text-slate-400 group-hover:text-slate-200"}
                    />
                    <span>{item.name}</span>
                  </div>

                  {item.badge && (
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-md ${
                        item.badgeColor || "bg-slate-800 text-slate-300"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Lower section: Status, Back to Landing Page, User Profile */}
        <div className="p-4 border-t border-slate-800/80 space-y-3 bg-[#060912]">
          {/* Real-time Telemetry Card */}
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-[11px] font-mono">
            <div className="flex items-center justify-between text-slate-300 mb-1">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Telemetry Ingestion</span>
              </span>
              <span className="text-emerald-400 font-semibold">99.98%</span>
            </div>
            <div className="text-[10px] text-slate-500">
              State DOT Highway Grid • 142 Active Nodes
            </div>
          </div>

          {/* Return to Public Landing Page */}
          <Link
            href="/"
            className="flex items-center justify-between px-3 py-2 rounded-lg bg-slate-900/50 hover:bg-slate-800/80 text-xs font-medium text-slate-400 hover:text-slate-200 border border-slate-800 transition-colors"
          >
            <span className="flex items-center gap-2">
              <ShieldCheckIcon size={14} className="text-cyan-400" />
              <span>Public Landing Page</span>
            </span>
            <ArrowRightIcon size={12} />
          </Link>

          {/* User Profile Badge */}
          <div className="flex items-center gap-3 px-2 pt-1">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center text-xs font-bold text-white border border-cyan-400/40">
              D4
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-bold text-slate-200 truncate">
                District 4 Engineering
              </span>
              <span className="text-[10px] font-mono text-slate-500">
                DOT Clearance Level 3
              </span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
