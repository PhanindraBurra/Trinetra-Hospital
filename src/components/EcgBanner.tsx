"use client";

import { Activity, ShieldCheck, HeartPulse } from "lucide-react";

export default function EcgBanner() {
  return (
    <div className="w-full bg-slate-900 border-y border-slate-800 py-3 relative overflow-hidden text-slate-300">
      {/* Background Pulse Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-sky-950/40 via-emerald-950/20 to-sky-950/40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4 relative z-10">
        {/* Left Telemetry Indicators */}
        <div className="flex items-center gap-4 text-xs font-bold">
          <div className="flex items-center gap-1.5 text-emerald-400">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <Activity className="w-4 h-4" />
            <span className="tracking-wider uppercase">ICU Live Monitor Active</span>
          </div>

          <div className="hidden sm:flex items-center gap-3 text-[11px] text-slate-400 border-l border-slate-700 pl-4 font-mono">
            <span>HR: <strong className="text-emerald-400">74 bpm</strong></span>
            <span>SpO2: <strong className="text-sky-400">99%</strong></span>
            <span>RESP: <strong className="text-amber-400">18/min</strong></span>
          </div>
        </div>

        {/* Center Animated ECG Heartbeat Wave SVG */}
        <div className="w-full md:w-80 h-7 overflow-hidden relative flex items-center justify-center">
          <svg
            viewBox="0 0 500 40"
            className="w-full h-full stroke-emerald-400 fill-none stroke-[2.2] animate-ecg"
            preserveAspectRatio="none"
          >
            <path d="M0,20 L80,20 L95,8 L105,32 L115,20 L130,20 L140,5 L150,35 L160,20 L230,20 L245,8 L255,32 L265,20 L280,20 L290,5 L300,35 L310,20 L380,20 L395,8 L405,32 L415,20 L430,20 L440,5 L450,35 L460,20 L500,20" />
          </svg>
        </div>

        {/* Right Status Badge */}
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
          <ShieldCheck className="w-4 h-4 text-sky-400" />
          <span>Advanced Intensive Care &amp; Life Support Units</span>
        </div>
      </div>
    </div>
  );
}
