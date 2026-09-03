"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { RoadGuardLogoIcon, MenuIcon, XIcon, ShieldCheckIcon, ArrowRightIcon } from "./icons";

interface NavbarProps {
  onOpenDemo?: () => void;
}

export default function Navbar({ onOpenDemo }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "AI Inspection", href: "/inspection" },
    { name: "Risk Map", href: "/risk-map" },
    { name: "Predictive Intelligence", href: "/predictions" },
    { name: "Maintenance", href: "/maintenance" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#070b14]/90 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/40 py-3"
          : "bg-[#070b14]/50 backdrop-blur-sm border-b border-white/[0.05] py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo & Name */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-cyan-500/50 rounded-lg p-1"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.15)] group-hover:border-cyan-400/60 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all">
              <RoadGuardLogoIcon size={26} className="text-cyan-400 group-hover:scale-105 transition-transform" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold tracking-tight text-white group-hover:text-cyan-200 transition-colors">
                  RoadGuard<span className="text-cyan-400">.AI</span>
                </span>
                <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-300 bg-emerald-950/60 border border-emerald-500/30 rounded">
                  Gov / Ent
                </span>
              </div>
              <span className="text-[10px] text-slate-400 tracking-wider uppercase font-mono">
                Infrastructure Intelligence
              </span>
            </div>
          </Link>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="px-3 py-1.5 text-sm font-medium text-slate-300 hover:text-cyan-300 hover:bg-slate-800/50 rounded-lg transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Action & System Status */}
          <div className="hidden sm:flex items-center gap-4">
            {/* Live Telemetry Pill */}
            <div className="hidden xl:flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-900/80 border border-slate-700/60 text-[11px] font-mono text-slate-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Telemetry: 99.98%</span>
            </div>

            <Link
              href="/dashboard"
              className="px-3.5 py-2 text-xs font-semibold text-slate-200 hover:text-white hover:bg-slate-800/80 rounded-lg border border-slate-700 transition-colors"
            >
              Agency Portal
            </Link>

            <Link
              href="/dashboard"
              className="relative group inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 rounded-lg shadow-md shadow-cyan-900/30 border border-cyan-400/40 transition-all hover:shadow-cyan-500/20"
            >
              <span>Launch Console</span>
              <ArrowRightIcon size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <Link
              href="/dashboard"
              className="text-xs font-semibold px-3 py-1.5 bg-cyan-600/30 text-cyan-300 border border-cyan-500/40 rounded-lg sm:hidden"
            >
              Console
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-lg transition-colors focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden px-4 pt-3 pb-6 bg-[#090e1a]/95 border-b border-slate-800 backdrop-blur-xl animate-in fade-in slide-in-from-top-2">
          <div className="flex flex-col space-y-2">
            {/* System Status Pill */}
            <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-slate-900/70 border border-slate-800 text-xs font-mono text-slate-300 mb-2">
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                <span>Active DOT Telemetry Nodes</span>
              </span>
              <span className="text-emerald-400 font-semibold">ONLINE</span>
            </div>

            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 text-base font-medium text-slate-200 hover:text-cyan-300 hover:bg-slate-800/60 rounded-lg transition-colors"
              >
                {link.name}
              </Link>
            ))}

            <div className="pt-3 border-t border-slate-800/80 flex flex-col gap-2.5">
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 text-sm font-medium text-slate-200 bg-slate-800/80 hover:bg-slate-800 rounded-lg border border-slate-700"
              >
                Agency Portal Login
              </Link>
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg shadow-lg shadow-cyan-900/40"
              >
                Launch Command Center
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
